/**
 * Middleware
 */

const log = require("../configs/logger");
const multer = require('multer');
const fs = require('fs');
const utilites = require("../helpers/util/utilites");
const moment = require("moment");

const writeReq = async (req, res, next) => {
   const { path, method } = req;
   let ip = req.connection.remoteAddress;

   if (ip.substr(0, 7) == "::ffff:") ip = ip.substr(7);

   log.info(
      `NEW REQUEST: (${path}) | IP: ${ip} | METHOD: ${method}`,
      JSON.stringify(req.body)
   );

   next();
};

const verifyToken = async (req, res, next) => {
   const authHeader = req.headers["authorization"];
   
   if (authHeader && authHeader === `Basic ${process.env.AUTH_API_KEY}`) {
      next();
   } else {
      const response = {
         error: "Unauthorized",
      }
      return res.status(401).json(response);
   }
};

const upload = (pathname) => {
   const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       const dir = "public/uploads/" + pathname;
       if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true });
       }
       cb(null, dir);
     },
     filename: function (req, file, cb) {
       const mime = file.mimetype.split("/");
       let ekstension = mime[1];
       if (ekstension === "jpeg" || ekstension === "png") {
         ekstension = ekstension === "jpeg" ? "jpg" : "png";
       }
       const filename =
         utilites.makeid(18) + moment().format("DD-MM-YY") + "." + ekstension;
       cb(null, filename);
     },
     onFileUploadData: async function (file, data, req, res) {
       console.log(file, data);
     },
   });
 
   const upload = multer({ storage });
   return upload;
 };

module.exports = {
   writeReq,
   verifyToken,
   upload
};
/**
 * Middleware
 */
