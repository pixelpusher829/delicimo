import { useSearchParams } from "react-router";
import {
  NO_FILTERS,
  parseFilters,
  serializeFilters,
  type Filters,
} from "@/lib/filters";

/** Search and filter state lives in the URL so it survives reloads and back/forward. */
export function useSearchFilters() {
  const [params, setParams] = useSearchParams();
  const filters = parseFilters(params);

  const update = (patch: Partial<Filters>) =>
    setParams((prev) => serializeFilters({ ...parseFilters(prev), ...patch }), {
      replace: true,
      preventScrollReset: true,
    });

  const clear = () => update(NO_FILTERS);

  return { filters, update, clear };
}
