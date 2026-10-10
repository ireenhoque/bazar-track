
const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export function getApiUrl(endpoint = ""): string {
  const cleanEndpoint = endpoint.replace(/^\/+/, "");

  return cleanEndpoint
    ? `${API_BASE_URL}/${cleanEndpoint}`
    : API_BASE_URL;
}
