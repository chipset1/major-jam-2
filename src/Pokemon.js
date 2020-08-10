import Tackle from "./moves/Tackle.js";
import Growl from "./moves/Growl.js";

export function create(p, data){
  data.attack = 40;
  data.health = 100;
  data.maxHealth = 100;
  data.moves = {tackle: new Tackle(p),
                growl: new Growl(p)};
  return data;
}

export function getMoveNames(pokemon){
  return Object.keys(pokemon.moves);
}

export function draw(p, spriteSheet, pokemon, x, y){
  let sprite = pokemon.sprite;
  p.image(spriteSheet, x, y, sprite.width * sprite.scale, sprite.height * sprite.scale,
               sprite.x, sprite.y, sprite.width, sprite.height);
}