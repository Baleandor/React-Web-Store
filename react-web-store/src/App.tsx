import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router/dom";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./components/ui/Spinner";
import { useAuthSync } from "./hooks/useAuthSync";
import { router } from "./router";
import { persistor, store } from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

function AppRouter() {
  useAuthSync();
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
