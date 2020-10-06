export default class Backend {
  constructor(state, localStorage) {
    this.state = state;
    this.localStorage = localStorage;
    this.url = 'https://5f5d0d3b5e3a4d0016249c85.mockapi.io/';
  }

  getAdminList() {
    fetch(`${this.url}/admins`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.state.loadEvent('setAdminList', res);
    });
  }

  async getTasks() {
    await fetch(`${this.url}/list`, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      this.state.loadEvent('setTasks', res.reverse());
    });
  }

  async addTask(task) {
    await fetch(`${this.url}/list`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      this.state.loadEvent('addTask', res);
    });
  }

  async editTask(task) {
    await fetch(`${this.url}/list/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      this.state.loadEvent('editTask', res);
    });
  }
}
