// noinspection JSJQueryEfficiency

$(document).ready(function () {
    let neueBestellung = new Bestellung();

    //events
    $(document).on("click", "#btn-setUser", function () {
        neueBestellung.vorn = $('#userVorN').val();
        neueBestellung.nachn = $('#userNachN').val();
        const fail = "Bitte überprüfen Sie Ihre Eingabe und versuchen Sie es erneut";
        if (neueBestellung.vorn === null || neueBestellung.vorn === "" || neueBestellung.vorn === undefined) {
            $('#userInfo').text(fail);
        } else if (neueBestellung.nachn === null || neueBestellung.nachn === "" || neueBestellung.nachn === undefined) {
            $('#userInfo').text(fail);
        } else {
            $('#activeVorN').text(neueBestellung.vorn);
            $('#activeNachN').text(neueBestellung.nachn);
            $('#userInfo').text("");
            $('#btn-closeUserModal').click();
            $('html, body').animate({scrollTop: '0px'}, 300);
        }
    });

    $(document).on("click", "button[id^='pizza-']", function () {
        checkUser();
        const pizzaID = this.attributes[0].nodeValue;
        const pizzaArr = pizzaID.split('-');
        neueBestellung.pizza = pizzaArr[1];
    });

    $(document).on("click", "button[id^='btn-Variante-']", function () {
        checkUser();
        const varianteID = this.attributes[1].nodeValue;
        const varianteArr = varianteID.split('-');
        neueBestellung.variante = varianteArr[2];
        saveBestellung(neueBestellung);
        $('#btn-closePizzaModal').click();
    });

    $(document).on("click", "button[id^='btn-delete-buchung-']", function () {
        const buttonID = this.attributes[0].nodeValue;
        const splitID = buttonID.split("-");
        deleteBuchung(splitID[3]);
    });

    $(document).on("click", "#btn-edit", function () {
        switchView("admin");
        $('#btn-closeAdminModalStock').click();
        $('html, body').animate({scrollTop: '0px'}, 300);
        $('#btn-edit').addClass('disabled');
    });

    $(document).on("click", "#btn-logOut", function () {
        switchView("user");
        $('#btn-closeAdminModalEdit').click();
        $('html, body').animate({scrollTop: '0px'}, 300);
    });

    $(document).on("click", "#btn-EditHead", function () {
        editHead();
    });

    $(document).on("click", "#btn-newTermin", function () {
        saveTermin();
        $('#btn-terminEditModal').click();
    });

    $(document).on("click", "#btn-newVariante", function () {
        saveVariante();
        $('#newVariante').val("");
        $('#newBeschreibung').val("");
    });

    $(document).on("click", "button[id^='btn-delete-Variante-']", function () {
        const buttonID = this.attributes[0].nodeValue;
        const splitID = buttonID.split("-");
        deleteVariante(splitID[3]);
    });

    $(document).on("click", "#btn-loadingStop", function () {
        $('html, body').animate({_scrollElement: $('#footerHead')}, 0).animate({scrollTop: '0px'}, 300, null, function (){
            checkUser();
        });
    });

    $('#key').keypress(function(e){
        // noinspection JSJQueryEfficiency
        if(e.keyCode===13 && $('#btn-edit').hasClass("disabled")===false)
            $('#btn-edit').click();
    });

    //init
    loadSite();
});

//auto-functions
async function loadSite() {
    $("#btn-loadingStart").click();
    loadHead();
    const termin = await loadTermin();
    await printPizzas(termin);
    await showBuchungen(termin);
    printVarianten();
    printCarousel();
    $("#btn-loadingStop").click();
}

function loadHead(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/function.php?method=get&target=head", true);
    xhttp.send();
    xhttp.onload = function () {
        let heading = (xhttp.responseText).substring(3);
        $('#dateHead').text(heading);
    }
}

function loadDate() {
    //Vorauswahl
    const genToday = new Date();
    const day = genToday.getDate();
    const month = genToday.getMonth() + 1;
    const year = genToday.getFullYear();
    const today = year + '-' + month + '-' + day;
    $('#newDate').val(today);
}

