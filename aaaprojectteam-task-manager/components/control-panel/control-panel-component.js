import Component from '../component.js';
import LoginComponent from '../login/login-component.js';
import backend from '../../backend/index.js';
import localStorage from '../../local-storage/index.js';
import state from '../../state/index.js';
import WrapperComponent from '../wrapper/wrapper-component.js';
import { PRIORITY_LIST, DEFAULT } from '../../constants.js';

export default class ControlPanelComponent extends Component {
	constructor(anchor) {
		const element = document.createElement('div');
		super(anchor, element);
	}

	render() {
		const background = document.createElement('div');
		background.classList.add('main__background');
		background.appendChild(this.element);
		this.element.classList.add('panel');
		this.element.appendChild(this.createHeader());
		this.element.appendChild(this.createContent());
		this.element.appendChild(this.createFooter());
		this.anchor.prepend(background);

		const screen = document.querySelector('.screen');
		const wrapper = new WrapperComponent(screen);
		wrapper.renderEmpty();
	}

	createHeader() {
		const header = document.createElement('div');
		header.classList.add('header');
		header.appendChild(this.createTitle('Task Manager'));

		return header;
	}

	createFooter() {
		const footer = document.createElement('div');
		footer.classList.add('footer');
		footer.appendChild(this.createTitle('AAA Project'));

		return footer;
	}

	createTitle(text) {
		const title = document.createElement('span');
		title.classList.add('title');
		title.innerText = text;

		return title;
	}

	createContent() {
		const content = document.createElement('div');
		content.classList.add('content');
		content.appendChild(this.createLeftController());
		content.appendChild(this.createScreen());
		content.appendChild(this.createRightController());

		return content;
	}

	createLeftController() {
		const controller = document.createElement('div');
		controller.classList.add('controller');
		controller.appendChild(this.createCircleButton());
		controller.appendChild(this.createCross());

		return controller;
	}

	createCircleButton() {
		const buttonOnOffBlock = document.createElement('div');
		buttonOnOffBlock.classList.add('on-off__block');
		const button= document.createElement('button');
		button.classList.add('button__circle');
		const buttonText = document.createElement('span');
		buttonText.innerText = 'POWER';
		buttonText.classList.add('on-off__text');
		const onOffMarker = document.createElement('button');
		onOffMarker.classList.add('on-off__marker');
		buttonOnOffBlock.appendChild(onOffMarker);
		button.appendChild(buttonText);
		buttonOnOffBlock.appendChild(button);
		this.addOnOffHandler(button);

		return buttonOnOffBlock;
	}

	addOnOffHandler(button) {
		button.addEventListener('click', () => {
			const screen = document.querySelector('.wrapper__content');
			const marker = document.querySelector('.on-off__marker');

			if (state.state.isRunned) {
				screen.innerHTML = '';
				screen.style.backgroundColor = '#4c5f24';
				marker.style.backgroundColor = '#4e1010';
				state.loadEvent('setRunnedStatus', false);
				state.loadEvent('setFiltration', PRIORITY_LIST);
				state.loadEvent('setSortType', DEFAULT);

				if (!state.state.isCurrentUserAdmin) {
					return;
				}

				state.loadEvent('logout', false);
				return;
			}

			const wrapperOn = new WrapperComponent(screen);
			marker.style.backgroundColor = 'red';
			wrapperOn.render();
			state.loadEvent('setRunnedStatus', true);
		});
	}

	createCross() {
		const cross = document.createElement('div');
		const topButton = document.createElement('button');
		const bottomButton = document.createElement('button');
		const crossCenterDiv = document.createElement('div');
		const rightButton = document.createElement('button');
		const centerButton = document.createElement('button');
		const leftButton = document.createElement('button');

		cross.classList.add('cross');
		topButton.classList.add('cross__button', 'top__dir');
		bottomButton.classList.add('cross__button', 'down__dir');
		crossCenterDiv.classList.add('cross__center');
		rightButton.classList.add('cross__button', 'right__dir');
		centerButton.classList.add('cross__button', 'center__dir');
		leftButton.classList.add('cross__button', 'left__dir');

		crossCenterDiv.appendChild(leftButton);
		crossCenterDiv.appendChild(centerButton);
		crossCenterDiv.appendChild(rightButton);
		cross.appendChild(topButton);
		cross.appendChild(crossCenterDiv);
		cross.appendChild(bottomButton);

		return cross;
	}

	createScreen() {
		const screen = document.createElement('div');
		screen.classList.add('screen');

		return screen;
	}

	createRightController() {
		const controller = document.createElement('div');
		const buttonForm = document.createElement('div');
		const loginButton = document.createElement('button');
		const logoutButton = document.createElement('button');
		const loginButtonText = document.createElement('span');
		const logoutButtonText = document.createElement('span');
		controller.classList.add('controller');
		buttonForm.classList.add('button__form');
		loginButton.classList.add('authorization__button');
		logoutButton.classList.add('authorization__button');
		loginButtonText.classList.add('authorization__button__text');
		logoutButtonText.classList.add('authorization__button__text');
		loginButtonText.innerText = 'LOGIN';
		logoutButtonText.innerText = 'LOGOUT';
		loginButton.appendChild(loginButtonText);
		logoutButton.appendChild(logoutButtonText);
		buttonForm.appendChild(loginButton);
		buttonForm.appendChild(logoutButton);
		controller.appendChild(buttonForm);
		controller.appendChild(this.createDynamic());
		this.addLoginHandler(loginButton);
		this.addLogoutHandler(logoutButton);

		return controller;
	}

	addLoginHandler(loginButton) {
		loginButton.addEventListener('click', () => {
			if (state.state.isCurrentUserAdmin || !state.state.isRunned) {
				return;
			}
			const anchor = document.querySelector('.wrapper__content');
			anchor.innerHTML = '';
			backend.getAdminList();
			const login = new LoginComponent(anchor, localStorage);
			login.render();
			
		});
	}

	addLogoutHandler(logoutButton) {
		logoutButton.addEventListener('click', () => {
			const status = document.querySelector('.wrapper__content');
			if (status.style.backgroundColor === 'rgb(130, 174, 35)') {
				if (!state.state.isCurrentUserAdmin) {
					return;
				}

				state.loadEvent('logout', false);
				state.loadEvent('setFiltration', PRIORITY_LIST);
				state.loadEvent('setSortType', DEFAULT);
				const anchor = document.querySelector('.wrapper__content');
				anchor.innerHTML = '';
				const content = new WrapperComponent(anchor);
				content.createBlocks(anchor);
			}
		});
	}

	createDynamic() {
		const dynamic = document.createElement('div');
		const dynamicSmall = document.createElement('div');
		const dynamicMiddle = document.createElement('div');
		const dynamicBig = document.createElement('div');
		dynamic.classList.add('dynamic__block');
		dynamicSmall.classList.add('dynamic', 'dynamic__small');
		dynamicMiddle.classList.add('dynamic', 'dynamic__middle');
		dynamicBig.classList.add('dynamic', 'dynamic__big');
		dynamic.appendChild(dynamicSmall);
		dynamic.appendChild(dynamicMiddle);
		dynamic.appendChild(dynamicBig);

		return dynamic;
	}
}
