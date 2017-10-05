export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export function omit<T extends object>(object: T, ...keys: string[]): Partial<T> {
  let result: Partial<T> = {};
  for (let key in object) {
    if (keys.indexOf(key) < 0) {
      result[key] = object[key];
    }
  }
  return result;
}

export function asyncListener<T>(listener: AsyncListener<T>) {
  return (event: T) => {
    listener(event).catch(reason => {
      /* tslint:disable no-console */
      console.error(reason);
    });
  };
}

export async function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

type AsyncListener<T> = (ev: T) => Promise<void>;
