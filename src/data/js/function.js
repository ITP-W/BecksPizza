
$(document).ready(function () {
//init
    loadSite()
        .then(response => {
            console.log("Daten aktuell: " + response);
        })
        .catch(error => {
            console.log("Fehler beim Laden von " + error);
        });
});
