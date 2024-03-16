const  { convertDate } = require("../../../helpers/util/utilites");

const KopSuratV1 = (data) => {
  let penerimaValue = {
    ol: (data?.penerima || []).map(
      (val) => val.penerima_jabatan || val.penerima_lainnya
    ),
  };

  if ((data?.penerima || []).length === 1) {
    penerimaValue = {
      text:
        data?.penerima[0].penerima_jabatan ||
        data?.penerima[0].penerima_lainnya,
    };
  }

  return {
    marginTop: 60,
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center"],
      },
      {
        text: `Nomor : ${data?.no_surat}`,
        style: ["center"],
      },
      {
        style: ["mt-15"],
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        marginLeft: 75,
        table: {
          widths: [65, 5, 190],
          body: [
            ["Dari", ":", data?.nama_pengirim || "-"],
            [
              "Kepada",
              ":",
              {
                ...penerimaValue,
              },
            ],
            [
              "Hal",
              ":",
              {
                text: data?.perihal || "-",
              },
            ],
          ],
        },
      },
    ],
    marginBottom: 15,
  };
};

const KopSuratV2 = (data) => {
  const penerimaSection = () => {
    const stack = [];
    if ((data?.penerima || []).length > 1) {
      stack.push("Kepada Yth.");
      stack.push({
        ol: data.penerima.map(
          (val) => val.penerima_jabatan || val.penerima_lainnya
        ),
      });
    } else if ((data?.penerima || []).length === 1) {
      stack.push({
        width: "50%",
        text: `Kepada\n Yth. ${
          data.penerima[0].penerima_jabatan || data.penerima[0].penerima_lainnya
        }`,
      });
    }

    stack.push(data?.kota_tujuan || "");

    return stack;
  };

  return {
    marginTop: 60,
    stack: [
      {
        // width: "55%",
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        table: {
          widths: ["78%", "22%"],
          body: [
            [
              {
                layout: {
                  hLineWidth: (_i, _node) => 0,
                  vLineWidth: (_i) => 0,
                  paddingLeft: (_i) => 0,
                  paddingTop: (_i) => 0,
                },
                table: {
                  widths: [65, 5, "*"],
                  body: [
                    ["Nomor", ":", data?.no_surat ?? ""],
                    ["Sifat", ":", data?.sifat_surat ?? ""],
                    ["Lampiran", ":", data?.lampiran ?? ""],
                    [
                      "Hal",
                      ":",
                      {
                        text: data?.perihal ?? "",
                      },
                    ],
                  ],
                },
              },
              {
                text: convertDate(data?.tgl_surat, "DD MMMM YYYY"),
              },
            ],
          ],
        },
      },
      {
        style: ["mt-20", "mb-20"],
        stack: penerimaSection(),
      },
    ],
  };
};

const TelaahStaff = (data) => {
  let penerimaValue = {
    ol: (data?.penerima || []).map(
      (val) => val.penerima_jabatan || val.penerima_lainnya
    ),
  };

  if ((data?.penerima || []).length === 1) {
    penerimaValue = {
      text:
        data?.penerima[0].penerima_jabatan ||
        data?.penerima[0].penerima_lainnya,
    };
  }

  return {
    // marginTop: 75,
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center"],
      },
      {
        style: ["mt-15"],
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        marginLeft: 75,
        table: {
          widths: [65, 5, 190],
          body: [
            [
              "Kepada",
              ":",
              {
                ...penerimaValue,
              },
            ],
            ["Dari", ":", data?.nama_pengirim || "-"],
            ["Nomor", ":", data?.no_surat || "-"],
            [
              "Hal",
              ":",
              {
                text: data?.perihal || "-",
              },
            ],
          ],
        },
      },
    ],
    marginBottom: 10,
  };
};

