import styles from './auth-form.module.css';

export default function AuthForm({
    formAction,
    formTitle,
    submitButtonLabel
}: {
    formAction: string,
    formTitle: string,
    submitButtonLabel: string
}) {


    return (
        <form className={styles.form} action={formAction} method="POST">
            <h2 className={`${styles.heading} headings-h1-brand-dark-orange`}>{formTitle}</h2>
            <label className={`${styles.label} body-s-black`} htmlFor="email">
                Email
                <input
                    className={`${styles.input} body-xs-neutral-grey-600`}
                    id="email"
                    required
                    name="email"
                    type="email"
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
            <button
                className={`${styles.button} body-m-neutral-white`}
                type="submit"
            >{submitButtonLabel}</button>
        </form>
    )
}