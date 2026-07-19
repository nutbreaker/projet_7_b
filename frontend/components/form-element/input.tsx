import styles from './input.module.css';

type InputProps = {
    id: string,
    type: string,
    label?: string,
    defaultValue?: string,
    placeholder?: string
    className?: string,
    required?: boolean,
    inputChangeHandler?: (e: React.ChangeEvent<HTMLInputElement, Element>) => void
};

export default function Input(
    { id, type, label = '', defaultValue, placeholder = '', className = '', required = false, inputChangeHandler }: InputProps
) {
    return (
        <label className={`body-s-black ${styles.label} ${className}`}>
            {label}
            <input
                id={id}
                name={id}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={`body-xs-neutral-grey-600 ${styles.input}`}
                required={required}
                onChange={inputChangeHandler}
            />
        </label>
    )
}