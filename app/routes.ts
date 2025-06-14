import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("game/:shortCode", "./routes/game.tsx"),
] satisfies RouteConfig;
