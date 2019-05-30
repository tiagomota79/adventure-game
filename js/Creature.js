//Create the Creature and Monster class

/*
The Creature class is an Entity. It has the following properties (not including inherited properties):
- constructor
  - parameters: name (string), img (string), level (number), items (Item[]), gold (number)
- name (string)
- img (string - path to image)
- level (number)
- items (array of Item objects)
- gold (number)
- hp (number): level * 100
- strength (number): level * 10
- attackSpeed (number): 3000 / level
- getMaxHp (function)
  - parameters: none
  - returns max hp (level * 100)
- hit (function)
  - parameters: val (number)
  - decreases hp by val. Hp cannot go under 0
- attack (function)
  - parameters: entity (Creature)
  - hits the entity with strength value
  - sets an attack timeout that expires after attackSpeed. While the timeout is active, this method immediately returns false, else returns true.
Example use: not used by itself. 
*/

class Creature extends Entity {
  constructor(name, img, level, items, gold) {
    super(img);
    this.name = name;
    this.level = level;
    this.items = items;
    this.gold = gold;
    this.hp = this.level * 100;
    this.strength = this.level * 10;
    this.attackSpeed = 3000 / this.level;
  }
  getMaxHp() {
    return this.level * 100;
  }
  attack(entity) {
    entity.hp -= this.strength;
    entity.hp = Math.max(0, entity.hp);
    this.attackTimeOut = setTimeout(() => {
      this.attackTimeOut = null;
      return false;
    }, this.attackSpeed);
    return true;
  }
}

/*
The Monster class is a Creature. It has the following properties (bot including inherited properties):
- constructor
  - parameters: name (string), level (number), items (Item[]), gold (number)
- name (string): name must be valid (from MONSTER_NAMES)
- level (number)
- items (array of Item objects)
- gold (number)
- attack (function)
  - parameters: entity (Creature)
  - calls the attack method from Creature (use super) and plays the 'mattack' sound if the attack was successful
Example use:
new Monster('Anti Fairy', 1, [], 0); // Creates a Monster named Anti Fairy, level 1, no items and 0 gold. Only the name is required.
*/

class Monster extends Creature {
  constructor(name, level, items, gold) {
    super(
      name,
      `alt_imgs/monsters/${name.replace(/ /g, '')}.png`,
      level,
      items,
      gold
    );
  }
  attack(entity) {
    if (super.attack(entity)) playSound('mattack');
  }
}
