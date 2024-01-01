/* eslint-disable no-case-declarations */
import {
    API_START,
    API_END,
    API_ERROR,
} from "../Type";

//models
import { ApiModel } from "../../apimanager/ApiModel"

function createApiModel(obj) {
    return new ApiModel(obj);
}

//INITIAL_STATE
const INITIAL_STATE = {
    apiModel: createApiModel({}),
    apiLables: [],
};

//reducer
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case API_START:
            return {
                ...state,
                apiModel: createApiModel({ API_IS_LOADING: true }),
                apiLables: [
                    ...state.apiLables,
                    action.payload
                ]
            };
        case API_END:
            return {
                ...state,
                apiModel: createApiModel({ API_IS_LOADING: false }),
                apiLables: state.apiLables.filter(val => val != action.payload)
            };
        case API_ERROR:

            try {
                let errorMsg = 'API Error / Something went wrong!';

                const { error } = action.payload;
                if (error && error._hasError) {
                    errorMsg = "No Internet Connection.";
                }

                return {
                    ...state,
                    apiModel: createApiModel({
                        API_IS_LOADING: false,
                        API_ERR: errorMsg,
                        API_ACTION_TYPE: action.payload["label"]
                    }),
                    apiLables: state.apiLables.filter(val => val != action.payload)
                };
            } catch (error) {
                return {
                    ...state,
                    apiModel: createApiModel({
                        API_IS_LOADING: false,
                        API_ERR: 'API Error / Something went wrong!',
                        API_ACTION_TYPE: action.payload["label"]
                    }),
                    apiLables: state.apiLables.filter(val => val != action.payload)
                };
            }

        default:
            return state;
    }
};
