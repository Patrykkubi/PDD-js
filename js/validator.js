let test = "";
let ocena = "";
let isEdit = "";
let isSameEdit = "";
ilosc = 1;
var tab = [];
let gallery = ""
const myTable = document.getElementById("myTable");

function checkAll() {

    let nazwaValid = sprawdzNazwa_Towaru();
    let kodValid = sprawdzkod_towaru();
    let cenanettoValid = sprawdzcena_netto();
    let stawkavatValid = sprawdzstawka_VAT();
    let kategoriaValid = sprawdzKategoria_Towarowa();
    let checkBoxValid = sprawdzCheckBox();
    let radioValid = sprawdzRadio();
    let duplicateValid = sprawdz();
    if (nazwaValid == false) {

        if (kodValid == false) {

            if (cenanettoValid == false) {

                if (stawkavatValid == false) {

                    if (kategoriaValid == false) {

                        if (checkBoxValid == false) {

                            if (radioValid == false) {



                                if (duplicateValid == true) {
                                    if (isEdit == "") {
                                        dodanieproduktu();
                                        alert("Dodano produkt");
                                        return true;
                                    }
                                    return true;
                                }




                            }
                        }
                    }
                }
            }
        }
    }
    return false;



}




function sprawdz() {

    if (isSameEdit == "") {
        let table = document.getElementById('myTable');
        for (let i = 1; i < table.rows.length; i++) {
            let firstCol = table.rows[i].cells[0]; //first column
            if (document.getElementById('myTable').rows[i].cells[0].textContent.toLowerCase() === document.getElementById("Nazwa_Towaru").value.toLowerCase()) {
                alert("Jest już taki przedmiot w tablicy.");
                return false;
            }
        }
    }
    return true;
}




function dodanieproduktu() {

    var edytujWiersz = document.getElementById("edytujWiersz");
    var row = '<tr><td>' + document.getElementById("Nazwa_Towaru").value + '</td><td>' +
        document.getElementById("kod_towaru").value + '</td><td>' +
        document.getElementById("cena_netto").value + '</td><td>' +
        document.getElementById("stawka_VAT").value + '</td><td>' +
        document.getElementById("cena_brutto").value + '</td><td>' +
        document.getElementById("Kategoria_Towarowa").value + '</td><td>' +
        test + '</td><td>' +
        ocena + '</td>' +
        '<td><img src="zdjecia/none.jpg" height="50"></td></td><td>' +
        '<button type="button" class="btn btn-danger" id="button1" onClick="deleteData(this)">kosz</button><br>' +
        '<button type="button" class="btn btn-secondary" id="button2" onClick="editRow(this)">Edytuj</button><br>' +
        '<button type="button" class="btn btn-primary " data-toggle="modal"  id="bt3" onClick="dodajKoszyk(this)">Dodaj do koszyka</td></tr>'


    $row = $(row), console.log(row);
    resort = true;
    $('#myTable')
        .find('tbody').append($row)
        .trigger('addRows', [$row, resort]);

if (gallery == 1)
        pokazGalerie();

}



function deleteData(r) {
    var i = 0
    if (gallery != 1)
        i = r.parentNode.parentNode.rowIndex;
    else
        i = r

    document.getElementById("myTable").deleteRow(i);

    $('#myTable').trigger('updateAll', [$row, resort]);
    if (gallery == 1)
        pokazGalerie()
    alert("usunieto wiersz");

}


function editRow(r) {

    var i = 0
    document.getElementById("Nazwa_Towaru").classList.add('is-valid');
    document.getElementById("kod_towaru").classList.add('is-valid');
    document.getElementById("cena_netto").classList.add('is-valid');
    document.getElementById("stawka_VAT").classList.add('is-valid');
    document.getElementById("Kategoria_Towarowa").classList.add('is-valid');

    $('#myTable').trigger('updateAll', [$row, resort]);

    var table = document.getElementById('myTable');
    tableindeks = r;
    if (gallery != 1)
        i = r.parentNode.parentNode.rowIndex;
    else
        i = r

        
    document.getElementById("Nazwa_Towaru").value = table.rows[i].cells[0].innerHTML;
    document.getElementById("kod_towaru").value = table.rows[i].cells[1].innerHTML;
    document.getElementById("cena_netto").value = table.rows[i].cells[2].innerHTML;
    document.getElementById("stawka_VAT").value = table.rows[i].cells[3].innerHTML;
    document.getElementById("cena_brutto").value = table.rows[i].cells[4].innerHTML;
    document.getElementById("Kategoria_Towarowa").value = table.rows[i].cells[5].innerHTML;
    test = table.rows[i].cells[6].innerHTML;
    ocena = table.rows[i].cells[7].innerHTML;
    document.getElementById("photo").value = table.rows[i].cells[8].innerHTML;

    document.getElementById('singlebutton').innerHTML = 'Edytuj';
    document.getElementById('singlebutton').setAttribute("onClick", "validateForm(" + i + ")");
    document.getElementById('singlebutton').setAttribute("id", "przycisk");

}

