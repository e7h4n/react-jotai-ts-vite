import { atom, Getter, Setter } from "jotai/vanilla";
import { ActionAtom } from "../types/action";

const PROMISE_NEVER_RESOLVED = new Promise(() => void (0))

export function createActionAtom<RET extends Promise<unknown>, ARGS extends unknown[]>(
    actionFn: (get: Getter, set: Setter, ...args: ARGS) => RET
): ActionAtom<RET, ARGS> {
    const internalAtom = atom(PROMISE_NEVER_RESOLVED as RET)

    return atom(get => {
        return get(internalAtom)
    }, (get, set, ...args: ARGS) => {
        const promise = actionFn(get, set, ...args)
        set(internalAtom, promise)
        return promise
    })
}