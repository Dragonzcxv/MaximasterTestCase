class TableCell {
    _linkElement;
    _input;

    toJSON(){
        return this._input.value;
    }

    constructor(linkElement, value) {
        this._linkElement = linkElement;
        this._input = document.createElement("input");
        this._input.value = value;
        this._input.readOnly = "true";
        this._input.type = "Text";
        this._input.ondblclick = () => { this._doubleClickEvent() };
        this._input.onblur = () => { this._exitCell() };
        this._linkElement.append(this._input);
    }

    _doubleClickEvent() {
        this._input.readOnly = "";
    }

    _exitCell() {
        this._input.readOnly = "true";
    }

    get LinkElement() {
        return this._linkElement
    }

    get Value() {
        return this._input.value;
    }

    set Value(value) {
        this._input.value = value;
    }
}

class TableRow {
    _cells = new Array();
    _rowLink;

    toJSON(){
        return this._cells;
    }

    constructor(rowLink) {
        this._rowLink = rowLink;
    }

    get RowLink() {
        return this._rowLink;
    }

    get Cells() {
        return this._cells;
    }

    /**
     * Возвращает длинну строки
     * @returns {number}
     */
    GetLenght() {
        return this._cells.length;
    }

    /**
    * Создаёт ячейку в строке
    * @param {HTMLElement} linkElement - ссылка на новый элемент "td"
    * @param {number} value - начальное значение ячейки
    */
    AddCell(linkElement, value) {
        this._cells.push(new TableCell(linkElement, value));
        this._rowLink.append(linkElement);
    }

    _getLastCellValue() {
        return this._cells[this._cells.length - 1].Value;
    }


    /**
    * Удаляет последнюю ячейку
    */
    DeleteLastCell() {
        this._cells.pop();
        this._rowLink.removeChild(this._rowLink.lastChild);
    }
}

class TableItems {
    _items = new Array();
    _linkTable;
    _serialValues;
     
    toJSON(){
        return{
            columnLenght: this._items[0].GetLenght(),
            rowLenght: this._items.length,
            cellsValue: this._items
        }
    }

    constructor(linkTable) {
        this._linkTable = linkTable;
        if(localStorage.getItem('TableStorage')){
            this.serialItems = JSON.parse(localStorage.getItem('TableStorage'));
            this._uploadTable();
        }
        else{
            this.serialItems = JSON.stringify(this);
            localStorage.setItem('TableStorage', this.serialItems);
        }   
    }

    /**
    * Создаёт строку
    */
    AddRow() {
        let newRow = new TableRow(document.createElement("tr"));
        this._items.push(newRow);

        for (let i = 0; i < this._items[0].GetLenght(); i++) {
            newRow.AddCell(document.createElement("td"), null);
        }
        this.DisplayTable();
    }


    _uploadTable(){
        this._linkTable.innerHTML = "";
        for(let i = 0; i < this.serialItems.rowLenght; i++){
            let newRow = new TableRow(document.createElement("tr"));
            this._items.push(newRow);
            for(let k = 0; k < this.serialItems.columnLenght; k++){
                newRow.AddCell(document.createElement("td"), this.serialItems.cellsValue[i][k]);
            }
        }
    }

    Save(){
        this.serialItems = JSON.stringify(this);
        localStorage.setItem('TableStorage', this.serialItems);
        console.log("Сохранено");
    }

    /**
    * Создаёт колонку
    */
    AddColumn() {
        for (let i = 0; i < this._items.length; i++) {
            this._items[i].AddCell(document.createElement("td"), null);
        }
        this.DisplayTable();
    }

    /**
    * Удаляет последнюю строку
    */
    DeleteRow() {
        if (this._items.length > 1) {
            if (this._checkRowValues()) {
                this._items.pop();
            }
        }
        this.DisplayTable();
    }

    /**
    * Удаляет последний стробец
    */
    DeleteColumn() {
        if (this._items[0].GetLenght() > 1) {
            if (this._checkColumnValues()) {
                this._items.forEach(element => {
                    element.DeleteLastCell();
                });
            }
        }
        this.DisplayTable();
    }

    _checkRowValues() {
        for (let element of this._items[this._items.length - 1].Cells) {
            if (element.Value) {
                if (this._choseDialog()) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }

    _checkColumnValues() {
        for (let element of this._items) {
            if (element._getLastCellValue()) {
                if (this._choseDialog()) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }

    /**
    * Обновляет отображение таблицы
    */
    DisplayTable() {
        this._linkTable.innerHTML = "";
        this._items.forEach(element => {
            this._linkTable.append(element.RowLink);
        });
    }

    _choseDialog() {
        if (confirm("Ячейки содержат данные. Удалить?")) {
            return true;
        }
        else {
            return false;
        }
    }
}