// store.ts
import { configureStore, ThunkAction, Action, Store } from "@reduxjs/toolkit";
import combinedReducers from "./combinedReducers";

interface ThunkExtraArguments {
  store: Store;
}

export function makeStore(preloadedState?: Partial<RootState>) {
  const thunkArguments = {} as ThunkExtraArguments;

  const store = configureStore({
    reducer: combinedReducers,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    preloadedState: preloadedState as any, // optional untuk test
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: thunkArguments },
        immutableCheck: false,
        serializableCheck: false,
      }),
  });

  thunkArguments.store = store;
  return store;
}

// default store untuk app runtime (bukan test)
const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;

// ✅ RootState dari gabungan reducer (penting untuk preloadedState typing)
export type RootState = ReturnType<typeof combinedReducers>;
export type AppState = RootState;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
