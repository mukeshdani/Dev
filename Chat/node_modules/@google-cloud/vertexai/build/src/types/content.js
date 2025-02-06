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
exports.FunctionDeclarationSchemaType = exports.FinishReason = exports.BlockedReason = exports.HarmSeverity = exports.HarmProbability = exports.HarmBlockThreshold = exports.HarmCategory = void 0;
/**
 * Harm categories that will block the content.
 */
var HarmCategory;
(function (HarmCategory) {
    /** The harm category is unspecified. */
    HarmCategory["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
    /** The harm category is hate speech. */
    HarmCategory["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
    /** The harm category is dangerous content. */
    HarmCategory["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
    /** The harm category is harassment. */
    HarmCategory["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
    /** The harm category is sexually explicit content. */
    HarmCategory["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
})(HarmCategory || (exports.HarmCategory = HarmCategory = {}));
/**
 * Probability based thresholds levels for blocking.
 */
var HarmBlockThreshold;
(function (HarmBlockThreshold) {
    /** Unspecified harm block threshold. */
    HarmBlockThreshold["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
    /** Block low threshold and above (i.e. block more). */
    HarmBlockThreshold["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
    /** Block medium threshold and above. */
    HarmBlockThreshold["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
    /** Block only high threshold (i.e. block less). */
    HarmBlockThreshold["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
    /** Block none. */
    HarmBlockThreshold["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (exports.HarmBlockThreshold = HarmBlockThreshold = {}));
/**
 * Harm probability levels in the content.
 */
var HarmProbability;
(function (HarmProbability) {
    /** Harm probability unspecified. */
    HarmProbability["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
    HarmProbability["NEGLIGIBLE"] = "NEGLIGIBLE";
    /** Low level of harm. */
    HarmProbability["LOW"] = "LOW";
    /** Medium level of harm. */
    HarmProbability["MEDIUM"] = "MEDIUM";
    /** High level of harm. */
    HarmProbability["HIGH"] = "HIGH";
})(HarmProbability || (exports.HarmProbability = HarmProbability = {}));
/**
 * Harm severity levels
 */
var HarmSeverity;
(function (HarmSeverity) {
    /** Harm severity unspecified. */
    HarmSeverity["HARM_SEVERITY_UNSPECIFIED"] = "HARM_SEVERITY_UNSPECIFIED";
    /** Negligible level of harm severity. */
    HarmSeverity["HARM_SEVERITY_NEGLIGIBLE"] = "HARM_SEVERITY_NEGLIGIBLE";
    /** Low level of harm severity. */
    HarmSeverity["HARM_SEVERITY_LOW"] = "HARM_SEVERITY_LOW";
    /** Medium level of harm severity. */
    HarmSeverity["HARM_SEVERITY_MEDIUM"] = "HARM_SEVERITY_MEDIUM";
    /** High level of harm severity. */
    HarmSeverity["HARM_SEVERITY_HIGH"] = "HARM_SEVERITY_HIGH";
})(HarmSeverity || (exports.HarmSeverity = HarmSeverity = {}));
/**
 * The reason why the reponse is blocked.
 */
var BlockedReason;
(function (BlockedReason) {
    /** Unspecified blocked reason. */
    BlockedReason["BLOCKED_REASON_UNSPECIFIED"] = "BLOCK_REASON_UNSPECIFIED";
    /** Candidates blocked due to safety. */
    BlockedReason["SAFETY"] = "SAFETY";
    /** Candidates blocked due to other reason. */
    BlockedReason["OTHER"] = "OTHER";
    /** terminology blocklist. */
    BlockedReason["BLOCKLIST"] = "BLOCKLIST";
    /** Candidates blocked due to prohibited content. */
    BlockedReason["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
})(BlockedReason || (exports.BlockedReason = BlockedReason = {}));
/**
 * The reason why the model stopped generating tokens.
 * If empty, the model has not stopped generating the tokens.
 */
var FinishReason;
(function (FinishReason) {
    /** The finish reason is unspecified. */
    FinishReason["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
    /** Natural stop point of the model or provided stop sequence. */
    FinishReason["STOP"] = "STOP";
    /** The maximum number of tokens as specified in the request was reached. */
    FinishReason["MAX_TOKENS"] = "MAX_TOKENS";
    /**
     * The token generation was stopped as the response was flagged for safety
     * reasons.
     */
    FinishReason["SAFETY"] = "SAFETY";
    /**
     * The token generation was stopped as the response was flagged for
     * unauthorized citations.
     */
    FinishReason["RECITATION"] = "RECITATION";
    /** All other reasons that stopped the token generation. */
    FinishReason["OTHER"] = "OTHER";
    /**
     * The token generation was stopped as the response was flagged for the
     * terms which are included from the terminology blocklist.
     */
    FinishReason["BLOCKLIST"] = "BLOCKLIST";
    /**
     * The token generation was stopped as the response was flagged for
     * the prohibited contents.
     */
    FinishReason["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
    /**
     * The token generation was stopped as the response was flagged for
     * Sensitive Personally Identifiable Information (SPII) contents.
     */
    FinishReason["SPII"] = "SPII";
})(FinishReason || (exports.FinishReason = FinishReason = {}));
/**
 * Contains the list of OpenAPI data types
 * as defined by https://swagger.io/docs/specification/data-models/data-types/
 */
var FunctionDeclarationSchemaType;
(function (FunctionDeclarationSchemaType) {
    /** String type. */
    FunctionDeclarationSchemaType["STRING"] = "STRING";
    /** Number type. */
    FunctionDeclarationSchemaType["NUMBER"] = "NUMBER";
    /** Integer type. */
    FunctionDeclarationSchemaType["INTEGER"] = "INTEGER";
    /** Boolean type. */
    FunctionDeclarationSchemaType["BOOLEAN"] = "BOOLEAN";
    /** Array type. */
    FunctionDeclarationSchemaType["ARRAY"] = "ARRAY";
    /** Object type. */
    FunctionDeclarationSchemaType["OBJECT"] = "OBJECT";
})(FunctionDeclarationSchemaType || (exports.FunctionDeclarationSchemaType = FunctionDeclarationSchemaType = {}));
//# sourceMappingURL=content.js.map