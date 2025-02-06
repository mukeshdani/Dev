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
exports.formulateSystemInstructionIntoContent = void 0;
const util_1 = require("../util");
function formulateSystemInstructionIntoContent(systemInstruction) {
    if (typeof systemInstruction === 'string') {
        return {
            role: util_1.constants.SYSTEM_ROLE,
            parts: [{ text: systemInstruction }],
        };
    }
    systemInstruction.role = util_1.constants.SYSTEM_ROLE;
    return systemInstruction;
}
exports.formulateSystemInstructionIntoContent = formulateSystemInstructionIntoContent;
//# sourceMappingURL=util.js.map