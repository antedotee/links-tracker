import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db/database";
import {
  account,
  session,
  user,
  verification,
} from "./drizzle-out/auth-schema";

let auth: ReturnType<typeof betterAuth>;

/** Deploy origin plus common dev origins when BETTER_AUTH_URL is staging/prod but Vite runs on localhost. */
function trustedOriginsFor(baseURL?: string): string[] {
  const set = new Set<string>();
  if (baseURL) {
    try {
      set.add(new URL(baseURL).origin);
    } catch {
      /* ignore invalid baseURL */
    }
  }
  set.add("http://localhost:3000");
  set.add("http://127.0.0.1:3000");
  return [...set];
}

export function createBetterAuth(
  database: NonNullable<Parameters<typeof betterAuth>[0]>["database"],
  secret: string,
  google?: { clientId: string; clientSecret: string },
  /** Public origin where `/api/auth` is served — required for Google OAuth redirect URLs. */
  baseURL?: string
): ReturnType<typeof betterAuth> {
  return betterAuth({
    ...(baseURL ? { baseURL } : {}),
    trustedOrigins: trustedOriginsFor(baseURL),
    database,
    secret,
    emailAndPassword: {
      enabled: false,
    },
    socialProviders: {
      google: {
        clientId: google?.clientId ?? "",
        clientSecret: google?.clientSecret ?? "",
      },
    },
  });
}

export function getAuth(
  google: { clientId: string; clientSecret: string },
  secret: string,
  baseURL: string
): ReturnType<typeof betterAuth> {
  if (auth) return auth;

  auth = createBetterAuth(
    drizzleAdapter(getDb(), {
      provider: "sqlite",
      schema: {
        user,
        session,
        account,
        verification,
      },
    }),
    secret,
    google,
    baseURL
  );
  return auth;
}
