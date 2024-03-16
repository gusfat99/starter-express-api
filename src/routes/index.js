/**
 * Routers Index
 */
const { Router } = require("express");
const { verifyToken,upload } = require("../core/middleware");
const regenrateNoSuratController = require("../controllers/regenrateNoSuratController");
const testUpload = require("../controllers/testUpload");
const router = new Router();

router.get("/ping", (req, res) => {
   res.send("PONG");
 });

router.post("/regenerate-no-surat", verifyToken, regenrateNoSuratController.process);
router.post("/testUpload", upload('test').single('file'), testUpload.process);

module.exports = router;