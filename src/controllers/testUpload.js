class TestUpload {
   process(req, res) {
      try {
         console.log(JSON.stringify(req.file));
         // console.log(JSON.stringify(req.body));
         res.sendStatus(200);
      } catch (error) {
         
      }
   }
}

module.exports = new TestUpload();