let select;
let getRequest;
let postRequest;
let button;
let weightInput;
let answer;
let cities;

document.addEventListener("DOMContentLoaded", () => {
    select = document.getElementById("cities");
    button = document.getElementById("button");
    weightInput = document.getElementById("weight");
    answer = document.getElementById("answer");
    
    getRequest = new XMLHttpRequest();

    getRequest.open('GET', 'server.php', true);

    getRequest.addEventListener('readystatechange', () => {
        if((getRequest.readyState == 4) && (getRequest.status == 200)){
            cities = JSON.parse(getRequest.responseText);
            FillSelect(cities);
        }
    });

    getRequest.send();



    button.addEventListener("click", () => {
        postRequest = new XMLHttpRequest();
    
        if (/^[0-9]+$/.test(weightInput.value)) {
            let mass = [select.value, weightInput.value];
            let data = JSON.stringify(mass);
            postRequest.open('POST', 'server.php', true);
    
            postRequest.addEventListener('readystatechange', () => {
                if ((postRequest.readyState == 4) && (postRequest.status == 200)) {
                    let result = JSON.parse(postRequest.responseText);
                    answer.innerHTML = "";
                    answer.append(result.message);
                }
            });
    
            postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            postRequest.send('data=' + encodeURIComponent(data));
        }
        else{
            alert("Введите целое число в строку веса");
        }
    });

});



function FillSelect(cities){
    
    cities.sort((x,y) => {
        return x == "Москва" ? -1 : y == "Москва" ? 1 : 0;
    });

    cities.forEach(city => {
        let option = document.createElement("option");
        option.innerHTML = city;
        select.append(option);
    });

}