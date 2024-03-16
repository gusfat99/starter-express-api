const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");
const { pdfCreate  } = require("./partials");
const vfsFonts = require("../settings/vfs_fonts");
const stylePDF = require("./styles");
// const { blobToUint8Array, dataURItoBlob } = require("../../../utility/Utils");
const { blobToUint8Array, dataURItoBlob }  = require("../../helpers/util/utilites");

// const util = require('../core/utilities');

const { PDFDocument } = require("pdf-lib");
class DraftPDF {
    constructor(data) {
        this.data = data;
    }

    async generate(type, pageTotal = () => { }) {
        pdfFonts.pdfMake.vfs = vfsFonts;
        return await new Promise(async (resolve, _reject) => {
            try {
                const pdfDoc = pdfMake.createPdf(await pdfCreate(this.data, type, pageTotal), null, stylePDF.fonts, pdfFonts.pdfMake.vfs);
                
                // pdfDoc.getBlob(async blob => {
                //     resolve(blob);
                // });
                pdfDoc.getBase64(async blob => {
                    
                    resolve(blob);
                })
            } catch (error) {
                _reject(error);
            }
        })
    }

    mergeLampiranFile(pdfFileBlob) {
        return new Promise(async (resolve, reject) => {
            const pdf = await PDFDocument.create();

            try {
                //collecting data blob would merging
                const docsBlob = [pdfFileBlob, dataURItoBlob(this.data.lampiran_b64)];

                for (const docBlob of docsBlob) {

                    const bufferFile = await blobToUint8Array(docBlob);
                    const doc = await PDFDocument.load(bufferFile, { ignoreEncryption: true })

                    const contentPage = await pdf.copyPages(doc, doc.getPageIndices());

                    for (const page of contentPage) {
                        pdf.addPage(page);
                    }
                }

                const pdfMerged = await pdf.saveAsBase64();

                const pdfMergedAsBlob = dataURItoBlob("data:application/pdf;base64," + pdfMerged);
                resolve(pdfMergedAsBlob);

            } catch (error) {
                console.log(error);
                reject(error);
            }

        });
    }

    forceDownload(file, fileName) {
        // * Force Download
        if (typeof window !== 'undefined') {
            const a = document.createElement("a");
            a.href = window.URL.createObjectURL(file);

            a.setAttribute("download", fileName);
            document.body.appendChild(a);
            a.click();
            a.parentNode.removeChild(a);
        }

    }

}

module.exports = DraftPDF;
