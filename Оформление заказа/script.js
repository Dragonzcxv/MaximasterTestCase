ymaps.ready(Init);
let myMap = null;

function Init() {
    myMap = new ymaps.Map("map", {
        center: [54.190974, 37.620626],
        zoom: 16
    });

    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentBody:
                    '<p>Координаты точки: ' + [
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
            });
        }
        else {
            myMap.balloon.close();
        }
    });
}

function DisplayPoint() {
    if (myMap) {
        myMap.geoObjects.add(new ymaps.Placemark([54.190974, 37.620626], {
            balloonContent: "Координаты доставки: 54.190974, 37.620626",
            iconCaption: "Место доставки"
        }, {
            preset: 'islands#redSportIcon'
        }));
    }
}


function CheckValidation() {
    let name = document.getElementById("name");
    let phone = document.getElementById("phone");
    let email = document.getElementById("email");
    let li = null;

    name.style.border = "1px solid black";
    phone.style.border = "1px solid black";
    email.style.border = "1px solid black";
    let listError = document.getElementById("errorList");
    listError.style.color = "red";
    
    listError.innerHTML = "";

    if (!/[a-zа-я]+/i.test(name.value)) {
        li = document.createElement("li");
        li.innerHTML = "Вы не заполнили поле ФИО!"
        listError.append(li);
        name.style.border = "1px solid red";
    }

    if (!/[0-9]+/.test(phone.value)) {
        li = document.createElement("li");
        li.innerHTML = "Вы не заполнили поле \"Телефон\"!"
        listError.append(li);
        phone.style.border = "1px solid red";
    }
    else if(!/^[0-9]+$/m.test(phone.value)) {
        li = document.createElement("li");
        li.innerHTML = "Поле \"Телефон\" должно содержать только цифры!";
        listError.append(li);
        phone.style.border = "1px solid red";
    }

    if(!/@+/.test(email.value)){
        li = document.createElement("li");
        li.innerHTML = "Поле \"Email\" должно содержать символ @!";
        listError.append(li);
        email.style.border = "1px solid red";
    }
    
    if(listError.childElementCount == 0){
        li = document.createElement("li");
        li.innerHTML = "Заказ оформлен!";
        listError.style.color = "black";
        listError.append(li);
    }
}