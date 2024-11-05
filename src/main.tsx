import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { initRoutes } from "./views/routes";

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

  const rootSignal = new AbortController().signal;
  const routes = initRoutes(rootSignal);
  const router = createBrowserRouter(routes);
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
