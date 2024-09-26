import { UIEventHandler, useRef } from 'react';

//KIT Components 
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// Styles
import styles from './ingredients.module.css';

//Components
import ProductList from '../product-list/product-list';

import { setTab } from '../../services/actions/ingredientsActions';
import { BUN_TAB, MAIN_TAB, SAUCE_TAB } from '../utils/constants';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector';

function BurgerIngredients() {
    const dispatch = useAppDispatch();
    const currentTub = useTypedSelector((state) => state.ingredients.tab);

    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauseRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLHeadingElement>(null);

    const scrollHandler = () => {
        const bunDist = Math.abs(containerRef.current!.getBoundingClientRect().top - bunRef.current!.getBoundingClientRect().top)
        const sauceDist = Math.abs(containerRef.current!.getBoundingClientRect().top - sauseRef.current!.getBoundingClientRect().top)
        const mainDist = Math.abs(containerRef.current!.getBoundingClientRect().top - mainRef.current!.getBoundingClientRect().top)
        const minDist = Math.min(bunDist, sauceDist, mainDist);

        const currentHeader = minDist === bunDist ? BUN_TAB : minDist === sauceDist ? SAUCE_TAB : MAIN_TAB;

        if (currentTub !== currentHeader) {
            dispatch(setTab(currentHeader))
        }
    }

    const clickHandler = (refTitle: React.RefObject<HTMLHeadingElement>, value: string) => {
        refTitle.current?.scrollIntoView({
            behavior: "smooth",
        });
        dispatch(setTab(value))
    }

    return (
        <div className={`pl-5 pt-20 ${styles.column}`} ref={containerRef}>
            <p data-qa-id="topic-build-burger" className="text text_type_main-large">Соберите бургер</p>
            <div className={styles.source_head}>
                <Tab value="bun" active={currentTub === BUN_TAB} onClick={(value) => (clickHandler(bunRef, value))}>Булки</Tab>
                <Tab value="sauce" active={currentTub === SAUCE_TAB} onClick={(value) => (clickHandler(sauseRef, value))}>Соусы</Tab>
                <Tab value="main" active={currentTub === MAIN_TAB} onClick={(value) => (clickHandler(mainRef, value))}>Начинки</Tab>
            </div>

            <div className={styles.scrollzone} onScroll={scrollHandler}>
                <ProductList listType={BUN_TAB} refs={bunRef} />
                <ProductList listType={SAUCE_TAB} refs={sauseRef} />
                <ProductList listType={MAIN_TAB} refs={mainRef} />
            </div>
        </div>
    );
}

export default BurgerIngredients;