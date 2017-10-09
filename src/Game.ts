import ListenerCollection, { createListenerCollection } from './ListenerCollection';
import GameButtonModel from './GameButtonModel';
import { wait, asyncListener } from './util';

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
  private hitHandler: (button: GameButtonModel) => any = null;

  constructor() {
    this.buttons.forEach(button => button.onHit(asyncListener(this.handleHit)));
  }

  public async start() {
    await this.toss(PHASE_ONE_TOSS);
  }

  private async toss({ times, delay }: Toss) {
    let hitButton: GameButtonModel;
    let count = 0;
    while (count < times && !hitButton) {
      this.nextButton().onGlow.trigger({ duration: delay });
      hitButton = await this.waitForHit(delay);
      count++;
    }
    /* tslint:disable no-console */
    if (hitButton === this.currentButton) {
      console.log('+1');
    } else {
      console.log('-1');
    }
  }

  private async waitForHit(timeout: number) {
    return new Promise<GameButtonModel>((resolve) => {
      this.hitHandler = (hitButton: GameButtonModel) => {
        this.hitHandler = null;
        resolve(hitButton);
      };
      setTimeout(() => {
        if (this.hitHandler) {
          this.hitHandler(null);
        }
      }, timeout);
    });
  }

  private handleHit = async (button: GameButtonModel) => {
    if (this.hitHandler) {
      this.hitHandler(button);
    }
  }

  private nextButton(): GameButtonModel {
    if (++this.buttonCounter >= this.buttons.length) {
      this.buttonCounter = 0;
    }
    return this.currentButton;
  }

  private get currentButton() {
    return this.buttons[this.buttonCounter];
  }

}

interface Toss {
  times: number;
  delay: number;
}
