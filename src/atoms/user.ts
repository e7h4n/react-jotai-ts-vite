import { atom } from "jotai/vanilla";

const PROMISE_NEVER_RESOLVED = new Promise(() => void (0))

export interface User {
    id: string;
    name: string;
    email: string;
}

export const userAtom = (() => {
    const internalAtom = atom<Promise<User>>(PROMISE_NEVER_RESOLVED as Promise<User>)

    return atom(get => get(internalAtom), (_get, set, signal: AbortSignal) => {
        const promise = (async () => {
            const user = await fetch("/api/users/current", { signal }).then(res => {
                return res.json() as Promise<User>
            })
            signal.throwIfAborted()
            return user
        })()
        set(internalAtom, promise)
        return promise
    })
})()