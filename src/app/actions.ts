/*
 *  Copyright 2017 CoreFiling S.A.R.L.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * Actions are used to pass info from the UI back to the state and sagas.
 */
import { Action } from 'redux';

import { App, User } from './models';
import { Taxonomy } from '@cfl/bigfoot-search-service';

export const STARTUP_INFO_RECEIVED = 'STARTUP_INFO_RECEIVED';
export const STARTUP_INFO_FAILED = 'STARTUP_INFO_FAILED';

export interface StartupInfoReceivedAction extends Action {
  user: User;
  apps: App[];
  taxonomies: Taxonomy[];
}

export function startupInfoReceivedAction(user: User, apps: App[], taxonomies: Taxonomy[]): StartupInfoReceivedAction {
  return {type: STARTUP_INFO_RECEIVED, user, apps, taxonomies};
}

export interface FailedAction extends Action {
  message?: string;
}

export function startupInfoFailedAction(message: string): FailedAction {
  return {type: STARTUP_INFO_FAILED, message};
}
