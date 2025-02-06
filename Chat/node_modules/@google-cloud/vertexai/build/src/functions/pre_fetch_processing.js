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
exports.hasVertexAISearch = exports.hasVertexRagStore = exports.getApiVersion = exports.validateGenerationConfig = exports.validateGenerateContentRequest = exports.formatContentRequest = void 0;
const errors_1 = require("../types/errors");
const constants = require("../util/constants");
function formatContentRequest(request, generationConfig, safetySettings) {
    if (typeof request === 'string') {
        return {
            contents: [{ role: constants.USER_ROLE, parts: [{ text: request }] }],
            generationConfig: generationConfig,
            safetySettings: safetySettings,
        };
    }
    else {
        return request;
    }
}
exports.formatContentRequest = formatContentRequest;
function validateGenerateContentRequest(request) {
    const contents = request.contents;
    for (const content of contents) {
        for (const part of content.parts) {
            if ('fileData' in part) {
                // @ts-ignore
                const uri = part['fileData']['fileUri'];
                if (!uri.startsWith('gs://')) {
                    throw new URIError(`Found invalid Google Cloud Storage URI ${uri}, Google Cloud Storage URIs must start with gs://`);
                }
            }
        }
    }
    if (hasVertexAISearch(request) && hasVertexRagStore(request)) {
        throw new errors_1.ClientError('Found both vertexAiSearch and vertexRagStore field are set in tool. Either set vertexAiSearch or vertexRagStore.');
    }
}
exports.validateGenerateContentRequest = validateGenerateContentRequest;
function validateGenerationConfig(generationConfig) {
    if ('topK' in generationConfig) {
        if (!(generationConfig.topK > 0) || !(generationConfig.topK <= 40)) {
            delete generationConfig.topK;
        }
    }
    return generationConfig;
}
exports.validateGenerationConfig = validateGenerationConfig;
function getApiVersion(request) {
    return hasVertexRagStore(request) ? 'v1beta1' : 'v1';
}
exports.getApiVersion = getApiVersion;
function hasVertexRagStore(request) {
    var _a;
    for (const tool of (_a = request === null || request === void 0 ? void 0 : request.tools) !== null && _a !== void 0 ? _a : []) {
        const retrieval = tool.retrieval;
        if (!retrieval)
            continue;
        if (retrieval.vertexRagStore) {
            return true;
        }
    }
    return false;
}
exports.hasVertexRagStore = hasVertexRagStore;
function hasVertexAISearch(request) {
    var _a;
    for (const tool of (_a = request === null || request === void 0 ? void 0 : request.tools) !== null && _a !== void 0 ? _a : []) {
        const retrieval = tool.retrieval;
        if (!retrieval)
            continue;
        if (retrieval.vertexAiSearch) {
            return true;
        }
    }
    return false;
}
exports.hasVertexAISearch = hasVertexAISearch;
//# sourceMappingURL=pre_fetch_processing.js.map