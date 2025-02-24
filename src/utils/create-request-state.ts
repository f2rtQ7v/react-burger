export default function createRequestState<
  T extends IRequestState = IRequestState
>(state?: Omit<T, keyof IRequestState>): T {
  return {
    ...state,
    request: false,
    error: null,
  } as T;
}
