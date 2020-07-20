const URL_DATA = "http://exercise.develop.maximaster.ru/service/products/";
let table = null;
let data = null;

document.addEventListener("DOMContentLoaded", (event) => {
    StartTableWithJsonData(URL_DATA);
});


async function StartTableWithJsonData(url) {

    let response = null;
    
    response = await fetch(url);
    
    if (response.ok) {
        data = await response.json();
        table = document.getElementById("table");
        FillTable(table, data);
    }
}

function FillTable(table, data, filterMin = 0, filterMax = 0) {
    while (table.childElementCount != 1) {
        table.removeChild(table.lastChild)
    };

    let id = 1;
    data.forEach(element => {
        if ((element.price < filterMax || filterMax == 0) && element.price > filterMin) {
            let row = document.createElement("tr");
            row.append(CreateColumn(id));
            row.append(CreateColumn(element.name));
            row.append(CreateColumn(element.quantity));
            row.append(CreateColumn(element.price));
            row.append(CreateColumn(element.quantity * element.price));
            table.append(row);
            id++;
        }
    });
    if(table.childElementCount == 1){
        CreateErrorMessage(table);
    }
}

function FilterTable() {
    let message = document.getElementById("ErrorMessage");
    if(message){
        message.remove();
    }
    let regex = /^[0-9]+$/;
    let minFilter = document.getElementById("minFilter").value;
    let maxFilter = document.getElementById("maxFilter").value;
    if(regex.test(minFilter) && regex.test(maxFilter)){
        FillTable(table, data, minFilter, maxFilter);
    }
    else{
        alert("Поля могут содержать только цифры!");
    }

}


function CreateErrorMessage(table){
    let message = document.createElement("p");
    message.id = "ErrorMessage";
    message.innerHTML = "Нет данных, попадающих под условие фильтра";
    table.after(message);
}



function CreateColumn(value){
    let colum = document.createElement("td");
    colum.innerHTML = value;
    return colum;
}
