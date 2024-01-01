
// for type-scripting
import PropTypes from 'prop-types';

class ApiModel {
    constructor(j_obj = {}) {
        this.API_SUCCESS = (j_obj["API_SUCCESS"]) ? j_obj["API_SUCCESS"] : "Success";

        this.API_FAILURE = (j_obj["API_FAILURE"]) ? j_obj["API_FAILURE"] : "Failure";

        this.API_ERR = (j_obj["API_ERR"]) ? j_obj["API_ERR"] : "Api Error";

        this.API_NETWORK_ERR = (j_obj["API_NETWORK_ERR"]) ? j_obj["API_NETWORK_ERR"] : "Network Request failed";

        this.API_IS_LOADING = (j_obj["API_IS_LOADING"]) ? j_obj["API_IS_LOADING"] : false;

        this.API_ACTION_TYPE = (j_obj["API_ACTION_TYPE"]) ? j_obj["API_ACTION_TYPE"] : '';
    }
}

// for type-scripting
ApiModel.propTypes = {
    API_SUCCESS: PropTypes.string,
    API_FAILURE: PropTypes.string,
    API_ERR: PropTypes.string,
    API_NETWORK_ERR: PropTypes.string,
    API_IS_LOADING: PropTypes.bool,
    API_ACTION_TYPE: PropTypes.string
};

export { ApiModel };
