import { useEffect } from "react";

// Styles
import styles from "./modal-overlay.module.css";

function ModalOverlay({ isOpen, onClose }) {
    const closeByEsc = (evt) => {
        if (evt.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", closeByEsc);
        }
        return () => {
            document.removeEventListener("keydown", closeByEsc);
        };
    }, [isOpen]);

    return <div onClick={(evt) => { onClose(); }} className={styles.overlay} />;
};

export default ModalOverlay;