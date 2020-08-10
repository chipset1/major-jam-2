// https://pokemondb.net/move/tackle
export default class Tackle {
  constructor(p){
    this.p = p;
    this.damageAnimationStart = 0;
    this.damageAnimationStartHealth = 0;
    this.damageAnimationLength = 1000;
    this.finished = false;
  }
  start(opponentPokemon){
    //opponent is the pokemon that is being attacked
    // can be the player pokemon when the ai pokemon is using this move
    this.damageAnimationStart = this.p.millis();
    this.damageAnimationStartHealth = opponentPokemon.health;
  }
  preform(attackingPokemon, opponentPokemon){
    opponentPokemon.health = this.p.max(this.damageMap(attackingPokemon), 0);

    if(this.isDamageAnimationOver()){
      opponentPokemon.health = this.damageAnimationStartHealth - attackingPokemon.attack;
      return true;
    }
    return false;
  }
  isDamageAnimationOver(entity){
    return this.p.millis() > this.damageAnimationStart + this.damageAnimationLength;
  }
  damageMap(attackingPokemon){
    // this is not the right way to do this
    // small damage amount will take just as long as large damage amounts
    return this.p.int(this.p.map(this.p.millis(),
                                 this.damageAnimationStart,
                                 this.damageAnimationStart + this.damageAnimationLength,
                                 this.damageAnimationStartHealth,
                                 this.damageAnimationStartHealth - attackingPokemon.attack));
  }
}