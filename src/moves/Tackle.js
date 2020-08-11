// https://pokemondb.net/move/tackle
export default class Tackle {
  constructor(p){
    this.p = p;
    this.damageAnimationStart = 0;
    this.damageStartHealth = 0;
    this.damageInterval = 50;
    this.finished = false;
  }
  start(opponentPokemon){
    //opponent is the pokemon that is being attacked
    // can be the player pokemon when the ai pokemon is using this move
    this.damageAnimationStart = this.p.millis();
    this.damageStartHealth = opponentPokemon.health;
  }
  preform(attackingPokemon, opponentPokemon){
    if(this.p.millis() > this.damageAnimationStart + this.damageInterval){
      this.damageAnimationStart = this.p.millis();
      opponentPokemon.health--;
    }

    if(opponentPokemon.health == this.damageStartHealth - attackingPokemon.attack){
      return true;
    }
    return false;
  }
}
