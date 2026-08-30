import { useState } from 'react';
import styles from './select.module.css';
import { TaskAssignee, TaskAssigneeIds } from '@/types/api.types';

// https://stackoverflow.com/questions/14218307/select-arrow-style-change

export default function SelectAssignee(
    { label, name, className = '', defaultValue = [], members }: {
        label: string,
        name: string,
        className?: string,
        defaultValue?: TaskAssigneeIds,
        members: TaskAssignee[]
    }
) {
    const [userSearchquery, setUserSearchQuery] = useState('');
    const [options, setOptions] = useState(members);
    const [selectedOptions, setSelectedOptions] = useState<TaskAssigneeIds>(defaultValue);
    const displayOptions = [...options];

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement, Element>) => {
        const value = e.target.value.toLowerCase();

        setUserSearchQuery(e.target.value);

        setOptions(
            members.filter(
                assignee =>
                    assignee.user.email.toLowerCase().includes(value) ||
                    assignee.user.name.toLowerCase().includes(value)
            )
        );
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement, Element>) => {
        const newSelected = Array.from(e.target.selectedOptions, option => option.value);

        setSelectedOptions(newSelected);
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
                value={selectedOptions}
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

