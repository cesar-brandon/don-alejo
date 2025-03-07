import { ActionState } from "../type/action-state";

type Callback<T, R = unknown> = {
  onStart?: () => R;
  onEnd?: (reference: R) => void;
  onSuccess?: (result: T) => void;
  onError?: (result: T) => void;
};

export const withCallbacks = <
  Args extends unknown[],
  T extends ActionState,
  R = unknown
>(
  fn: (...args: Args) => Promise<T>,
  callbacks: Callback<T, R>
) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    const reference = callbacks.onStart?.();
    const result = await promise;

    if (reference) {
      callbacks.onEnd?.(reference);
    }

    if (result?.status === "SUCCESS") {
      callbacks.onSuccess?.(result);
    }

    if (result?.status === "ERROR") {
      callbacks.onError?.(result);
    }

    return promise;
  };
};
