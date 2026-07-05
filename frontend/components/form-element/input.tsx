import styles from './input.module.css';

type InputProps = {
    id: string,
    type: string,
    label?: string,
    placeholder?: string
    className?: string,
    required?: boolean
};

export default function Input(
    { id, type, label = '', placeholder = '', className = '', required = false }: InputProps
) {
    return (
        <label className={`body-s-black ${styles.label} ${className}`}>
            {label}
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                className={`body-xs-neutral-grey-600 ${styles.input}`}
                required={required}
            />
        </label>
    )
}