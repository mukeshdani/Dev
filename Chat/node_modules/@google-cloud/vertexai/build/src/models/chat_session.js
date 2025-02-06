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
exports.ChatSessionPreview = exports.ChatSession = void 0;
const util_1 = require("./util");
const generate_content_1 = require("../functions/generate_content");
const errors_1 = require("../types/errors");
const util_2 = require("../util");
/**
 * The `ChatSession` class is used to make multiturn send message requests. You
 * can instantiate this class by using the `startChat` method in the
 * `GenerativeModel` class. The `sendMessage` method makes an async call to get
 * the response of a chat message at at once. The `sendMessageStream` method
 * makes an async call to stream the response of a chat message as it's being
 * generated.
 */
class ChatSession {
    async getHistory() {
        return Promise.resolve(this.historyInternal);
    }
    /**
     * @constructor
     * @param request - {@link StartChatSessionRequest}
     */
    constructor(request, requestOptions) {
        var _a;
        this.sendStreamPromise = Promise.resolve();
        this.project = request.project;
        this.location = request.location;
        this.googleAuth = request.googleAuth;
        this.resourcePath = request.resourcePath;
        this.historyInternal = (_a = request.history) !== null && _a !== void 0 ? _a : [];
        this.generationConfig = request.generationConfig;
        this.safetySettings = request.safetySettings;
        this.tools = request.tools;
        this.apiEndpoint = request.apiEndpoint;
        this.requestOptions = requestOptions !== null && requestOptions !== void 0 ? requestOptions : {};
        if (request.systemInstruction) {
            this.systemInstruction = (0, util_1.formulateSystemInstructionIntoContent)(request.systemInstruction);
        }
    }
    /**
     * Gets access token from GoogleAuth. Throws {@link GoogleAuthError} when
     * fails.
     * @returns Promise of token.
     */
    fetchToken() {
        const tokenPromise = this.googleAuth.getAccessToken().catch(e => {
            throw new errors_1.GoogleAuthError(util_2.constants.CREDENTIAL_ERROR_MESSAGE, e);
        });
        return tokenPromise;
    }
    /**
     * Makes an async call to send chat message.
     *
     * The response is returned in {@link
     * GenerateContentResult.response}.
     *
     * @example
     * ```
     * const chat = generativeModel.startChat();
     * const result1 = await chat.sendMessage("How can I learn more about Node.js?");
     * console.log('Response: ', JSON.stringify(result1.response));
     *
     * const result2 = await chat.sendMessage("What about python?");
     * console.log('Response: ', JSON.stringify(result2.response));
     * ```
     *
     * @param request - send message request.
     * @returns Promise of {@link GenerateContentResult}.
     */
    async sendMessage(request) {
        const newContent = formulateNewContentFromSendMessageRequest(request);
        const generateContentrequest = {
            contents: this.historyInternal.concat(newContent),
            safetySettings: this.safetySettings,
            generationConfig: this.generationConfig,
            tools: this.tools,
            systemInstruction: this.systemInstruction,
        };
        const generateContentResult = await (0, generate_content_1.generateContent)(this.location, this.resourcePath, this.fetchToken(), generateContentrequest, this.apiEndpoint, this.generationConfig, this.safetySettings, this.tools, this.requestOptions).catch(e => {
            throw e;
        });
        const generateContentResponse = await generateContentResult.response;
        // Only push the latest message to history if the response returns a result
        if (generateContentResponse.candidates &&
            generateContentResponse.candidates.length !== 0) {
            this.historyInternal = this.historyInternal.concat(newContent);
            const contentFromModel = generateContentResponse.candidates[0].content;
            this.historyInternal.push(contentFromModel);
        }
        return Promise.resolve(generateContentResult);
    }
    async appendHistory(streamGenerateContentResultPromise, newContent) {
        const streamGenerateContentResult = await streamGenerateContentResultPromise;
        const streamGenerateContentResponse = await streamGenerateContentResult.response;
        // Only push the latest message to history if the response returned a result
        if (streamGenerateContentResponse.candidates &&
            streamGenerateContentResponse.candidates.length !== 0) {
            this.historyInternal = this.historyInternal.concat(newContent);
            const contentFromModel = streamGenerateContentResponse.candidates[0].content;
            this.historyInternal.push(contentFromModel);
        }
    }
    /**
     * Makes an async call to stream send message.
     *
     * The response is streamed chunk by chunk in
     * {@link StreamGenerateContentResult.stream}. The aggregated response is
     * avaliable in {@link StreamGenerateContentResult.response} after all chunks
     * are returned.
     *
     * @example
     * ```
     * const chat = generativeModel.startChat();
     * const chatInput = "How can I learn more about Node.js?";
     * const result = await chat.sendMessageStream(chatInput);
     * for await (const item of result.stream) {
     *   console.log(item.candidates[0].content.parts[0].text);
     * }
     * const response = await result.response;
     * console.log('aggregated response: ', JSON.stringify(result.response));
     * ```
     *
     * @param request - send message request.
     * @returns Promise of {@link StreamGenerateContentResult}.
     */
    async sendMessageStream(request) {
        const newContent = formulateNewContentFromSendMessageRequest(request);
        const generateContentrequest = {
            contents: this.historyInternal.concat(newContent),
            safetySettings: this.safetySettings,
            generationConfig: this.generationConfig,
            tools: this.tools,
            systemInstruction: this.systemInstruction,
        };
        const streamGenerateContentResultPromise = (0, generate_content_1.generateContentStream)(this.location, this.resourcePath, this.fetchToken(), generateContentrequest, this.apiEndpoint, this.generationConfig, this.safetySettings, this.tools, this.requestOptions).catch(e => {
            throw e;
        });
        this.sendStreamPromise = this.appendHistory(streamGenerateContentResultPromise, newContent).catch(e => {
            // Errors from remote endpoint will be catchable by user from streamGenerateContentResultPromise
            // Errors in appendHistory should not throw to cause user's programe exit with code 1
            console.error(e);
        });
        return streamGenerateContentResultPromise;
    }
}
exports.ChatSession = ChatSession;
/**
 * The `ChatSessionPreview` class is used to make multiturn send message requests. You
 * can instantiate this class by using the `startChat` method in the
 * `GenerativeModelPreview` class. The `sendMessage` method makes an async call to get
 * the response of a chat message at at once. The `sendMessageStream` method
 * makes an async call to stream the response of a chat message as it's being
 * generated.
 */
