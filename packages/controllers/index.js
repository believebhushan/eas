const axios = require('axios');
const express = require('express');
const app = express.Router();
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../apis');

fs.readdir(directoryPath, function (err, files) {

    if (err) {
        return console.log('Unable to scan directory: ', err);
    }

    files.forEach(function (file) {
        const routeName = file.split('.js');
        const fileName = require(`../apis/${file}`);
        const method = file.split('_')[0];

        const handleApi = async (req, res) => {
            try {
                const params = {
                    request_api_path: routeName[0],
                };

                // const headers = {
                //     'authorization': req.headers.authorization || '',
                //     'authorizationscope': req.headers.authorizationscope || '',
                //     'authorizationparameters': req.headers.authorizationparameters || '',
                //     'Accept-Encoding': 'application/json',
                // }

                // const url = `${process.env.AUTHORIZATION_API_URL}/verify_request`;

                // const data = await axios.get(url, { params, headers }).then(response => {
                //     return response.data;
                // });
                const isAuthorized=true

                if (isAuthorized) {
                    const request = { ...req.query, ...req.body, }
                    return res.json(await fileName(request, res));
                } else {
                    return res.status(data.status_code).json(data);
                }

            
            }
            catch (err) {
               console.log(err,"errerr")
                return res.status(err.statusCode || err.response?.status || 500).json({
                    message: err.message
                });
            }
        };

        if ([ 'update', 'delete','create'].includes(method)) {
            app.post(`/${routeName[0]}`, async (req, res) => {
                handleApi(req, res);
            });
        }
        else {
            app.get(`/${routeName[0]}`, async (req, res) => {
                handleApi(req, res);
            });
        }
    })
});



module.exports = app;