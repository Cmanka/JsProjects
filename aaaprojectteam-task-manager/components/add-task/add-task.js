import Component from '../component.js';
import state from '../../state/index.js';
import backend from '../../backend/index.js';
import { PRIORITY_LIST, DONE, UNDONE, LOW, DEFAULT } from '../../constants.js';
import WrapperComponent from '../wrapper/wrapper-component.js';

export default class AddTaskComponent extends Component {
	constructor(anchor, data) {
		const element = document.createElement('div');
		super(anchor, element);
		if (data) {
			this.data = data;
		}
	}

	render() {
		this.element.classList.add('login');
		const formBlock = document.createElement('form');
		formBlock.classList.add('task-item', 'task-item__creation');
		formBlock.appendChild(this.createTaskItemContent());
		formBlock.appendChild(this.createTaskTextInput());
		formBlock.appendChild(this.createAddTaskButton());
		formBlock.appendChild(this.createCloseButton());
		this.element.appendChild(formBlock);
		this.element.appendChild(this.createBattery());

		if (this.data) {
			this.setEditMode();
		}

		if (state.state.isCurrentUserAdmin) {
			this.createAdminModeMark();
		}

		this.anchor.appendChild(this.element);
	}

	createAdminModeMark() {
		const adminMarkBlock = document.createElement('div');
		adminMarkBlock.classList.add('admin-mode-mark__block');
		const text = document.createElement('span');
		text.classList.add('admin-mode-mark__text');
		text.innerText = 'Admin Mode';
		adminMarkBlock.appendChild(text);

		this.anchor.appendChild(adminMarkBlock);
	}

	createBattery() {
    const battery = document.createElement('img');
    battery.setAttribute('src', '../../images/battery.png');
    battery.classList.add('battery__img', 'battery__img__modal-view');

    return battery;
  }

	createTaskItemContent() {
		const content = document.createElement('div');
		content.classList.add('task-item__content');
		content.appendChild(this.createTaskItemData());

		return content;
	}

	createTaskItemData() {
		const data = document.createElement('div');
		const userData = document.createElement('div');
		const taskData = document.createElement('div');
		data.classList.add('task-item__data');
		userData.classList.add('task-item__user-data');
		taskData.classList.add('task-item__task-data');

		userData.appendChild(this.createUserNameInput());
		userData.appendChild(this.createUserEmailInput());
		taskData.appendChild(this.createPriorityDropdown());
		taskData.appendChild(this.createStatusBlock());

		data.appendChild(userData);
		data.appendChild(taskData);

		return data;
	}

	createUserNameInput() {
		const userNameBlock = this.createInput();
		this.userName = userNameBlock.querySelector('input');
		this.userName.setAttribute('type', 'text');
		this.userName.setAttribute('placeholder', 'Name');
		this.userName.setAttribute('name', 'userName');

		return userNameBlock;
	}

	createUserEmailInput() {
		const userEmailBlock = this.createInput();
		this.userEmail = userEmailBlock.querySelector('input');
		this.userEmail.setAttribute('type', 'text');
		this.userEmail.setAttribute('placeholder', 'Email');
		this.userEmail.setAttribute('name', 'userEmail');

		return userEmailBlock;
	}

	createTaskTextInput() {
		const taskTextContainer = document.createElement('div');
		this.taskText = document.createElement('textarea');
		taskTextContainer.classList.add('input__block');
		this.taskText.classList.add('input', 'input__textarea');
		this.taskText.setAttribute('placeholder', 'Task Text');
		this.taskText.setAttribute('name', 'taskText');
		this.taskText.setAttribute('maxLength', '1000');
		taskTextContainer.appendChild(this.taskText);

		return taskTextContainer;
	}

	createInput() {
		const inputContainer = document.createElement('div');
		const input = document.createElement('input');
		inputContainer.classList.add('input__block');
		input.classList.add('input');
		input.setAttribute('maxLength', '50');
		inputContainer.appendChild(input);

		return inputContainer;
	}

	createPriorityDropdown() {
		const selectContainer = document.createElement('div');
		this.select = document.createElement('select');
		selectContainer.classList.add('input__block');
		this.select.classList.add('input', 'select');
		this.select.setAttribute('name', 'priority');
		selectContainer.appendChild(this.select);

		PRIORITY_LIST.forEach((item) => {
			const option = document.createElement('option');
			option.classList.add('option');
			option.setAttribute('value', item);
			option.innerText = item;
			this.select.appendChild(option);
		});

		this.select.value = LOW;

		return selectContainer;
	}

