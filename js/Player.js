//Create the Player class

/*
Player class definition. Player is a Creature
- constructor
  - parameters: name (string), position (Position), board (Board), level (number), items (Item[]), gold (number)
  - Sets the attackSpeed to 2000 / level
  - Sets the exp to 0
  - Sets the position and board
- attackSpeed (number)
- exp (number)
- position (Position)
- board (Board)
- render (function)
  - parameters: root (HTMLElement)
  - Appends the element to the root (the board HTML element)
  - Updates the player position
- update (function)
  - parameters: none
  - Updates the player's HTML element position based on its position property and ENTITY_SIZE
- moveToPosition (Position)
  - moves to position specified unless it is a Wall entity.
  - updates player (update method)
- move (function)
  - parameters: direction (string)
  - Sets the player image based on direction and moves to new position
- pickup (function)
  - parameters: entity (Item || Gold)
  - Adds item or gold and plays the corresponding sound ('loot' or 'gold' respectively)
- attack (function)
  - parameters: (entity)
  - calls the attack method from Creature (use super) and plays the 'pattack' sound if the attack was successful
- buy (function)
  - parameters: item (Item), tradesman (Tradesman)
  - updates gold and items for both player and tradesman.
  - Plays the trade sound
  - returns true if successful trade, false if gold is insufficient
- sell (function)
  - parameters: item (Item), tradesman (Tradesman)
  - updates gold and items for both player and tradesman.
  - Plays the trade sound
  - returns true if successful trade, false if gold is insufficient
- useItem (function)
  - parameters: item (Item), target (Creature)
  - uses the item on the target and removes it from the player
- loot (function)
  - parameters: entity (Monster || Dungeon)
  - Updates gold and items for both player and dungeon or monster.
  - plays the loot sound
- getExpToLevel (function)
  - parameters: none
  - returns exp needed to level: level * 10
- getExp (function)
  - parameters: entity (Monster)
  - adds exp based on entity level (level * 10)
  - level up if enough exp. It is possible to level up multiple times at once if enough exp is earned (e.g. beat enemy level 3)
- levelUp (function)
  - parameters: entity (Monster)
  - Increments level, sets hp to max hp
  - updates strength (level * 10) and attack speed (3000 / level)
  - plays levelup sound
Example use:
new Player('Van', new Position(5, 5), new Board(10, 10), 1, [new Potion(0)]);
*/

class Player extends Creature {
  constructor(name, position, board, level, items, gold) {
    super(name, 'alt_imgs/player/front.gif', level, items, gold);
    this.position = position;
    this.board = board;
    this.attackSpeed = 2000 / this.level;
    this.exp = 0;
  }
  render(root) {
    this.root = root;
    this.update();
    this.root.appendChild(this.element);
  }
  update() {
    this.element.style.top = this.position.row * ENTITY_SIZE + 'px';
    this.element.style.left = this.position.column * ENTITY_SIZE + 'px';
    this.element.style.position = 'absolute';
    this.element.style.zIndex = 100;
  }
  moveToPosition(position) {}
  move(direction) {
    switch (direction) {
      case 'L':
        if (this.position.column - 1 === 0) {
          return;
        } else {
          this.position.column -= 1;
          this.setImage('alt_imgs/player/left.gif');
        }
        break;
      case 'R':
        if (this.position.column + 1 === board.rows[0].length - 1) {
          return;
        } else {
          this.position.column += 1;
          this.setImage('alt_imgs/player/right.gif');
        }
        break;
      case 'U':
        if (this.position.row - 1 === 0) {
          return;
        } else {
          this.position.row -= 1;
          this.setImage('alt_imgs/player/back.gif');
        }
        break;
      case 'D':
        if (this.position.row + 1 === board.rows.length - 1) {
          return;
        } else {
          this.position.row += 1;
          this.setImage('alt_imgs/player/front.gif');
        }
        break;
    }
    this.render(this.root);
  }
  pickup(item) {
    if (item instanceof Item) {
      this.items = this.items.concat(item);
      playSound('loot');
    } else if (item instanceof Gold) {
      this.gold += item.value;
      playSound('gold');
    }
  }
  attack(entity) {
    if (super.attack(entity)) playSound('pattack');
  }
  buy(item, tradesman) {
    if (this.gold >= item.value) {
      tradesman.gold += item.value;
      this.gold -= item.value;
      this.items = this.items.concat(item);
      remove(tradesman.items, item);
      return true;
    }
    return false;
  }
  sell(item, tradesman) {
    this.gold += item.value;
    tradesman.items = tradesman.items.concat(item);
    remove(this.items, item);
  }
  useItem(item, target) {
    item.use(target);
    remove(this.items, item);
  }
  loot(entity) {
    this.gold += entity.gold;
    entity.gold = 0;
    this.items = this.items.concat(entity.items);
    entity.items = [];
    playSound('loot');
  }
  getExpToLevel() {
    return this.level * 10;
  }
  getExp(entity) {
    this.exp += entity.level * 10;
    if (this.exp >= this.getExpToLevel()) {
      this.levelUp(entity);
    }
  }
  levelUp(entity) {
    this.level = Math.max(this.level + 1, entity.level);
    this.hp = this.getMaxHp();
    this.strength = this.level * 10;
    this.attackSpeed = 3000 / this.level;
    playSound('levelup');
  }
}
