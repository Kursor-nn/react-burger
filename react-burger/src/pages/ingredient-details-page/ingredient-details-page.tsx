import { useSelector } from "react-redux";
import styles from "./ingredient-details-page.module.css"

const IngredientDetailsPage = ({ children }: any) => {
  return (
    <main className={styles.wrapper}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      {children}
    </main>
  )
};

export default IngredientDetailsPage;
