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
exports.postRequest = void 0;
const API_BASE_PATH = 'aiplatform.googleapis.com';
const GOOGLE_INTERNAL_ENDPOINT = 'googleapis.com';
const AUTHORIZATION_HEADER = 'Authorization';
const CONTENT_TYPE_HEADER = 'Content-Type';
const USER_AGENT_HEADER = 'User-Agent';
const X_GOOG_API_CLIENT_HEADER = 'X-Goog-Api-Client';
const SERVER_RESERVED_HEADERS = [AUTHORIZATION_HEADER, CONTENT_TYPE_HEADER];
const errors_1 = require("../types/errors");
const constants = require("../util/constants");
/**
 * Makes a POST request to a Vertex service
 * @ignore
 */
async function postRequest({ region, resourcePath, resourceMethod, token, data, apiEndpoint, requestOptions, apiVersion = 'v1', }) {
    const vertexBaseEndpoint = apiEndpoint !== null && apiEndpoint !== void 0 ? apiEndpoint : `${region}-${API_BASE_PATH}`;
    let vertexEndpoint = `https://${vertexBaseEndpoint}/${apiVersion}/${resourcePath}:${resourceMethod}`;
    // Use server sent events for streamGenerateContent
    if (resourceMethod === constants.STREAMING_GENERATE_CONTENT_METHOD) {
        vertexEndpoint += '?alt=sse';
    }
    const necessaryHeaders = new Headers({
        [AUTHORIZATION_HEADER]: `Bearer ${token}`,
        [CONTENT_TYPE_HEADER]: 'application/json',
        [USER_AGENT_HEADER]: constants.USER_AGENT,
    });
    const totalHeaders = getExtraHeaders(vertexBaseEndpoint, necessaryHeaders, requestOptions);
    return fetch(vertexEndpoint, {
        ...getFetchOptions(requestOptions),
        method: 'POST',
        headers: totalHeaders,
        body: JSON.stringify(data),
    });
}
exports.postRequest = postRequest;
function getFetchOptions(requestOptions) {
    const fetchOptions = {};
    if (!requestOptions ||
        requestOptions.timeout === undefined ||
        requestOptions.timeout < 0) {
        return fetchOptions;
    }
    const abortController = new AbortController();
    const signal = abortController.signal;
    setTimeout(() => abortController.abort(), requestOptions.timeout);
    fetchOptions.signal = signal;
    return fetchOptions;
}
function stringHasLineBreak(header) {
    if (header === null || header === undefined) {
        return false;
    }
    return header.includes('\n') || header.includes('\r');
}
function headersHasLineBreak(customHeaders) {
    if (!customHeaders) {
        return false;
    }
    for (const [key, value] of customHeaders.entries()) {
        if (stringHasLineBreak(key) || stringHasLineBreak(value)) {
            return true;
        }
    }
    return false;
}
function getExtraHeaders(vertexBaseEndpoint, necessaryHeaders, requestOptions) {
    var _a;
    if (stringHasLineBreak(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient)) {
        throw new errors_1.ClientError('Found line break in apiClient request option field, please remove ' +
            'the line break and try again.');
    }
    if (headersHasLineBreak(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.customHeaders)) {
        throw new errors_1.ClientError('Found line break in customerHeaders request option field, please remove ' +
            'the line break and try again.');
    }
    const totalHeaders = new Headers(necessaryHeaders);
    const customHeaders = (_a = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.customHeaders) !== null && _a !== void 0 ? _a : new Headers();
    for (const [key, val] of customHeaders.entries()) {
        totalHeaders.append(key, val);
    }
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
        totalHeaders.append(X_GOOG_API_CLIENT_HEADER, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient);
    }
    // Resolve header conflicts.
    let goldenHeaders;
    if (vertexBaseEndpoint.endsWith(GOOGLE_INTERNAL_ENDPOINT)) {
        goldenHeaders = necessaryHeaders;
    }
    else {
        goldenHeaders = customHeaders;
    }
    for (const header of SERVER_RESERVED_HEADERS) {
        if (goldenHeaders.has(header)) {
            totalHeaders.set(header, goldenHeaders.get(header));
        }
    }
    return totalHeaders;
}
//# sourceMappingURL=post_request.js.map