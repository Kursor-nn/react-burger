import { useEffect } from "react";

// KIT Components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";

// Components
import ModalOverlay from "../modal-overlay/modal-overlay";

//Styles
import styles from "./modal.module.css";

//Type Check
import PropTypes from 'prop-types';

function Modal({ children, onClose, title }) {
    const modals = document.getElementById("modal-overlay");

    const closeByEsc = (evt) => {
        if (evt.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", closeByEsc);

        return () => {
            document.removeEventListener("keydown", closeByEsc);
        };
    }, []);

    return createPortal(
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={`text text_type_main-large mt-0 mb-0`}>{title}</h2>
                    <CloseIcon onClick={onClose} type="primary" />
                </div>
                {children}
            </div>
            <ModalOverlay onClick={(evt) => { onClose(); }} />
        </>,
        modals
    );

}

Modal.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default Modal;