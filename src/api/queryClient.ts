import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import {
  removeOldestQuery,
  type PersistQueryClientProviderProps,
} from "@tanstack/react-query-persist-client";
import { ApiError } from "./client";
import { isFallbackData } from "./fallback";

const WEEK = 1000 * 60 * 60 * 24 * 7;

// Recipes effectively never change, and every request costs API quota, so
// cached data is treated as fresh forever and kept (and persisted) for a week.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: WEEK,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: (failureCount, error) => {
        // Retrying a 4xx (including quota errors) only burns more quota.
        if (
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
});

export const persistOptions: PersistQueryClientProviderProps["persistOptions"] =
  {
    persister: createSyncStoragePersister({
      storage: typeof window === "undefined" ? undefined : window.localStorage,
      key: "delicimo:query-cache",
      throttleTime: 1000,
      // If localStorage fills up, evict the oldest queries until it fits.
      retry: removeOldestQuery,
    }),
    maxAge: WEEK,
    // Bump when the cached data shape changes to discard old caches.
    buster: "v2",
    dehydrateOptions: {
      // Sample (fallback) results are temporary, so only persist live data.
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) && !isFallbackData(query.state.data),
    },
  };
