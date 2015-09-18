import AppDispatcher from '../dispatcher/AppDispatcher';
import {TOGGLE_NAV} from '../constants/AppConstant';

export default {
	toggle(type) {
		AppDispatcher.dispatch({
			actionType: TOGGLE_NAV,
			type: type
		})
	}
}