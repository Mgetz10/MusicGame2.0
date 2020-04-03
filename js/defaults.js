function alterClass(addOrRemove) {
  return (classInput, elem) => elem.classList[addOrRemove](classInput)
}
const addClass = alterClass('add');
const removeClass = alterClass('remove');

function alterClasses(addOrRemove) {
  return function (inputObj) {
    for (var key in inputObj) {
      inputObj[key].forEach(element => {
        return element.classList[addOrRemove](key)
      });
    }
  }
}
const addClasses = alterClasses('add');
const removeClasses = alterClasses('remove');

function getElementByDataset(
  data,
  searchString,
  specifier = '',
  elementToSearch = document
) {
  return elementToSearch.querySelector(
    `${specifier}[data-${data}="${searchString}"]`
  );
}

function setStyles(elem, styleObj) {
  for (var key in styleObj) {
    elem.style[key] = styleObj[key]
  }
}

function setAttributes(elem, attObj) {
  for (var key in attObj) {
    elem.setAttribute(key, attObj[key])
  }
}

function posAbs(elem, top, left) {
  setStyles(elem, {
    top: top,
    left: left
  })
}