function loadTermin() {
    //lädt den aktuellen Termin aus der Datenbank
    loadDate();
    return new Promise(termin => {
        setTimeout(() => {
            const abfrage = new XMLHttpRequest();
            abfrage.open("GET", "./src/data/function.php?method=get&target=termin", true);
            abfrage.send();
            let aktuellerTermin;
            abfrage.onload = function () {
                let antwort = (abfrage.responseText).substring(1);
                const antwortDaten = antwort.split(",");
                aktuellerTermin = new Termin(parseInt(antwortDaten[0]), antwortDaten[1], parseInt(antwortDaten[2]), parseInt(antwortDaten[3]), parseInt(antwortDaten[4]), parseInt(antwortDaten[5]), parseInt(antwortDaten[6]), parseInt(antwortDaten[7]));
                termin(aktuellerTermin)
            };
        }, 2000);
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
}

function printCarousel(){
    $("#carousel-indicators").text("");
    $("#carousel-inner").text("");
    let antwortData = [];
    let countCarousel;
    const anfrage = new XMLHttpRequest();
    anfrage.open("GET", "./src/data/function.php?method=get&target=carousel", true);
    anfrage.send();
    anfrage.onload = function () {
        let antwortString = (anfrage.responseText).substring(1);
        antwortData = antwortString.split(',');

        countCarousel = antwortData[0];
        antwortData.shift();
        const carousel = new Carousel(countCarousel, antwortData);

        //rendert indicators
        $('#carousel-indicators').append(carousel.getIndicators());

        //rendert pictures
        $('#carousel-inner').append(carousel.getPictures());
    }
}

function lockPizza(bestellung) {
    //lädt die Varianten aus der Datenbank
    const abfrage = new XMLHttpRequest();
    abfrage.open("GET", "./src/data/function.php?method=get&target=variante", true);
    abfrage.send();
    abfrage.onload = function () {
        let antwort = (abfrage.responseText).substring(1);
        const antwortDaten = antwort.split(",");
        let sammlung = [];

        //konvertiert Daten zu Pizza-Varianten
        for (let i = 0; i < antwortDaten.length; i++) {
            let variante = new Variante();
            variante.id = parseInt(antwortDaten[i]);
            i++;
            variante.name = antwortDaten[i];
            i++;
            variante.beschreibung = antwortDaten[i];
            sammlung.push(variante);
        }

        //Sperrt die gewählte Pizza und ergänzt Eintragungen
        const angepassterSelector = parseInt(bestellung.variante)-1;
        const variantenName = sammlung[angepassterSelector].name;
        const scope = [document.getElementById('pizza-' + bestellung.pizza),
            document.getElementById('namePizza-' + bestellung.pizza),
            document.getElementById('variantePizza-' + bestellung.pizza),
            document.getElementById('mask-' + bestellung.pizza)];
        $(scope[0]).addClass("disabled");
        $(scope[1]).text(bestellung.vorn + " " + bestellung.nachn);
        $(scope[2]).text(variantenName);
        $(scope[3]).removeClass("rgba-green-light").addClass("rgba-red-light");
    };
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
    lockPizza(bestellung);
}

async function showBuchungen() {

    //holt buchungsdaten aus db und erstellt einzelpunkte
    return new Promise(done => {
        setTimeout(() => {

            //lädt buchungen aus datenbank
            const anfrage = new XMLHttpRequest();
            anfrage.open("GET", "./src/data/function.php?method=get&target=bestellung", true);
            anfrage.send();
            let antwortDaten;
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
                    lockPizza(vergeben);
                    makeSummary(vergeben);
                }

                //erstellt die gesamt zusammenfassung
                summSummary();

                //markierung für abgeschlossenen prozess
                done("success")
            };
        }, 2000);
    });
}

function makeSummary(bestellung){
    const summaryString = "<p value='"+bestellung.variante+"'>"+bestellung.vorn+" "+bestellung.nachn+" | "+bestellung.variante+"</p>";
    $('#zusammenfassung').append(summaryString);
}

