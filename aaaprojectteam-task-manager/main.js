import ControlPanelComponent from './components/control-panel/control-panel-component.js';

const anchor = document.querySelector('body');

const panel = new ControlPanelComponent(anchor);
panel.render();
