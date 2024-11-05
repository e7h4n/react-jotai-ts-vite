import { useAtomValue } from "jotai/react";
import { userAtom } from "../atoms/user";
import { loadable } from "jotai/vanilla/utils";

export function Home() {
  const user = useAtomValue(loadable(userAtom));
  if (user.state === "loading") {
    return <div>Loading...</div>;
  }

  if (user.state === "hasError") {
    return <div>Error: {String(user.error)}</div>;
  }

  return <div>Hello: {user.data.name}</div>;
}
