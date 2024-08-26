import { WebStorage } from '@frames.js/render/identity/storage';
import type { WebStorage as Storage } from '@frames.js/render/identity/storage';
import { useCallback, useEffect, useRef, useState } from 'react';

type Primitives = string | number | boolean | null;
type Arr = AllowedValue[];
type Obj = { [key in string]: AllowedValue } & {
  [key in string]?: AllowedValue | undefined;
};
export type AllowedValue = Primitives | Arr | Obj;

type SharedOptions<TValue extends AllowedValue | undefined> = {
  key: string;
  preprocessValue?: (value: Exclude<TValue, undefined>) => TValue;
  /**
   * @defaultValue WebStorage
   */
  storage?: Storage;
};

type UseStorageWithoutInitialValue<TValue extends AllowedValue> = {
  initialValue?: never;
} & SharedOptions<TValue>;

type UseStorageOptionsWithInitialValue<TValue extends AllowedValue> = {
  initialValue: TValue;
} & SharedOptions<TValue>;

type UseStorageOptions<TValue extends AllowedValue | undefined> = {
  initialValue?: TValue;
} & SharedOptions<TValue>;

type Setter<TValue extends AllowedValue | undefined> = (
  value: TValue | ((prevState: TValue) => TValue),
) => Promise<void>;

const defaultStorage = new WebStorage();

export function useStorage<TValue extends AllowedValue>(
  options: UseStorageWithoutInitialValue<TValue>,
): [TValue | undefined, Setter<TValue | undefined>];

export function useStorage<TValue extends AllowedValue>(
  options: UseStorageOptionsWithInitialValue<TValue>,
): [TValue, Setter<TValue>];

export function useStorage<TValue extends AllowedValue | undefined = undefined>({
  key,
  initialValue,
  preprocessValue,
  storage = defaultStorage,
}: UseStorageOptions<TValue>): [TValue | undefined, Setter<TValue | undefined>] {
  const storageRef = useRef(storage);
  const preprocessValueRef = useRef(preprocessValue);
  preprocessValueRef.current = preprocessValue;
  const initialValueRef = useRef(initialValue);
  const [value, setValue] = useState<TValue | undefined>(initialValueRef.current);

  useEffect(() => {
    function isValueNotUndefined<TNewValue extends AllowedValue | undefined>(
      newValue: TNewValue,
    ): newValue is Exclude<TNewValue, undefined> {
      return newValue !== undefined;
    }

    const listener = (newValue: TValue | undefined): void => {
      if (!isValueNotUndefined(newValue)) {
        /**
         * If new value is undefined, use initial value.
         *
         * This can happen when you load the app for first time and there is no value
         * in the storage or when you remove the value from the storage.
         */
        setValue(initialValueRef.current);
        return;
      }

      setValue(preprocessValueRef.current ? preprocessValueRef.current(newValue) : newValue);
    };

    const unsubscribe = storageRef.current.watch(key, listener);

    return () => {
      unsubscribe();
    };
  }, [key]);

  const setState: Setter<TValue | undefined> = useCallback(
    async (setter) => {
      await storageRef.current.set<TValue | undefined>(key, (currentState) => {
        if (typeof setter !== 'function') {
          return setter;
        }

        return setter(currentState ?? initialValueRef.current);
      });
    },
    [key],
  );

  return [value, setState];
}
