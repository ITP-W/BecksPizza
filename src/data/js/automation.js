
//auto-functions
function loadSite() {
    return new Promise(async (resolve, reject) => {
        try {
            $("#btn-loadingStart").click();
            loadDate()
                .then(response => {
                    resolve = resolve + response + ", ";
                })
                .catch(error => {
                    reject = error;
                    throw error;
                });
            printCarousel()
                .then(response => {
                    resolve = resolve + response + ", ";
                })
                .catch(error => {
                    reject = error;
                    throw error;
                });
            printVarianten()
                .then(response => {
                    resolve = resolve + response + ", ";
                })
                .catch(error => {
                    reject = error;
                    throw error;
                });
            await loadTermin()
                .then(async response => {
                    const termin = response;
                    resolve = resolve + "Termin, ";
                    await printPizzas(termin)
                        .then(async response => {
                            resolve = resolve + response + ", ";
                            await showBuchungen(termin)
                                .then(response => {
                                    resolve = resolve + response + ", ";
                                })
                                .catch(error => {
                                    reject = error;
                                    throw error;
                                });
                        })
                        .catch(error => {
                            reject = error;
                            throw error;
                        });
                })
                .catch(error => {
                    reject = error;
                    throw error;
                });
            printHead();
            resolve = resolve + "Überschrift";

            $("#btn-loadingStop").click();

            resolve = resolve + "... | DONE";
        }
        catch (error){
            reject = error;
            throw error;
        }
    });
}

function printHead(){
    const head = new Head();
    $('#dateHead').text(head.convertHead());
}

function loadDate() {
    return new Promise((resolve, reject) => {
        //Vorauswahl
        try {
            const genToday = new Date();
            const day = genToday.getDate();
            const month = genToday.getMonth() + 1;
            const year = genToday.getFullYear();
            const today = year + '-' + month + '-' + day;
            $('#newDate').val(today);
            resolve("Heutiges Datum");
        }
        catch (error){
            reject("Date");
        }
    });
}

async function loadTermin() {
    return new Promise((resolve, reject) => {
    //lädt den aktuellen Termin aus der Datenbank
        try {
            const abfrage = new XMLHttpRequest();
            abfrage.open("GET", "./src/data/function.php?method=get&target=termin", true);
            abfrage.send();
            let aktuellerTermin;
            abfrage.onload = function () {
                let antwort = (abfrage.responseText).substring(1);
                const antwortDaten = antwort.split(",");
                aktuellerTermin = new Termin(parseInt(antwortDaten[0]), antwortDaten[1], parseInt(antwortDaten[2]), parseInt(antwortDaten[3]), parseInt(antwortDaten[4]), parseInt(antwortDaten[5]), parseInt(antwortDaten[6]), parseInt(antwortDaten[7]));
                resolve(aktuellerTermin);
            };
        }
        catch (error){
            reject("Termin");
        }
    });
}