const Perbal = (data) => {
  let penerimaValue = {
    ol: (data?.penerima || []).map((val) => val),
  };

  if ((data?.penerima || []).length === 1) {
    penerimaValue = {
      text: data?.penerima[0],
    };
  }

  return {
    // marginTop: 75,
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center"],
      },
      {
        style: ["mt-10"],
        layout: {
          hLineWidth: (_i, _node) => 1,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        table: {
          widths: [230, 200],
          body: [
            [
              "1. Dikerjakan oleh : Manaj Pengonsep \n 2. Diperiksa oleh : SM Pengonsep \n 3. Diedarkan Oleg : Sekr. Divisi Pengonsep \n Net disetujui CTU pengonsep : SM Pengonsep ",
              "1. Diterima oleh : Pengendali \n 2. Dinomori oleh : Pengendali \n 3. Diketik oleh : Pengendali \n 4. Ditaklik oleh : Manajer HTU \n 5. Diterima di Pengiriman Surat : \n 6. Dikirim Oleh : Caraka \n 7. Perbal dan pertinggal disimpan oleh : Penata",
            ],
          ],
        },
      },
      {
        text:
          "DIMAJUKAN PADA TANGGAL " +
          convertDate(data?.tgl_surat, "DD MMMM YYYY"),
        style: ["fontSizeL", "center"],
      },
      {
        style: ["mt-15"],
        layout: {
          hLineWidth: (_i, _node) => 1,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        table: {
          widths: ["*"],
          body: [[`Perihal / Judul Naskah Dinas: \n ${data?.perihal}`]],
        },
      },
      {
        style: ["mt-8"],
        layout: {
            hLineWidth: (_i, _node) => 1,
            vLineWidth: (_i) => 1,
            paddingLeft: (_i) => 2,
            paddingTop: (_i) => 0,

        },
        table: {
          widths: ["*", "*"],
          body: [
            [
              `Nomor : ${data?.no_surat}\n 
                           Sifat: ${data?.sifat_surat} \n 
                           Lampiran : ${data?.lampiran}  \n
                           Pemaraf Serta: \n 
                           1. Pengonsep \n 
                           2. Terkait \n 
                           3. dst \n 
                           4. Senior Manajer Adm. Umum \n 
                           5. Direktur Teknik \n 
                           6. Direktur Umum \n
                           DITETAPKAN OLEH :
                           PERUSAHAAN DAERAH AIR MINUM PROVINSI DKI JAKARTA \n
                           DIREKTUR UTAMA\n\n
                           ${data?.pengesahan_nama} \n
                           `,
              `  
                           ${convertDate(data?.tgl_surat, "DD MMMM YYYY")} \n 
                           Jenis Naskah Dinas/ Alamat yang dituju \n 
                           TEMBUSAN : \n ${data?.tembusan}`,
            ],
          ],
        },
      },
    ],
  };
};

const NaskahKeputusan = (data) => {
  let penerimaValue = {
    ol: (data?.penerima || []).map((val) => val),
  };

  if ((data?.penerima || []).length === 1) {
    penerimaValue = {
      text: data?.penerima[0],
    };
  }

  return {
    // marginTop: 75,
    stack: [
      {
        text: "KEPUTUSAN DIREKSI PERUSAHAAN DAERAH AIR MINUM PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA",
        style: ["fontSizeL", "center"],
      },
      {
        text: `NOMOR : ${data?.no_surat} TAHUN 2009`,
        style: ["center", "mt-20"],
      },
      {
        text: `TENTANG`,
        style: ["center", "mt-20"],
      },
      {
        style: ["justify", "mt-20", "center"],
        text: data?.tentang,
      },
      {
        style: ["fontSizeL", "mt-20", "center"],
        text: "DIREKSI PERUSAHAAN DAERAH AIR MINUM PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA,",
      },
      {
        marginLeft: 1,
        style: ["mt-20", "justify"],
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 1,
          paddingTop: (_i) => 0,
        },
        table: {
          widths: [100, 5, 300],
          body: [
            ["Menimbang", ":", data?.menimbang || "-"],
            ["Mengingat", ":", data?.mengingat || "-"],
            ["Menetapkan", ":", data?.menetapkan || "-"],
          ],
        },
      },
      {
        text: `BAB I \n\n KETENTUAN UMUM \n\n Pasal 1`,
        style: ["center", "mt-20"],
      },
      {
        text: `Dalam Keputusan ini, yang dimaksud dengan: \n\n ${data?.pasal}`,
        style: ["mt-10"],
      },
    ],
    marginBottom: 15,
  };
};

const Laporan = (data) => {
  return {
    // marginTop: 75,
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center"],
      },
      {
        text: `Nomor : ${data?.no_surat}`,
        style: ["center", "mt-2"],
      },
      {
        marginTop: 30,
        marginBottom: 20,
        style: ["center", "fontSizeL"],
        text: data?.perihal,
      },
    ],
    marginBottom: 10,
  };
};

const Pengumuman = (data) => {
  let penerimaValue = {
    ol: (data?.penerima || []).map((val) => val),
  };

  if ((data?.penerima || []).length === 1) {
    penerimaValue = {
      text: data?.penerima[0],
    };
  }

  return {
    // marginTop: 71,
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center"],
      },
      {
        text: `Nomor : ${data?.no_surat}`,
        style: ["center"],
      },
    ],
    marginBottom: 20,
  };
};

const PerintahTugas = (data) => {


  if ((data?.penerima || []).length === 1) {
    penerimaValue = {
      text: data?.penerima[0],
    };
  }

  return {
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center"],
      },
      {
        text: `Nomor : ${data?.no_surat}`,
        style: ["center"],
      },
    ],
    marginBottom: 20,
  };
};

const BeritaAcara = (data) => {
  let penerimaValue = {
    ol: (data?.penerima || []).map((val) => val),
  };

  if ((data?.penerima || []).length === 1) {
    penerimaValue = {
      text: data?.penerima[0],
    };
  }

  return {
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center"],
      },
    ],
    marginBottom: 20,
  };
};

