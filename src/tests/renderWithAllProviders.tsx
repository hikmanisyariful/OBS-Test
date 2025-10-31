/// <reference types="vitest/globals" />
import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStore, type RootState } from "../redux/store";
import { SelectedUserProvider } from "../components/user-list/context/SelectedUserContext";

export function renderWithAllProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    ...renderOptions
  }: { preloadedState?: Partial<RootState> } & Omit<RenderOptions, "wrapper"> = {}
) {
  const store = makeStore(preloadedState);
  const theme = createTheme();

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <SelectedUserProvider>{children}</SelectedUserProvider>
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
