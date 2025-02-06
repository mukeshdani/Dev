"use strict";
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCountTokenResponse = exports.processUnary = exports.aggregateResponses = exports.processStream = exports.throwErrorIfNotOK = void 0;
const util_1 = require("../util");
const errors_1 = require("../types/errors");
async function throwErrorIfNotOK(response) {
    if (response === undefined) {
        throw new errors_1.GoogleGenerativeAIError('response is undefined');
    }
    if (!response.ok) {
        const status = response.status;
        const statusText = response.statusText;
        const errorBody = await response.json();
        const errorMessage = `got status: ${status} ${statusText}. ${JSON.stringify(errorBody)}`;
        if (status >= 400 && status < 500) {
            throw new errors_1.ClientError(errorMessage);
        }
        throw new errors_1.GoogleGenerativeAIError(errorMessage);
    }
}
exports.throwErrorIfNotOK = throwErrorIfNotOK;
const responseLineRE = /^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
async function* generateResponseSequence(stream) {
    const reader = stream.getReader();
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }
        yield addMissingIndexAndRole(value);
    }
}
/**
 * Process a response.body stream from the backend and return an
 * iterator that provides one complete GenerateContentResponse at a time
 * and a promise that resolves with a single aggregated
 * GenerateContentResponse.
 *
 * @param response - Response from a fetch call
 * @ignore
 */
async function processStream(response) {
    if (response === undefined) {
        throw new errors_1.GoogleGenerativeAIError('Error processing stream because response === undefined');
    }
    if (!response.body) {
        throw new errors_1.GoogleGenerativeAIError('Error processing stream because response.body not found');
    }
    const inputStream = response.body.pipeThrough(new TextDecoderStream('utf8', { fatal: true }));
    const responseStream = getResponseStream(inputStream);
    const [stream1, stream2] = responseStream.tee();
    return Promise.resolve({
        stream: generateResponseSequence(stream1),
        response: getResponsePromise(stream2),
    });
}
exports.processStream = processStream;
async function getResponsePromise(stream) {
    const allResponses = [];
    const reader = stream.getReader();
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            return aggregateResponses(allResponses);
        }
        allResponses.push(value);
    }
}
/**
 * Reads a raw stream from the fetch response and join incomplete
 * chunks, returning a new stream that provides a single complete
 * GenerateContentResponse in each iteration.
 * @ignore
 */
function getResponseStream(inputStream) {
    const reader = inputStream.getReader();
    const stream = new ReadableStream({
        start(controller) {
            let currentText = '';
            return pump();
            function pump() {
                return reader.read().then(({ value, done }) => {
                    if (done) {
                        if (currentText.trim()) {
                            controller.error(new errors_1.GoogleGenerativeAIError(`Failed to parse final chunk of stream: ${currentText}`));
                            return;
                        }
                        controller.close();
                        return;
                    }
                    currentText += value;
                    let match = currentText.match(responseLineRE);
                    let parsedResponse;
                    while (match) {
                        try {
                            parsedResponse = JSON.parse(match[1]);
                        }
                        catch (e) {
                            controller.error(new errors_1.GoogleGenerativeAIError(`Error parsing JSON response from stream chunk: "${match[1]}"`));
                            return;
                        }
                        controller.enqueue(parsedResponse);
                        currentText = currentText.substring(match[0].length);
                        match = currentText.match(responseLineRE);
                    }
                    return pump();
                });
            }
        },
    });
    return stream;
}
/**
 * Aggregates an array of `GenerateContentResponse`s into a single
 * GenerateContentResponse.
 * @ignore
 * @VisibleForTesting
 */
