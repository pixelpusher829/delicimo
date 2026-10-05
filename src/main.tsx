import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { persistOptions, queryClient } from "./api/queryClient";
import { router } from "./app/App";
import "./app/index.css";

// Devtools are dev-only and lazy-loaded, so they never ship in the production bundle.
// eslint-disable-next-line react-refresh/only-export-components
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((m) => ({
        default: m.ReactQueryDevtools,
      })),
    )
  : () => null;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      <RouterProvider router={router} />
      <Suspense>
        <ReactQueryDevtools />
      </Suspense>
    </PersistQueryClientProvider>
  </StrictMode>,
);
