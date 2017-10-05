import {ui, Button, TextView} from 'tabris';
import Game from './game';
import GameView from './GameView';

let game = new Game();
ui.contentView.append(new GameView({
  game, left: '25%', top: '40%', bottom: '10%', right: '25%'
}));
game.start();
