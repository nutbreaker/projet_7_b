import styles from './auth-form.module.css';

export type LoginFormState = {
    error: string
    fields: {
        email: string
    }
}

export default function AuthForm({
    formAction,
    formState,
    formTitle,
    submitButtonLabel
}: {
    formAction: (formData: FormData) => void | Promise<void>,
    formState: LoginFormState,
    formTitle: string,
    submitButtonLabel: string
}) {
    return (
        <form className={styles.form} action={formAction}>
            <h2 className={`${styles.heading} headings-h1-brand-dark-orange`}>{formTitle}</h2>
            <label className={`${styles.label} body-s-black`} htmlFor="email">
                Email
                <input
                    className={`${styles.input} body-xs-neutral-grey-600`}
                    id="email"
                    required
                    name="email"
                    type="email"
                    defaultValue={formState.fields.email}
                />
            </label>
            <label className={`${styles.label} body-s-black`} htmlFor="password">
                Mot de passe
                <input
                    className={`${styles.input} body-xs-neutral-grey-600`}
                    id="password"
                    required
                    name="password"
                    type="password"
                />
            </label>

            {formState.error && <span className={`${styles['error-message']} body-s-system-error-red`}>{formState.error}</span>}

            <button
                className={`${styles.button} body-m-neutral-white`}
                type="submit"
            >{submitButtonLabel}</button>
        </form>
    )
}