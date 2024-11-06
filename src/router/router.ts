import { RouteObject } from "react-router-dom";
import { createStore } from "jotai/vanilla";
import { createSignalRouterDecorator } from "signal-react-router";
import { ROUTES } from "./routes";
import { JotaiRouteObject } from "../types/router";

function createJotaiRoutesLoader(
  store: ReturnType<typeof createStore>,
  routes: JotaiRouteObject[]
): RouteObject[] {
  return routes.map((route) => {
    return Object.assign({}, route, {
      loader: (_: unknown, ctx: unknown) => {
        const signal = (ctx as { signal: AbortSignal }).signal;
        store.set(route.setupAtom, signal);
        return Promise.resolve(null);
      },
    }) as RouteObject;
  });
}

export function initRouterArgs(
  store: ReturnType<typeof createStore>,
  signal: AbortSignal
) {
  const decorator = createSignalRouterDecorator(signal);
  return decorator(createJotaiRoutesLoader(store, ROUTES), {});
}
