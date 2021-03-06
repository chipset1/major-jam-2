import p5 from "p5/lib/p5.min";
import BattleScreen from "./BattleScreen.js";
import Player from "./Player.js";
import * as Pokemon from "./Pokemon.js";
import Map from "./Map.js";

let sketch = (p) =>{
  let battleScreen, player, map, wildPokemon, spriteSheet;
  p.setup = () => {
    p.createCanvas(640, 640);
    p.noSmooth();
    spriteSheet = p.loadImage("assets/sprite-sheet.png");
    player = new Player(p, spriteSheet, p.width / 2, p.height / 2);
    wildPokemon = makeWildPokemon();
    battleScreen = new BattleScreen(p);
    map = new Map(p, spriteSheet);
  };

  p.draw = () => {
    p.push();
    // p.translate(-(player.pos.x-(p.width/2)+player.size/2), -(player.pos.y - (p.height/2)+player.size/2));
    if(map.inGrass(player.pos)) pokemonEncounter();
    if(!battleScreen.isActive()) player.update();
    map.draw();
    player.draw();
    p.pop();
    if(battleScreen.isActive()){
      battleScreen.update();
      battleScreen.draw(spriteSheet);
    }
  };

  p.keyPressed = () => {
    battleScreen.keyPressed();
    if(p.keyCode === p.ENTER && !battleScreen.isActive()) battleScreen.transitionToScreen(player.getPokemon(), Object.create(p.random(wildPokemon)));
  };

  function makeWildPokemon(){
    let pokemon = [];
    pokemon.push(Pokemon.create(p, {name: "Saurbulb",
                                    sprite: {x: 0,
                                             y: 39,
                                             width:32,
                                             height:32,
                                             scale: 6}}));
    pokemon.push(Pokemon.create(p, {name: "Worm-mon",
                                    sprite: {x: 0,
                                             y: 39+32,
                                             width:42,
                                             height:32,
                                             scale: 5}}));
    pokemon.push(Pokemon.create(p, {name: "Apple-mon",
                                    sprite: {x: 43,
                                             y: 39+30,
                                             width: 77,
                                             height: 54,
                                             scale: 3}}));
    return pokemon;
  }

  function pokemonEncounter(){
    if(p.keyIsPressed && !battleScreen.isActive() && p.random(200) < 1) {
      battleScreen.transitionToScreen(player.getPokemon(), Object.create(p.random(wildPokemon)));
    }
  }
};

window.addEventListener("keydown", function(e) {
  // space and arrow keys
  //https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

function drawTextPanel(p, str){
  let padding = 16,
      width = p.width - (padding * 2),
      height = 128,
      y = p.height - height - padding;
  p.rect(padding, y, width, height);
  p.push();
  p.textSize(40);
  p.text(str, padding, y + 32);
  p.pop();
}


new p5(sketch);