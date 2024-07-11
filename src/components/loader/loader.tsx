import styles from './loader.module.css'

type TLoaderProps = {
    title?: string
}

export default function Loader({ title = '' }: TLoaderProps) {
    return (
        <div className={styles.wrapper}>
            {title && (
                <h1 className="text text_type_main-large mb-20">{title}</h1>
            )}

            <div className={styles.loader} />
        </div>
    )
}
