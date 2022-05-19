# Image-Processing-API

## Overview
A simple placeholder API that allows you to place images into frontend with the size set via URL parameters.

## Table of Contents
* [Project Description](#Description)
* [How To Use](#Usage)
* [Caching](#Caching)
* [Project Dependencies](#Dependencies)
* [Development Dependencies](#Development)
* [Scalability](#Scalability)
* [Future](#Future)

---

## Description
This project -from **udacity**'s *Advanced Full-Stack Web Development ND*- gives a real-world scenario in which you would  
read and write to a disk via a *Node.js express* server rather than a database.  

The project serves two purposes:  
* to prepare for setting up scalable code and architecture for real-world projects.
* tie together some of the most popular middleware and utilities found in Node.js projects.

## Usage
This project consists of three main folders:  
* `./original_images` which has images that can be served by our API
* `./src/routes` which contains our routes
* `./src/tests` which contains our testing files

Project important files:
* `./src/index.ts` is the server
* `./src/routes/api/images.ts` is the provided endpoint to process images
* `./src/tests/indexSpec.ts` contains unit-tests for endpoint and utilities

Testing and Running CLI scripts:
* Navigate to main project folder `Image Processing API`
* `npm run test` to compile *TypeScript* files and executing unit-tests
* Now you have `./build` directory
* To start the server you have two options:
    * `npm run start`  
    or
    * `node build/`
* Now open a client (i.e., a browser) and visit `http://localhost:3000/api/images`

When you open the given endpoint URL, you'll get instructions on how to fetch a resized image.

You need to specify three query parameters in order to get a resized image:
* filename: which is the image name without the image format/extension
* width: which is the width of the resized image, must be between 25 and 1600
* height: which is the height of the resized image, must be between 25 and 1600

For example:  
visit `http://localhost:3000/api/images?filename=fjord&width=1600&height=900` to get *fjord.jpg* image resized to 1600x900  

If you don't know which filename to use, you can enter any invalid filename and the server will respond with  
a message containing all available images/filenames on the disk.

## Caching
All processed/resized images are kept in `./resized_images` directory.  
When the user tries to fetch some image with a width and a height that has been already processed,  
the server sends the cached image instead of reprocessing the same image over and over.

## Dependencies  

* [express](https://www.npmjs.com/package/express): ^4.18.1
* [sharp](https://www.npmjs.com/package/sharp): ^0.30.4

Dependencies scripts:
* `npm i express`
* `npm i sharp`


## Development
Development Dependencies:
* [node](https://www.npmjs.com/package/node): ^17.7.2
* [eslint](https://www.npmjs.com/package/eslint): ^8.15.0
* [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier): ^8.5.0
* [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier): ^4.0.0
* [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): ^5.24.0
* [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser): ^5.24.0
* [nodemon](https://www.npmjs.com/package/nodemon): ^2.0.16
* [prettier](https://www.npmjs.com/package/prettier): ^2.6.2
* [typescript](https://www.npmjs.com/package/typescript): ^4.6.4
* [@types/express](https://www.npmjs.com/package/@types/express): ^4.17.13
* [jasmine](https://www.npmjs.com/package/jasmine): ^4.1.0
* [jasmine-spec-reporter](https://www.npmjs.com/package/jasmine-spec-reporter): ^7.0.0
* [@types/jasmine](https://www.npmjs.com/package/@types/jasmine): ^4.0.3
* [@types/sharp](https://www.npmjs.com/package/@types/sharp): ^0.30.2

Development Dependencies scripts:
* `npm i --save-dev node`
* `npm i --save-dev eslint`
* `npm i --save-dev eslint-config-prettier`
* `npm i --save-dev eslint-plugin-prettier`
* `npm i --save-dev @typescript-eslint/eslint-plugin`
* `npm i --save-dev @typescript-eslint/parser`
* `npm i --save-dev nodemon`
* `npm i --save-dev prettier`
* `npm i --save-dev typescript`
* `npm i --save-dev @types/express`
* `npm i --save-dev jasmine`
* `npm i --save-dev jasmine-spec-reporter`
* `npm i --save-dev @types/jasmine`
* `npm i --save-dev @types/sharp`

## Scalability
* Project structure promotes scalability:
    * Source code (`src`) is kept separate from compiled code (`build`)
    * All tests are contained in their own folder (`src/tests`)
* `original_images` folder on disk is scalable, you can try to add any other image that has the format `.jpg` and it will be served correctly.  

## Future
In the future updates, we can:
* Support other image formats than `.jpg`
* Add in logging to record when images are processed or accessed
* Create a front-end for uploading more images to the `original_images` directory
* Create a front-end that allows for the selection of how to process a selected image