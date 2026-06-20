import styles from './error.module.css';

type ApiResponse = {
    success: boolean,
    message: string
    data?: { errors?: [{field?: string, message?: string}] },
    error?: string
};


export default function Error({ success = true, message, data }: ApiResponse) {
    if (success) return null;

    const hasErrors = data && data.errors && data.errors.length;

    return (
        <div className={`${styles['error-message']} body-s-system-error-red`}>
            <p>
                {message}
            </p>

            <ul>{hasErrors && data?.errors?.map((error) => (<li key={error.field}>{error.field} {error.message}</li>))}</ul>
        </div>
    )
}