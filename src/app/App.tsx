import { createBrowserRouter } from "react-router";
import Root from "@/layout/Root";
import RouteError from "@/pages/RouteError";
import Home from "@/pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <RouteError />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { index: true, Component: Home },
          {
            path: "recipe/:id",
            lazy: async () => ({
              Component: (await import("@/pages/recipe")).default,
            }),
          },
          {
            path: "saved",
            lazy: async () => ({
              Component: (await import("@/pages/saved")).default,
            }),
          },
          {
            path: "*",
            lazy: async () => ({
              Component: (await import("@/pages/NotFound")).default,
            }),
          },
        ],
      },
    ],
  },
]);
