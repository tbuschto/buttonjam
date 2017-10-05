import ListenerCollection, { createListenerCollection} from './ListenerCollection';

export interface GlowEvent {duration: number; }

export default class GameButtonModel {

  public onGlow: ListenerCollection<GlowEvent> = createListenerCollection();

  constructor(readonly color: string) {}

}
