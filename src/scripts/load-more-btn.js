export default class LoadMoreBtn {
  constructor({ selector, isHidden = false }) {
    this.button = this.getButton(selector);
    isHidden && this.hide();
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.button.classList.add('hidden');
  }

  show() {
    this.button.classList.remove('hidden');
  }

  //   disable() {
  //     this.button.setAttribute('disabled', '');
  //   }

  //   enable() {
  //     this.button.removeAttribute('disabled');
  //   }
}
