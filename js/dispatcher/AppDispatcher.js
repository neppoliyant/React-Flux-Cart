import {Dispatcher} from 'flux';

// Create dispatcher instance
var AppDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
AppDispatcher.handleAction = function(action) {
  console.log(' Dispatch :' + action);
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

module.exports = AppDispatcher;