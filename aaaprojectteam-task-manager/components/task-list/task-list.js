import Component from '../component.js';
import TaskComponent from '../task-item/task-item.js';
import backend from '../../backend/index.js';
import state from '../../state/index.js';
import { DEFAULT } from '../../constants.js';

export default class ListComponent extends Component {
	constructor(anchor) {
		backend.getTasks();
		const elment = document.createElement('div');
		super(anchor, elment);
	}

	render() {
		if (state.state.tasks.length === 0) {
			// Создание пустого информационного блока, если список пуст
			this.createEmptyBlock();
			return;
		}

		this.element.classList.add('task-list');
		this.anchor.appendChild(this.element);
		let taskList = state.state.tasks;
		taskList.sort(this.sortByField(state.state.sortType));
		taskList = this.filterByField(taskList);
		for (let i = 0; i < taskList.length; i++) {
			const task = new TaskComponent(this.element, taskList[i], i + 1);
			task.render();
		}
	}

	sortByField(field) {
    if (field === DEFAULT) {
      return (a, b) => (+a[field] > +b[field] ? -1 : 1);
    } else {
      return (a, b) => (a[field] > b[field] ? 1 : -1);
    }
  }
  
	filterByField(list) {
    const filtrationTypes = state.state.filtrationTypes;
    const filteredList = list.filter((task) => {
      return filtrationTypes.some((type) => type === task.priority);
    })

		return filteredList.length ? filteredList : [];
	}

	createEmptyBlock() {
		this.anchor.innerHTML = '';
		const emptyList = document.createElement('div');
		const emptyListText = document.createElement('h2');
		emptyList.classList.add('empty-list');
		emptyListText.innerText = `No tasks for now`;
		emptyList.appendChild(emptyListText);
		this.anchor.appendChild(emptyList);
	}
}
