import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { initRouterArgs } from "./router/router";
import { createStore } from "jotai/vanilla";
import { Provider } from "jotai/react";

async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }

  return Promise.resolve();
}

void prepare().then(() => {
  const root = document.getElementById("root");
  if (root === null) {
    return;
  }

  const store = createStore();
  const router = createBrowserRouter(
    ...initRouterArgs(store, new AbortController().signal)
  );

  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
});
