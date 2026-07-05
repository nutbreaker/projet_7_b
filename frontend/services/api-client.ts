const API_BASE_URL = process.env.VITE_API_URL || '';
import type { Success, ErrorResponse } from "@/types/api.types";

type Options = {
    headers?: object,
    method: 'GET' | 'POST',
    body?: string,
    token: string
}

export type ApiResponse<T> = Success<T> | ErrorResponse;

/**
 * Generic HTTP client to request the API.
 */
export async function apiClient<T>(endpoint: string, options: Options): Promise<ApiResponse<T>> {
    try {
        const { token } = options;

        if (!API_BASE_URL) throw ('Configuration API invalide');
        if (!token) throw ('Token utilisateur introuvable');

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...(options.headers || {})
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        return (await response.json()) as ApiResponse<T>;
    } catch (error: unknown) {
        const err = error as { message?: string; name?: string };
        return {
            success: false,
            message: err.message,
            error: err.name,
        } as ErrorResponse
    }
}