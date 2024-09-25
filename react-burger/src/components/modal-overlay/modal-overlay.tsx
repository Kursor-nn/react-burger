// Styles
import styles from "./modal-overlay.module.css";

interface ModalOverlayType {
    onClick: (evt: React.MouseEvent) => void
}

function ModalOverlay({onClick}: ModalOverlayType) {
    return <div onClick={(evt: React.MouseEvent) => {
        onClick(evt);
    }} className={styles.overlay}/>;
};

export default ModalOverlay;