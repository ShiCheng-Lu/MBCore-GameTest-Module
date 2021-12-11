# MBCore-GameTest-Module

A set of classes aimed to make some things easier with the Minecraft Bedrock GameTest Framework.

If you're just starting out with the GameTest Framework, there's a neat [Starter Pack](https://github.com/Bedrock-OSS/gametest-starter-project) available.

## Pre-requisites

- Minecraft Bedrock Edition
- npm - [NodeJS Install Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-nodejs-and-npm)
- typescript - [NPM Package](https://www.npmjs.com/package/typescript)
- Regolith - [Installation Guide](https://bedrock-oss.github.io/regolith/docs/installing)

## Installation

- Download latest release using `npm i mbcore-gametest`

## Example
Script:
```ts
import { EventEmitter } from 'mbcore-gametest';

const events = new EventEmitter();

events.on('example', (msg) => {
  console.log(msg);
})

events.emit('example', 'Hello');
// Output: Hello

events.emit('example', 'World');
// Output: World
```
Regolith Config:
```json
{
  "name": "example",
  "author": "example",
  "packs": {
    "behaviorPack": "./packs/BP",
    "resourcePack": "./packs/RP"
  },
  "regolith": {
    "profiles": {
      "dev": {
        "unsafe": false,
        "filters": [
          {
            "url": "github.com/ShiCheng-Lu/Regolith-Filters/module_importer"
          },
          {
            "url": "github.com/MajestikButter/Regolith-Filters/ts_transpiler",
            "settings": {
              "removeTS": true,
              "compilerOptions": {
                "module": "ES2020",
                "moduleResolution": "node",
                "allowSyntheticDefaultImports": true,
                "target": "ES2020",
                "noImplicitAny": true,
                "removeComments": true,
                "preserveConstEnums": true,
                "sourceMap": false
              }
            }
          }
        ],
        "export": {
          "target": "development"
        },
        "dataPath": "./packs/data"
      }
    }
  }
}```

## Docs

Docs generated by [Type Doc](https://typedoc.org/) can be found [here](https://majestikbutter.github.io/MBCore-GameTest-Module/)
