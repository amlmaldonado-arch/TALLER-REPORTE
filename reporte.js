const fs = "fs" in globalThis ? require("fs") : require("node:fs");
const PdfPrinter = require("pdfmake");

const fonts = {
    Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    }
};

const printer = new PdfPrinter(fonts);

const instituto = {
    nombre: "INSTITUTO SUPERIOR TECNOLÓGICO YAVIRAC",
    direccion: "García Moreno S4-35 y Ambato",
    telefono: "+593 99 550 6245",
    correo: "yavirac@yavirac.edu.ec"
};

const estudiante = {
    nombre: "ARIEL MALDONADO",
    cedula: "1752778322",
    carrera: "Desarrollo de Software",
    periodo: "Periodo Académico 2026",
    modalidad: "Presencial"
};

const reporteInfo = {
    codigo: "REP-YAV-2026-0001",
    matricula: "YAV-DS-1752778322",
    estado: "LEGALMENTE MATRICULADO"
};

const materias = [
    ["BD001", "Base de Datos", "Nivel 1", "00125", "A", "Lunes 08:00 - 10:00", "Matriculado"],
    ["PR001", "Programación", "Nivel 1", "00125", "A", "Martes 10:00 - 12:00", "Matriculado"],
    ["IS001", "Ingeniería de Software", "Nivel 2", "00125", "B", "Miércoles 14:00 - 16:00", "Matriculado"],
    ["WEB001", "Desarrollo Web", "Nivel 2", "00125", "B", "Viernes 08:00 - 10:00", "Matriculado"]
];

const fecha = new Date();
const fechaTexto = fecha.toLocaleDateString(
    "es-EC",
    {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
);

const documento = {
    pageSize: "A4",
    pageMargins: [50, 60, 50, 60],
    defaultStyle: {
        font: "Roboto",
        fontSize: 10
    },
    content: [
        {
            stack: [
                {
                    text: instituto.nombre,
                    fontSize: 15,
                    bold: true,
                    alignment: "center"
                },
                {
                    text: "CENTRO DE INGLÉS YAVIRAC",
                    fontSize: 11,
                    alignment: "center"
                },
                {
                    text: "REPORTE ACADÉMICO DE MATRÍCULA",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                    margin: [0, 4, 0, 10]
                }
            ]
        },
        {
            canvas: [
                {
                    type: "line",
                    x1: 0,
                    y1: 0,
                    x2: 495,
                    y2: 0,
                    lineWidth: 1.5
                }
            ],
           
            margin: [0, 5, 0, 15]
        },
        {
            
            columns: [
                {
                    text: `Fecha de emisión: ${fechaTexto}`,
                    fontSize: 9
                },
                {
                    text: `Ref: ${reporteInfo.codigo}`,
                    alignment: "right",
                    fontSize: 9
                }
            ],
            margin: [0, 0, 0, 15]
        },
        {
            text: "INFORMACIÓN DEL ESTUDIANTE",
            bold: true,
            fontSize: 11,
            margin: [0, 0, 0, 5]
        },
        {
            table: {
                widths: [130, "*"],
                body: [
                    [{ text: "Apellidos y Nombres:", bold: true }, estudiante.nombre],
                    [{ text: "Cédula de Identidad:", bold: true }, estudiante.cedula],
                    [{ text: "Carrera:", bold: true }, estudiante.carrera],
                    [{ text: "Periodo Académico:", bold: true }, estudiante.periodo],
                    [{ text: "Modalidad:", bold: true }, estudiante.modalidad],
                    [{ text: "Código de Matrícula:", bold: true }, reporteInfo.matricula],
                    [{ text: "Estado General:", bold: true }, { text: reporteInfo.estado, bold: true, color: "green" }]
                ]
            },
            layout: "lightHorizontalLines",
            margin: [0, 0, 0, 20]
        },
        {
            text: "ASIGNATURAS MATRICULADAS",
            bold: true,
            fontSize: 11,
            margin: [0, 0, 0, 5]
        },
        {
            table: {
                headerRows: 1,
                widths: [45, 100, 55, 45, 45, 110, 65],
                body: [
                    [
                        { text: "Código", bold: true },
                        { text: "Asignatura", bold: true },
                        { text: "Nivel", bold: true },
                        { text: "Num.", bold: true },
                        { text: "Paral.", bold: true },
                        { text: "Horario", bold: true },
                        { text: "Estado", bold: true }
                    ],
                    ...materias
                ]
            },
            layout: "lightHorizontalLines",
            margin: [0, 0, 0, 40]
        },
        {
            columns: [
                {
                    text: "____________________________________\nMSc. LORENA MALDONADO MORENO\nCOORDINADORA DEL CENTRO DE INGLÉS YAVIRAC",
                    alignment: "center",
                    fontSize: 9
                }
            ]
        },
        {
            text: `\n\n${instituto.direccion} | Teléfono: ${instituto.telefono} | Correo: ${instituto.correo}`,
            alignment: "center",
            fontSize: 8,
            color: "#555555"
        }
    ]
};


const pdf = printer.createPdfKitDocument(documento);

pdf.pipe(
    fs.createWriteStream(
        "reporte_matricula_yavirac.pdf"
    )
);


pdf.end();

console.log(
    "✅ Reporte de matrícula generado correctamente"
);