class ChatSessionPreview {
    async getHistory() {
        return Promise.resolve(this.historyInternal);
    }
    /**
     * @constructor
     * @param request - {@link StartChatSessionRequest}
     */
    constructor(request, requestOptions) {
        var _a;
        this.sendStreamPromise = Promise.resolve();
        this.project = request.project;
        this.location = request.location;
        this.googleAuth = request.googleAuth;
        this.resourcePath = request.resourcePath;
        this.historyInternal = (_a = request.history) !== null && _a !== void 0 ? _a : [];
        this.generationConfig = request.generationConfig;
        this.safetySettings = request.safetySettings;
        this.tools = request.tools;
        this.apiEndpoint = request.apiEndpoint;
        this.requestOptions = requestOptions !== null && requestOptions !== void 0 ? requestOptions : {};
        if (request.systemInstruction) {
            this.systemInstruction = (0, util_1.formulateSystemInstructionIntoContent)(request.systemInstruction);
        }
    }
    /**
     * Gets access token from GoogleAuth. Throws GoogleAuthError when fails.
     * @returns Promise of token.
     */
    fetchToken() {
        const tokenPromise = this.googleAuth.getAccessToken().catch(e => {
            throw new errors_1.GoogleAuthError(util_2.constants.CREDENTIAL_ERROR_MESSAGE, e);
        });
        return tokenPromise;
    }
    /**
     * Makes an async call to send chat message.
     *
     * The response is returned in {@link
     * GenerateContentResult.response}.
     *
     * @example
     * ```
     * const chat = generativeModelPreview.startChat();
     * const result1 = await chat.sendMessage("How can I learn more about Node.js?");
     * console.log('Response: ', JSON.stringify(result1.response));
     *
     * const result2 = await chat.sendMessage("What about python?");
     * console.log('Response: ', JSON.stringify(result2.response));
     * ```
     *
     * @param request - send message request.
     * @returns Promise of {@link GenerateContentResult}.
     */
    async sendMessage(request) {
        const newContent = formulateNewContentFromSendMessageRequest(request);
        const generateContentrequest = {
            contents: this.historyInternal.concat(newContent),
            safetySettings: this.safetySettings,
            generationConfig: this.generationConfig,
            tools: this.tools,
            systemInstruction: this.systemInstruction,
        };
        const generateContentResult = await (0, generate_content_1.generateContent)(this.location, this.resourcePath, this.fetchToken(), generateContentrequest, this.apiEndpoint, this.generationConfig, this.safetySettings, this.tools, this.requestOptions).catch(e => {
            throw e;
        });
        const generateContentResponse = await generateContentResult.response;
        // Only push the latest message to history if the response returned a result
        if (generateContentResponse.candidates &&
            generateContentResponse.candidates.length !== 0) {
            this.historyInternal = this.historyInternal.concat(newContent);
            const contentFromAssistant = generateContentResponse.candidates[0].content;
            this.historyInternal.push(contentFromAssistant);
        }
        return Promise.resolve(generateContentResult);
    }
    async appendHistory(streamGenerateContentResultPromise, newContent) {
        const streamGenerateContentResult = await streamGenerateContentResultPromise;
        const streamGenerateContentResponse = await streamGenerateContentResult.response;
        // Only push the latest message to history if the response returned a result
        if (streamGenerateContentResponse.candidates &&
            streamGenerateContentResponse.candidates.length !== 0) {
            this.historyInternal = this.historyInternal.concat(newContent);
            const contentFromAssistant = streamGenerateContentResponse.candidates[0].content;
            this.historyInternal.push(contentFromAssistant);
        }
    }
    /**
     * Makes an async call to stream send message.
     *
     * The response is streamed chunk by chunk in
     * {@link StreamGenerateContentResult.stream}. The aggregated response is
     * avaliable in {@link StreamGenerateContentResult.response} after all chunks
     * are returned.
     *
     * @example
     * ```
     * const chat = generativeModel.startChat();
     * const chatInput = "How can I learn more about Node.js?";
     * const result = await chat.sendMessageStream(chatInput);
     * for await (const item of result.stream) {
     *   console.log(item.candidates[0].content.parts[0].text);
     * }
     * const response = await result.response;
     * console.log('aggregated response: ', JSON.stringify(result.response));
     * ```
     *
     * @param request - send message request.
     * @returns Promise of {@link StreamGenerateContentResult}.
     */
    async sendMessageStream(request) {
        const newContent = formulateNewContentFromSendMessageRequest(request);
        const generateContentrequest = {
            contents: this.historyInternal.concat(newContent),
            safetySettings: this.safetySettings,
            generationConfig: this.generationConfig,
            tools: this.tools,
            systemInstruction: this.systemInstruction,
        };
        const streamGenerateContentResultPromise = (0, generate_content_1.generateContentStream)(this.location, this.resourcePath, this.fetchToken(), generateContentrequest, this.apiEndpoint, this.generationConfig, this.safetySettings, this.tools, this.requestOptions).catch(e => {
            throw e;
        });
        this.sendStreamPromise = this.appendHistory(streamGenerateContentResultPromise, newContent).catch(e => {
            // Errors from remote endpoint will be catchable by user from streamGenerateContentResultPromise
            // Errors in appendHistory should not throw to cause user's programe exit with code 1
            console.error(e);
        });
        return streamGenerateContentResultPromise;
    }
}
exports.ChatSessionPreview = ChatSessionPreview;
function formulateNewContentFromSendMessageRequest(request) {
    let newParts = [];
    if (typeof request === 'string') {
        newParts = [{ text: request }];
    }
    else if (Array.isArray(request)) {
        for (const item of request) {
            if (typeof item === 'string') {
                newParts.push({ text: item });
            }
            else {
                newParts.push(item);
            }
        }
    }
    return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
/**
 * When multiple Part types (i.e. FunctionResponsePart and TextPart) are
 * passed in a single Part array, we may need to assign different roles to each
 * part. Currently only FunctionResponsePart requires a role other than 'user'.
 * @ignore
 * @param parts Array of parts to pass to the model
 * @returns Array of content items
 */
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
    const userContent = { role: util_2.constants.USER_ROLE, parts: [] };
    const functionContent = { role: util_2.constants.USER_ROLE, parts: [] };
    let hasUserContent = false;
    let hasFunctionContent = false;
    for (const part of parts) {
        if ('functionResponse' in part) {
            functionContent.parts.push(part);
            hasFunctionContent = true;
        }
        else {
            userContent.parts.push(part);
            hasUserContent = true;
        }
    }
    if (hasUserContent && hasFunctionContent) {
        throw new errors_1.ClientError('Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.');
    }
    if (!hasUserContent && !hasFunctionContent) {
        throw new errors_1.ClientError('No content is provided for sending chat message.');
    }
    if (hasUserContent) {
        return [userContent];
    }
    return [functionContent];
}
//# sourceMappingURL=chat_session.js.map