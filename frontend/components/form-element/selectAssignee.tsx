import { useState } from 'react';
import styles from './select.module.css';
import { TaskAssignee, TaskAssigneeIds } from '@/types/api.types';

// https://stackoverflow.com/questions/14218307/select-arrow-style-change

export default function SelectAssignee(
    { label, name, className = '', defaultValue = [], members }: {
        label: string,
        name: string,
        className?: string,
        defaultValue?: TaskAssigneeIds
        members: TaskAssignee[]
    }
) {
    const [userSearchquery, setUserSearchQuery] = useState('');
    const [options, setOptions] = useState(members);
    const [selectedOptions, setSelectedOptions] = useState(defaultValue);
    const displayOptions = [...options];

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement, Element>) => {
        const value = e.target.value;

        setUserSearchQuery(value);

        setOptions(members.filter(assigne => (assigne.user.email.toLowerCase().includes(value), assigne.user.name.toLowerCase().includes(value))));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement, Element>) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const newSelected = selectedOptions.map(selectedOption =>
            displayOptions.find(option => option.userId === selectedOption.value)
        );

        setSelectedOptions(newSelected as unknown as TaskAssigneeIds);
    };

    const handleLabelBlur = (e: React.FocusEvent<HTMLLabelElement, Element>) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;

        setUserSearchQuery("");
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
                value={selectedOptions.map(selectedOption => selectedOption.userId)}
            >
                {displayOptions.map(option => (
                    <option key={option.userId} value={option.userId}>
                        {option.user.name}
                    </option>
                ))}
            </select>
        </label>
    );
}

