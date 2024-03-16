
const styles = require("../settings/styles");

const stylePDF = {
    defaultStyle: {
        color: 'black',
        fontSize: 12,
        columnGap: 20,
        font: 'BookmanOld'
    },
    pageMargins: [90, 55, 71, 86],
    pageSize: 'A4',
    styles: {
        ...styles,
        bgColorHeaderTable: {
            fillColor: "#dedede"
        },
        fillBlack: {
            fillColor: "#000"
        }
    },
    hr: (y = 1, mt = 10) => ({
        marginTop: mt,
        marginBottom: 10,
        canvas: [{ type: 'line', x1: 0, y1: y, x2: 450, y2: y, lineWidth: 1 }]
    }),
    fonts: {
        BookmanOld: {
            normal: 'bookman-old-regular.ttf',
            bold: 'bookman-old-bold.ttf',
            italics: 'bookman-old-regular-italic.ttf',
            bolditalics: 'bookman-old-bold-italic.ttf',
        }
    }
}

module.exports = stylePDF;