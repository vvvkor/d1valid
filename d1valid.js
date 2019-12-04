/*! d1valid https://github.com/vvvkor/d1valid */
/* Custom form validation */

/* todo: ajax validate, server validate, .js-process */

//form, form.js-validate, input[data-hint]~.small
if(typeof module !== "undefined") var d1 = require('d1css');
(function () {
var main = new(function () {

  "use strict";
  
  this.name = 'valid';
  
  this.opt = {
    qsValidate: 'form', // set custom text for browser tooltips
    cUnhint: 'js-unhint', // turn off browser tooltips
    cLiveVal: 'js-live-val' // live validation, disable submit buttons if invalid
  };
  
  this.init = function (opt) {
    var i;
    for (i in opt) this.opt[i] = opt[i];
    var q = this.opt.qsValidate;
    var dh = "[data-hint]";
    d1.b('', q + " input" + dh + ", " + q + " textarea" + dh + ", "+ q +" select" + dh, "", this.initInput.bind(this));
    d1.b('', "form."+this.opt.cUnhint, "", this.unhint.bind(this));
    d1.b('', "form."+this.opt.cLiveVal, "", this.validateForm.bind(this));
    d1.b('', "form."+this.opt.cUnhint, "submit", this.validateForm.bind(this));
  }
  
  this.initInput = function(n) {
    if (n.willValidate) {
      if (n.tagName == 'select' || n.type == 'radio' || n.type == 'checkbox') n.onchange = this.validateInput.bind(this, n);
      else n.oninput = this.validateInput.bind(this, n);
      n.oninvalid = this.setCustomMessage.bind(this, n);
    }
  }

  this.isLive = function(f){
    return (f && f.classList.contains(this.opt.cLiveVal));
  }
  
  this.validateInput = function(n) {
    if (n.type == 'radio') d1.b(n.form, '[name="'+n.name+'"]', '', function(m){ m.setCustomValidity(''); });
    else n.setCustomValidity('');
    n.checkValidity();
    if(this.isLive(n.form)) this.validateForm(n.form);
  }

  this.setCustomMessage = function(n) {
    var t = n.getAttribute('data-hint') || '';// || n.title;
    t = t.replace(/%([\w\-]+)%/g, function(m,v){ return n.getAttribute(v); })
    n.setCustomValidity(t);
  }
  
  this.unhint = function(n, e) {
    n.setAttribute('novalidate', true);
  }
  
  this.validateForm = function(n, e) {
    if(e) n.classList.remove(this.opt.cUnhint);
    var ok = n.checkValidity();//!==false
    if (!ok && e) {
      e.preventDefault();
      e.stopPropagation();
      var f = d1.q(':invalid', 0, n);
      if(f) f.focus();
    }
    //d1.b(n, '[type="submit"]', '', function(m){ m.disabled = !ok; });//if no cUnhint
    if(this.isLive(n)) d1.b(n, '[type="submit"]', '', function(m){ m.classList[ok ? 'remove' : 'add']('bg-n'); });//if cUnhint used
  }
  
  d1.plug(this);

})();

  if (typeof module !== "undefined") module.exports = main;
  else if (window) d1valid = main;
})();