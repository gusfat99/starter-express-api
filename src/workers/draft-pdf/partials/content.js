const { convertDate, intToRoman } = require("../../../helpers/util/utilites");
const {
  FooterContent,
  FooterContentPengantar,
  FooterContentKuasa,
} = require("./footer");
const {
  Keterangan,
  KopSuratV1,
  KopSuratV2,
  Laporan,
  Pengantar: KopPengantar,
  Pengumuman,
  TelaahStaff,
  Kuasa,
  BeritaAcara,
  PerintahTugas,
  NaskahKeputusan,
  Perbal,
} = require("./header");

const ContentInstruksi = (items) => {
  const countIsiSurat = items?.isi_surat?.length;

  const data = {
    ...items,
  };

  data.isi_surat[countIsiSurat - 1].text = data?.isi_surat[
    countIsiSurat - 1
  ].text.concat(
    " diinstruksikan kepada saudara dengan ketentuan sebagai berikut:"
  );

  return [
    KopSuratV1(data),
    ...data.isi_surat,
    {
      style: ["mt-5", "justify"],
      ol: (data?.isi_surat_instruksi || []).map((val) => ({
        text: val,
        style: ["justify"],
      })),
    },
    {
      style: ["justify", "mt-5"],
      text: `${data?.salam_penutup}`,
    },
    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentTugas = (data) => {
  return [
    KopSuratV1(data),
    ...data.isi_surat,
    {
      style: ["mt-5", "justify"],
      ol: (data?.isi_surat_instruksi || []).map((val) => ({
        text: val,
        style: ["justify"],
      })),
    },
    {
      style: ["mt-5", "justify"],
      text: `Tugas ini ${data?.tugas || ""}`,
    },
    {
      style: ["justify", "mt-5"],
      text: `${data?.salam_penutup}`,
    },
    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentEdaran = (data) => {

  return [
    KopSuratV2(data),
    {
      style: ["center", "fontSizeXl", "mb-5"],
      text: data?.title,
    },
    ...data.isi_surat,
    FooterContent(
      data,
      (data?.tembusan || []).length > 0 ? true : false,
      false
    ), //second param = show tembusan, third param = is show date
  ];
};

const ContentBiasa = (data) => {
  return [
    KopSuratV2(data),
    ...data.isi_surat,
    FooterContent(
      data,
      (data?.tembusan || []).length > 0 ? true : false,
      false
    ), //second param = show tembusan, third param = is show date
  ];
};

const buildTableSchedule = (data) => {
  const layout = {
    style: ["mt-5"],
    layout: {
      hLineWidth: (_i, _node) => 0,
      vLineWidth: (_i) => 0,
      paddingLeft: (_i) => 2,
      paddingTop: (_i) => 0,
    },
    marginLeft: 50,
    table: {
      widths: [65, 5, 190],
      body: [
        ["Hari", ":", convertDate(data?.jadwal.tanggal, "dddd")],
        [
          "Tanggal",
          ":",
          {
            text: convertDate(data?.jadwal.tanggal, "DD MMMM YYYY"),
          },
        ],
        [
          "Pukul",
          ":",
          {
            text: convertDate(data?.jadwal.tanggal, "HH:mm") + " WIB",
          },
        ],
        [
          "Tempat",
          ":",
          {
            text: data?.jadwal?.tempat ?? "-",
          },
        ],
        [
          "Acara",
          ":",
          {
            text: data?.jadwal?.acara ?? "-",
          },
        ],
      ],
    },
  };

  return layout;
};

const ContentUndangan = (data) => {
  return [
    KopSuratV2(data),
    ...data.isi_surat,
    {
      ...buildTableSchedule(data),
    },
    {
      style: ["justify", "mt-5"],
      text: `${data?.salam_penutup}`,
    },
    FooterContent(
      data,
      (data?.tembusan || []).length > 0 ? true : false,
      false
    ), //second param = show tembusan
  ];
};

const ContentNotaDinas = (data) => {
  return [
    KopSuratV1(data),
    ...data.isi_surat,
    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentRekomendasi = (data) => {
  return [
    KopSuratV2(data),
    {
      style: ["center", "fontSizeXl", "mb-5"],
      text: data?.title,
    },
    ...data.isi_surat,
    FooterContent(
      data,
      (data?.tembusan || []).length > 0 ? true : false,
      false
    ),
  ];
};

const ContentTelaahStaff = (data) => {
  return [
    TelaahStaff(data),
    {
      marginLeft: 1,
      style: ["mt-10", "mb-5"],
      layout: {
        hLineWidth: (_i, _node) => 0,
        vLineWidth: (_i) => 0,
        paddingLeft: (_i) => 1,
        paddingTop: (_i) => 0,
      },
      table: {
        widths: ["12%", "*"],
        body: [
          ...(data.paragraph || []).map((isi_surat, key) => [
            `${intToRoman(key + 1)}.`,
            {
              text: `${isi_surat.section}\n${isi_surat.isi}`,
              style: ["mb-5"],
            },
          ]),
        ],
      },
    },
    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentNaskahKeputusan = (data) => {
  return [
    NaskahKeputusan(data),
    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentPengumuman = (data) => {
  return [
    Pengumuman(data),
    {
      marginBottom: 20,
      style: ["center", "fontSizeL"],
      text: data?.judul,
    },
    ...data.isi_surat,
    // {
    //     style: ['justify', 'mt-5'],
    //     text: `${data?.salam_penutup}`
    // },
    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentLaporan = (data) => {
  return [
    Laporan(data),
    {
      marginLeft: 1,
      style: ["mt-5", "mb-5"],
      layout: {
        hLineWidth: (_i, _node) => 0,
        vLineWidth: (_i) => 0,
        paddingLeft: (_i) => 1,
        paddingTop: (_i) => 2,
      },
      table: {
        widths: ["12%", "*"],
        body: [
          ...(data.paragraph || []).map((isi_surat, key) => [
            `${intToRoman(key + 1)}.`,
            {
              text: `${isi_surat.section}\n${isi_surat.isi}`,
              style: ["mb-5"],
            },
          ]),
        ],
      },
    },

    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentKeterangan = (data) => {
  return [
    Keterangan(data),
    ...data.isi_surat,
    {
      style: ["mt-5"],
      text: "Keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.",
    },

    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentPengantar = (data) => {
  return [
    KopPengantar(data),
    {
      style: ["center", "fontSizeXl", "mb-5"],
      text: data?.title,
    },
    buildTabelPengantar(data),
    FooterContentPengantar(data),
  ];
};

const ContentKuasa = (data) => {
  return [
    Kuasa(data),
    {
      stack: [
        {
          text: `------------------------------------KHUSUS------------------------------------`,
          style: ["mt-10", "fontSizeL"],
        },
        ...data.isi_surat,
      ],
    },
    {
      unbreakable: true,
      ...FooterContentKuasa(data),
    },
  ];
};

const ContentBeritaAcara = (data) => {
  return [
    BeritaAcara(data),
    {
      marginBottom: 20,
      style: ["center", "fontSizeL"],
      text: data?.judul,
    },
    ...data.isi_surat,
    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const ContentPerintahTugas = (data) => {
  return [
    PerintahTugas(data),
    {
      marginBottom: 10,
      style: ["center", "fontSizeL"],
      text: data?.judul,
    },
    {
      style: ["justify"],
      text: data?.isi_surat,
    },
    {
      marginBottom: 20,
      style: ["center", "fontSizeL", "mt-10"],
      text: "MEMERINTAHKAN",
    },
    {
      marginLeft: 1,
      style: ["mt-5", "justify"],
      layout: {
        hLineWidth: (_i, _node) => 0,
        vLineWidth: (_i) => 0,
        paddingLeft: (_i) => 1,
        paddingTop: (_i) => 0,
      },
      table: {
        widths: [100, 5, 300],
        body: [
          [
            "Kepada",
            ":",
            {
              ol: (data?.kepada || []).map((val) => val),
            },
          ],
          [
            "Kepada",
            ":",
            {
              ol: (data?.kepada || []).map((val) => val),
            },
          ],
          [
            "Untuk",
            ":",
            `melaksanakan Pekerjaan : ${data?.melaksanakan_pekerjaan}`,
          ],
          ["", "", `Nama Pekerjaan : ${data?.nama_pekerjaan}`],
          ["", "", `Tahun Anggaran : ${data?.tahun_anggaran}`],
        ],
      },
    },
    {
      marginLeft: 1,
      style: ["mt-10", "justify"],
      layout: {
        hLineWidth: (_i, _node) => 0,
        vLineWidth: (_i) => 0,
        paddingLeft: (_i) => 1,
        paddingTop: (_i) => 2,
      },
      table: {
        widths: ["*"],
        body: [
          [`I. Syarat-syarat teknis \n ${data?.teknis}`],
          [`II. Syarat-syarat pembayaran: \n ${data?.pembayaran}`],
          [`III. Jangka waktu pelaksanaan \n ${data?.jangka_waktu}`],
          [`IV. Pengendalian Pelaksanaan Pekerjaan \n ${data?.pengendalian}`],
          [`V. ${data?.isi_teks}`],
        ],
      },
    },
    {
      style: ["justify", "mt-5"],
      text: `${data?.salam_penutup}`,
    },
    FooterContent(data, (data?.tembusan || []).length > 0 ? true : false),
  ];
};

const buildTabelPengantar = (data) => {
  const layout = {
    // width: "55%",
    layout: {
      hLineWidth: (i, node) => {
        if (i > 1 && i !== node.table.body.length) {
          return 0;
        }
        if (i === node.table.body.length) {
          return 0.5;
        }
        return 0.5;
      },
      vLineWidth: (_i) => 0.5,
      paddingLeft: (_i) => 2,
      paddingTop: (_i) => 0,
    },
    table: {
      widths: ["8%", "30%", "30%", "32%"],
      body: [
        [
          "No.",
          {
            text: "Jenis Yang Dikirim",
            style: ["center"],
          },
          {
            text: "Banyaknya",
            style: ["center"],
          },
          {
            text: "Keterangan",
            style: ["center"],
          },
        ],
      ],
    },
  };

  (data.pengantar || []).forEach((item, index) => {
    layout.table.body.push([
      index + 1,
      {
        text: item.jenis_yg_dikirim,
      },
      {
        text: item.banyaknya,
      },
      {
        text: item.keterangan,
      },
    ]);
  });

  return layout;
};



const ContentPerbal = (data) => {
  return [Perbal(data)];
};

module.exports = {
  ContentInstruksi,
  ContentPerbal,
  ContentNaskahKeputusan,
  ContentPerintahTugas,
  ContentBeritaAcara,
  ContentKuasa,
  ContentPengantar,
  ContentLaporan,
  ContentTugas,
  ContentEdaran,
  ContentBiasa,
  ContentUndangan,
  ContentNotaDinas,
  ContentRekomendasi,
  ContentTelaahStaff,
  ContentPengumuman,
  ContentKeterangan,
};
