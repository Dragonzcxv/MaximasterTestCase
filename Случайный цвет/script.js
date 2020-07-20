let width = null;
let height = null;
let randomColor = null;

function ChangeBlock() {
    let inputs = document.getElementsByTagName("input");
    let block = document.getElementById("СhangingBlock");

    width = inputs[0].value;
    height = inputs[1].value;

    if (width && height) {
        block.style.width = width + "px";
        block.style.height = height + "px";
        block.style.width = width + "px";
        block.style.height = height + "px";
        block.style.display = "block";
    }
    else{
        block.style.display = "none";
    }
}

function GetRandomColor() {
    let block = document.getElementById("СhangingBlock");
    
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    randomColor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
    block.style.backgroundColor = randomColor;
}
