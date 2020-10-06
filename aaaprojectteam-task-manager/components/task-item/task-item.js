import Component from '../component.js';
import state from '../../state/index.js';
import { DONE, UNDONE } from '../../constants.js';
import AddTaskComponent from '../add-task/add-task.js';

export default class ItemComponent extends Component {

	constructor(anchor, data, index) {
		const elment = document.createElement('div');
		super(anchor, elment);
		this.index = index;
		this.data = data;
	}

	render() {
		this.element.classList.add('task-item');
		this.element.setAttribute('data-task', this.index);

		this.element.appendChild(this.createTaskItemContent());
		this.element.appendChild(this.createTaskTextBlock());

		if (this.data.isEdited) {
			this.element.appendChild(this.createTaskMark());
		}

		this.anchor.appendChild(this.element);
	}

	createTaskItemContent() {
		const content = document.createElement('div');
		content.classList.add('task-item__content');
		content.appendChild(this.createTaskItemData());

		if (state.state.isCurrentUserAdmin) {
			content.appendChild(this.createEditButton());
		}

		return content;
	}

	createEditButton() {
		const editButton = document.createElement('div');
		const editButtonText = document.createElement('span');
		editButton.classList.add('task-item__edit-button');
		editButtonText.innerText = 'Edit';
		editButton.appendChild(editButtonText);
		editButton.addEventListener('click', () => {
			const anchor = document.querySelector('.wrapper__content');
      anchor.innerHTML = '';
      const addTaskComponent = new AddTaskComponent(anchor, this.data);
      addTaskComponent.render();
		});

		return editButton;
	}

	createTaskItemData() {
		const data = document.createElement('div');
		const userData = document.createElement('div');
		const taskData = document.createElement('div');
		data.classList.add('task-item__data');
		userData.classList.add('task-item__user-data');
		taskData.classList.add('task-item__task-data');
		const userName = document.createElement('span');
		userName.classList.add('scroll');
		userName.innerText = this.data.name;
		const userEmail = document.createElement('span');
		userEmail.classList.add('scroll');
		userEmail.innerText = this.data.email;
		const taskPriority = document.createElement('span');
		taskPriority.innerText = this.data.priority;
		const taskStatus = document.createElement('span');
		taskStatus.innerText = this.data.status;
		userData.appendChild(userName);
		userData.appendChild(userEmail);
		taskData.appendChild(taskPriority);
		taskData.appendChild(taskStatus);
		data.appendChild(userData);
		data.appendChild(taskData);

		return data;
	}

	createTaskTextBlock() {
		const textBlock = document.createElement('div');
		textBlock.classList.add('task-item__text-block');
		const text = document.createElement('span');
		text.classList.add('task-item__text');
		text.innerText = this.data.text;
		textBlock.appendChild(text);

		return textBlock;
	}

	createTaskMark() {
		const mark = document.createElement('div');
		mark.classList.add('task-item__mark');
		const text = document.createElement('span');
		text.classList.add('task-item__mark-text');
		text.innerText = 'Edited by administrator';
		mark.appendChild(text);

		return mark;
	}
}
