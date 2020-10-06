import Component from '../component.js';
import { SORT_LIST, DEFAULT } from '../../constants.js';
import TaskListComponent from '../task-list/task-list.js';
import state from '../../state/index.js';
import PaginationComponent from '../pagination/pagination-component.js';
import FilterComponent from '../filter-panel/filter-component.js';

export default class SortingComponent extends Component {
	constructor(anchor) {
		const element = document.createElement('div');
		super(anchor, element);
	}

	render() {
		this.element.classList.add('sorting__block');
		this.element.appendChild(this.createTopBlock());
		this.createBottomBlock();
		this.anchor.appendChild(this.element);
	}

	createTopBlock() {
		const content = document.createElement('div');
		content.classList.add('top__sort__block');
		content.appendChild(this.createDropdown());
		content.appendChild(this.createDropdownContent());

		return content;
	}
	createBottomBlock() {
		const filterBlock = new FilterComponent(this.element);
		filterBlock.render();
	}

	createDropdown() {
		const button = document.createElement('div');
		button.classList.add('sort-form');
		const buttonText = document.createElement('span');
		buttonText.classList.add('button__name');
		buttonText.innerText = 'Sort by';
		button.appendChild(buttonText);

		return button;
	}

	createDropdownContent() {
		const selectContainer = document.createElement('div');
		selectContainer.classList.add('input__block');
		this.select = document.createElement('select');
		this.select.classList.add('input', 'select');
		this.select.setAttribute('name', 'sorting');

		SORT_LIST.forEach((item) => {
			const option = document.createElement('option');
			option.classList.add('option');
			option.setAttribute('value', item);
			option.innerText = item;
			this.select.appendChild(option);
		});

		this.select.value = DEFAULT;
		this.addSelectHandler();
		selectContainer.appendChild(this.select);

		return selectContainer;
	}

	addSelectHandler() {
		this.select.addEventListener('click', () => {
			if (this.select.value !== state.state.sortType) {
				state.loadEvent('setSortType', this.select.value);
				this.refreshView();
			}
		});
	}

	refreshView() {
		const listElement = document.querySelector('.task-list');
		listElement.remove();
		const paginatorElement = document.querySelector('.paginator');
		paginatorElement.remove();

		const bottomBlock = document.querySelector('.bottom__block');
		const topBlock = document.querySelector('.top__block');
		const list = new TaskListComponent(topBlock);
		list.render();
		const newPaginator = new PaginationComponent(bottomBlock);
		newPaginator.render();
	}
}
