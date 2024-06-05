import { useDrag } from "react-dnd";
import { deleteIngredientByPosition } from "../../services/actions/orderActions";

import { useDispatch } from "react-redux";

import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

// Styles
import styles from './constructor.module.css';

function ConstructorItem({ value, index }) {
    const dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag({
        type: "component",
        item: () => ({}),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        drop(item) {
            console.log("drag ordering", item)
        }
    });

    const preventDefault = (e) => e.preventDefault();

    return (
        <div key={index} className={styles.ingredient} onDrop={preventDefault} ref={drag}>
            <DragIcon type="primary" />
            <ConstructorElement key={value._id} text={value.name} price={value.price} thumbnail={value.image}
                handleClose={
                    (value) => {
                        dispatch(deleteIngredientByPosition(index))
                    }
                } />
        </div>
    )
}

export default ConstructorItem;