const  { convertDate } = require("../../../helpers/util/utilites");

const buildTembusanComponent = (item) => {
    const elStack = [
        {
            text: `Tembusan${item?.length > 1 ? ":" : ""}`
        },

    ];

    if (item?.length > 1) {
        elStack.push({
            ol: item.map(val => val)
        })
    } else {
        elStack.push({
            text: item.map(val => val)
        })
    }
    return {
        stack: elStack
    }
}

const buildPengesahanComponent = (data, shownDate) => {
    const elStack = [
        {
            text: `${convertDate(data?.tgl_surat, "DD MMMM YYYY")}`,
        },
        {
            text: `${data?.jabatan?.toUpperCase()}`,
            style: ['left', "fontSizeML"]

        },
        " ",
        " ",
        {
            text: data?.is_esign ? (data.esigns[0]?.mark || " ") : " ",
            style: ['center']
        },
        " ",
        " ",
        {
            text: `${data?.pengesahan_nama?.toUpperCase()}`,
            style: ['left']
        }
    ];
    if (data?.pengesahan_npp) {
        elStack.push({
            text: `NPP ${data?.pengesahan_npp}`,
            style: ['left']
        })
    }

    if (!shownDate) {
        elStack.splice(0, 1); //remove date
    }

    return {
        stack: elStack
    }
}

const buildPengesahanKuasaComponent = (data) => {
    return [
        //baris pertama
        [
            " ",
            "Jakarta,"
        ],
        //baris kedua
        [
            //Pengesahan kiri (Penerima)
            {
                layout: {
                    hLineWidth: (_i, _node) => 0,
                    vLineWidth: _i => 0,
                    paddingLeft: _i => 0,
                    paddingTop: _i => 0,
                },
                table: {
                    widths: ["auto"],
                    body: [
                        [
                            {
                                stack: [
                                    `Penerima Kuasa`,
                                    " ",
                                    " ",
                                    {
                                        text: data?.is_esign ? (data.esigns[1]?.mark || " ") : " ",
                                        style: ['center']
                                    },
                                    " ",
                                    " ",
                                    {
                                        text: data?.is_esign ? `(${(data.esigns[1]?.pengesahan_nama?.toUpperCase() || " ")})` : " ",
                                        style: ['center']
                                    }
                                ],
                            }
                        ]
                    ],
                },

            },
            {
                //pengesahan kanan pemberi
                stack: [
                    `Pemberi Kuasa`,
                    " ",
                    " ",
                    {
                        text: data?.is_esign ? (data.esigns[0]?.mark || " ") : " ",
                        style: ['center']
                    },
                    " ",
                    " ",
                    {
                        text: data?.is_esign ? `(${(data.esigns[0]?.pengesahan_nama?.toUpperCase() || " ")})` : " ",
                        style: ['center']
                    }
                ],
            }
        ],
    ]
}

const buildPengesahanPenerima = (data) => {
    const elStack = [
        " ",
        {
            text: `Diterima tanggal ${convertDate(data?.tgl_terima, "DD, MMMM YYYY")}`
        },
        {
            text: 'Yang menerima,'
        },
        " ",
        " ",
        {
            text: data?.is_esign ? (data.esigns[1]?.mark || " ") : " ",
            style: ['ml-20']
        },
        " ",
        " ",
        {
            text: `${data?.nama_penerima?.toUpperCase()}`,

        }

    ];


    return {
        stack: elStack
    }
}

const FooterContent = (data, showTembusan = true, shownDate = true) => {
    return {
        unbreakable: true,
        stack: [
            {
                style: ['mt-15'],
                layout: {
                    hLineWidth: (_i, _node) => 0,
                    vLineWidth: _i => 0,
                    paddingLeft: _i => 0,
                    paddingTop: _i => 0,
                },
                table: {
                    widths: ["50%", "auto"],
                    body: [
                        [
                            " ",
                            buildPengesahanComponent(data, shownDate)
                        ],
                        [
                            showTembusan ? buildTembusanComponent(data?.tembusan) : " ",
                            " "
                        ]
                    ],
                },
            }
        ],
    };
};

const FooterContentKuasa = (data) => {
    return {
        unbreakable: true,
        stack: [
            {
                style: ['mt-15'],
                layout: {
                    hLineWidth: (_i, _node) => 0,
                    vLineWidth: _i => 0,
                    paddingLeft: _i => 0,
                    paddingTop: _i => 0,
                },
                table: {
                    widths: ["65%", "auto"],
                    body: buildPengesahanKuasaComponent(data),
                },
            }
        ],
    };
}

const FooterContentPengantar = (data) => {
    return {
        stack: [
            {
                style: ['mt-15'],
                layout: {
                    hLineWidth: (_i, _node) => 0,
                    vLineWidth: _i => 0,
                    paddingLeft: _i => 0,
                    paddingTop: _i => 0,
                },
                table: {
                    widths: ["65%", "35%"],
                    body: [
                        [
                            buildPengesahanPenerima(data),
                            buildPengesahanComponent(data, true)
                        ],

                    ],
                },
            }
        ],
    };
}

module.exports = {
    FooterContent,
    FooterContentKuasa,
    FooterContentPengantar,
    buildTembusanComponent,
    buildPengesahanComponent,
    buildPengesahanKuasaComponent,
    buildPengesahanPenerima
}
