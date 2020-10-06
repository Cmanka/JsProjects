import Backend from './backend.js';
import state from '../state/index.js';
import localStorage from '../local-storage/index.js';

export default new Backend(state, localStorage);
