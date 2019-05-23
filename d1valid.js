/*! d1valid https://github.com/vvvkor/d1valid */
/* Custom form validation */

/* todo: ajax validate, server validate, :valid, .js-process */

//form, form.js-validate, input[data-hint]~.small
if(typeof module !== "undefined") var d1 = require('d1css');
(function () {
var main = new(function () {

  "use strict";

  this.opt = {
    cValidate: 'js-validate'
  };
  
  /*
  this.validationErrors = [
    'valueMissing',
    'typeMismatch',
    'tooLong',
    'tooShort',
    'patternMismatch',
    'rangeUnderflow',
    'rangeOverflow',
    'stepMismatch',
    'badInput',
    'customError'
    //,'valid'
  ];
  */
  
  this.init = function (opt) {
    var i;
    for (i in opt) this.opt[i] = opt[i];
    d1.b('', "input, textarea, select", "", this.initValidate.bind(this));
    d1.b('', "form."+this.opt.cValidate, "", this.customValidateFormPrepare.bind(this));
    d1.b('', "form."+this.opt.cValidate, "submit", this.customValidateForm.bind(this));
  }
  
  this.initValidate = function(n) {
    if (n.willValidate) {
      if (n.tagName == 'select' || n.type == 'radio' || n.type == 'checkbox') n.onchange = this.customValidate.bind(this, n);
      else n.oninput = this.customValidate.bind(this, n);
      n.oninvalid = this.customMessage.bind(this, n);
    }
  }

  this.customValidate = function(n) {
    if (n.type == 'radio') d1.b(n.form, '[name="'+n.name+'"]', '', function(m){ m.setCustomValidity(''); });
    else n.setCustomValidity('');
    n.checkValidity();
  }

  this.customMessage = function(n) {
    var t = n.getAttribute('data-hint') || '';// || n.title;
    t = t.replace(/%([\w\-]+)%/g, function(m,v){ return n.getAttribute(v); })
    n.setCustomValidity(t);
    /*
    var x = '', err = '', i = 0;
    while (!x && (err=this.validationErrors[i++])){
      if(n.validity[err]) x = d1.s(err + ('_' + (n.type || n.tagName.toLowerCase() || '')), '') || d1.s(err,'');
    }
    if (x) {
      x = x.replace(/%(\w+)%/g, function(m,v){ return n.getAttribute(v); });
      if (n.title.length > 0) x += " \n" + n.title;
    }
    n.setCustomValidity(x);
    */
  }
  
  this.customValidateFormPrepare = function(n, e) {
    n.setAttribute('novalidate',true);
  }
  
  this.customValidateForm = function(n, e) {
    n.classList.remove(this.opt.cValidate);
    if (n.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

})();

  if (typeof module !== "undefined") module.exports = main;
  else if (window) d1valid = main;
})();