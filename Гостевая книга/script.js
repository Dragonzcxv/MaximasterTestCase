document.addEventListener("DOMContentLoaded", () => {
    let button = document.getElementById("formsButton");
    let guestChat = document.getElementById("guestsBook");
    let request = new XMLHttpRequest();

    request.open('GET', 'messages.php', true);

    request.addEventListener('readystatechange', () => {
        if((request.readyState == 4) && (request.status == 200)){
            let data = JSON.parse(request.responseText);
            FillChat(data, guestChat);
        }
    });

    request.send();

    button.addEventListener("click", () => {
        let name = document.getElementById("inputName").value;
        if(!/[^ ]+/i.test(name)){
            name = "Аноним";
        }
        let text = document.getElementById("textArea").value;
        let date = new Date();
        console.log("тит");

        let mass = [name, date, text];
        let data = JSON.stringify(mass);

        if(/[^ ]+/i.test(text)){
            console.log("тит");
            request.open('POST', 'messages.php', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send('data=' + encodeURIComponent(data));
        }
        else{
            alert("Поле сообщения должно содержать хотябы один символ");
        }

    });

});


function FillChat(data, linkChat){

    linkChat.innerHTML = "";
    
    data.forEach(element => {
        let messageBox = document.createElement('div');
        messageBox.className = "messageInChat";

        let date = document.createElement('div');
        date.innerHTML = element[2];

        let name = document.createElement('div');
        name.id = "name";
        name.innerHTML = element[1];

        let text = document.createElement('div');
        text.id = "messageText";
        text.innerHTML = element[3];

        messageBox.append(date);
        messageBox.append(name);
        messageBox.append(text);
        linkChat.append(messageBox);
    });

}