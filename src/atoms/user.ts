import { createActionAtom } from "./util";

export interface User {
    id: string;
    name: string;
    email: string;
}

export const userAtom = createActionAtom(async (_get, _set, signal: AbortSignal) => {
    const user = await fetch("/api/users/current", { signal }).then(res => {
        return res.json() as Promise<User>
    })
    signal.throwIfAborted()
    return user
})