function validateForm(i) {
    isEdit = 1;

    $('#myTable').trigger('updateAll', [$row, resort]);

    var table = document.getElementById('myTable');


    if (table.rows[i].cells[0].innerHTML == document.getElementById("Nazwa_Towaru").value) {
        isSameEdit = 1;

    }
   

    if (checkAll()) {
        table.rows[i].cells[0].innerHTML = document.getElementById("Nazwa_Towaru").value;
        table.rows[i].cells[1].innerHTML = document.getElementById("kod_towaru").value;
        table.rows[i].cells[2].innerHTML = document.getElementById("cena_netto").value;
        table.rows[i].cells[3].innerHTML = document.getElementById("stawka_VAT").value;
        table.rows[i].cells[4].innerHTML = document.getElementById("cena_brutto").value;
        table.rows[i].cells[5].innerHTML = document.getElementById("Kategoria_Towarowa").value;
        table.rows[i].cells[6].innerHTML = test;
        table.rows[i].cells[7].innerHTML = ocena;
        table.rows[i].cells[8].innerHTML = document.getElementById("photo").value;
        alert("Pomyslnie edytowano");
    } else {
        alert("niepowodzenie edytowania");
    }
    document.getElementById('przycisk').innerHTML = 'Wyślij';
    document.getElementById('przycisk').setAttribute("onClick", "checkAll()");
    document.getElementById('przycisk').setAttribute("id", "singlebutton");
    $('#myTable').trigger('updateAll', [$row, resort]);
    isEdit = ""
    isSameEdit = ""

    if (gallery == 1)
        pokazGalerie()
    return true;



}



