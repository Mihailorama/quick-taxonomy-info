[![Build Status](https://travis-ci.org/CoreFiling/quick-taxonomy-info.svg?branch=develop)](https://travis-ci.org/CoreFiling/quick-taxonomy-info.svg?branch=develop)
[![Apache 2 license](http://img.shields.io/badge/license-Apache2-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)

# CoreFiling Labs Bigfoot Search Sample

A simple demonstration of how the CoreFiling Platform can be used to search for
concepts in a taxonomy.  The results link through to CoreFiling's Bigfoot
Taxonomy Library.

It starts by requesting a list of taxonomies from the Bigfoot Search Service API,
then allows the user to choose an entry point and perform a search.

## Quick start

Sign-up for the True North Data Platform at <https://www.corefiling.com/platform/>.

Install node@>=6.0.0, npm@>=4.0.0 and yarn@>=1.0.0.

```bash
$ yarn install
$ yarn start
```

The application will be available on <http://localhost:8080/quick-taxonomy-info/>.

When prompted, log in using the email address and password for your CoreFiling account.

### Configuring authentication (not required)

To configure non-default OAuth 2 client credentials (supplied by CoreFiling)
export the following variables before starting the application with `yarn start`.

```bash
$ export CLIENT_ID="your-client-id"
$ export CLIENT_SECRET="your-client-secret"
```

## Development

See [Getting Started](#getting-started) for the dependencies.

### Stack

- [Typescript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Redux](http://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Storybook](https://storybook.js.org)
- [Webpack](https://github.com/webpack/webpack)

### Storybook

```bash
yarn storybook
```

and visit <http://localhost:6006/>.

### Unit tests

Single run:

```bash
yarn test
```

Watch files:

```bash
yarn test-debug
```

### Package

```bash
yarn pack # Produces cfl-quick-taxonomy-info-$VERSION.tgz
```

### Development server

The webpack development server is currently optimised for running in CoreFiling's
development environment and cannot easily be used externally.

## Licence

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this software except in compliance with the License.
You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