function aggregateResponses(responses) {
    var _a, _b, _c;
    const lastResponse = responses[responses.length - 1];
    if (lastResponse === undefined) {
        throw new errors_1.GoogleGenerativeAIError('Error aggregating stream chunks because the final response in stream chunk is undefined');
    }
    const aggregatedResponse = {};
    if (lastResponse.promptFeedback) {
        aggregatedResponse.promptFeedback = lastResponse.promptFeedback;
    }
    if (lastResponse.usageMetadata) {
        aggregatedResponse.usageMetadata = lastResponse.usageMetadata;
    }
    for (const response of responses) {
        if (!response.candidates || response.candidates.length === 0) {
            continue;
        }
        for (let i = 0; i < response.candidates.length; i++) {
            if (!aggregatedResponse.candidates) {
                aggregatedResponse.candidates = [];
            }
            if (!aggregatedResponse.candidates[i]) {
                aggregatedResponse.candidates[i] = {
                    index: (_a = response.candidates[i].index) !== null && _a !== void 0 ? _a : i,
                    content: {
                        role: (_c = (_b = response.candidates[i].content) === null || _b === void 0 ? void 0 : _b.role) !== null && _c !== void 0 ? _c : util_1.constants.MODEL_ROLE,
                        parts: [{ text: '' }],
                    },
                };
            }
            const citationMetadataAggregated = aggregateCitationMetadataForCandidate(response.candidates[i], aggregatedResponse.candidates[i]);
            if (citationMetadataAggregated) {
                aggregatedResponse.candidates[i].citationMetadata =
                    citationMetadataAggregated;
            }
            const finishResonOfChunk = response.candidates[i].finishReason;
            if (finishResonOfChunk) {
                aggregatedResponse.candidates[i].finishReason =
                    response.candidates[i].finishReason;
            }
            const finishMessageOfChunk = response.candidates[i].finishMessage;
            if (finishMessageOfChunk) {
                aggregatedResponse.candidates[i].finishMessage = finishMessageOfChunk;
            }
            const safetyRatingsOfChunk = response.candidates[i].safetyRatings;
            if (safetyRatingsOfChunk) {
                aggregatedResponse.candidates[i].safetyRatings = safetyRatingsOfChunk;
            }
            if (response.candidates[i].content &&
                response.candidates[i].content.parts &&
                response.candidates[i].content.parts.length > 0) {
                for (const part of response.candidates[i].content.parts) {
                    if (part.text) {
                        aggregatedResponse.candidates[i].content.parts[0].text += part.text;
                    }
                    if (part.functionCall) {
                        aggregatedResponse.candidates[i].content.parts[0].functionCall =
                            part.functionCall;
                        // the empty 'text' key should be removed if functionCall is in the
                        // response
                        delete aggregatedResponse.candidates[i].content.parts[0].text;
                    }
                }
            }
            const groundingMetadataAggregated = aggregateGroundingMetadataForCandidate(response.candidates[i], aggregatedResponse.candidates[i]);
            if (groundingMetadataAggregated) {
                aggregatedResponse.candidates[i].groundingMetadata =
                    groundingMetadataAggregated;
            }
        }
    }
    return aggregatedResponse;
}
exports.aggregateResponses = aggregateResponses;
function aggregateCitationMetadataForCandidate(candidateChunk, aggregatedCandidate) {
    var _a;
    if (!candidateChunk.citationMetadata) {
        return;
    }
    const emptyCitationMetadata = {
        citations: [],
    };
    const citationMetadataAggregated = (_a = aggregatedCandidate.citationMetadata) !== null && _a !== void 0 ? _a : emptyCitationMetadata;
    const citationMetadataChunk = candidateChunk.citationMetadata;
    if (citationMetadataChunk.citations) {
        citationMetadataAggregated.citations =
            citationMetadataAggregated.citations.concat(citationMetadataChunk.citations);
    }
    return citationMetadataAggregated;
}
function aggregateGroundingMetadataForCandidate(candidateChunk, aggregatedCandidate) {
    var _a;
    if (!candidateChunk.groundingMetadata) {
        return;
    }
    const emptyGroundingMetadata = {
        webSearchQueries: [],
        groundingAttributions: [],
        retrievalQueries: [],
        groundingChunks: [],
        groundingSupports: [],
    };
    const groundingMetadataAggregated = (_a = aggregatedCandidate.groundingMetadata) !== null && _a !== void 0 ? _a : emptyGroundingMetadata;
    const groundingMetadataChunk = candidateChunk.groundingMetadata;
    if (groundingMetadataChunk.webSearchQueries) {
        groundingMetadataAggregated.webSearchQueries =
            groundingMetadataAggregated.webSearchQueries.concat(groundingMetadataChunk.webSearchQueries);
    }
    if (groundingMetadataChunk.groundingAttributions) {
        groundingMetadataAggregated.groundingAttributions =
            groundingMetadataAggregated.groundingAttributions.concat(groundingMetadataChunk.groundingAttributions);
    }
    if (groundingMetadataChunk.retrievalQueries) {
        groundingMetadataAggregated.retrievalQueries =
            groundingMetadataAggregated.retrievalQueries.concat(groundingMetadataChunk.retrievalQueries);
    }
    if (groundingMetadataChunk.groundingChunks) {
        groundingMetadataAggregated.groundingChunks =
            groundingMetadataAggregated.groundingChunks.concat(groundingMetadataChunk.groundingChunks);
    }
    if (groundingMetadataChunk.groundingSupports) {
        groundingMetadataAggregated.groundingSupports =
            groundingMetadataAggregated.groundingSupports.concat(groundingMetadataChunk.groundingSupports);
    }
    if (groundingMetadataChunk.searchEntryPoint) {
        groundingMetadataAggregated.searchEntryPoint =
            groundingMetadataChunk.searchEntryPoint;
    }
    return groundingMetadataAggregated;
}
function addMissingIndexAndRole(response) {
    const generateContentResponse = response;
    if (generateContentResponse.candidates &&
        generateContentResponse.candidates.length > 0) {
        generateContentResponse.candidates.forEach((candidate, index) => {
            if (candidate.index === undefined) {
                generateContentResponse.candidates[index].index = index;
            }
            if (candidate.content === undefined) {
                generateContentResponse.candidates[index].content = {};
            }
            if (candidate.content.role === undefined) {
                generateContentResponse.candidates[index].content.role =
                    util_1.constants.MODEL_ROLE;
            }
        });
    }
    return generateContentResponse;
}
/**
 * Process model responses from generateContent
 * @ignore
 */
async function processUnary(response) {
    if (response !== undefined) {
        // ts-ignore
        const responseJson = await response.json();
        const generateContentResponse = addMissingIndexAndRole(responseJson);
        return Promise.resolve({
            response: generateContentResponse,
        });
    }
    return Promise.resolve({
        response: {},
    });
}
exports.processUnary = processUnary;
/**
 * Process model responses from countTokens
 * @ignore
 */
async function processCountTokenResponse(response) {
    if (response) {
        // ts-ignore
        return response.json();
    }
    return Promise.resolve({});
}
exports.processCountTokenResponse = processCountTokenResponse;
//# sourceMappingURL=post_fetch_processing.js.map