export type ApiClientProps = Readonly<{
  url: string;
  options?: {
    headers?: Record<string, string>;
  };
}>;
export async function apiClient<T>({ url, options }: ApiClientProps) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Response is not ok, error code: ${response.status}`);
  }
  const data = (await response.json()) as T;
  return data;
}
