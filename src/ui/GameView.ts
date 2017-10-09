import { Composite, CompositeProperties, WidgetResizeEvent } from 'tabris';
import Game from '../game';
import GameButtonView from './GameButtonView';
import { omit } from '../util';
import GameButtonModel from '../GameButtonModel';

const COLUMNS = 2;

export default class GameView extends Composite {

  private game: Game;
  private buttonViews: GameButtonView[];

  constructor(properties: CompositeProperties & { game: Game }) {
    super(omit(properties, 'game'));
    this.game = properties.game;
    this.buttonViews = reorderButtons(this.game.buttons).map(model => new GameButtonView({ model }));
    this.append(this.buttonViews);
    this.on({ resize: this.layoutButtons });
  }

  private layoutButtons = ({ width, height }: WidgetResizeEvent) => {
    let side = Math.min(width, height) / 2;
    let offsetX = (width - side * COLUMNS) / 2;
    let offsetY = (height - side * Math.ceil(this.buttonViews.length / COLUMNS)) / 2;
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
  let result: GameButtonModel[] = [];
  let rowCount = Math.ceil(buttons.length / COLUMNS);
  let rowLength = Math.ceil(buttons.length / rowCount);
  for (let i = 0; i < rowCount; i++) {
    let row = buttons.slice(i * rowLength, (i + 1) * rowLength);
    result = result.concat(i % 2 === 0 ? row : row.reverse());
  }
  return result;
}
