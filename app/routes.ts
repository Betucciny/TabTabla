import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("game/:shortCode", "./routes/game.tsx"),
  route("about", "./routes/about.tsx"),
  route("how-to-play", "./routes/how-to-play.tsx"),
  route("gallery", "./routes/gallery.tsx"),
  route("support", "./routes/support.tsx"),
] satisfies RouteConfig;
