export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }

  /** Spoonacular's daily quota is used up (402) or we're rate limited (429). */
  get isQuotaExceeded() {
    return this.status === 402 || this.status === 429;
  }
}

export async function apiFetch<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path);
  } catch {
    throw new ApiError("You appear to be offline.", 0);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.error ?? "Something went wrong.", res.status);
  }
  return res.json() as Promise<T>;
}
