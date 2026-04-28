import { createAuthClient } from "better-auth/react";

/** Same origin as `/api/auth`; explicit origin avoids OAuth redirect bugs behind Workers + proxies. */
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? `${window.location.origin}`
      : undefined,
});