function summSummary(){

    $('#zusammenfassungGesamt').text("");

    //erstellt aus einzelpunkten einen gesamtwert für zusammenfassung
    const bestellungen = new Array[document.getElementById('zusammenfassung').childNodes];
    let pizzas = [];
    let varianten = [[]];

    //einzelne pizzas erfassen
    for(let n = 0; n < bestellungen.length; n++){
        pizzas[n] = parseInt(bestellungen[n].attributes[0].nodeValue);
    }

    //einzelne varianten erfassen
    let variante = 0;
    for(let n = 0; n < pizzas.length; n++){
        if (varianten.includes(pizzas[n]) === false){
            varianten[variante] = pizzas[n];
            variante++;
        }
    }
    varianten.sort();

    //anzahl pizzas pro variante erfassen und anzeigen
    for (let n = 0; n < varianten.length; n++){
        let count = 0;
        for (let c = 0; c < pizzas.length; c++){
            if (pizzas[c] === varianten[n]){
                count++;
            }
        }
        const summaryString = "<p>Pizzavariante " + varianten[n] + " | Anzahl " + count + "</p>";
        $('#zusammenfassungGesamt').append(summaryString);
    }
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

//admin-functions
function saveTermin(){
    let date = document.getElementById("newDate").value;
    const convertDate = date.split("-");
    date = convertDate[2] + "." + convertDate[1] + "." + convertDate[0];
    const startTime = document.getElementById("newStartTime").value;
    const endTime = document.getElementById("newStopTime").value;
    const interval = document.getElementById("newIntervall").value;
    const pizzas = document.getElementById("newPizzas").value;
    const termin = new Termin(null, date, parseInt(startTime), 0, parseInt(endTime), 0, parseInt(interval), parseInt(pizzas));
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/function.php?method=set&target=termin&d=" + termin.date + "&sh=" + termin.startHH + "&eh=" + termin.endHH + "&i=" + termin.intervall + "&p=" + termin.pizzas, true);
    xhttp.send();
    xhttp.onload = async function () {
        const newTermin = await loadTermin();
        await createPizzas(newTermin);
    }
}

function saveVariante(){
    const variante = document.getElementById("newVariante").value;
    const beschreibung = document.getElementById("newBeschreibung").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/function.php?method=set&target=variante&n=" + variante + "&b=" + beschreibung, true);
    xhttp.send();
    xhttp.onload = async function () {
        await printVarianten();
    }
}

function deleteVariante(variantenID) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/function.php?method=drop&target=variante&p=" + variantenID, true);
    xhttp.send();
    xhttp.onload = function () {
        printVarianten();
    }
}

async function createPizzas(termin) {
    const duration = termin.endHH - termin.startHH;
    let hour = termin.startHH;
    let idCounter = 1;
    let saveData = [];

    //erstellt alle Pizzas für diesen Termin
    for (let i = 0; i < duration; i++) {
        let minutes = 0;
        for (let c = termin.startMM; minutes < 60; c++) {
            let pizza = 1;
            for (pizza; pizza <= termin.pizzas; pizza++) {
                const savePizza = new Pizza(idCounter, termin.id, hour, minutes, pizza);
                saveData.push(savePizza);
                idCounter++;
            }
            minutes += termin.intervall;
        }
        hour++;
    }

    //speichert alle Pizzas in die Datenbank
    for (let i = 0; i < saveData.length; i++) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "./src/data/function.php?method=set&target=pizza&i=" + saveData[i].id + "&d=" + saveData[i].date + "&h=" + saveData[i].timeHH + "&m=" + saveData[i].timeMM + "&p=" + saveData[i].pizza, true);
        xhttp.send();
    }

    await loadSite();
    $('.viewUser').addClass('hidden');
    $('.viewAdmin').removeClass('hidden');
}

function editHead(){
    const heading = document.getElementById("newUeberschrift").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/function.php?method=set&target=head&h="+heading, true);
    xhttp.send();
    xhttp.onload = function () {
        loadHead();
    }
}

function deleteBuchung(pizzaID) {

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/function.php?method=drop&target=bestellung&p=" + pizzaID, true);
    xhttp.send();
    xhttp.onload = function () {
        unlockPizza(pizzaID);
    }
}
