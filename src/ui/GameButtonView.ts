import { Composite, CompositeProperties } from 'tabris';
import GameButtonModel, { GlowEvent } from '../GameButtonModel';
import { omit, asyncListener } from '../util';

const DIM = 0.4;
const BRIGHT = 1;

export default class GameButtonView extends Composite {

  private readonly model: GameButtonModel = null;

  constructor(properties: CompositeProperties & { model: GameButtonModel }) {
    super(omit(properties, 'model'));
    this.model = properties.model;
    this.set({
      background: this.model.color,
      opacity: DIM
    });
    this.on({ touchStart: this.handleTouchStart });
    this.model.onGlow(this.glow);
  }

  private glow = async (ev: GlowEvent) => {
    this
      .set({ opacity: BRIGHT })
      .animate({ opacity: DIM }, {
        delay: ev.duration, duration: 300, easing: 'ease-out'
      });
  }

  private handleTouchStart() {
    this.model.onHit.trigger(this.model);
  }

}
