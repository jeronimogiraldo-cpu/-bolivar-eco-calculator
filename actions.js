// ======================================
// LANGUAGE SYSTEM
// ======================================

let currentLanguage = "en";


const translations = {

    en: {

        subtitle: "Measure your environmental impact and make a difference!",
        formTitle: "Calculate Your Impact",
        studentLabel: "Student Name",
        studentPlaceholder: "Enter your name",
        transportLabel: "Transportation",
        paperLabel: "Paper Sheets Used Per Day",
        recyclingLabel: "Recycling Level",
        calculateButton: "Calculate My Impact",
        resultsTitle: "Your Weekly Results",
        co2Label: "🌍 CO2 Emissions",
        pointsLabel: "🌱 Eco-Points",
        printButton: "🖨️ Print / Save PDF Report",
        footerText: "Bolívar Eco-Calculator | Colegio Bolívar",
        footerMessage: "Small actions create a greener future.",

        error: "Please enter a valid number of paper sheets.",

        certificateTitle: "Environmental Impact Certificate",
        certificateIntro: "This certificate recognizes the environmental results of:",
        certificateCO2Label: "Weekly CO2 Emissions",
        certificatePointsLabel: "Eco-Points Score",
        certificateMessage: "Every small action helps protect our planet!",

        studentError: "Please enter your name before printing your report.",

        dateLabel: "Report Date: "

    },


    es: {

        subtitle: "¡Mide tu impacto ambiental y marca la diferencia!",
        formTitle: "Calcula Tu Impacto",
        studentLabel: "Nombre del Estudiante",
        studentPlaceholder: "Escribe tu nombre",
        transportLabel: "Transporte",
        paperLabel: "Hojas de Papel Usadas por Día",
        recyclingLabel: "Nivel de Reciclaje",
        calculateButton: "Calcular Mi Impacto",
        resultsTitle: "Tus Resultados Semanales",
        co2Label: "🌍 Emisiones de CO2",
        pointsLabel: "🌱 Puntos Ecológicos",
        printButton: "🖨️ Imprimir / Guardar PDF",
        footerText: "Bolívar Eco-Calculator | Colegio Bolívar",
        footerMessage: "Pequeñas acciones crean un futuro más verde.",

        error: "Por favor, ingresa un número válido de hojas de papel.",

        certificateTitle: "Certificado de Impacto Ambiental",
        certificateIntro: "Este certificado reconoce los resultados ambientales de:",
        certificateCO2Label: "Emisiones Semanales de CO2",
        certificatePointsLabel: "Puntuación Ecológica",
        certificateMessage: "¡Cada pequeña acción ayuda a proteger nuestro planeta!",

        studentError: "Por favor, escribe tu nombre antes de imprimir el informe.",

        dateLabel: "Fecha del Informe: "

    }

};


// ======================================
// CHANGE LANGUAGE
// ======================================

function changeLanguage() {

    currentLanguage = document.getElementById("language").value;

    document.documentElement.lang = currentLanguage;

    const t = translations[currentLanguage];


    // Translate main content

    document.getElementById("subtitle").textContent = t.subtitle;

    document.getElementById("formTitle").textContent = t.formTitle;

    document.getElementById("studentLabel").textContent = t.studentLabel;

    document.getElementById("student").placeholder = t.studentPlaceholder;

    document.getElementById("transportLabel").textContent = t.transportLabel;

    document.getElementById("paperLabel").textContent = t.paperLabel;

    document.getElementById("recyclingLabel").textContent = t.recyclingLabel;

    document.getElementById("calculateButton").textContent = t.calculateButton;

    document.getElementById("resultsTitle").textContent = t.resultsTitle;

    document.getElementById("co2Label").textContent = t.co2Label;

    document.getElementById("pointsLabel").textContent = t.pointsLabel;

    document.getElementById("printButton").textContent = t.printButton;

    document.getElementById("footerText").textContent = t.footerText;

    document.getElementById("footerMessage").textContent = t.footerMessage;


    // Translate certificate

    document.getElementById("certificateTitle").textContent = t.certificateTitle;

    document.getElementById("certificateIntro").textContent = t.certificateIntro;

    document.getElementById("certificateCO2Label").textContent = t.certificateCO2Label;

    document.getElementById("certificatePointsLabel").textContent = t.certificatePointsLabel;

    document.getElementById("certificateMessage").textContent = t.certificateMessage;


    // Translate transportation options

    document.querySelectorAll("#transport option").forEach(option => {

        option.textContent = option.dataset[currentLanguage];

    });


    // Translate recycling options

    document.querySelectorAll("#recycling option").forEach(option => {

        option.textContent = option.dataset[currentLanguage];

    });


    // Update certificate date

    updateCertificateDate();

}


// ======================================
// CERTIFICATE DATE
// ======================================

function updateCertificateDate() {

    const t = translations[currentLanguage];

    document.getElementById("certificateDate").textContent =

        t.dateLabel + new Date().toLocaleDateString(currentLanguage);

}


// ======================================
// CALCULATE ENVIRONMENTAL IMPACT
// ======================================

function calculateImpact() {


    // Get user inputs

    let transport = Number(document.getElementById("transport").value);

    let paper = Number(document.getElementById("paper").value);

    let recycling = Number(document.getElementById("recycling").value);


    // Validate paper input

    if (paper < 0 || !Number.isFinite(paper)) {

        alert(translations[currentLanguage].error);

        return;

    }


    // Define estimation values

    let distancePerDay = 10;

    let schoolDays = 5;

    let paperEmission = 0.005;


    // Calculate weekly transportation emissions

    let transportCO2 = transport * distancePerDay * schoolDays;


    // Calculate weekly paper emissions

    let paperCO2 = paper * paperEmission * schoolDays;


    // Apply recycling reduction

    paperCO2 = paperCO2 * (1 - recycling);


    // Calculate total weekly CO2 emissions

    let totalCO2 = transportCO2 + paperCO2;


    // Calculate Eco-Points

    let recyclingBonus = recycling * 40;

    let ecoPoints = Math.min(

        100,

        Math.max(0, 100 - (totalCO2 * 2) + recyclingBonus)

    );


    // Display results

    document.getElementById("co2").textContent = totalCO2.toFixed(2);

    document.getElementById("points").textContent = ecoPoints.toFixed(0);

}


// ======================================
// PRINT / SAVE PDF REPORT
// ======================================

function printReport() {


    // Get student information

    let studentName = document.getElementById("student").value.trim();

    let co2 = document.getElementById("co2").textContent;

    let points = document.getElementById("points").textContent;


    const t = translations[currentLanguage];


    // Validate student name

    if (studentName === "") {

        alert(t.studentError);

        return;

    }


    // Update certificate information

    document.getElementById("certificateStudent").textContent = studentName;

    document.getElementById("certificateCO2").textContent = co2;

    document.getElementById("certificatePoints").textContent = points;


    // Update report date

    updateCertificateDate();


    // Open browser print dialog

    window.print();

}


// ======================================
// INITIALIZE APPLICATION
// ======================================

document.addEventListener("DOMContentLoaded", function () {


    // Language selector event

    document.getElementById("language").addEventListener("change", changeLanguage);


    // Calculate button event

    document.getElementById("calculateButton").addEventListener("click", calculateImpact);


    // Print button event

    document.getElementById("printButton").addEventListener("click", printReport);


    // Initialize application language

    changeLanguage();

});