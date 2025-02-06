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
exports.countTokens = void 0;
const errors_1 = require("../types/errors");
const constants = require("../util/constants");
const post_fetch_processing_1 = require("./post_fetch_processing");
const post_request_1 = require("./post_request");
/**
 * Make a async request to count tokens.
 * @param request A CountTokensRequest object with the request contents.
 * @returns The CountTokensResponse object with the token count.
 */
async function countTokens(location, resourcePath, token, request, apiEndpoint, requestOptions) {
    const response = await (0, post_request_1.postRequest)({
        region: location,
        resourcePath: resourcePath,
        resourceMethod: constants.COUNT_TOKENS_METHOD,
        token: await token,
        data: request,
        apiEndpoint: apiEndpoint,
        requestOptions: requestOptions,
    }).catch(e => {
        throw new errors_1.GoogleGenerativeAIError('exception posting request', e);
    });
    await (0, post_fetch_processing_1.throwErrorIfNotOK)(response).catch(e => {
        throw e;
    });
    return (0, post_fetch_processing_1.processCountTokenResponse)(response);
}
exports.countTokens = countTokens;
//# sourceMappingURL=count_tokens.js.map