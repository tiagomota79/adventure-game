//Create the Item, Potion, Bomb and Key class

/*
Item class definition. Item is an Entity
- constructor
  - parameters: value (number), rarity (number), type (string)
  - Creates an item with the correct image (depends on type).
  - Sets the name based on the rarity (with ITEM_RARITIES) and the type.
- name (string)
- value (number)
- rarity (number)
- sound (Audio object - type is used for the sound file path)
Example use: not used by itself. 
*/

class Item extends Entity {
  constructor(value, rarity, type) {
    super();
    this.value = value;
    this.rarity = rarity;
    this.type = type;
    // this.sound = sound;
  }
}

/*
Potion class definition. Potion is an Item
- constructor
  - parameters: rarity (number)
  - Creates a potion with type 'potion' and a value based on rarity: (rarity + 1) * 10
- potency (number): (rarity + 1) * 10
- use (function)
 - parameters: target (Creature)
 - Restores hp of target by potency value. HP of target can't go past its max HP.
 - Plays the item sound
Example use:
new Potion(0) // potion rarity 0
*/

class Potion extends Item {
  constructor(rarity) {
    super((rarity + 1) * 10, rarity, `${ITEM_RARITIES[rarity]} potion`);
    this.potency = (this.rarity + 1) * 10;
    this.setImage('alt_imgs/items/potion.png');
    this.sound = 'sounds/potion.wav';
  }
  use(target) {
    target.hp += this.potency;
    target.hp = Math.min(target.getMaxHp(), target.hp);
    playSound('potion');
  }
}

/*
Bomb class definition. Bomb is an Item
- constructor
  - parameters: rarity (number)
  - Creates a bomb with type 'bomb' and a value based on rarity: (rarity + 1) * 20
- damage (number): (rarity + 1) * 30
- use (function)
 - parameters: target (Creature)
 - Damages hp of target by damage value. HP of target can't be lower than 0.
 - Plays the item sound
Example use:
new Bomb(0) // bomb rarity 0
*/

class Bomb extends Item {
  constructor(rarity) {
    super((rarity + 1) * 20, rarity, `${ITEM_RARITIES[rarity]} bomb`);
    this.damage = (this.rarity + 1) * 30;
    this.setImage('alt_imgs/items/bomb.png');
    this.sound = 'sounds/bomb.wav';
  }
  use(target) {
    target.hp -= this.damage;
    target.hp = Math.max(0, target.hp);
    playSound('bomb');
  }
}

/*
Key class definition. Key is an Item
- constructor
  - parameters: none
  - Creates a key with value 100, rarity 3 and type 'key'
- use (function)
 - parameters: target (Dungeon)
 - opens the dungeon and plays the item sound if the dungeon does not have the princess
Example use:
new Key(0) // bomb rarity 0
*/

class Key extends Item {
  constructor() {
    super(100, 3, 'Key');
    this.setImage('alt_imgs/items/key.png');
    this.sound = 'sounds/key.wav';
  }
  use(target) {
    playSound('key');
  }
}
