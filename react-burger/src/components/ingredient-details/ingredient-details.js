//Styles
import Product from '../product/product';
import styles from './ingredient-details.module.css'

//Type Check
import PropTypes from 'prop-types';

function IngredientDetails({ card }) {
    const info = [
        { title: "Калории,ккал", value: card.calories },
        { title: "Белки, г", value: card.proteins },
        { title: "Жиры, г", value: card.fat },
        { title: "Углеводы, г", value: card.carbohydrates },
    ];

    function buildValue(item, index) {
        return (
            <li className={styles.item} key={index}>
                <p className="text text_type_main-default text_color_inactive">{item.title}</p>
                <span className="text text_type_digits-default text_color_inactive">
                    {item.value}
                </span>
            </li>
        );
    }

    return (
        <div className={styles.wrapper}>
            <img
                src={card.image_large}
                alt={card.name}
                className={`ml-5 mr-5 ${styles.image}`}
            />
            <p className={`text text_type_main-medium mt-4`}>{card.name}</p>
            <ul className={styles.list}>
                {info.map((item, index) => buildValue(item, index))}
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    card: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })
};

export default IngredientDetails;