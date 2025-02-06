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
import { GenerateContentRequest, GenerationConfig, SafetySetting } from '../types/content';
export declare function formatContentRequest(request: GenerateContentRequest | string, generationConfig?: GenerationConfig, safetySettings?: SafetySetting[]): GenerateContentRequest;
export declare function validateGenerateContentRequest(request: GenerateContentRequest): void;
export declare function validateGenerationConfig(generationConfig: GenerationConfig): GenerationConfig;
export declare function getApiVersion(request: GenerateContentRequest): 'v1' | 'v1beta1';
export declare function hasVertexRagStore(request: GenerateContentRequest): boolean;
export declare function hasVertexAISearch(request: GenerateContentRequest): boolean;
