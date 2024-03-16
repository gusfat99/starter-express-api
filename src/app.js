/**
 * Initial Application Server
 */

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const parser = require("body-parser");
const app = express();
const mdl = require("./core/middleware");
const port = process.env.PORT || 8010;
const router = require("./routes");
const log = require("./configs/logger");

function App() {
   app.listen(port, async () => {
      const corsOption = {
         AccessControlAllowOrigin: '*',
         origin: '*',
         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
      }
      app.use(cors(corsOption));

      app.use(mdl.writeReq);
      app.disable("x-powered-by");

      app.use(parser.json());
      app.use(
         parser.urlencoded({
            extended: true,
         })
      );

      app.use("/api-generator/v1", router);
      app.use("/ping", (res) => res.res.send("PONG"));

      global.APP_PATH = __dirname;

      log.debug(`Server is running on port: ${port}`);
      console.log(`Server is running on port: ${port}`)
   });
}

module.exports = App;

