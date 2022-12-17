const express = require("express");
const routes = require('../routes');
const cors = require('cors')

const {
  APP_URL='localhost',
  APP_PORT=9000,
} = process.env;

const main = async () => {
  try {
    const server = express();
    server.use(express.json({ extended: false }));
    server.use(cors());
    server.use('/', routes);

    server.listen(APP_PORT, (err) => {
      if (err) throw err;
      console.log(`EAS-server started at ${APP_URL}`);
    });
  } catch (err) {
    console.log('error in starting server', err);
    process.exit(1);
  }
};

main();
