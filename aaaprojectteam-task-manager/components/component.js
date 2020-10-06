export default class Component {
	constructor(anchor, element) {
		this.anchor = anchor;
		this.element = element;
	}

	destroy() {
		this.anchor.removeChild(this.element);
	}
}
