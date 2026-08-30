import styles from './error.module.css';

type ErrorDetail = {
    field?: string;
    message?: string;
};

type ApiResponse = {
    success?: boolean,
    message?: string
    data?: { errors?: ErrorDetail[] } | unknown,
    error?: string
};


export default function Error({ success = true, message = 'Erreur inconue', data }: ApiResponse) {
    if (success) return null;

    const errorData = data as { errors?: ErrorDetail[] } | undefined;
    const hasErrors = errorData?.errors && errorData.errors.length;

    return (
        <div className={`${styles['error-message']} body-s-system-error-red`}>
            <p>{message}</p>
            {hasErrors && (
                <ul>
                    {errorData?.errors?.map((err, index) => (
                        <li key={index}>
                            {err.field} {err.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}