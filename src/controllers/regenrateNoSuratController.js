const Stream = require("stream");
const DraftPDF = require("../workers/draft-pdf");

class RegenerateNoSuratController {
   async process(req, res) {
      try {
         if (!req.body?.data_template) {
            response = {
               error: "Data templates kosong",
            }
            res.status(406).json(response);
            return;
         }

         let draftName = "";

         const jenisDraftSurat = req.body?.data_template?.jenis_draft_surat || "";
         const dataTemplate = req.body?.data_template;
         // console.log( req.body);
         dataTemplate.no_surat = req.body.no_surat;

         const typeDraftArr = jenisDraftSurat?.split("_");
         typeDraftArr[0] = "draft";
         draftName = typeDraftArr.join("_");

         const pdf = new DraftPDF(dataTemplate);
         const pdfFileBlob = await pdf.generate(jenisDraftSurat);
         var fileContents = Buffer.from(pdfFileBlob, "base64");

         var readStream = new Stream.PassThrough();
         readStream.end(fileContents);

         // res.setHeader('Content-Type', 'text/xml');
         res.setHeader("Content-disposition", "attachment; filename=" + `${draftName}.pdf`);
         res.setHeader("Content-Type", "application/pdf");

         readStream.pipe(res);
      } catch (error) {
         res.status(500).json({
            code: 500,
            error: error.message
         })
      }
   }
}

module.exports = new RegenerateNoSuratController();