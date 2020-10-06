import Component from '../component.js';
import state from '../../state/index.js';
import WrapperComponent from '../wrapper/wrapper-component.js';
import { PRIORITY_LIST, DEFAULT } from '../../constants.js';

export default class LoginComponent extends Component {
	constructor(anchor, localStorage) {
		const element = document.createElement('div');
		super(anchor, element);
		this.localStorage = localStorage;
	}

	render() {
		this.element.classList.add('login');
		const loginBlock = document.createElement('form');
		loginBlock.classList.add('login__content');
		loginBlock.appendChild(this.createLoginBlock());
		loginBlock.appendChild(this.createPasswordBlock());
		loginBlock.appendChild(this.createLoginButton());
		loginBlock.appendChild(this.createCloseButton());
		this.element.appendChild(loginBlock);
		this.element.appendChild(this.createBattery());
		this.anchor.appendChild(this.element);
	}

	createBattery() {
    const battery = document.createElement('img');
    battery.setAttribute('src', '../../images/battery.png');
    battery.classList.add('battery__img', 'battery__img__modal-view');

    return battery;
  }

	createInput() {
		const inputContainer = document.createElement('div');
		const input = document.createElement('input');
		inputContainer.classList.add('login__input', 'input__block');
		input.classList.add('input');
		inputContainer.appendChild(input);

		return inputContainer;
	}

	createLoginBlock() {
		const loginBlock = this.createInput();
		this.loginInput = loginBlock.querySelector('input');
		this.loginInput.setAttribute('type', 'text');
		this.loginInput.setAttribute('placeholder', 'Login');
		this.loginInput.setAttribute('name', 'login');

		return loginBlock;
	}

	createPasswordBlock() {
		const passwordBlock = this.createInput();
		this.passwordInput = passwordBlock.querySelector('input');
		this.passwordInput.setAttribute('type', 'password');
		this.passwordInput.setAttribute('placeholder', 'Password');
		this.passwordInput.setAttribute('name', 'password');

		return passwordBlock;
	}

	createLoginButton() {
		const loginButton = document.createElement('div');
		loginButton.classList.add('login__enter-button');
		const buttonText = document.createElement('span');
		buttonText.classList.add('button__name');
		buttonText.innerText = 'Login';
		loginButton.appendChild(buttonText);
		this.addLoginHandler(loginButton);

		return loginButton;
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

	addLoginHandler(loginButton) {
		loginButton.addEventListener('click', () => {
			const loginData = {
				login: this.loginInput.value,
				password: this.passwordInput.value,
			};
			const adminList = state.state.adminList;

			if (adminList.some((item) => item.login === loginData.login && item.password === loginData.password)) {
				state.loadEvent('login', true);
				this.routeToList();
			} else {
				if(!document.querySelector('.error-mark__block')) {
					this.createErrorMark(document.querySelector('.login__content'));
				}
			}
		});
	}

	routeToList() {
		this.destroy();
		state.loadEvent('setFiltration', PRIORITY_LIST);
		state.loadEvent('setSortType', DEFAULT);
		const anchor = document.querySelector('.wrapper__content');
		const content = new WrapperComponent(anchor);
		content.createBlocks(anchor);
	}

	createErrorMark(anchor) {
    const markBlock = document.createElement('div');
    markBlock.classList.add('error-mark__block', 'error-mark__block__top');
		const text = document.createElement('span');
		text.classList.add('error-mark__text');
    text.innerText = 'Incorrect login or password!';
    markBlock.appendChild(text);

    anchor.appendChild(markBlock);
  }
}
