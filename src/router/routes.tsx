import { Home } from "../views/home";
import { homePageAtom } from "../atoms/home";
import { JotaiRouteObject } from "../types/router";

export const ROUTES: JotaiRouteObject[] = [
  {
    path: "/",
    element: <Home />,
    setupAtom: homePageAtom,
  },
];
