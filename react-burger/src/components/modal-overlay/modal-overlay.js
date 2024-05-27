import { useEffect } from "react";

// Styles
import styles from "./modal-overlay.module.css";

//Type Check
import PropTypes from 'prop-types';

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

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool
};

export default ModalOverlay;