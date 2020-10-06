import localStorage from '../local-storage/index.js';
import { DEFAULT, PRIORITY_LIST } from '../constants.js';

export default class State {
	constructor() {
		this.events = this.createEvents();
		this.state = {
			tasks: [],
			adminList: {},
			sortType: DEFAULT,
			filtrationTypes: PRIORITY_LIST,
			isCurrentUserAdmin: false,
			isRunned: false
		};
	}

	loadEvent(eventType, args) {
		if (this.events[eventType]) {
			this.state = this.events[eventType](args, this.state);
		}
	}

	createEvents() {
		return {
			setTasks: (args, state) => ({
				...state,
				tasks: [...args],
			}),
			addTask: (args, state) => ({
				...state,
				tasks: [args, ...state.tasks],
			}),
			editTask: (args, state) => {
				const updatedTask = state.tasks.find((item) => item.id === args.id);
				updatedTask.text = args.text;
				updatedTask.status = args.status;
				updatedTask.priority = args.priority;
				updatedTask.isEdited = args.isEdited;
				return { ...state };
			},
			setAdminList: (args, state) => ({
				...state,
				adminList: [...args],
			}),
			setSortType: (args, state) => ({
				...state,
				sortType: args,
			}),
			setFiltration: (args, state) => ({
				...state,
				filtrationTypes: [...args],
			}),
			setRunnedStatus: (args, state) => ({
				...state,
				isRunned: args
			}),
			login: (args, state) => {
				localStorage.setData('isAdmin', 'true');

				return {
					...state,
					isCurrentUserAdmin: args,
				};
			},
			logout: (args, state) => {
				localStorage.setData('isAdmin', 'false');

				return {
					...state,
					isCurrentUserAdmin: args,
				};
			},
		};
	}
}
