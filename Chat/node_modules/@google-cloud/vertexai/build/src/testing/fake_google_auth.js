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
exports.createFakeGoogleAuth = exports.FakeGoogleAuth = void 0;
const google_auth_library_1 = require("google-auth-library");
/** Fake version of GoogleAuth. */
class FakeGoogleAuth extends google_auth_library_1.GoogleAuth {
    constructor(params) {
        super();
        this.params = params;
    }
    getAccessToken() {
        if (this.params.accessTokenError)
            throw this.params.accessTokenError;
        return Promise.resolve(this.params.accessToken);
    }
}
exports.FakeGoogleAuth = FakeGoogleAuth;
/** Creates a fake GoogleAuth for testing. */
function createFakeGoogleAuth(params = {
    accessToken: 'DEFAULT_TOKEN',
}) {
    return new FakeGoogleAuth(params);
}
exports.createFakeGoogleAuth = createFakeGoogleAuth;
//# sourceMappingURL=fake_google_auth.js.map