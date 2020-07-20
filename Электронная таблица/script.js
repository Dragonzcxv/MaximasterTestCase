let table = document.getElementById("table");
let itemsTable = new TableItems(table);
itemsTable.DisplayTable();
setInterval(() => itemsTable.Save(), 10000);



