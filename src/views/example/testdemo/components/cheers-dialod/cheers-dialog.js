
var CONFIRM_TEXT = '确定';
var CANCEL_TEXT = '取消';
import Vue from 'vue';
import cheersDialogVue from './cheers-dialog.vue';
var cheersDialogConstructor = Vue.extend(cheersDialogVue);
var currentMsg, instance;
var msgQueue = [];
var defaults = {
  title: '标题',
  dialogVisible: false,
  showClose: true,
  modalFade: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  searchValue:'',
  type:'radio',
  serviceName: 'getUserList'
};
var merge = function(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i];
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

const defaultCallback = (action, data) => {
  if (currentMsg) {
    if (currentMsg.resolve) {
    	if (action === 'confirm') {
        currentMsg.resolve({type:action,data:data});
      } else if (action === 'cancel' && currentMsg.reject) {
        currentMsg.reject({type:action});
      }
      cheersDialog.close()
    }
  }
};

var initInstance = function() {
  instance = new cheersDialogConstructor({
    el: document.createElement('div')
  });
  instance.callback = defaultCallback;
};

var showNextMsg = function() {
	initInstance();
  if (!instance.value){
  	currentMsg = msgQueue.shift();
  	var options = currentMsg.options;
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
	  instance.callback = defaultCallback;

	  document.body.appendChild(instance.$el);
	  Vue.nextTick(() => {
	    instance.value = true;
	  });
  }
}
var cheersDialog = function(options) {
	return new Promise(function(resolve, reject) { // eslint-disable-line
    msgQueue.push({
      options: merge({}, defaults, options),
      resolve: resolve,
      reject: reject
    });
    showNextMsg()
  });
}

cheersDialog.radio = function(options) {
  return cheersDialog(merge({
    type:'radio'
  },options))
}
cheersDialog.checkbox = function(options) {
  return cheersDialog(merge({
    type:'checkbox'
  },options))
}
cheersDialog.close = function() {
  if (!instance) return;
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
  document.body.removeChild(instance.$el) //从body中移除dom
  instance.$destroy()
};
export default cheersDialog;
