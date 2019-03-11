const reactComposition = (userSettings) => {
  let returnProps = {};
  let defaultSettings = {
    onChange: null,
  };
  let settings = {
    ...defaultSettings,
    ...userSettings,
  };
  let defaultReactCompositionStatus = function () {
    return {
      composition: false,
    };
  };
  let data = {
    get: (event) => {
      return event.target.__REACT_COMPOSITION_SECRET_DATA || defaultReactCompositionStatus();
    },
    set: (event, obj) => {
      event.target.__REACT_COMPOSITION_SECRET_DATA = obj;
    },
    extend: (event, obj) => {
      event.target.__REACT_COMPOSITION_SECRET_DATA = {...event.target.__REACT_COMPOSITION_SECRET_DATA, ...obj};
    },
  };
  returnProps.onFocus = function (event) {
    event.persist();
    event.reactComposition = data.get(event);
    if (settings.onFocus) {
      settings.onFocus(event);
    }
  };
  returnProps.onChange = function (event) {
    event.persist();
    event.reactComposition = data.get(event);
    if (settings.onChange) {
      settings.onChange(event);
    }
  };
  returnProps.onKeyDown = function (event) {
    event.persist();
    event.reactComposition = data.get(event);
    if (settings.onKeyDown) {
      settings.onKeyDown(event);
    }
  };
  returnProps.onKeyUp = function (event) {
    event.persist();
    event.reactComposition = data.get(event);
    if (settings.onKeyUp) {
      settings.onKeyUp(event);
    }
  };
  returnProps.onCompositionStart = function (event) {
    // console.log(event.type);
    if (settings.onCompositionStart) {
      settings.onCompositionStart(event);
    }
    data.extend(
      event,
      {
        composition: true,
      },
    );
  };
  returnProps.onCompositionUpdate = function (event) {
    if (settings.onCompositionUpdate) {
      settings.onCompositionUpdate(event);
    }
  };
  returnProps.onCompositionEnd = function (event) {
    event.persist();
    if (settings.onCompositionEnd) {
      settings.onCompositionEnd(event);
    }
    data.extend(
      event,
      {
        composition: false,
      },
    );
    // chrome 某些版本 onCompositionEnd 执行时间在 onChange 之后
    // 大部分浏览器执行实际是 onCompositionEnd 在 onChange 之前
    event.reactComposition = data.get(event);
    // console.log(event.type);
    settings.onChange(event);
  };
  return returnProps;
};

export default reactComposition;
