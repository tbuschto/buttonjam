import ListenerCollection, { createListenerCollection } from './ListenerCollection';
import GameButtonModel from './GameButtonModel';
import { wait } from './util';

const PHASE_ONE_TOSS = {
  times: 30,
  delay: 200
};

export default class Game {

  public readonly onGlow: ListenerCollection<{ duration: number }> = createListenerCollection();

  public readonly buttons: GameButtonModel[] = [
    new GameButtonModel('red'),
    new GameButtonModel('green'),
    new GameButtonModel('blue'),
    new GameButtonModel('yellow')
  ];

  private buttonCounter: number = 0;

  public async start() {
    await this.toss(PHASE_ONE_TOSS);
  }

  private async toss({ times, delay }: Toss) {
    for (let i = 0; i < times; i++) {
      this.nextButton().onGlow.trigger({ duration: delay });
      await wait(delay);
    }
  }

  private nextButton(): GameButtonModel {
    if (++this.buttonCounter >= this.buttons.length) {
      this.buttonCounter = 0;
    }
    return this.buttons[this.buttonCounter];
  }

}

interface Toss {
  times: number;
  delay: number;
}
