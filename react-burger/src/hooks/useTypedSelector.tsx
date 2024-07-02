import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { RootState } from "../services/init";
import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();