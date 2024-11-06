import { RouteObject } from "react-router-dom";
import { WritableAtom } from "jotai/vanilla";

export type PageSetupAtom = WritableAtom<null, [AbortSignal], void>;

export type JotaiRouteObject = Omit<RouteObject, "loader"> & {
    setupAtom: PageSetupAtom;
};