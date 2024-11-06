import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { initRouterArgs } from "../router/router";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createStore } from "jotai/vanilla";
import { Provider } from "jotai/react";

describe("Home", () => {
  let abortController: AbortController;

  beforeEach(() => {
    abortController = new AbortController();
    const store = createStore();
    const [routes, options] = initRouterArgs(store, abortController.signal);

    const router = createMemoryRouter(routes, options);

    render(
      <StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </StrictMode>
    );
  });

  afterEach(() => {
    cleanup();
    abortController.abort();
  });

  it("Render Hello User", async () => {
    expect(await screen.findByText("Hello: John Doe")).toBeTruthy();
  });
});
