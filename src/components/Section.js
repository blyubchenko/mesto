export default class Section{
  constructor({renderer}, containerSelector) {
      this._renderer = renderer;
      this._containerSelector = document.querySelector(containerSelector);
  }
  renderItems(arrayCards, userId) {
      arrayCards.forEach(element => {
          this._renderer(element, userId);
      });
  }
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}