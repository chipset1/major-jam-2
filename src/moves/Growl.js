// https://pokemondb.net/move/growl
export default class Growl {
  constructor(p){
    this.p = p;
  }
  start(opponentPokemon){
    this.startTime = this.p.millis();
    opponentPokemon.attack-=10;
    opponentPokemon.attack = this.p.max(opponentPokemon.attack, 10);
  }
  preform(attackingPokemon, opponentPokemon){
    // TODO: find better way to keep battle screen message on screen
    // for moves that are instant
    if(this.p.millis()>this.startTime+1000){
      return true;
    }
    return false;
  }
}