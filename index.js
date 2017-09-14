import mongoose from 'mongoose';
import util from 'util';
import "babel-polyfill";
import cron from 'node-cron';
import path from 'path';

// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';
import {saveArticles} from "./services/hacker-news-api.service";

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {server: {socketOptions: {keepAlive: 1}}}).then(
    () => {

        //TODO://Disable this code while pushing code to github
        /**saveArticles()
         .then(articles => {
            if (articles.length) {
              console.info(`${articles.length} Articles fetched from the HackerNews Api and saved to MongodDB`);
            }
          })
         .catch(err => {
            throw err
          })*/
    },
    err => {
        throw err;
    }
);
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
    // listen on port config.port
    app.listen(config.port, () => {
        console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
        cron.schedule('0 * * * *', function () {
            saveArticles()
                .then(articles => {
                    if (articles.length) {
                        console.info(`Articles Cron Task Run, ${articles.length} Articles fetched from the HackerNews Api and saved to MongodDB`);
                    }
                })
                .catch(err => {
                    throw err
                })
        });
    });
}


export default app;
