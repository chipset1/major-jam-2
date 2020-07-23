export function create(spriteSheet, data){
  data.attack = 40;
  data.health = 100;
  data.maxHealth = 100;
  data.spriteSheet = spriteSheet;
  return data;
}

export function getMoveNames(pokemon){
  return Object.keys(pokemon.moves);
}

export function draw(p, pokemon, x, y){
  let sprite = pokemon.sprite;
  p.image(pokemon.spriteSheet, x, y, sprite.width * sprite.scale, sprite.height * sprite.scale,
               sprite.x, sprite.y, sprite.width, sprite.height);
}