function sprawdzNazwa_Towaru() {

    var formularz_obj = document.getElementById("Nazwa_Towaru");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("Nazwa_Towaru_blad");



    var objRegExp = /^[a-zA-Z]+$/;

    if (t_name === "") {
        blad.innerHTML = "Podaj nazwe towaru";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else if (t_name.length > 10) {
        blad.innerHTML = "Zadluga nazwa (max 10 znakow)";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else if (!objRegExp.test(t_name)) {
        blad.innerHTML = "Musza byc tylko litery";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "Poprawna nazwa";
        blad_danych = false;
    }
    return blad_danych;
}

function sprawdzkod_towaru() {
    var formularz_obj = document.getElementById("kod_towaru");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("kod_towaru_blad");



    var objRegExp = /^\w\w-\w\w$/;

    if (t_name === "") {
        blad.innerHTML = "Podaj nazwe towaru";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else if ((!objRegExp.test(t_name))) {
        blad.innerHTML = "format XX-XX (litery,cyfry)";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "Poprawny kod";
        blad_danych = false;
    }
    return blad_danych;
}

function sprawdzcena_netto() {
    var formularz_obj = document.getElementById("cena_netto");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("cena_netto_blad");



    var objRegExp = /^\d+(.\d{1,2})?$/;

    if (t_name === "") {
        blad.innerHTML = "Podaj cene NETTO towaru";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else if ((!objRegExp.test(t_name))) {
        blad.innerHTML = "Tylko cyfry";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else {
        var n = t_name.includes(".");

        if (n == true) {
            blad.classList.remove("invalid-feedback");
            formularz_obj.classList.remove("is-invalid");
            blad.classList.add("valid-feedback");
            formularz_obj.classList.add("is-valid");
            blad.innerHTML = "Poprawna cena";
            blad_danych = false;
        } else {

            var res = t_name.concat(".00");
            document.getElementById("cena_netto").value = res;

            blad.classList.remove("invalid-feedback");
            formularz_obj.classList.remove("is-invalid");
            blad.classList.add("valid-feedback");
            formularz_obj.classList.add("is-valid");
            blad.innerHTML = "";
            blad_danych = false;
        }


    }
    return blad_danych;
}

function sprawdzstawka_VAT() {
    var formularz_obj = document.getElementById("stawka_VAT");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("stawka_VAT_blad");



    var objRegExp = /^[0-9]*$/;

    if (t_name === "") {
        blad.innerHTML = "Podaj nazwe towaru";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else if ((!objRegExp.test(t_name))) {
        blad.innerHTML = "Podaj tylko cyfry";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else {

        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "Poprawny vat";
        blad_danych = false;
    }
    return blad_danych;
}

function sprawdzcena_brutto() {
    var formularz_obj = document.getElementById("stawka_VAT");
    var vat = formularz_obj.value;

    var formularz_obj = document.getElementById("cena_netto");
    var netto = formularz_obj.value;



    res = parseFloat(((100.0 + parseFloat(vat)) * parseFloat(netto)) / 100.0);

    document.getElementById("cena_brutto").value = res;




    return blad_danych;
}

function sprawdzKategoria_Towarowa() {
    var formularz_obj = document.getElementById("Kategoria_Towarowa");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("Kategoria_Towarowa_blad");
    if (t_name) {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "super";
        blad_danych = false;

    }
    return blad_danych;
}

function sprawdzCheckBox() {

    var blad = document.getElementById("checkBox_blad");
    
    var selected = new Array();
    var tab = document.getElementById("myMenu");
    var tab_input = tab.getElementsByTagName("INPUT");

    
    for (var i = 0; i < tab_input.length; i++) {
        if (tab_input[i].checked) {
            selected.push(tab_input[i].value);
            test += tab_input[i].value + ',';

        }

    }

    if (selected.length == 2) {



        test = "";
        for (var i = 0; i < tab_input.length; i++) {
            if (tab_input[i].checked) {
                test += tab_input[i].value + ',';
            }
        }

        blad.classList.remove("invalid-feedback");
        tab.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        tab.classList.add("is-valid");
        blad.innerHTML = "super";
        blad_danych = false;
    } else {
        blad.innerHTML = "błedny wybor";
        blad.classList.add("invalid-feedback");
        tab.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        tab.classList.remove("is-valid");

        blad_danych = true;
    }


    return blad_danych;

}

function sprawdzRadio() {

    var blad = document.getElementById("radio_blad");
    var selected = new Array();
    var tab = document.getElementById("radio");
    var tab_input = tab.getElementsByTagName("INPUT");

    for (var i = 0; i < tab_input.length; i++) {
        if (tab_input[i].checked) {
            selected.push(tab_input[i].value);
            ocena = tab_input[i].value;
        }
    }

    if (selected.length == 1) {


        blad.classList.remove("invalid-feedback");
        tab.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        tab.classList.add("is-valid");
        blad.innerHTML = "super";
        blad_danych = false;
    } else {
        blad.innerHTML = "Za malo";
        blad.classList.add("invalid-feedback");
        tab.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        tab.classList.remove("is-valid");

        blad_danych = true;
    }


    return blad_danych;

}

function sprawdzPhoto() {
    var formularz_obj = document.getElementById("photo");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("photo_blad");



    if (t_name === "") {
        blad.innerHTML = "Podaj nazwe zdjecia";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
    } else {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "Poprawne";
        blad_danych = false;
    }
    return blad_danych;



}


function sortBy() {
    var selectElem = document.getElementById('sortowanie')
    selectElem.addEventListener('change', function() {
        var index = selectElem.selectedIndex;

        switch (index) {
            case 1:
                $("#myTable").trigger("sorton", [
                    [
                        [2, 0]
                    ]
                ]);
                break;
            case 2:
                $("#myTable").trigger("sorton", [
                    [
                        [2, 1]
                    ]
                ]);

                break;
            case 3:
                $("#myTable").trigger("sorton", [
                    [
                        [7, 0]
                    ]
                ]);
                console.log("ocena od najniższej");
                break;
            case 4:
                $("#myTable").trigger("sorton", [
                    [
                        [7, 1]
                    ]
                ]);
                console.log("ocena od najwyższej");
                break;
            case 5:
                $("#myTable").trigger("sorton", [
                    [
                        [0, 0]
                    ]
                ]);
                break;
            case 6:
                $("#myTable").trigger("sorton", [
                    [
                        [0, 1]
                    ]
                ]);
                break;
        }
        galler();

    });
}


function galler() {

    $("#view").empty();
    $('#myTable').trigger('updateAll', [$row, resort]);
    var table = document.getElementById('myTable');
    var i = 1;
    for (var i = 1; i < table.rows.length; i++) {
        if (i % 4 == 0) {

            setRow(i, table.rows[i].cells[0].innerHTML, table.rows[i].cells[4].innerHTML, table.rows[i].cells[8].innerHTML, table.rows[i].cells[2].innerHTML);
        } else {
            setRow(i, table.rows[i].cells[0].innerHTML, table.rows[i].cells[4].innerHTML, table.rows[i].cells[8].innerHTML, table.rows[i].cells[2].innerHTML);

        }


    }


}

function setRow(i, nazwa, cenabrut, zdjecie, cenanet) {
	
	
    var row = '<div class="obrazki" id="' + nazwa +  'id" name="' + cenabrut + '" >' + zdjecie + '<br><h4 id="' + nazwa + '" class="obrazki_nazwa">' + nazwa + '</h4><h6 id="' + cenabrut + '">' + cenanet + 'zł(' + cenabrut + 'zł)</h6>' +
        '<div class="row"><button type="button" class="btn btn-danger" id="button1" onClick="deleteData(' + i + ')" >-</button>' +
        '<button type="button" class="btn btn-secondary" id="button2" onClick="editRow(' + i + ')">E</button>' +
        '<button type="button" class="btn btn-primary " data-toggle="modal"  id="bt3" onClick="dodajKoszyk(' + i + ')">+</button></div>';
		
		$row = $(row),
        $('#view').append($row);

}
var si = 0;
var size = [];
var indexSame = [];
let itemsArray = [];
let j = 0;


function koszyk() {
    document.getElementById("kup").disabled = false;
    var cena = 0;
    $("#cartBody").empty();
    var shop = localStorage.getItem("koszyk");
    var retrievedObject = JSON.parse(shop);
    if (localStorage.getItem("koszyk") != null) {

        for (var i in retrievedObject) {

            ilosc = checkIlosc(retrievedObject[i].Nazwa)
            index = checkN(retrievedObject[i].Nazwa)
            var imie = retrievedObject[i].Nazwa
            var row = '<tr><td>' + retrievedObject[i].Nazwa + '</td><td>' + retrievedObject[i].Cena + '</td><td>' + ilosc + '</td><td><button type="button" class="btn btn-primary"   onClick="dodaj(' + index + ')">+</button><button type="button" class="btn btn-danger" style="margin:10px" onClick="usun(' + i + ')">-</button></td></tr>';
            $("#cartBody").append(row);
            cena += parseFloat(ilosc) * parseFloat(retrievedObject[i].Cena);

        }
    }
    cena = cena + parseFloat(document.getElementById('dostawa').value);
    cena = cena * 100;
    cena = (cena / 100).toFixed(2);
    document.getElementById("suma").innerHTML = cena;

}

function kup() {
    if (localStorage.getItem('koszyk') != null) {
        localStorage.removeItem('koszyk');
        localStorage.clear();
        window.localStorage.clear();
        tab.length = 0;
        itemsArray.length = 0;
        alert("Kupiono");
    } else {
        alert("pusty koszyk");
        document.getElementById("kup").disabled = true;
    }

}

function checkIlosc(data) {
    var i = 0;
    for (index = 0; index < si; index++) {

        if (data == itemsArray[index]) {
            i = i + 1;

        }

    }
    if (i == 0) {
        i = 1;
    }
    return i;
}

function checkN(data) {
    var i = 0;
    var table = document.getElementById('myTable');
    for (var i = 1; i < table.rows.length; i++) {

        if (data == table.rows[i].cells[0].innerHTML)
            return i;
    }
}

function usun(data) {

    var shop = localStorage.getItem("koszyk");
    var retrievedObject = JSON.parse(shop);

    var i = 0;
    for (index = 0; index < si; index++) {

        if (retrievedObject[data].Nazwa == itemsArray[index]) {

            itemsArray.splice(index, 1);
            $(function() {
                koszyk();
            });
            return true;
        }

    }

}

function dodaj(r) {
    var i = 0
    i = r
    $('#myTable').trigger('updateAll', [$row, resort]);
    var table = document.getElementById('myTable');
    var exist = 0;
    var ilosc = 1;

    for (var it = 0; it < tab.length; it++) {
        if (tab[it].Nazwa == table.rows[i].cells[0].innerHTML) {

            exist = 1;
        }

    }

    itemsArray.push(table.rows[i].cells[0].innerHTML);
    itemsArray.push(table.rows[i].cells[1].innerHTML);
    itemsArray.push(table.rows[i].cells[2].innerHTML);
    itemsArray.push(table.rows[i].cells[3].innerHTML);
    itemsArray.push(table.rows[i].cells[4].innerHTML);
    itemsArray.push(table.rows[i].cells[5].innerHTML);
    itemsArray.push(table.rows[i].cells[6].innerHTML);
    itemsArray.push(table.rows[i].cells[7].innerHTML);
    itemsArray.push(table.rows[i].cells[8].innerHTML);
    size.push(itemsArray.length);
    si = itemsArray.length;

    var myJSON = {
        Nazwa: table.rows[i].cells[0].innerHTML,
        Cena: table.rows[i].cells[4].innerHTML
    };

    if (exist == 0) {
        tab.push(myJSON);
        localStorage.setItem('koszyk', JSON.stringify(tab));
    } else {
        localStorage.setItem("koszyk", JSON.stringify(tab));
    }


    $(function() {
        koszyk();
    });


}

function dodajKoszyk(r) {
    var i = 0
    if (gallery != 1)
        i = r.parentNode.parentNode.rowIndex;
    else
        i = r
    $('#myTable').trigger('updateAll', [$row, resort]);
    var table = document.getElementById('myTable');
    var exist = 0;
    var ilosc = 1;

    for (var it = 0; it < tab.length; it++) {
        if (tab[it].Nazwa == table.rows[i].cells[0].innerHTML) {

            exist = 1;
        }

    }

    itemsArray.push(table.rows[i].cells[0].innerHTML);
    itemsArray.push(table.rows[i].cells[1].innerHTML);
    itemsArray.push(table.rows[i].cells[2].innerHTML);
    itemsArray.push(table.rows[i].cells[3].innerHTML);
    itemsArray.push(table.rows[i].cells[4].innerHTML);
    itemsArray.push(table.rows[i].cells[5].innerHTML);
    itemsArray.push(table.rows[i].cells[6].innerHTML);
    itemsArray.push(table.rows[i].cells[7].innerHTML);
    itemsArray.push(table.rows[i].cells[8].innerHTML);
    size.push(itemsArray.length);
    si = itemsArray.length;

    var myJSON = {
        Nazwa: table.rows[i].cells[0].innerHTML,
        Cena: table.rows[i].cells[4].innerHTML,
        Ilosc: 1
    };

    if (exist == 0) {
        tab.push(myJSON);
        localStorage.setItem('koszyk', JSON.stringify(tab));
    } else {
        localStorage.setItem("koszyk", JSON.stringify(tab));
    }



    alert("dodano do koszyka");


}
var mydata = 0
var seenNames = {};

function checkDuplicate(data) {
    if (document.querySelector("td[id='" + data + "']")) {
        return false
    } else {
        return true
    }
}

function fromFileJson() {

    mydata = JSON.parse(JSON.stringify(lista));

    mydata.forEach((element) => {
        if (checkDuplicate(element.nazwa)) {
            var row = '<tr><td id="' + element.nazwa + '">' + element.nazwa + '</td>' +
                '<td>' + element.kod + '</td><td>' +
                element.cena_netto + '</td><td>' +
                element.vat + '</td><td>' +
                element.cena_brutto + '</td><td>' +
                element.kategoria + '</td><td>' +
                element.opcja + '</td><td>' +
                element.ocena + '</td>' +
                '<td><img src="' + element.zdjecie + '" height="50"></td>' +
                '<td><button type="button" class="btn btn-danger" id="button1" onClick="deleteData(this)">Usuń</button><br>' +
                '<button type="button" class="btn btn-secondary" id="button2" onClick="editRow(this)">Edytuj</button><br>' +
                '<button type="button" class="btn btn-primary " data-toggle="modal"  id="bt3" onClick="dodajKoszyk(this)">Dodaj do koszyka</td></tr>'
            $row = $(row),
                resort = true;
            $('#myTable')
                .find('tbody').append($row)
                .trigger('updateAll', [$row, resort]);
        }
    })
   
pokazTabele();
}


function pokazTabele() {
    document.getElementById("myTable").removeAttribute("hidden");
    document.getElementById("view").setAttribute("hidden", "true");
    gallery = ""
}

function pokazGalerie() {
	
    document.getElementById("myTable").setAttribute("hidden", "true");
    document.getElementById("view").removeAttribute("hidden");
    gallery = 1
    $("#view").empty();
    $('#myTable').trigger('updateAll', [$row, resort]);
    var table = document.getElementById('myTable');
    for (var i = 1; i < table.rows.length; i++) {
        if (i % 4 == 0 ) {
			
            setRow(i, table.rows[i].cells[0].innerHTML, table.rows[i].cells[4].innerHTML, table.rows[i].cells[8].innerHTML, table.rows[i].cells[2].innerHTML);
        } else {
			
            setRow(i, table.rows[i].cells[0].innerHTML, table.rows[i].cells[4].innerHTML, table.rows[i].cells[8].innerHTML, table.rows[i].cells[2].innerHTML);

        }


    }


}
