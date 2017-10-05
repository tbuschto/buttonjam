import { Composite, CompositeProperties, WidgetResizeEvent } from 'tabris';
import Game from '../game';
import GameButtonView from './GameButtonView';
import { omit } from '../util';
import GameButtonModel from '../GameButtonModel';

const COLUMNS = 2;

export default class GameView extends Composite {

  private game: Game;
  private buttons: GameButtonView[];

  constructor(properties: CompositeProperties & { game: Game }) {
    super(omit(properties, 'game'));
    this.game = properties.game;
    this.buttons = reorderButtons(this.game.buttons).map(model => new GameButtonView({ model }));
    this.append(this.buttons);
    this.on({ resize: this.layoutButtons });
  }

  private layoutButtons = ({ width, height }: WidgetResizeEvent) => {
    let side = Math.min(width, height) / 2;
    let offsetX = (width - side * COLUMNS) / 2;
    let offsetY = (height - side * Math.ceil(this.buttons.length / COLUMNS)) / 2;
    this.find(GameButtonView).forEach((button, index) => {
      button.set({
        width: side,
        height: side,
        left: offsetX + (index % COLUMNS) * side,
        top: offsetY + Math.floor(index / COLUMNS) * side
      });
    });
  }

}

function reorderButtons(buttons: GameButtonModel[]) {
  let rowLength = Math.ceil(buttons.length / COLUMNS);
  let rowOne = buttons.slice(0, rowLength);
  let rowTwo = buttons.slice(rowLength).reverse();
  return rowOne.concat(rowTwo);
}
