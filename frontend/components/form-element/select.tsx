import { useState } from 'react';
import { User } from '@/types/api.types';

import styles from './select.module.css';

// https://stackoverflow.com/questions/14218307/select-arrow-style-change

export default function Select(
    { label, name, className = '', defaultValue = [], optionsFetcher } : {
        label: string,
        name: string,
        className?: string,
        defaultValue?: User[]
        optionsFetcher: (val: string) => Promise<User[]>
    }
) {
    const [userSearchquery, setUserSearchQuery] = useState('');
    const [options, setOptions] = useState([] as User[]);
    const [selectedOptions, setSelectedOptions] = useState(defaultValue);
    const displayOptions = [
        ...options,
        ...selectedOptions.filter(selectedOption => !options.find(option => option.email === selectedOption.email)),
    ];

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement, Element>) => {
        const value = e.target.value;

        setUserSearchQuery(value);

        if (value.length < 2) return setOptions([]);

        setOptions(await optionsFetcher(value));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement, Element>) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const newSelected = selectedOptions.map(selectedOption =>
            displayOptions.find(option => option.email === selectedOption.value)
        );

        setSelectedOptions(newSelected as User[]);
    };  

    const handleLabelBlur = (e: React.FocusEvent<HTMLLabelElement, Element>) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;

        setUserSearchQuery("");
        setOptions([]);
    };

    const getPlaceholderText = () => {
        const len = selectedOptions.length;

        if (len === 0) return "Choisir collaborateurs";
        if (len === 1) return "1 collaborateur";

        return `${len} collaborateurs`;
    };

    return (
        <label className={`body-s-black ${styles.label} ${className}`} onBlur={handleLabelBlur}>
            {label}

            <input
                className={styles['input']}
                type="text"
                value={userSearchquery}
                onChange={handleInputChange}
                placeholder={getPlaceholderText()}
            />

            <select
                name={name}
                className={styles['select']}
                multiple
                size={Math.min(displayOptions.length, 5) || 1}
                onChange={handleSelectChange}
                value={selectedOptions.map(selectedOption => selectedOption.email)}
            >
                {displayOptions.map(option => (
                    <option key={option.email} value={option.email}>
                        {option.name}
                    </option>
                ))}
            </select>
        </label>
    );
}

