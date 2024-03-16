const htmlToPdfmake = require('html-to-pdfmake');
const {
    DRAFT_BERITA_ACARA,
    DRAFT_BIASA, DRAFT_EDARAN,
    DRAFT_LAPORAN,
    DRAFT_NASKAH_KEPUTUSAN,
    DRAFT_NOTA_DINAS,
    DRAFT_PENGUMUMAN,
    DRAFT_PERBAL,
    DRAFT_PERINTAH_TUGAS,
    DRAFT_REKOMENDASI,
    DRAFT_SURAT_KETERANGAN,
    DRAFT_SURAT_KUASA,
    DRAFT_SURAT_PENGANTAR,
    DRAFT_SUSUNAN_INSTRUKSI,
    DRAFT_TELAAH_STAFF,
    DRAFT_TUGAS, DRAFT_UNDANGAN
} = require("../../../shared/constants/draft_constant");
const stylePDF = require("../styles");
const {
    ContentBeritaAcara,
    ContentBiasa,
    ContentEdaran,
    ContentInstruksi,
    ContentKeterangan,
    ContentKuasa,
    ContentLaporan,
    ContentNaskahKeputusan,
    ContentNotaDinas,
    ContentPengantar,
    ContentPengumuman,
    ContentPerbal,
    ContentPerintahTugas,
    ContentRekomendasi,
    ContentTelaahStaff,
    ContentTugas,
    ContentUndangan
} = require("./content");
const coverlatter = require('../../settings/coverlatter');
const jsdom = require("jsdom");

const DinamicalContent = (data, type) => {

    let content = () => { };
    switch (type) {
        case DRAFT_SUSUNAN_INSTRUKSI:
            content = ContentInstruksi;
            break;
        case DRAFT_TUGAS:
            content = ContentTugas;
            break;
        case DRAFT_EDARAN:
            content = ContentEdaran; //konten mirip dgn BIASA
            break;
        case DRAFT_BIASA:
            content = ContentBiasa; //konten mirip dgn edaran
            break;
        case DRAFT_UNDANGAN:
            content = ContentUndangan;
            break;
        case DRAFT_NOTA_DINAS:
            content = ContentNotaDinas;
            break;
        // case DRAFT_SERTIJAB:
        //     content = ContentSertijab;
        //     break;
        case DRAFT_REKOMENDASI:
            content = ContentRekomendasi;
            break;
        case DRAFT_TELAAH_STAFF:
            content = ContentTelaahStaff;
            break;
        case DRAFT_PENGUMUMAN:
            content = ContentPengumuman;
            break;
        case DRAFT_LAPORAN:
            content = ContentLaporan;
            break;
        case DRAFT_SURAT_KETERANGAN:
            content = ContentKeterangan;
            break;
        case DRAFT_SURAT_PENGANTAR:
            content = ContentPengantar;
            break;
        case DRAFT_SURAT_KUASA:
            content = ContentKuasa;
            break;
        case DRAFT_BERITA_ACARA:
            content = ContentBeritaAcara;
            break;
        case DRAFT_PERBAL:
            content = ContentPerbal;
            break;
        case DRAFT_NASKAH_KEPUTUSAN:
            content = ContentNaskahKeputusan;
            break;
        case DRAFT_PERINTAH_TUGAS:
            content = ContentPerintahTugas;
            break;
        default:
            content = ContentBiasa;
    }

    return content(data);
}

const pdfCreate = async (data, type, pageTotal) => {
    const { pageMargins, pageSize, styles, defaultStyle } = stylePDF;
   
    var { JSDOM } = jsdom;
    var { window } = new JSDOM("");
    const isi = htmlToPdfmake(data?.isi_surat || "", { window: window, tableAutoSize: true });

    let title = "";
    switch (type) {
        case DRAFT_SUSUNAN_INSTRUKSI:
            title = "INSTRUKSI";
            break;
        case DRAFT_TUGAS:
            title = "SURAT TUGAS";
            break;
        case DRAFT_EDARAN:
            title = "SURAT EDARAN";
            break;
        case DRAFT_NOTA_DINAS:
            title = "NOTA DINAS";
            break;
        case DRAFT_REKOMENDASI:
            title = "REKOMENDASI";
            break;
        case DRAFT_TELAAH_STAFF:
            title = "TELAAH STAF";
            break;
        case DRAFT_LAPORAN:
            title = "LAPORAN";
            break;
        case DRAFT_BERITA_ACARA:
            title = "BERITA ACARA";
            break;
        case DRAFT_PENGUMUMAN:
            title = "PENGUMUMAN";
            break;
        case DRAFT_PERBAL:
            title = "PERBAL";
            break;
        case DRAFT_SURAT_KETERANGAN:
            title = "SURAT KETERANGAN";
            break;
        case DRAFT_SURAT_KUASA:
            title = "SURAT KUASA";
            break;
        case DRAFT_SURAT_PENGANTAR:
            title = "SURAT PENGANTAR";
            break;
        case DRAFT_PERINTAH_TUGAS:
            title = "SURAT PERINTAH TUGAS";
            break;
    }

    data.title = title;

    const items = { ...data };

    items.isi_surat = Array.isArray(isi) ? isi.filter(item => item.nodeName && item.text !== " ").map(item => {
        // clean margin
        delete item['margin'];
        if (item.nodeName === "UL") {
            item.marginBottom = 1;
            item.marginTop = 1;
        }
        return item;
    }) : [isi];



    return {
        content: [
            ...DinamicalContent(items, type)
        ],
        header: function (_currentPage, pageCount, _pageSize) {
            pageTotal(pageCount);
        },
        background: function (currentPage) {
            //coverlatter only page 1
            if (currentPage === 1) {
                return [
                    {

                        image: "data:image/png;base64," + coverlatter.cover_latter,
                        width: 596
                    }
                ]
            }
            return ""
        },
        defaultStyle,
        pageMargins,
        pageSize,
        styles,
    };
}

module.exports = {
    pdfCreate
}


