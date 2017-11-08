CoreFiling Development
======================

We wanted to avoid committing keys or certs into Git, so to use the dev server that
fakes up the gateway & authentication, you will need to copy the `.dev` directory
from the Beacon UI project.

Registry
--------

You need to make `yarn` use the public registry, not our proxy:

    echo >> .npmrc registry = "https://registry.npmjs.org/"


Configuring the API proxy
-------------------------

```
$ npm config set @cfl/quick-taxonomy-info:api-proxy 'https://labs-api.cfl.io/'
```

Updating SSL certificates
-------------------------

These are in `.dev`. When these expire, they will need to be replaced by the [latest ones](https://wiki.int.corefiling.com/cfl/CflDotIo).
