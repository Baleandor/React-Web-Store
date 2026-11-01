export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
) => (error instanceof Error ? error.message : fallback);
