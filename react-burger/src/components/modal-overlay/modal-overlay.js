import { useEffect } from "react";

// Styles
import styles from "./modal-overlay.module.css";

//Type Check
import PropTypes from 'prop-types';

function ModalOverlay({ onClick }) {
    useEffect(() => {
        document.addEventListener("keydown", onClick);

        return () => {
            document.removeEventListener("keydown", onClick);
        };
    }, []);

    return <div onClick={(evt) => { onClick(); }} className={styles.overlay} />;
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func
};

export default ModalOverlay;