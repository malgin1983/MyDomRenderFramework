import {$} from './Dom'

export class Foton {
	constructor(selector, options) {
		this.$el = $(selector); //object new Dom
		this.components = options.components || [];
		this.className = options.className || null;
		this.props = options.props || {}
	}

	getRoot() {
		const $root = $.create('div', this.className)
		const componentOptions = {props: this.props }


		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className)
			const component = new Component($el, componentOptions);
			$el.html(component.toHTML())
			$root.append($el)
			return component
		})

		return $root;
	}

	render() {
		this.$el.append(this.getRoot())
		this.components.forEach(component => component.init())
	}
}
