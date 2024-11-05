import { RouteObject } from "react-router-dom";
import { Home } from "./home";
import { createSignalSwitch } from "signal-transaction";
import { getDefaultStore } from "jotai";
import { userAtom } from "../atoms/user";

export function initRoutes(rootSignal: AbortSignal): RouteObject[] {
  const signalSwitch = createSignalSwitch(rootSignal);
  return [
    {
      path: "/",
      element: <Home />,
      loader: signalSwitch((signal) => {
        void getDefaultStore().set(userAtom, signal);
        return Promise.resolve(null);
      }),
    },
  ];
}
