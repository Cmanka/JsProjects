import Component from '../component.js';
import TaskListComponent from '../task-list/task-list.js';
import state from '../../state/index.js';
import AddTaskButtonComponent from '../add-task-button/add-task-button.js';
import PaginationComponent from '../pagination/pagination-component.js';
import backend from '../../backend/index.js';
import SortingComponent from '../sorting-panel/sorting-panel-component.js';

export default class WrapperComponent extends Component {
	constructor(anchor) {
		const element = document.createElement('div');
		super(anchor, element);
	}

	render() {
		this.anchor.style.backgroundColor = '#82ae23';
		this.createBlocks(this.anchor);
	}

	renderEmpty() {
		this.element.classList.add('wrapper');
		const content = document.createElement('div');
		content.classList.add('wrapper__content');
		this.element.appendChild(content);
		content.style.backgroundColor = '#4c5f24';
		this.anchor.appendChild(this.element);
	}

	createBlocks(content) {
		const topBlock = document.createElement('div');
		const bottomBlock = document.createElement('div');
		content.appendChild(topBlock);
		content.appendChild(bottomBlock);
		topBlock.classList.add('top__block');
		bottomBlock.classList.add('bottom__block');
		backend.getTasks().then(() => {
			const button = new AddTaskButtonComponent(topBlock);
			button.render();
			const list = new TaskListComponent(topBlock);
			list.render();
			const sortPanel = new SortingComponent(topBlock);
			sortPanel.render();
			const paginator = new PaginationComponent(bottomBlock);
			paginator.render();
		});

		if (state.state.isCurrentUserAdmin) {
			this.createAdminModeMark(content);
		}
	}

	createAdminModeMark(anchor) {
		const adminMarkBlock = document.createElement('div');
		adminMarkBlock.classList.add('admin-mode-mark__block');
		const text = document.createElement('span');
		text.classList.add('admin-mode-mark__text');
		text.innerText = 'Admin Mode';
		adminMarkBlock.appendChild(text);

		anchor.appendChild(adminMarkBlock);
	}
}
