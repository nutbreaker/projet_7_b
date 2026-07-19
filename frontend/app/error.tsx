'use client';
import type { ErrorResponse } from "@/types/api.types";

// https://nextjs.org/docs/app/api-reference/file-conventions/error

export default function Error({
    error,
    unstable_retry,
}: {
    error: ErrorResponse
    unstable_retry: () => void
}) {

    console.log(error);
    return (
        <div>
            <h2>{error.error}</h2>
            <p>{error.message}</p>
        </div>
    );
}