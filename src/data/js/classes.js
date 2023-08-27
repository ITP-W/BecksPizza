

class Bestellung {
    constructor(vorn, nachn, pizza, variante) {
        this.vorn = vorn;
        this.nachn = nachn;
        this.pizza = pizza;
        this.variante = variante;
    }
}

class Carousel{
    private constructor() {
        let antwortData = [];
        let countCarousel;
        let fileNames = [];
        const anfrage = new XMLHttpRequest();
        anfrage.open("GET", "./src/data/function.php?method=get&target=carousel", true);
        anfrage.send();
        anfrage.onload = function () {
            let antwortString = (anfrage.responseText).substring(1);
            antwortData = antwortString.split(',');

            countCarousel = antwortData[0];
            antwortData.shift();
            fileNames = antwortData;
        }

        this.anzahl = countCarousel;
        this.bilder = fileNames;
    }

    getCount(){
        return this.anzahl;
    }

    getIndicators(){
        let htmlIndicators = '<li class="primary-color active" data-slide-to="0" data-target="#carouselFooter"></li>';
        for (let i = 1; i <= this.anzahl; i++){
            htmlIndicators.concat('<li class="primary-color" data-slide-to="' + (i) + '" data-target="#carouselFooter"></li>');
        }
        return htmlIndicators;
    }

    getPictures(){
        let htmlPictures = '<div class="carousel-item active">\n' +
            '<img alt="Slide number 1" class="d-block w-100" src="' + this.bilder[0] + '">\n' +
            '</div>';
        for (let i = 1; i <= this.anzahl; i++){
            htmlPictures.concat('<div class="carousel-item">\n' +
                '<img alt="Slide number ' + (i + 1) + '" class="d-block w-100" src="' + this.bilder[i] + '">\n' +
                '</div>');
        }
        return htmlPictures;
    }

}

class Head{
    constructor() {
        this.getData();
        this.id;
        this.head;
    }

    //Setzt die ID
    setId(data){
        this.id = data;
    }

    //Setzt die Überschrift
    setHead(data){
        this.head = data;
    }

    //Gibt HTML-Part zur Darstellung der Überschrift zurück
    convertHead(): string
    {
        return this.head;
    }

