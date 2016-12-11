import FakeRestService from './FakeRestService';

class CatalogService extends FakeRestService{
    constructor() {
        super('Catalog');

        while (this.index <= 5) {
            const catalog = {id: this.index, name: `${this.name} ${this.index}`, children:[]};
            this.items.push(catalog);
            this.index++;
            catalog.todos = [];
            for (let i=0; i<this.index; i++) {
                catalog.todos.push({id: i, name: `Todo ${i}`, description: `Description ${i}`, done: true});
            }
        }
    }
}

export default new CatalogService();