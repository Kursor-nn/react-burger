import { useEffect } from "react";
import { ReactElement } from "react";

// KIT Components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";

// Components
import ModalOverlay from "../modal-overlay/modal-overlay";

//Styles
import styles from "./modal.module.css";

interface ModalType {
    children: ReactElement,
    onClose: () => void,
    title: string
}


function Modal({ children, onClose, title }: ModalType) {
    const modals: any = document.getElementById("modal-overlay");

    const closeByEsc = (evt: KeyboardEvent | React.KeyboardEvent) => {
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
            <ModalOverlay onClick={(evt: KeyboardEvent | React.KeyboardEvent) => { onClose(); }} />
        </>,
        modals
    );

}

export default Modal;