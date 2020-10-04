![Logo](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/logo.png)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is svg-to-ts?](#what-is-svg-to-ts)
- [Who is this for?](#who-is-this-for)
- [Why you should use svg-to-ts](#why-you-should-use-svg-to-ts)
- [How to use svg-to-ts](#how-to-use-svg-to-ts)
  - [Usage](#usage)
    - [Command line](#command-line)
    - [Configuration in package.json or .rc file](#configuration-in-packagejson-or-rc-file)
      - [Configure svg-to-ts over package.json](#configure-svg-to-ts-over-packagejson)
      - [Configure svg-to-ts over .rc file](#configure-svg-to-ts-over-rc-file)
  - [ConversionTypes](#conversiontypes)
    - [1. Converting to a single object (`conversionType==='object'`)](#1-converting-to-a-single-object-conversiontypeobject)
      - [Available options:](#available-options)
      - [Example usage](#example-usage)
      - [Sample output](#sample-output)
    - [2. Multiple constants - Treeshakable and typesafe with one file (`conversionType==='constants'`)](#2-multiple-constants---treeshakable-and-typesafe-with-one-file-conversiontypeconstants)
      - [Available options:](#available-options-1)
      - [Example usage](#example-usage-1)
      - [Sample ouput](#sample-ouput)
    - [3. Tree shakable and optimized for lazy loading (`conversionType==='files'`)](#3-tree-shakable-and-optimized-for-lazy-loading-conversiontypefiles)
      - [Available options:](#available-options-2)
      - [Example usage](#example-usage-2)
      - [Sample output](#sample-output-1)
- [FAQ](#faq)
  - [Which approach should I use](#which-approach-should-i-use)
  - [Is it possilbe to create a standalone library?](#is-it-possilbe-to-create-a-standalone-library)
- [Contributors ✨](#contributors-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# What is svg-to-ts?

`svg-to-ts` is a helper tool that converts your SVG icons to TypeScript. `svg-to-ts` can convert
SVGs to either one TypeScript file with exported constants, multiple TypeScript files or
compiled JavaScript files with according declaration files. Furthermore it generates all
typings in form of interfaces and types.

The generated output can then be used in combination with a iconregistry to create a tree shakable icon library.
[(More informations...)](#use-cases)

# Who is this for?

`svg-to-ts` is designed for autors of component libraries or icon libraries. Our examples and tutorials
are made with Angular, however `svg-to-ts` can also be used with other frameworks or vanilla TypeScript / JavaScript.

# Why you should use svg-to-ts

- `svg-to-ts` helps you provide icons in a tree shakable and performant way.
- You get free step to step guides in form of blog posts, that walk you through the process of creating your own tree shakable
  icon library
- `svg-to-ts` optimizes your SVG icons under the hood
- `svg-to-ts` automatically generates types and interfaces for your icons to improve typesafety
- `svg-to-ts` was developed based on the experiences of providin an icon library for a large enterprise.
- offers three different conversion modes ('object', 'constants' and 'files')
- each method is highly configurable to supports multiple use cases.

# How to use svg-to-ts

`svg-to-ts` is a command line tool, it can either be used directly in your terminal or
via npm script.

## Usage

### Command line

To execute `svg-to-ts` on the commmand line simply run `npx svg-to-ts --help` to see a list of available parameters.
Once you know which parameters to use, you can use npx to execute svg-to-ts and pass some parameters to it. For example, if
you want to convert all SVG file in your current folder to TypeScript constants. `npx svg-to-ts -s './*.svg'`.

### Configuration in package.json or .rc file

When you start using `svg-to-ts` in bigger projects, configuration may get more sophisticated. At this point command line
arguments are hard to read. Therefore `svg-to-ts` allows you to configure it either over package.json or over a `.svg-to-tsrc` file.

#### Configure svg-to-ts over package.json

To configure svg-to-ts over package.json you can simply add a `svg-to-ts` key in your package.json and use the config options.
Once you run `svg-to-ts` those configurations will be picked up.

```json
{
  "name": "my-icon-library",
  "version": "3.4.0",
  "scripts": {
    "generate-icons": "svg-to-ts"
  },
  "svg-to-ts": {
    "conversionType": "constants",
    "srcFiles": ["./projects/dinosaur-icons/icons/**/*.svg"],
    "outputDirectory": "./projects/dinosaur-icons/icons",
    "interfaceName": "DinosaurIcon",
    "typeName": "dinosaurIcon",
    "prefix": "dinosaurIcon",
    "svgoConfig": {
      "plugins": [
        {
          "cleanupAttrs": true
        }
      ]
    },
    "modelFileName": "dinosaur-icon.model",
    "additionalModelFile": "./projects/dinosaur-icons/src/lib",
    "compileSources": true
  }
}
```

#### Configure svg-to-ts over .rc file

To configure svg-to-ts over a .rc file you can add a `.svg-to-tsrc` file in the root of your project and use the config options.
The configuration can either be written in JSON or YAML.
Once you run `svg-to-ts` those configurations will be picked up.

```json
{
  "svg-to-ts": {
    "conversionType": "constants",
    "srcFiles": ["./projects/dinosaur-icons/icons/**/*.svg"],
    "outputDirectory": "./projects/dinosaur-icons/icons",
    "interfaceName": "DinosaurIcon",
    "typeName": "dinosaurIcon",
    "prefix": "dinosaurIcon",
    "modelFileName": "dinosaur-icon.model",
    "svgoConfig": {
      "plugins": [
        {
          "cleanupAttrs": true
        }
      ]
    },
    "additionalModelFile": "./projects/dinosaur-icons/src/lib",
    "compileSources": true
  }
}
```

If you decide to configure `svg-to-ts` by using a `.rc` file, it still makes sense to add the `generate-icons` script to your `package.json`

```json
{
  "name": "my-icon-library",
  "version": "3.4.0",
  "scripts": {
    "generate-icons": "svg-to-ts"
  }
}
```

## ConversionTypes

svg-to-ts offers three different kinds of conversion types; Converting your icons to a single object,
converting your icons to constants or converting your icons to single files. Each approach is designed
to solve a specific kind of problem. You can switch between approaches by passing `conversionType` property (`object`, `constants` or `files`).

### 1. Converting to a single object (`conversionType==='object'`)

In this scenario the SVG icons are converted to a single object. It's an approach that is suitable if your icon registry
accepts an object with the filename as key and the svg data as key.

#### Available options:

| --version       | type                    | default                                  | description                                                                  |
| --------------- | ----------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| fileName        | stirng                  | my-icons                                 | file name of the generated file                                              |
| delimiter       | CAMEL, KEBAB, SNAKE     | CAMEL                                    | delimiter which is used to generate the types and name properties            |
| svgoConfig      | string or config object | check help command - to large to display | a path to your svgoConfiguration JSON file or an inline configuration object |
| srcFiles        | string                  | "/\*.svg"                                | input files matching the given filename pattern                              |
| outputDirectory | string                  | "./dist"                                 | name of the output directory                                                 |
| objectName      | string                  | default - export                         | name of the exported const - if nothing is set - default export will be used |

#### Example usage

Let's say we have the following four svg files in a `inputfiles` folder.

- expressionless.svg
- full.svg
- laughing.svg
- smiling-face.svg

We can now run
`svg-to-ts.ts --conversionType object -s ./inputfiles -o ./dist`
and we end up with the following file in our `dist` folder.

#### Sample output

```javascript
export default {
  expressionLess: '<svg xmlns="http://ww...',
  full: '<svg xmlns="http://...',
  laughing: '<svg xmlns="http://ww...',
  smilingFace: '<svg xmlns="http://www....'
};
```

### 2. Multiple constants - Treeshakable and typesafe with one file (`conversionType==='constants'`)

This approach converts your svg icons into multiple constants in the same file so that they can be used
in combination with an icon registry. It furthermore also generates all necssary types. **We wrote a step to step guide that explains this approach further and helps you create an icon library with this approach.**
[Find out more in this blogpost](https://medium.com/angular-in-depth/how-to-create-an-icon-library-in-angular-4f8863d95a)

![Output scenario one](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/example-src1.png)
Only the icons included in the consuming SPA also end up in the final bundle of the SPA.

#### Available options:

| --version          | type                    | default                                  | description                                                                  |
| ------------------ | ----------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| typeName           | string                  | myIcons                                  | name of the generated type                                                   |
| generateType       | boolean                 | false                                    | prevent generating enumeration type                                          |
| generateTypeObject | boolean                 | false                                    | generate type object                                                         |
| prefix             | string                  | myIcon                                   | prefix for the generated svg constants                                       |
| interfaceName      | string                  | MyIcon                                   | name for the generated interface                                             |
| fileName           | stirng                  | my-icons                                 | file name of the generated file                                              |
| delimiter          | CAMEL, KEBAB, SNAKE     | SNAKE                                    | delimiter which is used to generate the types and name properties            |
| svgoConfig         | string or config object | check help command - to large to display | a path to your svgoConfiguration JSON file or an inline configuration object |
| srcFiles           | string                  | "/\*.svg"                                | input files matching the given filename pattern                              |
| outputDirectory    | string                  | "./dist"                                 | name of the output directory                                                 |

#### Example usage

Let's say we have the following four svg files in a `inputfiles` folder.

- expressionless.svg
- full.svg
- laughing.svg
- smiling-face.svg

We can now run
`svg-to-ts.ts --conversionType constants -s ./inputfiles -o ./dist`
and we end up with the following file in our `dist` folder.

#### Sample ouput

```javascript
export const myIconExpressionLess: MyIcon = {
  name: 'expression_less',
  data: `<svg xmlns="http://...`
};
export const myIconFull: MyIcon = {
  name: 'full',
  data: `<svg xmlns="http://www...`
};
export const myIconLaughing: MyIcon = {
  name: 'laughing',
  data: `<svg xmlns="http://www.w...`
};
export const myIconSmilingFace: MyIcon = {
  name: 'smiling_face',
  data: `<svg xmlns="http://www.w3...`
};
/* ⚠️ Do not edit this file - this file is generated by svg-to-ts*/

export type myIcons = 'expression_less' | 'full' | 'laughing' | 'smiling_face';
export interface MyIcon {
  name: myIcons;
  data: string;
}
```

### 3. Tree shakable and optimized for lazy loading (`conversionType==='files'`)

This is the most sophisticated approach and also the approach that doesn't only support tree shaking but also
supports code splitting which is especially usefull in scenarios where you are using lazy loading.

[Here's a step by step guide on how to create an icon library that is optimized for tree shaking](https://medium.com/angular-in-depth/how-to-create-a-fully-tree-shakable-icon-library-in-angular-c5488cf9cd76)

![fully tree shakable](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/fully-treeshakable.png)
Often, having the SVGs in a single file is enough. However if you are in a more complex environment with bigger business
applications, you may want to make the icons even more tree shakable.

In Angular, for example, having all icons in a single file shakes out the icons that are not used. However, icons always
end up together in a chunk. The `conversionOption = files` allows you to configure `svg-to-ts` that icons are
generated in a way that they can even be split to lazy loaded chunks. Means not only the amount of the icons in the chunk
gets reduced, but also, where they end up. Means, an icon that is only used in a lazy loaded Angular feature module, will only
end up there.

#### Available options:

| --version                 | type                    | default                                  | description                                                                                                                                                                     |
| ------------------------- | ----------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| barrelFileName            | string                  | index                                    | name of the generated type                                                                                                                                                      |
| typeName                  | string                  | myIcons                                  | name of the generated type                                                                                                                                                      |
| generateType              | boolean                 | false                                    | prevent generating enumeration type                                                                                                                                             |
| generateTypeObject        | boolean                 | false                                    | generate type object                                                                                                                                                            |
| exportCompleteIconSet     | boolean                 | false                                    | Specifies if the complete icon set should be exported or not (can be very handy for showcases)                                                                                  |
| prefix                    | string                  | myIcon                                   | prefix for the generated svg constants                                                                                                                                          |
| interfaceName             | string                  | MyIcon                                   | name for the generated interface                                                                                                                                                |
| fileName                  | stirng                  | my-icons                                 | file name of the generated file                                                                                                                                                 |
| delimiter                 | CAMEL, KEBAB, SNAKE     | SNAKE                                    | delimiter which is used to generate the types and name properties                                                                                                               |
| srcFiles                  | string                  | "/\*.svg"                                | input files matching the given filename pattern                                                                                                                                 |
| svgoConfig                | string or config object | check help command - to large to display | a path to your svgoConfiguration JSON file or an inline configuration object                                                                                                    |
| outputDirectory           | string                  | "./dist"                                 | name of the output directory                                                                                                                                                    |
| additionalModelOutputPath | string                  | null                                     | if a path is specified we will generate an additional file containing interface and type to this path - can be useful to improve type safety                                    |
| iconsFolderName           | string                  | "build"                                  | name of the folder we will build the TypeScript files to                                                                                                                        |
| compileSources            | boolean                 | false                                    | If set to false, we generate a TypeScript file for each SVG. If set to true we will allready compile those TypeScript files and generate JavaScript files and declaration files |

#### Example usage

Let's say we have the following four svg files in a `inputfiles` folder.

- expressionless.svg
- full.svg
- laughing.svg
- smiling-face.svg

We can now run
`svg-to-ts.ts --conversionType files -s ./inputfiles -o ./dist`
and we end up with the following file in our `dist` folder.

#### Sample output

![Output scenario two](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/generated-files-src2.png)

# FAQ

## Which approach should I use

This depends on your use case. If you have a simple application, it's probably enought to go with the single file or even a object.
If you build a framework that is used by multiple teams, then you should probably go with the fully tree shakable scenario (generating multiple files).

## Is it possilbe to create a standalone library?

Yes, it is. The current configurations also allow you to put your icon registry inside the component library and the icons in a dedicated npm package. This has the following
advantages:

- Icons can be used with different registries
- Simplified build process
- Icons can be released independent of the component library
- No need to let `svg-to-ts` compile the icons - just set the `compile` flag to false.

# Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://medium.com/@kevinkreuzer"><img src="https://avatars0.githubusercontent.com/u/5468954?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Kevin Kreuzer</b></sub></a><br /><a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=kreuzerk" title="Code">💻</a> <a href="#design-kreuzerk" title="Design">🎨</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=kreuzerk" title="Documentation">📖</a> <a href="#ideas-kreuzerk" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kreuzerk" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-kreuzerk" title="Maintenance">🚧</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=kreuzerk" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/shaharkazaz"><img src="https://avatars2.githubusercontent.com/u/17194830?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Shahar Kazaz</b></sub></a><br /><a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=shaharkazaz" title="Code">💻</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=shaharkazaz" title="Documentation">📖</a> <a href="#ideas-shaharkazaz" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-shaharkazaz" title="Maintenance">🚧</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=shaharkazaz" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/felipeplets"><img src="https://avatars3.githubusercontent.com/u/119980?s=400&u=92bcde3bbed2bf436317b301d1a9fca2445511cb&v=4?s=200" width="200px;" alt=""/><br /><sub><b>Felipe Plets</b></sub></a><br /><a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=felipeplets" title="Code">💻</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=felipeplets" title="Documentation">📖</a> <a href="#ideas-felipeplets" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-felipeplets" title="Maintenance">🚧</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=felipeplets" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/akehir"><img src="https://avatars2.githubusercontent.com/u/1078202?s=400&u=497e363bdad9525d99c8142900527d6334fd855c&v=4?s=200" width="200px;" alt=""/><br /><sub><b>Raphael Ochsenbein</b></sub></a><br /><a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=akehir" title="Code">💻</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=akehir" title="Documentation">📖</a> <a href="#ideas-akehir" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-akehir" title="Maintenance">🚧</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=akehir" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Palapapaa"><img src="https://avatars1.githubusercontent.com/u/2643459?s=400&v=4?s=200" width="200px;" alt=""/><br /><sub><b>Guillaume M</b></sub></a><br /><a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=Palapapaa" title="Code">💻</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=Palapapaa" title="Documentation">📖</a> <a href="#ideas-Palapapaa" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-Palapapaa" title="Maintenance">🚧</a> <a href="https://github.com/Kevin Kreuzer/svg-to-ts/commits?author=Palapapaa" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
