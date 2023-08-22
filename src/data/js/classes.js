class Termin {
    constructor(id, date, startHH, startMM, endHH, endMM, intervall, pizzas) {
        this.id = id;
        this.date = date;
        this.startHH = startHH;
        this.startMM = startMM;
        this.endHH = endHH;
        this.endMM = endMM;
        this.intervall = intervall;
        this.pizzas = pizzas;
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

class Bestellung {
    constructor(vorn, nachn, pizza, variante) {
        this.vorn = vorn;
        this.nachn = nachn;
        this.pizza = pizza;
        this.variante = variante;
    }
}

class Variante{
    constructor(id, name, beschreibung) {
        this.id = id;
        this.name = name;
        this.beschreibung = beschreibung;
    }

    convert_Variante(){
        return '<div class="row-cols-1 border-bottom border-elegant" id="variante-'+this.id+'">\n'
            +'<button class="btn w-50 btn-brown" id="btn-Variante-'+this.id+'" type="button">'+this.name+'</button>\n'
            +'<p>'+this.beschreibung+'</p>\n'
            +'</div>';
    }

    convert_Variante_Edit(){
        return '<div class="row-cols-1 border-bottom border-elegant" id="pizzaVariante-'+this.id+'">\n'
            +'<p class="font-weight-bold">'+this.name+'</p>\n'
            +'<p>'+this.beschreibung+'</p>\n'
            +'<button id="btn-delete-Variante-'+this.id+'" class="btn btn-danger" type="button">Entfernen</button>\n'
            +'</div>';
    }
}

class Carousel{
    constructor(anzahl, bilder) {
        this.anzahl = anzahl;
        this.bilder = bilder;
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