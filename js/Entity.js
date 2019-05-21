//Create the Entity, Wall, Grass, Gold, Dungeon and Tradesman class

/*
Entity class definition
- constructor
  - parameters: src (string)
  - Creates an img element and sets the src.
  - Sets the element property to the created img element.
- element (HTMLElement): HTML element for the entity (img element)
- setImg (function)
  - parameters: src (string)
  - Updates the src of the element property
Example use: not used by itself. 
*/

/*
Wall class definition. A Wall is an Entity
- constructor
  - parameters: none
  - Creates a wall entity with the 'wall' img
Example use:
new Wall()
*/

/*
Grass class definition. Grass is an Entity
- constructor
  - parameters: none
  - Creates a grass entity with a random grass image
Example use:
new Grass()
*/

/*
Gold class definition. Gold is an Entity
- constructor
  - parameters: value (number)
  - Creates a gold entity with the 'gold' image and sets the gold value
- value (number): gold value
Example use:
new Gold()
*/

/*
Dungeon class definition. Gold is an Entity
- constructor
  - parameters: isOpen (boolean), hasPrincess (boolean), gold (number), items (Item[])
  - Creates a dungeon entity with the 'open' or 'closed' image depending on isOpen.
- isOpen (boolean)
- hasPrincess (boolean)
- gold (number)
- items (Item[])
- open (function)
  - parameters: none
  - Sets isOpen to true and sets the entity image to 'open'
Example use:
new Dungeon(true, false, 30, [new Potion(2), new Bomb(2)]);
*/

/*
Tradesman class definition. A Tradesman is an Entity
- constructor
  - parameters: items (Item[])
  - Creates a tradesman with items and the tradesman image
- items (Item[])
Example use:
new Tradesman([new Potion(0), new Bomb(0), new Key()]);
*/
