import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { initRoutes } from "../routes";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";

describe("Home", () => {
  let abortController: AbortController;

  beforeEach(() => {
    abortController = new AbortController();
    const routes = initRoutes(abortController.signal);
    const router = createMemoryRouter(routes);

    render(
      <StrictMode>
        <RouterProvider router={router} />
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
