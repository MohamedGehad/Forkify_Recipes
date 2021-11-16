import view from "./view";
import icons from 'url:../../img/icons.svg';




class paginationView extends view{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click' , function(e){
            const btn = e.target.closest('.btn--inline')
            if(!btn) return;  
  
            const goToPage = +btn.dataset.goto;
                // console.log(goToPage)
            handler(goToPage);
        })   
    }


    _generateMarkup(){
        const curpage = this._data.page;
        const numPage = Math.ceil(this._data.results.length / this._data.resultsPerpage);



        //page 1 ,and there are other pages
        if(curpage === 1 && numPage > 1 ){
           return ` <button data-goto="${curpage +1}" class="btn--inline pagination__btn--next">
           <span>Page ${curpage +1}</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </button>`;
        }
        
        //last page 
        if (curpage === numPage && numPage > 1){
            return `<button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg> 
            <span>Page${curpage -1}</span>
          </button>
          `;
        } 
        
        // otherPage
        if(curpage <  numPage){
            return `
            <button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page${curpage -1}</span>
          </button>
            <button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next">
           <span>Page ${curpage +1}</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </button>
          `;
        }
        
        //page 1 ,and there are other pages
        return '';
    }
}

export default new paginationView();