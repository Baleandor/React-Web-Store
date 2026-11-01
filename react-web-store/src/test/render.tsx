import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice";
import uiReducer from "../store/uiSlice";

export const createTestStore = () =>
  configureStore({
    reducer: { auth: authReducer, cart: cartReducer, ui: uiReducer },
  });

/** Exposes the current URL so tests can assert on navigation. */
function LocationDisplay() {
  const { pathname, search } = useLocation();
  return <output data-testid="location">{pathname + search}</output>;
}

/** Renders `ui` inside the app's providers (Redux, React Query, router) at `route`. */
export function renderWithProviders(ui: ReactElement, { route = "/" } = {}) {
  const store = createTestStore();
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[route]}>
            <Routes>
              <Route
                path="*"
                element={
                  <>
                    {ui}
                    <LocationDisplay />
                  </>
                }
              />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>,
    ),
  };
}
