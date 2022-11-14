import { AnyAction } from "redux";
import { GlobalConfig } from "src/types/global";
import * as types from "src/actions/global";

const initialState: GlobalConfig = {
    collapsed: false,
};

export default function (
    state = initialState,
    action: AnyAction
): GlobalConfig {
    switch (action.type) {
        case types.GLOBAL_INPATIENT_TABLE_STYLE:
            return {
                ...state,
                collapsed: true,
            };

        case types.GLOBAL_COLLAPSED:
            return {
                ...state,
                collapsed: action.collapsed,
            };

        default:
            return state;
    }
}