	createStatusBlock() {
		const statusContainer = document.createElement('div');
		statusContainer.classList.add('radio-button__container');
		if (!this.data) {
			statusContainer.classList.add('hide');
		}
		statusContainer.appendChild(this.createRadioButton(DONE));
		statusContainer.appendChild(this.createRadioButton(UNDONE));

		return statusContainer;
	}

	createRadioButton(status) {
		const radioButtonBlock = document.createDocumentFragment();
		const radioButton = document.createElement('input');
		const label = document.createElement('label');
		radioButton.setAttribute('type', 'radio');
		radioButton.setAttribute('id', `${status}-button`);
		radioButton.setAttribute('value', status);
		radioButton.setAttribute('name', 'status');
		label.setAttribute('for', `${status}-button`);
		label.classList.add('input__block');
		label.innerText = status;
		if (!state.state.isCurrentUserAdmin) {
			radioButton.setAttribute('disabled', 'true');
			label.classList.add('input__block__disabled');
		}
		this[`${status}Radio`] = radioButton;
		if (status === UNDONE) {
			radioButton.setAttribute('checked', 'true');
		}
		radioButtonBlock.appendChild(radioButton);
		radioButtonBlock.appendChild(label);

		return radioButtonBlock;
	}

	createAddTaskButton() {
		const addTaskButtonContainer = document.createElement('div');
		addTaskButtonContainer.classList.add('button__container');
		const addTaskButton = document.createElement('div');
		addTaskButton.classList.add('login__enter-button');
		const buttonText = document.createElement('span');
		buttonText.classList.add('button__name');
		buttonText.innerText = this.data ? 'Edit Task' : 'Add Task';
		addTaskButton.appendChild(buttonText);
		addTaskButtonContainer.appendChild(addTaskButton);
		this.addHandler(addTaskButton);

		return addTaskButtonContainer;
	}

	createCloseButton() {
		const closeButton = document.createElement('div');
		closeButton.classList.add('button__close');
		closeButton.innerText = 'X';
		closeButton.addEventListener('click', () => {
			this.routeToList();
		});

		return closeButton;
	}

	setEditMode() {
		this.userName.value = this.data.name;
		this.userName.setAttribute('disabled', 'true');
		this.userEmail.value = this.data.email;
		this.userEmail.setAttribute('disabled', 'true');
		this.select.value = this.data.priority;
		this.taskText.value = this.data.text;
		if (this.data.status === DONE) {
			this.doneRadio.setAttribute('checked', 'true');
		}
	}

	addHandler(addTaskButton) {
		addTaskButton.addEventListener('click', () => {
			if (!this.userName.value || !this.userEmail.value || !this.taskText.value) {
				if(!document.querySelector('.error-mark__block')) {
					this.createErrorMark(document.querySelector('.task-item__creation'));
				}
				return;
			}

			if(this.data && !this.isDataChanged()) {
				this.routeToList();
			}

			const checkedRadiobuttonValue = this.doneRadio.checked ? this.doneRadio.value : this.undoneRadio.value;

			const taskData = {
				id: this.data ? this.data.id : Math.random(),
				name: this.userName.value,
				email: this.userEmail.value,
				status: checkedRadiobuttonValue,
				text: this.taskText.value,
				priority: this.select.value,
				isEdited: !!this.data,
			};

			this.getBackendMethod(taskData).then(() => {
				this.routeToList();
			});
		});
	}

	createErrorMark(anchor) {
    const markBlock = document.createElement('div');
    markBlock.classList.add('error-mark__block', 'error-mark__block__bottom');
		const text = document.createElement('span');
		text.classList.add('error-mark__text');
    text.innerText = 'All fields are required!';
    markBlock.appendChild(text);

    anchor.appendChild(markBlock);
  }

	routeToList() {
		this.destroy();
		state.loadEvent('setFiltration', PRIORITY_LIST);
		state.loadEvent('setSortType', DEFAULT);
		const anchor = document.querySelector('.wrapper__content');
		const content = new WrapperComponent(anchor);
		content.createBlocks(anchor);
	}

	getBackendMethod(taskData) {
		return this.data ? backend.editTask(taskData) : backend.addTask(taskData);
	}

	isDataChanged() {
		const checkedRadiobuttonValue = this.doneRadio.checked ? this.doneRadio.value : this.undoneRadio.value;
		const { status, text, priority } = this.data;

		return !(status === checkedRadiobuttonValue && text === this.taskText.value && priority === this.select.value);
	}
}
