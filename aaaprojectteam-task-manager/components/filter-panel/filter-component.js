import Component from '../component.js';
import { PRIORITY_LIST } from '../../constants.js';
import state from '../../state/index.js';
import TaskListComponent from '../task-list/task-list.js';
import PaginationComponent from '../pagination/pagination-component.js';
import backend from '../../backend/index.js';

export default class FilterComponent extends Component {
	constructor(anchor) {
		const element = document.createElement('div');
		super(anchor, element);
	}

	render() {
		this.element.classList.add('bottom__filter__block');
		this.element.appendChild(this.createBlockName());
		this.element.appendChild(this.createCheckBoxes());
		this.anchor.appendChild(this.element);
	}

	createBlockName() {
		const content = document.createElement('div');
		content.classList.add('name__block');
		const blockName = document.createElement('span');
		blockName.classList.add('button__name');
		blockName.innerText = 'Filter by';
		content.appendChild(blockName);

		return content;
	}

	createCheckBoxes() {
		const content = document.createElement('div');
		content.classList.add('checkBoxes__content');

		PRIORITY_LIST.forEach((item) => {
			const checkBoxBlock = document.createElement('div');
			const button = document.createElement('input');
			const label = document.createElement('label');
			checkBoxBlock.classList.add('checkbox');
			button.type = 'checkbox';
			button.id = item;
			button.value = item;
			button.checked = true;
			this.addClickHandler(checkBoxBlock);
			label.innerText = item;
			label.setAttribute('for', item);
			checkBoxBlock.appendChild(button);
			checkBoxBlock.appendChild(label);
			content.appendChild(checkBoxBlock);
		});

		return content;
	}

	addClickHandler(button) {
		button.addEventListener('click', () => {
			const checkBoxes = [
				document.getElementById('high'),
				document.getElementById('middle'),
				document.getElementById('low'),
			];

			const filtrationTypes = checkBoxes.filter((checkBox) => checkBox.checked).map((checkBox) => checkBox.value);
			state.loadEvent('setFiltration', filtrationTypes);
			this.refreshView();
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
