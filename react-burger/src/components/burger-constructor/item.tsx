import { deleteIngredientByPosition } from "../../services/actions/orderActions";

//React
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import { COMPONENT_DND_TYPE } from "../utils/constants";

// KIT
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

// Styles
import styles from './constructor.module.css';
import { IngredientType } from "../product-list/product-list";

export interface ConstructorItemType {
    value: IngredientType,
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DnDValueType {
    id: number,
    index: number
}

const ConstructorItem = ({ value, index, moveCard }: ConstructorItemType) => {
    const dispatch = useDispatch();

    const [x, drag] = useDrag({
        type: COMPONENT_DND_TYPE,
        item: () => ({ id: value._id, index })
    });


    const ref = useRef<HTMLHeadingElement>(null);
    const [z, drop] = useDrop({
        accept: COMPONENT_DND_TYPE,
        hover(item: DnDValueType, monitor) {
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
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
            if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
                (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
                return;
            }

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    const preventDefault = (e: any) => e.preventDefault();

    return (
        <div key={value.uniqueId} className={styles.ingredient} onDrop={preventDefault} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement key={value.uniqueId} text={value.name!!} price={value.price!!} thumbnail={value.image!!}
                handleClose={
                    () => {
                        dispatch(deleteIngredientByPosition(index))
                    }
                } />
        </div>
    )
}

export default ConstructorItem;