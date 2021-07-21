import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDomServer from 'react-dom/server';

import App from '../src/App';

const PORT = 8000;

// Create new expres app
const app = express();

app.use('/test/jobs', (req, res, next) => {

    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {

        // If error occures, return error message with 500 status.
        if (err)
            return res.status("500").send("There is some error!");

        // Initially returns html for a list of jobs to accomplish server side rendering.
        // It replaces root div with a list of jobs data.
        return res.send(data.replace('<div id="root"></div>', `<div id="root">${ReactDomServer.renderToString(<App />)}</div>`));
    });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
    console.log(`App is launched on ${PORT}`);
});