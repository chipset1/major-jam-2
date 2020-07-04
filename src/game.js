import p5 from "p5";
import BattleScreen from "./BattleScreen.js";
import Player from "./Player.js";
import Pokemon from "./Pokemon.js";
import Map from "./Map.js";

let sketch = (p) =>{
  let battleScreen, player, map, wildPokemon, testPokemon;
  p.setup = () => {
    p.createCanvas(640, 640);
    p.noSmooth();
    let spriteSheet = p.loadImage("assets/sprite-sheet.png");
    player = new Player(p, spriteSheet, p.width / 2, p.height / 2);
    wildPokemon = makeWildPokemon();
    testPokemon = new Pokemon(p, spriteSheet, {name: "Saurbulb",
                                               sprite: {x: 0,
                                                        y: 39,
                                                        width:32,
                                                        height:32,
                                                        scale: 6}});
    battleScreen = new BattleScreen(p);
    map = new Map(p, spriteSheet, 0, 0);
  };

  p.draw = () => {
    p.background(255, 0, 0);
    p.text(p.int(p.frameRate()), 10, 10);
    p.text(player.pos, 20, 20);

    p.push();
    // p.translate(-(player.pos.x-(p.width/2)+player.size/2), -(player.pos.y - (p.height/2)+player.size/2));
    // if(map.inGrass(player.pos)) pokemonEncounter()
    if(!battleScreen.isActive()) player.update();
    map.draw();
    player.draw();
    p.pop();
    if(battleScreen.isActive()){
      battleScreen.update();
      battleScreen.draw();
    }
  };

  p.keyPressed = () => {
    battleScreen.keyPressed();
    if(p.keyCode === p.ENTER) battleScreen.transitionToScreen(player.getPokemon(), testPokemon);
  };

  function makeWildPokemon(){
    let pokemon = [];
    for(let i = 0; i < 25; i++){
      // B-Z
      // pokemon.push(new Pokemon(p, 66+i));
    }
    return pokemon;
  }

  function pokemonEncounter(){
    if(p.keyIsPressed && !battleScreen.isActive() && p.random(300) < 1) {
      battleScreen.transitionToScreen(player.getPokemon(), p.random(wildPokemon));
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