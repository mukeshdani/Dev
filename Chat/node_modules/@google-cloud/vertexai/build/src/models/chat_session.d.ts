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
import { Content, GenerateContentResult, Part, RequestOptions, StartChatSessionRequest, StreamGenerateContentResult } from '../types/content';
/**
 * The `ChatSession` class is used to make multiturn send message requests. You
 * can instantiate this class by using the `startChat` method in the
 * `GenerativeModel` class. The `sendMessage` method makes an async call to get
 * the response of a chat message at at once. The `sendMessageStream` method
 * makes an async call to stream the response of a chat message as it's being
 * generated.
 */
export declare class ChatSession {
    private readonly project;
    private readonly location;
    private historyInternal;
    private sendStreamPromise;
    private readonly resourcePath;
    private readonly googleAuth;
    protected readonly requestOptions?: RequestOptions;
    private readonly generationConfig?;
    private readonly safetySettings?;
    private readonly tools?;
    private readonly apiEndpoint?;
    private readonly systemInstruction?;
    getHistory(): Promise<Content[]>;
    /**
     * @constructor
     * @param request - {@link StartChatSessionRequest}
     */
    constructor(request: StartChatSessionRequest, requestOptions?: RequestOptions);
    /**
     * Gets access token from GoogleAuth. Throws {@link GoogleAuthError} when
     * fails.
     * @returns Promise of token.
     */
    private fetchToken;
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
    sendMessage(request: string | Array<string | Part>): Promise<GenerateContentResult>;
    private appendHistory;
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
    sendMessageStream(request: string | Array<string | Part>): Promise<StreamGenerateContentResult>;
}
/**
 * The `ChatSessionPreview` class is used to make multiturn send message requests. You
 * can instantiate this class by using the `startChat` method in the
 * `GenerativeModelPreview` class. The `sendMessage` method makes an async call to get
 * the response of a chat message at at once. The `sendMessageStream` method
 * makes an async call to stream the response of a chat message as it's being
 * generated.
 */
export declare class ChatSessionPreview {
    private readonly project;
    private readonly location;
    private historyInternal;
    private sendStreamPromise;
    private readonly resourcePath;
    private readonly googleAuth;
    protected readonly requestOptions?: RequestOptions;
    private readonly generationConfig?;
    private readonly safetySettings?;
    private readonly tools?;
    private readonly apiEndpoint?;
    private readonly systemInstruction?;
    getHistory(): Promise<Content[]>;
    /**
     * @constructor
     * @param request - {@link StartChatSessionRequest}
     */
    constructor(request: StartChatSessionRequest, requestOptions?: RequestOptions);
    /**
     * Gets access token from GoogleAuth. Throws GoogleAuthError when fails.
     * @returns Promise of token.
     */
    private fetchToken;
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
    sendMessage(request: string | Array<string | Part>): Promise<GenerateContentResult>;
    private appendHistory;
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
    sendMessageStream(request: string | Array<string | Part>): Promise<StreamGenerateContentResult>;
}