async function printPizzas(termin) {
    $("#dateMain").text("");
    return new Promise(done => {
        setTimeout(() => {

            //lädt pizzas aus datenbank
            let antwortData;
            let printData = [];
            const anfrage = new XMLHttpRequest();
            anfrage.open("GET", "./src/data/function.php?method=get&target=pizza&pid=" + termin.id, true);
            anfrage.send();
            anfrage.onload = function () {
                let antwortString = (anfrage.responseText).substring(1);
                antwortData = antwortString.split(",");

                //konvertiert daten zu pizzas
                for (let i = 0; i < antwortData.length; i++) {
                    let pizza = new Pizza;
                    pizza.id = parseInt(antwortData[i]);
                    i++;
                    pizza.date = parseInt(antwortData[i]);
                    i++;
                    pizza.timeHH = parseInt(antwortData[i]);
                    i++;
                    pizza.timeMM = parseInt(antwortData[i]);
                    i++;
                    pizza.pizza = parseInt(antwortData[i]);
                    printData.push(pizza);
                }

                //rendert reihe
                let selector = 0;
                for (let i = 1; i < printData.length; i++) {
                    let minutes = 0;
                    for (let c = 0; minutes < 60; c++) {
                        if (selector < printData.length){
                            const newRowHTML = printData[selector].convert_Time();
                            $('#dateMain').append(newRowHTML);
                        }
                        minutes += termin.intervall;
                        selector += termin.pizzas;
                    }
                }

                //rendert pizzas
                let selectedRow;
                for (let i = 0; i < (printData.length); i++) {
                    const strHH = printData[i].timeHH.toString();
                    const strMM = printData[i].timeMM.toString();
                    const convertedHH = strHH.padStart(2, '0');
                    const convertedMM = strMM.padStart(2, '0');
                    const newPizzaHTML = printData[i].convert_Pizza();
                    if (i < 4) {
                        selectedRow = document.getElementById("upper-" + convertedHH + ":" + convertedMM);
                        $(selectedRow).append(newPizzaHTML);
                    }
                    if (i >= 4 && i < 8) {
                        selectedRow = document.getElementById("middle-" + convertedHH + ":" + convertedMM);
                        $(selectedRow).append(newPizzaHTML);
                    }
                    if (i >= 8) {
                        selectedRow = document.getElementById("lower-" + convertedHH + ":" + convertedMM);
                        $(selectedRow).append(newPizzaHTML);
                    }
                }

                //markierung für abgeschlossenen prozess
                done("success")
            }
        }, 2000);
    });
}

function printVarianten(){
    return new Promise((resolve, reject) => {
        try {
            $("#varianteList").text("");
            $("#varianteEditList").text("");
            let antwortData;
            let printData = [];
            const anfrage = new XMLHttpRequest();
            anfrage.open("GET", "./src/data/function.php?method=get&target=variante", true);
            anfrage.send();
            anfrage.onload = function () {
                let antwortString = (anfrage.responseText).substring(1);
                antwortData = antwortString.split(",");

                //konvertiert daten zu pizzavarianten
                for (let i = 0; i < antwortData.length; i++) {
                    let variante = new Variante();
                    variante.id = parseInt(antwortData[i]);
                    i++;
                    variante.name = antwortData[i];
                    i++;
                    variante.beschreibung = antwortData[i];
                    printData.push(variante);
                }

                //rendert auswahl
                for (let i = 0; i < printData.length; i++) {
                    const newRowHTML = printData[i].convert_Variante();
                    $('#varianteList').append(newRowHTML);
                }

                //rendert editor
                for (let i = 0; i < printData.length; i++) {
                    const newRowHTML = printData[i].convert_Variante_Edit();
                    $('#varianteEditList').append(newRowHTML);
                }
            }
            resolve(null);
        }
        catch (error){
            reject("Varianten");
        }
    });
}

function printCarousel(){
    return new Promise((resolve, reject) => {
        try {
            $("#carousel-indicators").text("");
            $("#carousel-inner").text("");
            const carousel = new Carousel();

            //rendert indicators
            $('#carousel-indicators').append(carousel.getIndicators());

            //rendert pictures
            $('#carousel-inner').append(carousel.getPictures());

            resolve(null);
        }
        catch (reject){
            reject("Carousel");
        }
    });
}

function lockPizza(bestellung) {

    //Sperrt die gewählte Pizza und ergänzt Eintragungen
    const variante = new Variante(bestellung.variante);
    const scope = [document.getElementById('pizza-' + bestellung.pizza),
        document.getElementById('namePizza-' + bestellung.pizza),
        document.getElementById('variantePizza-' + bestellung.pizza),
        document.getElementById('mask-' + bestellung.pizza)];
    $(scope[0]).addClass("disabled");
    $(scope[1]).text(bestellung.vorn + " " + bestellung.nachn);
    $(scope[2]).text(variante.name);
    $(scope[3]).removeClass("rgba-green-light").addClass("rgba-red-light");
}

