/// <reference types="vitest/config" />
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import { defineConfig, loadEnv, type Plugin } from "vite";
import {
  handleApiRequest,
  spoonacularUpstream,
  type Upstream,
} from "./api/_lib/spoonacular.js";
import { searchFallback, type FallbackData } from "./src/lib/fallback";

// Serves /api/* during `vite dev` with the same handlers Vercel runs in production,
// so local development doesn't need `vercel dev`. The key is read here, in Node,
// and never reaches the client bundle.
function devApi(env: Record<string, string>): Plugin {
  const useMock =
    env.SPOONACULAR_USE_MOCK === "true" || !env.SPOONACULAR_API_KEY;
  const upstream = useMock
    ? mockUpstream()
    : spoonacularUpstream(env.SPOONACULAR_API_KEY);

  return {
    name: "delicimo-dev-api",
    configureServer(server) {
      server.config.logger.info(
        useMock
          ? "  ➜  API:     using sample recipes (no Spoonacular quota used)"
          : "  ➜  API:     proxying to Spoonacular",
      );
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();
        const response = await handleApiRequest(
          new URL(req.url, "http://localhost"),
          upstream,
        );
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      });
    },
  };
}

// Fakes Spoonacular responses from the bundled sample recipes (the same ones the
// app falls back to in production) for quota-free UI work.
function mockUpstream(): Upstream {
  let data: Promise<FallbackData> | undefined;
  const load = () =>
    (data ??= import("./src/data/fallback-recipes.json").then(
      (m) => m.default as FallbackData,
    ));

  return async (pathname, params) => {
    const sample = await load();
    await new Promise((r) => setTimeout(r, 400));

    if (pathname === "/recipes/complexSearch") {
      const { recipes } = searchFallback(sample, params.get("query") ?? "");
      const offset = Number(params.get("offset"));
      const number = Number(params.get("number"));
      return Response.json({
        results: recipes.slice(offset, offset + number),
        offset,
        number,
        totalResults: recipes.length,
      });
    }

    const id = Number(pathname.split("/")[2]);
    const recipe = sample.recipes.find((r) => r.id === id);
    return recipe
      ? Response.json(recipe)
      : Response.json({ message: "Not found" }, { status: 404 });
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 5182,
    },
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      tailwindcss(),
      Icons({ compiler: "jsx" }),
      devApi(env),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      include: ["src/**/*.test.ts", "api/**/*.test.ts"],
    },
  };
});
