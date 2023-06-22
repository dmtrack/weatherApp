import styles from './Chip.module.scss';

type ChipProps = {
    text: string;
};

function Chip({ text }: ChipProps) {
    return (
        <>
            <div className={styles.chip}>{text}</div>
        </>
    );
}

export default Chip;
