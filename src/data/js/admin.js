
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
        printHead();
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