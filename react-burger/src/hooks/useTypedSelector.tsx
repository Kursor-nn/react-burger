import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../services/init";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
