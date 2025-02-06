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
import { CountTokensResponse, GenerateContentResponse, GenerateContentResult, StreamGenerateContentResult } from '../types/content';
export declare function throwErrorIfNotOK(response: Response | undefined): Promise<void>;
/**
 * Process a response.body stream from the backend and return an
 * iterator that provides one complete GenerateContentResponse at a time
 * and a promise that resolves with a single aggregated
 * GenerateContentResponse.
 *
 * @param response - Response from a fetch call
 * @ignore
 */
export declare function processStream(response: Response | undefined): Promise<StreamGenerateContentResult>;
/**
 * Aggregates an array of `GenerateContentResponse`s into a single
 * GenerateContentResponse.
 * @ignore
 * @VisibleForTesting
 */
export declare function aggregateResponses(responses: GenerateContentResponse[]): GenerateContentResponse;
/**
 * Process model responses from generateContent
 * @ignore
 */
export declare function processUnary(response: Response | undefined): Promise<GenerateContentResult>;
/**
 * Process model responses from countTokens
 * @ignore
 */
export declare function processCountTokenResponse(response: Response | undefined): Promise<CountTokensResponse>;
