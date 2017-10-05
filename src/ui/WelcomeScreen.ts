import { ui, Button, TextView, Composite, CompositeProperties, EventObject } from 'tabris';
import Game from '../game';
import GameView from './GameView';
import { asyncListener, omit } from '../util';

export default class WelcomeScreen extends Composite {

  constructor(properties: CompositeProperties & { message: string }) {
    super(omit(properties, 'message'));
    this.append(
      new Button({
        centerX: 0, top: '30%', text: properties.message
      }).on({
        select: asyncListener(() => play(this))
      })
    );
  }

}

export function showWelcomeScreen(message: string) {
  ui.contentView.append(
    new WelcomeScreen({
      left: 0, top: 0, right: 0, bottom: 0, message
    })
  );
}

async function play(screen: WelcomeScreen) {
  screen.dispose();
  let game = new Game();
  let gameView = new GameView({
    game, left: '25%', top: '40%', bottom: '10%', right: '25%'
  });
  ui.contentView.append(gameView);
  await game.start();
  gameView.dispose();
  showWelcomeScreen('Play Again?');
}
