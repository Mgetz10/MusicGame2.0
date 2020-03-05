function alterClass(addOrRemove) {
  return (element, classToRemove) =>
    addOrRemove === 'add' ?
    element.classList.add(classToRemove) :
    element.classList.remove(classToRemove);
}
const addClass = alterClass('add');
const removeClass = alterClass('remove');

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