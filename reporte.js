const fs = require("fs");
const PdfPrinter = require("pdfmake");


// Configuración de fuentes
const fonts = {
    Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    }
};


const printer = new PdfPrinter(fonts);


// =======================
// DATOS DEL CERTIFICADO
// =======================

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


const certificado = {

    codigo: "CERT-YAV-2026-0001",

    matricula: "YAV-DS-1752778322",

    estado: "LEGALMENTE MATRICULADO"

};


// =======================
// ASIGNATURAS
// =======================

const materias = [

[
"BD001",
"Base de Datos",
"Nivel 1",
"00125",
"A",
"Lunes 08:00 - 10:00",
"Matriculado"
],

[
"PR001",
"Programación",
"Nivel 1",
"00125",
"A",
"Martes 10:00 - 12:00",
"Matriculado"
],

[
"IS001",
"Ingeniería de Software",
"Nivel 2",
"00125",
"B",
"Miércoles 14:00 - 16:00",
"Matriculado"
],

[
"WEB001",
"Desarrollo Web",
"Nivel 2",
"00125",
"B",
"Viernes 08:00 - 10:00",
"Matriculado"
]

];


// Fecha

const fecha = new Date();

const fechaTexto = fecha.toLocaleDateString(
    "es-EC",
    {
        day:"numeric",
        month:"long",
        year:"numeric"
    }
);



// =======================
// DOCUMENTO PDF
// =======================

const documento = {


pageSize:"A4",

pageMargins:[50,60,50,60],


defaultStyle:{
    font:"Roboto",
    fontSize:11
},



content:[


// ENCABEZADO

{

stack:[

{
text:instituto.nombre,
fontSize:16,
bold:true,
alignment:"center"
},

{
text:"CENTRO DE INGLÉS YAVIRAC",
fontSize:12,
alignment:"center"
},

{
text:"CERTIFICACIÓN ACADÉMICA",
fontSize:11,
alignment:"center",
margin:[0,5,0,15]
}

]

},



{
canvas:[
{
type:"line",
x1:0,
y1:0,
x2:495,
y2:0,
lineWidth:2
}
],

margin:[0,10,0,20]

},




// TITULO


{
text:"CERTIFICADO DE MATRÍCULA",

fontSize:22,

bold:true,

alignment:"center",

margin:[0,10,0,25]

},




// FECHA

{

text:`Quito, ${fechaTexto}`,

alignment:"right",

margin:[0,0,0,20]

},




// TEXTO FORMAL


{

text:[

{
text:"Por medio del presente, el Instituto Superior Tecnológico Yavirac certifica que "
},

{
text:estudiante.nombre,
bold:true
},


{
text:` con número de identificación ${estudiante.cedula}, se encuentra legalmente matriculado en la carrera de `
},


{
text:estudiante.carrera,
bold:true
},


{
text:` durante el ${estudiante.periodo}, bajo modalidad ${estudiante.modalidad}.`
}


],


alignment:"justify",

lineHeight:1.5

},




// DATOS

{
text:"\nDATOS DE MATRÍCULA",

bold:true,

fontSize:13,

margin:[0,20,0,10]

},



{

table:{


widths:["*", "*"],


body:[

[
{
text:"Código certificado",
bold:true
},
certificado.codigo
],


[
{
text:"Código matrícula",
bold:true
},
certificado.matricula
],


[
{
text:"Estado",
bold:true
},
certificado.estado
]

]


},


layout:"lightHorizontalLines"


},




// TABLA

{

text:"\nDETALLE ACADÉMICO",

bold:true,

fontSize:13

},



{

table:{


headerRows:1,


widths:[

45,
100,
55,
55,
45,
100,
70

],


body:[


[

{text:"Código",bold:true},

{text:"Asignatura",bold:true},

{text:"Nivel",bold:true},

{text:"Num.",bold:true},

{text:"Paralelo",bold:true},

{text:"Horario",bold:true},

{text:"Estado",bold:true}

],


...materias


]

},


layout:"lightHorizontalLines"


},




// FIRMA


{

text:"\n\n\n",

},



{

columns:[


{

text:"________________________\n\nMSc. LORENA MALDONADO MORENO\nCOORDINADORA DEL CENTRO DE INGLÉS YAVIRAC",

alignment:"center"

}


]


},





// FOOTER


{

text:

`\n\n${instituto.direccion}

Teléfono: ${instituto.telefono}

Correo: ${instituto.correo}`,

alignment:"center",

fontSize:9

}



]

};



// CREAR PDF


const pdf = printer.createPdfKitDocument(documento);


pdf.pipe(

fs.createWriteStream(
"certificado_matricula_yavirac.pdf"
)

);


pdf.end();



console.log(
"✅ Certificado Yavirac generado correctamente"
);