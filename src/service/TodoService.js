import FakeRestService from './FakeRestService';

class TodoService extends FakeRestService {
    constructor() {
        super('Todo');
    }
}

export default new TodoService();