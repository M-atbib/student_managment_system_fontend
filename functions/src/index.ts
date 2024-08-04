/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const functions = require("firebase-functions");
const express = require("express");
const { Nuxt } = require("nuxt");

const app = express();
const config = {
  dev: false,
  buildDir: "nuxt",
  build: {
    publicPath: "/assets/",
  },
};
const nuxt = new Nuxt(config);

app.use(nuxt.render);

exports.nuxtApp = functions.https.onRequest(app);
