# d1valid

Add-on for [d1](https://github.com/vvvkor/d1).  
Custom form validation.  
[Demo & docs](https://vvvkor.github.io/d1#valid)

## Install

```
npm install d1valid
```

## Usage

On page load call:
```
d1valid.init(options);
```

## Options

### cLiveVal

CSS class of forms, for which inputs are validated on the fly and submit buttons are disabled if form is in invalid state.  
Default: ``"js-live-val"``

### cUnhint

CSS class of forms, for which default brower-specific tooltips are disabled and empty required inputs are not reported as invalid until submitting.  
Default: ``"js-unhint"``

### qsValidate

Query selector of forms that require custom validation.  
Default: ``"form"``

## Browser Support

* IE 10+
* Latest Stable: Chrome, Firefox, Opera, Safari

## License

[MIT](./LICENSE)
