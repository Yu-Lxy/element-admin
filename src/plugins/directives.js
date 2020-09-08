import Vue from 'vue'

let imageIsExist = function(url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = function() {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    }
    img.onerror = function() {
      resolve(false);
      img = null;
    }
    img.src = url;
  })
}
Vue.directive('err-img', async function(el, binding) {
  let imgURL = binding.value || 'https://lukehui.oss-cn-beijing.aliyuncs.com/cheers/upload/user/3.png';
  let realURL = el.src
  if (realURL) {
    let exist = await imageIsExist(realURL);
    if (!exist) {
      el.setAttribute('src', imgURL);
    }
  }else {
    el.setAttribute('src', imgURL);
  }
})

Vue.directive('validate', {
  inserted(el, binding, vNode) {
    let content
    let re
    // 设置输入框的值,触发input事件,改变v-model绑定的值
    const setVal = val => {
      if (vNode.componentInstance) {
        // 如果是自定义组件就触发自定义组件的input事件
        vNode.componentInstance.$emit('input', val)
      } else {
        // 如果是原生组件就触发原生组件的input事件
        el.value = val
        el.dispatchEvent(new Event('input'))
      }
    }
    // 按键按下
    el.addEventListener('keypress', event => {
      let e = event || window.event
      let inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode)
      content = e.target.value
      // 定义方法,阻止输入
      function preventInput() {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
      if (binding.arg === 'point') { // 只允许输入数字/小数点
        re = /\d|\./
        if (!re.exec(inputKey) && !e.ctrlKey) {
          preventInput()
        } else if (content.indexOf('.') > 0 && inputKey === '.') {
          // 已有小数点,再次输入小数点
          preventInput()
        }
      } else if (binding.arg === 'int') { // 只允许输入整数
        re = /\d/
        if (!re.exec(inputKey) && !e.ctrlKey) {
          preventInput()
        }
      } else if (binding.arg === 'noSpace') { // 不允许有空格
        if (e.keyCode === 32) {
          preventInput()
        }
      }
    })
    // 失去焦点
    el.addEventListener('focusout', event => { // 保留几位小数
      let e = event || window.event
      let argPrecision = 0 // 默认保留整数
      content = parseFloat(e.target.value)
      if (!content) {
        content = 0
      }
      if (binding.value.precision) {
        argPrecision = parseFloat(binding.value.precision)
      }
      e.target.value = content.toFixed(argPrecision)
      setVal(e.target.value)
    })
  }
})

Vue.directive('noMoreClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled');
      el.disabled = true;
      setTimeout(() => {
        el.disabled = false;
        el.classList.remove('is-disabled');
      }, 3000)
    })
  }
});

Vue.directive('clearTrim', {
  inserted: function(el, binding, vnode) {
    const element = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
    element.addEventListener('blur', function() {
      vnode.data.model.callback(element.value.trim())
    })
  }
})

Vue.directive('url', {
  inserted(el, binding, vnode) {
    const element = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
    element.addEventListener('blur', (event) => {
      let e = event || window.event
      if (/http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(e.target.value) === false) {
        vnode.data.model.callback(element.value = '')
      }
    })
  }
})

Vue.directive('color', {
  inserted(el, binding, vnode) {
    const element = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
    element.addEventListener('blur', (event) => {
      let e = event || window.event
      if (/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(e.target.value) === false) {
        vnode.data.model.callback(element.value = '')
      }
    })
  }
})


