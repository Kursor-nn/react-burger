import { deleteIngredientByPosition } from "../../services/actions/orderActions";

//React
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { PropTypes } from 'prop-types';

// KIT
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

// Styles
import styles from './constructor.module.css';

function ConstructorItem({ value, index, moveCard }) {
    const dispatch = useDispatch();

    const [{ }, drag] = useDrag({
        type: "component",
        item: () => ({ id: value._id, index })
    });


    const ref = useRef(null);
    const [{ }, drop] = useDrop({
        accept: "component",
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
                (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
                return;
            }

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    const preventDefault = (e) => e.preventDefault();

    return (
        <div key={value.uniqueId} className={styles.ingredient} onDrop={preventDefault} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement key={value.uniqueId} text={value.name} price={value.price} thumbnail={value.image}
                handleClose={
                    (value) => {
                        dispatch(deleteIngredientByPosition(index))
                    }
                } />
        </div>
    )
}

ConstructorItem.propTypes = {
    value: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    }),
    index: PropTypes.number,
    moveCard: PropTypes.func
};

export default ConstructorItem;