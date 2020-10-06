export default class LocalStorage {
	constructor() {
		if (!JSON.parse(localStorage.getItem('task-manager-settings'))) {
			localStorage.setItem('task-manager-settings', JSON.stringify({}));
		}
		this.data = JSON.parse(localStorage.getItem('task-manager-settings'));
	}

	getData(key) {
		return this.data[key];
	}

	setData(key, value) {
		this.data[key] = value;
		localStorage.setItem('task-manager-settings', JSON.stringify(this.data));
	}
}
