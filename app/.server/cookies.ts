import { createCookieSessionStorage } from "react-router";

const sessionSecret = process.env.SESSION_SECRET || "TabTablaSecret";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "TanTablaSession",
      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

export {
  getSession as getSessionCookie,
  commitSession as commitSessionCookie,
  destroySession as destroySessionCookie,
};
