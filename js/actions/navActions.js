var AppDispather = require('../dispather/AppDispather');
var navConst = require('../constant/commonConst').nav;

var navActions = {
	toggle: function(openOrCloseOrToggle) {
		AppDispather.handleAction({
			actionType: navConst.TOGGLE,
			data: openOrCloseOrToggle
		})
	}
};

module.exports = navActions;