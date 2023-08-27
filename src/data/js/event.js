
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