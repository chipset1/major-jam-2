export default class Tackle {
  constructor(p, parentPokemon){
    this.p = p;
    this.parentPokemon = parentPokemon;
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
  preform(opponentPokemon){
    opponentPokemon.health = this.p.max(this.damageMap(), 0);

    if(this.isDamageAnimationOver()){
      opponentPokemon.health = this.damageAnimationStartHealth - this.parentPokemon.attack;
      return true;
    }
    return false;
  }
  isDamageAnimationOver(entity){
    return this.p.millis() > this.damageAnimationStart + this.damageAnimationLength;
  }
  damageMap(){
    // this is not the right way to do this
    // small damage amount will take just as long as large damage amounts
    return this.p.int(this.p.map(this.p.millis(),
                                 this.damageAnimationStart,
                                 this.damageAnimationStart + this.damageAnimationLength,
                                 this.damageAnimationStartHealth,
                                 this.damageAnimationStartHealth - this.parentPokemon.attack));
  }
}