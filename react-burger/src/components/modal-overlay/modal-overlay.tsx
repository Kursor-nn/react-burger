// Styles
import styles from "./modal-overlay.module.css";

interface ModalOverlayType {
    onClick: (evt: KeyboardEvent | React.KeyboardEvent) => void
}

function ModalOverlay({ onClick }: ModalOverlayType) {
    return <div onClick={(evt: any) => { onClick(evt); }} className={styles.overlay} />;
};

export default ModalOverlay;