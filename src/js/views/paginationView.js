import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupBtn(btnFor) {
    return `
    <button data-goto="${
      btnFor === 'next' ? this._data.page + 1 : this._data.page - 1
    }" class="btn--inline pagination__btn--${btnFor}">
      <span>Page ${
        btnFor === 'next' ? this._data.page + 1 : this._data.page - 1
      }</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${
      btnFor === 'next' ? 'right' : 'left'
    }"></use>
      </svg>
    </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('next');
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('prev');
    }

    // Other Page
    if (curPage < numPages) {
      return `${this._generateMarkupBtn('prev')} ${this._generateMarkupBtn(
        'next'
      )}`;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
