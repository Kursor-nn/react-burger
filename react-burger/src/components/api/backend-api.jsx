import { URL, MAKE_ORDER_URL } from "../utils/constants";
import { displayOrder, setOrderName, setOrderNumber } from "../../services/actions/orderActions";
import { setErrorMessage } from "../../services/actions/errorActions";
import { fillIngredientList } from "../../services/actions/ingredientsActions";

export const doOrderFrom = ((dispatch, orderIngred) => {
  fetch(MAKE_ORDER_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "ingredients": orderIngred })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data: ", data)
      if (data.success) {
        dispatch(setOrderName(data.name))
        dispatch(setOrderNumber(data.order.number))
        dispatch(displayOrder(true));
      } else {
        dispatch(setErrorMessage("У нас лапки."))
      }
    })
    .catch((error) => {
      console.log("Error", error);
      dispatch(setErrorMessage("У нас лапки."))
    });
})

export const loadIngredients = (dispatch) => {

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      dispatch(fillIngredientList(data.data));
    })
    .catch((error) => {
      console.log("Error", error);
      dispatch(setErrorMessage("У нас лапки."))
    });

}