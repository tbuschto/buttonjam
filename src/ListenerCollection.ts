export default interface ListenerCollection<T> {

  (listener: (ev: T) => void): void;

  addListener(listener: (ev: T) => void): void;

  removeListener(listener: (ev: T) => void): void;

  trigger(ev: T): void;

}

export function createListenerCollection<T>(): ListenerCollection<T> {
  const listeners: Map<(ev: T) => void, boolean> = new Map();
  const listenerCollection = {
    addListener: (listener: (ev: T) => void): void => {
      listeners.set(listener, true);
    },
    removeListener(listener: (ev: T) => void): void {
      listeners.delete(listener);
    },
    trigger(ev: T): void {
      for (let entry of listeners) {
        entry[0](ev);
      }
    }
  };
  const delegate = (listener: (ev: T) => void) => listenerCollection.addListener(listener);
  return Object.assign(delegate, listenerCollection);
}
