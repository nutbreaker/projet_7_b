import styles from './tag.module.css';

type TagProps = {
    type: 'success' | 'error' | 'warning' | 'info' | 'light' | 'grey',
    className?: string
    children: React.ReactNode,
    style?: object
};

export default function Tag({type, className='', children, style}: TagProps){

    const tagType = `tag-${type}`;
    
    return (
        <span className={`body-s-black ${styles['tag']} ${styles[tagType]} ${className}`} style={style}>{children}</span>
    )
}