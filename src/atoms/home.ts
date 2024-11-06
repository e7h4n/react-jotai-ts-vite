import { atom } from "jotai/vanilla";
import { userAtom } from "./user";
import { PageSetupAtom } from "../types/router";

export const homePageAtom: PageSetupAtom = atom(
    null,
    (_, set, signal: AbortSignal) => {
        void set(userAtom, signal);
    }
);
