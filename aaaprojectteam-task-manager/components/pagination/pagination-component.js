import Component from '../component.js';
import state from '../../state/index.js';

export default class PaginationComponent extends Component {
	constructor(anchor) {
		const element = document.createElement('div');
		super(anchor, element);
		this.displayTasks = 2;
	}

	render() {
		this.element.classList.add('paginator');
		this.addViewPagination();
		this.anchor.appendChild(this.element);
	}

	addViewPagination() {
		const countTasks = this.filterByField(state.state.tasks).length;
		
		if(!countTasks) {
			return;
		}
		
		const countPages = Math.ceil(countTasks / this.displayTasks);
		const divTasks = document.querySelectorAll('.task-item');

		let mainPage = this.addSpans(this.element, countPages);
		mainPage.classList.add('paginator__active');
		this.addTasks(divTasks);
		this.addClickHandler(mainPage, divTasks);
	}

	addClickHandler(mainPage, divTasks) {
		this.element.addEventListener('click', (event) => {
			if (event.target.tagName !== 'SPAN') {
				return;
			}
			const id = event.target.id;
			const dataPage = +event.target.dataset.page;

			mainPage.classList.remove('paginator__active');
			mainPage = document.getElementById(id);
			mainPage.classList.add('paginator__active');

			let j = 0;
			for (let i = 0; i < divTasks.length; i++) {
				let dataTask = divTasks[i].dataset.task;
				if (dataTask <= dataPage || dataTask >= dataPage) divTasks[i].style.display = 'none';
			}

			for (let i = dataPage; i < divTasks.length; i++) {
				if (j >= this.displayTasks) {
					break;
				}
				
				divTasks[i].style.display = 'block';
				j++;
			}
		});
	}

	filterByField(list) {
    const filtrationTypes = state.state.filtrationTypes;
    const filteredList = list.filter((task) => {
      return filtrationTypes.some((type) => type === task.priority);
    })

		return filteredList.length ? filteredList : [];
	}

	addSpans(anchor, countPages, displayTasks = 2) {
		let spans = [];
		for (let i = 0; i < countPages; i++) {
			spans[i] = document.createElement('span');
			spans[i].setAttribute('data-page', i * displayTasks);
			spans[i].id = i + 1;
			spans[i].innerText = i + 1;
			anchor.appendChild(spans[i]);
		}

		return spans[0];
	}

	addTasks(divTasks, displayTasks = 2) {
		for (let i = 0; i < divTasks.length; i++) {
			if (i < displayTasks) {
				divTasks[i].style.display = 'block';
			}
		}
	}
}
