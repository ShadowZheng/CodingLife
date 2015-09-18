import {EventEmitter} from 'events';
import {TOGGLE_NAV} from '../constants/AppConstant';
import AppDispatcher from '../dispatcher/AppDispatcher';

var state = {
	isNavOpen: false
}

const CHANGE_EVENT = 'change';

export default class NavStore extends EventEmitter {

	constructor(args) {
		super(args);
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}


	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	getState() {
		return {
			isNavOpen: state.isNavOpen
		}
	}
	toggle(type) {
		if (type == 'open') {
			state.isNavOpen = true;
		} else if (type == 'close') {
			state.isNavOpen = false;
		} else {
			state.isNavOpen = !state.isNavOpen;
		}
	}
}

let store = new NavStore();

AppDispatcher.register((action) => {
	switch(action.actionType) {
		case TOGGLE_NAV:
			store.toggle(action.type);
			break;
		default:
	}
	store.emitChange();
})

export default store;