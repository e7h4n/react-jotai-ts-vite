import { WritableAtom } from "jotai/vanilla";

export type ActionAtom<RET extends Promise<unknown>, ARGS extends unknown[]> = WritableAtom<RET, ARGS, RET>