import Component from '../component.js';
import state from '../../state/index.js';
import AddTaskComponent from '../add-task/add-task.js';

export default class AddTaskButtonComponent extends Component {
	constructor(anchor) {
		const element = document.createElement('div');
		super(anchor, element);
	}

	render() {
		this.element.classList.add('add-task__block');
    this.element.appendChild(this.createAddTaskButton());
    this.element.appendChild(this.createBattery());
		this.anchor.appendChild(this.element);
	}

	createAddTaskButton() {
		const addTaskButton = document.createElement('div');
		addTaskButton.classList.add('login__enter-button');
		const buttonText = document.createElement('span');
		buttonText.classList.add('button__name');
		buttonText.innerText = 'Add Task';
		addTaskButton.appendChild(buttonText);
		this.addHandler(addTaskButton);

		return addTaskButton;
  }
  
  createBattery() {
    const battery = document.createElement('img');
    battery.setAttribute('src', '../../images/battery.png');
    battery.classList.add('battery__img');

    return battery;
  }

	addHandler(addTaskButton) {
		addTaskButton.addEventListener('click', () => {
			this.destroy();
			const anchor = document.querySelector('.wrapper__content');
			anchor.innerHTML = '';
			const addTaskComponent = new AddTaskComponent(anchor);
			addTaskComponent.render();
		});
	}
}
