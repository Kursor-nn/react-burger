//Styles
import styles from "./ingredient-details-page.module.css"
import {ReactNode} from "react";

export interface IIngredientDetailsPageProps {
    children: ReactNode;
}

const IngredientDetailsPage = ({children}: IIngredientDetailsPageProps) => {
    return (
        <main className={styles.wrapper}>
            <h1 className="text text_type_main-large">Детали ингредиента</h1>
            {children}
        </main>
    )
};

export default IngredientDetailsPage;
