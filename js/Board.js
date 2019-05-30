//Create the Position and Board class

/*
Position class definition
- constructor
  - parameters: row (number), column (number)
- row (number): index of the board row 
- column (number): index of the board column
Example use:
const position = new Position(0, 0); // row 0, column 0
*/

class Position {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

/*
Board class definition
- constructor
  - parameters: rows (number), columns (number)
  - Creates the array of rows and fills them with Wall and Grass entities.
- rows (array): 2D Array of rows. Each row is an array of Entity objects.
- root (HTMLElement) - HTML element in which the board elements are appended
- render (function)
  - parameters: root (HTMLElement)
  - Sets the root property
  - Used to create the HTML elements for the board and append the elements to the root element.
- update (function)
 - parameters: none
 - replaces the HTML element for each entity that has changed (e.g. Monster -> Grass)
- setEntity (function)
  - parameters: entity (Entity), position (Position)
  - Sets the Entity object at the specified position and updates the Board (using the update method)
- getEntity (function)
  - parameters: position (Position)
  - returns the Entity at the specified position
Example use:
const board = new Board(20, 20); // Creates a Board object with 20 rows, 20 columns, Wall entities (at the edges) and Grass entities.
*/

class Board {
  constructor(rows, columns) {
    this.rows = [];
    for (let i = 0; i < rows; i++) {
      this.rows[i] = [];
      for (let j = 0; j < columns; j++) {
        if (i === 0 || j === 0 || i === rows - 1 || j === columns - 1) {
          this.rows[i].push(new Wall());
        } else {
          this.rows[i].push(new Grass());
        }
      }
    }
  }
  render(root) {
    this.root = root;
    for (let k = 0; k < this.rows.length; k++) {
      const boardRow = document.createElement('div');
      boardRow.classList = 'row';
      for (let l = 0; l < this.rows[k].length; l++) {
        boardRow.appendChild(this.rows[k][l].element);
        root.appendChild(boardRow);
      }
    }
  }
  setEntity(entity, position) {
    let oldChild =
      boardElement.childNodes[position.row].childNodes[position.column];
    boardElement.childNodes[position.row].replaceChild(
      entity.element,
      oldChild
    );
    board.rows[position.row][position.column] = entity;
  }
  getEntity(position) {
    return board.rows[position.row][position.column];
  }
}
