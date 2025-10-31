/// <reference types="vitest/globals" />
import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore, type RootState } from "../redux/store";

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    ...renderOptions
  }: { preloadedState?: Partial<RootState> } & Omit<RenderOptions, "wrapper"> = {}
) {
  const store = makeStore(preloadedState);

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
