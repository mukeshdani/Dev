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
import { GoogleAuth } from 'google-auth-library';
import { GenerativeModelPreview, GenerativeModel } from './models';
import { ModelParams, RequestOptions, VertexInit } from './types/content';
/**
 * The `VertexAI` class is the base class for authenticating to Vertex AI.
 * To use Vertex AI's generative AI models, use the `getGenerativeModel` method.
 * To use generative AI features that are in Preview, use the `preview`
 * namespace.
 */
export declare class VertexAI {
    readonly preview: VertexAIPreview;
    private readonly project;
    private readonly location;
    private readonly googleAuth;
    private readonly apiEndpoint?;
    /**
     * @constructor
     * @param init - assign authentication related information,
     *     including the project and location strings, to instantiate a Vertex AI
     * client.
     * @throws {IllegalArgumentError}
  
     */
    constructor(init: VertexInit);
    /**
     * Gets the GenerativeModel class instance.
     *
     * This method creates a new instance of the `GenerativeModel` class with the
     * platform initialization parameters provided in {@link VertexInit} and model
     * initialization parameters provided in {@link ModelParams}. You can
     * optionally provide {@link RequestOptions} to override the default request
     * options.
     *
     * @example
     * ```
     * const project = 'your-cloud-project';
     * const location = 'us-central1';
     * const textModel =  'gemini-1.0-pro';
     * const visionModel = 'gemini-1.0-pro-vision';
     *
     * const vertexAI = new VertexAI({project: project, location: location});
     *
     * // Instantiate models
     * const generativeModel = vertexAI.getGenerativeModel({
     *   model: textModel,
     *   // The following parameters are optional
     *   // They can also be passed to individual content generation requests
     *   safetySettings: [{
     *                      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
     *                      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
     *                     }],
     *   generationConfig: {maxOutputTokens: 256},
     * });
     *
     * const generativeVisionModel = vertexAI.getGenerativeModel({
     *   model: visionModel,
     * });
     *
     * const generativeModelPreview = vertexAI.preview.getGenerativeModel({
     *   model: textModel,
     * });
     * ```
     *
     * @param modelParams - {@link ModelParams} Parameters to
     *     specify the generative model.
     * @param requestOptions - {@link RequestOptions} Parameters to specify
     *     request options
     * @returns Instance of the GenerativeModel class.
     */
    getGenerativeModel(modelParams: ModelParams, requestOptions?: RequestOptions): GenerativeModel;
    protected getProject(): string;
    protected getLocation(): string;
}
/**
 * The preview namespace for VertexAI. Users invoke the `getGenerativeModel`
 * method to start using generative AI features that are in preview.
 */
declare class VertexAIPreview {
    private readonly project;
    private readonly location;
    private readonly googleAuth;
    private readonly apiEndpoint?;
    /**
     * @constructor
     * @param project - The Google Cloud project to use for the request
     * @param location - location The Google Cloud project location to use for the
     *     request
     * @param googleAuth - The GoogleAuthen class instance from
     *     google-auth-library.
     *        Complete list of authentication options is documented in the
     * GoogleAuthOptions interface:
     *        https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/googleauth.ts
     * @param apiEndpoint - [apiEndpoint] The base Vertex AI endpoint to use for
     *     the request. If
     *        not provided, the default regionalized endpoint
     *        (i.e. us-central1-aiplatform.googleapis.com) will be used.
     */
    constructor(project: string, location: string, googleAuth: GoogleAuth, apiEndpoint?: string);
    /**
     * @param modelParams - {@link ModelParams} Parameters to
     *     specify the generative model.
     * @returns Instance of the GenerativeModelPreview class.
     */
    getGenerativeModel(modelParams: ModelParams, requestOptions?: RequestOptions): GenerativeModelPreview;
}
export {};