    //Lädt Überschrift aus Datenbank und vervollständigt die Daten der Klasse
    private getData()
    {
        QueryService.getData("?method=get&target=head")
            .then(response => {
                //konvertiert Daten zu Überschrift
                let data = response.split(",");
                const id = data[0];
                const head = data[1];
                //vervollständigt die Daten der Klasse
                this.setId(id);
                this.setHead(head);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

class Pizza {
    constructor(id, date, timeHH, timeMM, pizza) {
        this.id = id;
        this.date = date;
        this.timeHH = timeHH;
        this.timeMM = timeMM;
        this.pizza = pizza;
    }

    convert_Time() {
        const strHH = this.timeHH.toString();
        const strMM = this.timeMM.toString();
        const convertedHH = strHH.padStart(2, '0');
        const convertedMM = strMM.padStart(2, '0');
        return '<div class="row my-3 justify-content-center border-bottom border-primary">'
            + '<div class="col-md-3">'
            + '<table class="container" style="height: 100%"><tbody><tr>'
            + '<td class="align-middle text-center">'
            + '<h3><i class="fas fa-clock"></i></h3>'
            + '<h3 class="font-weight-bold">' + convertedHH + ':' + convertedMM + '</h3>'
            + '</td>'
            + '</tr></tbody></table>'
            + '</div>'
            + '<div class="col-md-9 p-0">'
            + '<div id="upper-' + convertedHH + ':' + convertedMM + '" class="row mb-3"></div>'
            + '<div id="middle-' + convertedHH + ':' + convertedMM + '" class="row mb-3"></div>'
            + '<div id="lower-' + convertedHH + ':' + convertedMM + '" class="row mb-3"></div>'
            + '</div>'
            + '</div>';
    }

    convert_Pizza() {
        const strID = this.id.toString();
        let strPizza = this.pizza.toString();
        strPizza.padStart(2, '0');
        return '<div class="col-3 pizza" style="padding: 0.2em">\n'
            + '<button id="pizza-' + strID + '" class="btn-sm m-0 p-0" role="button" data-backdrop="static" data-keyboard="false" data-target="#pizzaModal" data-toggle="modal">\n'
            + '<div class="view container border border-elegant">\n'
            + '<img src="./src/data/media/vector/pizza.png" class="card-img" alt="Pizza Symbol">\n'
            + '<p class="text-center font-weight-bold">Nummer ' + strPizza + '</p>\n'
            + '<p id="namePizza-' + strID + '" class="text-center font-weight-bold viewAdmin hidden">&nbsp;</p><p class="text-center font-weight-bold viewUser">&nbsp;</p>\n'
            + '<p id="variantePizza-' + strID + '" class="text-center font-weight-bold">&nbsp;</p>\n'
            + '</img>\n'
            + '<div id="mask-' + strID + '" class="mask point flex-center rgba-green-light">\n'
            + '</div>\n'
            + '</div>\n'
            + '</button>\n'
            + '<button id="btn-delete-buchung-' + strID + '" class="btn m-0 p-0 viewAdmin hidden" role="button">Bestellung löschen</button>\n'
            + '</div>';
    }
}

class Termin {
    constructor() {
        this.getData();
        this.id;
        this.date;
        this.startHH;
        this.startMM;
        this.endHH;
        this.endMM;
        this.intervall;
        this.pizzas;
    }

    //Hold die Daten zum Termin aus der Datenbank und fügt sie dem Termin Objekt hinzu
    getData(){
        const data = QueryService.getData("?method=get&target=termin")
            .then(response => {
                const data = response.split(",");
                this.id = parseInt(data[0]);
                this.date = parseInt(data[1]);
                this.startHH = parseInt(data[2]);
                this.startMM = parseInt(data[3]);
                this.endHH = parseInt(data[4]);
                this.endMM = parseInt(data[5]);
                this.intervall = parseInt(data[6]);
                this.pizzas = parseInt(data[7]);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

class Variante{
    constructor(id) {
        this.id = id;
        this.name;
        this.beschreibung;
        this.getData();
    }

    //Setzt den Namen der Variante
    setName(data){
        this.name = data;
    }

    //Setzt die Beschreibung der Variante
    setBeschreibung(data){
        this.beschreibung = data;
    }

    //Gibt HTML-Part zur Darstellung der Varianten zurück
    convert_Variante(): string
    {
        return '<div class="row-cols-1 border-bottom border-elegant" id="variante-'+this.id+'">\n'
            +'<button id="btn-Variante-'+this.id+'" class="btn w-50 btn-brown" type="button">'+this.name+'</button>\n'
            +'<p>'+this.beschreibung+'</p>\n'
            +'</div>';
    }

    //Gibt HTML-Part zum Bearbeiten der Varianten zurück
    convert_Variante_Edit(): string
    {
        return '<div class="row-cols-1 border-bottom border-elegant" id="pizzaVariante-'+this.id+'">\n'
            +'<p class="font-weight-bold">'+this.name+'</p>\n'
            +'<p>'+this.beschreibung+'</p>\n'
            +'<button id="btn-delete-Variante-'+this.id+'" class="btn btn-danger" type="button">Entfernen</button>\n'
            +'</div>';
    }

    //Lädt Varianten aus Datenbank und vervollständigt die Daten der Klasse
    private getData()
    {
        if (!this.name || !this.beschreibung){
            QueryService.getData("?method=get&target=variante&id=" + this.id)
                .then(response => {
                    //konvertiert Daten zu Varianten
                    let variante = [];
                    variante.id = this.id;
                    variante.name = response["name"];
                    variante.beschreibung = response["beschreibung"];
                    //vervollständigt die Daten der Klasse
                    this.setName(variante.name);
                    this.setBeschreibung(variante.beschreibung);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}

class QueryService{
    public static async getData(parameter){
        return new Promise((resolve, reject) => {
            try {
                const anfrage = new XMLHttpRequest();
                anfrage.open("GET", "./src/data/function.php" + parameter, true);
                anfrage.send();
                let antwortDaten;
                anfrage.onload = function () {
                    const antwortString = (anfrage.responseText).substring(1);
                    antwortDaten = antwortString.split(",");

                    resolve(antwortDaten);
                };
            }
            catch (error){
                reject(error);
            }
        });
    }
}
