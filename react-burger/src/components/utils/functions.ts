import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import {IngredientType} from "../product-list/product-list";

export interface ICount {
    [key: string]: number;
}

require("dayjs/locale/ru");
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export const getCount = (arr: IngredientType[]) => {
    const countItems: ICount = {};
    for (const item of arr) {
        countItems[item._id ? item._id : 0] = countItems[item._id ? item._id : 0] ? countItems[item._id ? item._id : 0] + 1 : 1;
    }
    return countItems;
};

export const filterIngredientsByIds = (ids: string[], ingredients: IngredientType[]) => {
    let result: IngredientType[] = [];
    ids?.forEach((id) => {
        const ingredient = ingredients.find((item) => {
            return item._id === id;
        });
        if (!ingredient) return;
        result = [...result, ingredient];
    });
    return result;
};

export const date2string = (date: string) => {
    return `${dayjs(date).locale("ru").calendar(null, {
        sameDay: "[Сегодня], H:mm",
        lastDay: "[Вчера], H:mm",
        lastWeek: `DD MMMM YYYY, H:mm`,
        sameElse: `DD MMMM YYYY, H:mm`,
    })}`;
};

export const getIngredientsWithCount = (obj: ICount, arr: IngredientType[]) => {
    let newIngredients: IngredientType[] = [];
    for (let key in obj) {
        arr.forEach((item) => {
            if (item._id === key) {
                newIngredients.push({...item, count: obj[key]});
            }
        });
    }
    return newIngredients;
};