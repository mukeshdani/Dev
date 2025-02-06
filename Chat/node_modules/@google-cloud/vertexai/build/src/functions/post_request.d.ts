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
import { GenerateContentRequest, CountTokensRequest, RequestOptions } from '../types/content';
/**
 * Makes a POST request to a Vertex service
 * @ignore
 */
export declare function postRequest({ region, resourcePath, resourceMethod, token, data, apiEndpoint, requestOptions, apiVersion, }: {
    region: string;
    resourcePath: string;
    resourceMethod: string;
    token: string | null | undefined;
    data: GenerateContentRequest | CountTokensRequest;
    apiEndpoint?: string;
    requestOptions?: RequestOptions;
    apiVersion?: string;
}): Promise<Response | undefined>;