const Keterangan = (data) => {
  return {
    // marginTop: 75,
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center"],
      },
      {
        text: `Nomor : ${data?.no_surat}`,
        style: ["center"],
      },
      {
        text: `Yang bertandatangan dibawah ini:`,
        style: ["mt-20", "fontSizeL"],
      },
      {
        style: ["mt-15"],
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        marginLeft: 30,
        table: {
          widths: [90, 5, "*"],
          body: [
            ["a. Nama", ":", data?.nama_pengirim || "-"],
            ["b. Jabatan", ":", data?.jabatan],
          ],
        },
      },
      {
        text: `dengan ini menerangkan bahwa:`,
        style: ["mt-20", "fontSizeL"],
      },
      {
        style: ["mt-15"],
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        marginLeft: 30,
        table: {
          widths: [90, 5, "*"],
          body: [
            ["a. Nama", ":", data?.nama_penerima || "-"],
            ["b. NPP", ":", data?.penerima_npp],
            ["c. Pangkat/Gol ", ":", data?.penerima_pangkat],
            ["d. Jabatan ", ":", data?.penerima_jabatan],
          ],
        },
      },
    ],
    marginBottom: 15,
  };
};

const Kuasa = (data) => {
  let penerimaValue = {
    ol: (data?.penerima || []).map((val) => val),
  };

  if ((data?.penerima || []).length === 1) {
    penerimaValue = {
      text: data?.penerima[0],
    };
  }

  return {
    // marginTop: 75,
    stack: [
      {
        text: data?.title || "",
        style: ["fontSizeXl", "center", "bold", "underline"],
      },
      {
        text: `Saya yang bertandatangan dibawah ini:`,
        style: ["mt-20", "fontSizeL"],
      },
      {
        style: ["mt-15"],
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        marginLeft: 15,
        table: {
          widths: [120, 5, "*"],
          body: [
            ["Nama", ":", data?.pengesahan_nama || "-"],
            ["Tempat/Tgl Lahir", ":", data?.ttl_pengirim || "-"],
            ["Pekerjaan/Jabatan", ":", data?.jabatan1 || "-"],
            ["Alamat", ":", data?.alamat_pengirim || "-"],
            ["KTP./SIM. No.", ":", data?.no_identitas_pengirim || "-"],
          ],
        },
      },
      {
        text: "Dengan ini bertindak selaku Jabatan Direktur Utama, dari dan oleh karena itu untuk dan atas nama PERUSAHAAN UMUM DAERAH AIR MINUM JAYA, untuk selanjutnya disebut Pemberi Kuasa.",
        style: ["fontSizeL", "mt-20"],
      },
      {
        style: ["mt-15"],
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        marginLeft: 15,
        table: {
          widths: [120, 5, "*"],
          body: [
            ["Nama", ":", data?.pengesahan_nama_penerima || "-"],
            ["Tempat/Tgl Lahir", ":", data?.ttl_penerima || "-"],
            ["Pekerjaan/Jabatan", ":", data?.jabatan || "-"],
            ["Alamat", ":", data?.alamat_penerima || "-"],
            ["KTP./SIM. No.", ":", data?.no_identitas_penerima || "-"],
          ],
        },
      },
      {
        text: `Untuk selanjutnya di sebut Penerima Kuasa`,
        style: ["mt-10", "fontSizeL"],
      },
    ],
    marginBottom: 15,
  };
};

const Pengantar = (data) => {
  const penerimaSection = () => {
    const stack = [];
    stack.push({
      width: "50%",
      text: `Kepada\n Yth. ${data.nama_penerima}`,
    });

    stack.push(data?.kota_tujuan || "");

    return stack;
  };

  return {
    // marginTop: 75,
    stack: [
      {
        // width: "55%",
        layout: {
          hLineWidth: (_i, _node) => 0,
          vLineWidth: (_i) => 0,
          paddingLeft: (_i) => 2,
          paddingTop: (_i) => 0,
        },
        table: {
          widths: ["100%"],
          body: [
            [
              {
                layout: {
                  hLineWidth: (_i, _node) => 0,
                  vLineWidth: (_i) => 0,
                  paddingLeft: (_i) => 0,
                  paddingTop: (_i) => 0,
                },
                table: {
                  widths: [65, 5, "*"],
                  body: [
                    ["Nomor", ":", data?.no_surat ?? ""],
                    ["Sifat", ":", data?.sifat_surat ?? ""],
                    ["Lampiran", ":", data?.lampiran ?? ""],
                    [
                      "Hal",
                      ":",
                      {
                        text: data?.perihal ?? "",
                      },
                    ],
                  ],
                },
              },
            ],
          ],
        },
      },
      {
        style: ["mt-20", "mb-20"],
        stack: penerimaSection(),
      },
    ],
  };
};

module.exports = {
  KopSuratV1,
  KopSuratV2,
  TelaahStaff,
  Perbal,
  NaskahKeputusan,
  Laporan,
  Pengumuman,
  PerintahTugas,
  BeritaAcara,
  Keterangan,
  Kuasa,
  Pengantar
}