function unlockPizza(pizzaID) {
    const scope = [document.getElementById('pizza-' + pizzaID),
        document.getElementById('namePizza-' + pizzaID),
        document.getElementById('variantePizza-' + pizzaID),
        document.getElementById('mask-' + pizzaID)];
    $(scope[0]).removeClass("disabled");
    $(scope[1]).text(' ');
    $(scope[2]).text(' ');
    $(scope[3]).removeClass("rgba-red-light").addClass("rgba-green-light");
}

function saveBestellung(bestellung) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/function.php?method=set&target=bestellung&vn=" + bestellung.vorn + "&nn=" + bestellung.nachn + "&pi=" + parseInt(bestellung.pizza) + "&v=" + parseInt(bestellung.variante), true);
    xhttp.send();
    showBuchungen();
}

async function showBuchungen() {

    return new Promise((resolve, reject) => {

        //lädt buchungen aus datenbank
        try {
            const anfrage = new XMLHttpRequest();
            anfrage.open("GET", "./src/data/function.php?method=get&target=bestellung", true);
            anfrage.send();
            let antwortDaten;
            let bestellungen = [];
            anfrage.onload = function () {
                const antwortString = (anfrage.responseText).substring(1);
                antwortDaten = antwortString.split(",");

                //konvertiert daten zu buchungen und ruft jeweils die zusammenfassungs- und sperrfunktion auf
                for (let n = 0; n < antwortDaten.length; n++) {
                    let vergeben = new Bestellung();
                    vergeben.vorn = antwortDaten[n];
                    n++;
                    vergeben.nachn = antwortDaten[n];
                    n++;
                    vergeben.pizza = antwortDaten[n];
                    n++;
                    vergeben.variante = antwortDaten[n];
                    bestellungen.push(vergeben);
                    lockPizza(vergeben);
                }
                makeSummary(bestellungen);
                resolve(null);
            };
        }
        catch (error){
            reject = error;
            throw error;
        }
    });
}

function makeSummary(bestellungen){

    if (bestellungen && bestellungen.length > 0) {
        $('#zusammenfassung').text("");
        bestellungen.forEach(bestellung => {
            const summaryString = "<p value='"+bestellung.variante+"'>"+bestellung.vorn+" "+bestellung.nachn+" | "+bestellung.variante+"</p>";
            $('#zusammenfassung').append(summaryString);
        });
        summSummary(bestellungen);
    }
}

function summSummary(bestellungen){

    $('#zusammenfassungGesamt').text("");
    let varianten = new Map;

    //Aus Bestellungen die Varianten auslesen und zählen, wie viele Bestellungen es pro Variante gibt
    bestellungen.forEach(bestellung => {
        if (varianten.has(bestellung.variante)) {
            varianten.set(bestellung.variante, varianten.get(bestellung.variante) + 1);
        } else {
            varianten.set(bestellung.variante, 1);
        }
    });

    varianten.forEach((anzahl, variante) => {
        const summaryString = `<p>Pizzavariante ${variante} | Anzahl ${anzahl}</p>`;
        $('#zusammenfassungGesamt').append(summaryString);
    })
}

function switchView(to){
    switch (to){
        case "admin":
            $('.viewAdmin').removeClass('hidden');
            $('.viewUser').addClass('hidden');
            break;
        case "user":
            $('.viewAdmin').addClass('hidden');
            $('.viewUser').removeClass('hidden');
            break;
    }
}

function checkUser() {
    const vorname = $('#activeVorN').text();
    const nachname = $('#activeNachN').text();
    if (vorname === null || vorname === "" || vorname === undefined) {
        $("#btn-userModal").click();
    } else if (nachname === null || nachname === "" || nachname === undefined) {
        $("#btn-userModal").click();
    }
}

function checkKey() {
    let input = $("#key").val();
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/function.php?target=key&method=" + input, true);
    xhttp.send();
    xhttp.onload = function () {
        const answer = this.responseText;
        if (answer === "pass") {
            $("#btn-edit").removeClass("disabled", "btn-danger").addClass("btn-success");
            $("#editInfo").text("");
        } else {
            $("#btn-edit").removeClass("btn-success").addClass("disabled", "btn-danger");
            $("#editInfo").text("FALSCHER SCHLÜSSEL");
        }
    }
}