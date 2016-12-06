class FakeRestService {
    constructor(name) {
        this.index = 1;
        this.items = [];
        this.name = name;
        while (this.index <= 5) {
            this.items.push({id: this.index, name: `${this.name} ${this.index}`, children:[]});
            this.index++;
        }
    }

    list() {
        return this.items;
    }

    add(item, parentId) {
        item.id = this.index++;
        item.children = [];
        if (parentId) {
            const parentItem = this._searchById(parentId);
            if  (!parentItem) {
                return;
            }

            if (!parentItem.children) {
                parentItem.children = [];
            }

            item.parent = parentItem;

            parentItem.children.push(item);            
        } else {
            this.items.push(item);
        }

        return item;
    }

    remove(id) {
        const item = this._searchById(id);
        const array = item.parent ? item.parent.children : this.items;
        array.splice(array.findIndex((el) => el.id === id), 1);
    }

    edit(catalog, id) {
        const item = this._searchById(id);

        item.name = catalog.name;
        item.description = catalog.description;
        item.state = catalog.state;

        return item;
    }

    _searchById(id) {
        let stack = [...this.items];

        while (stack.length) {
            const item = stack.shift();
            if (item.id === id) {
                return item;
            }
            if (item.children) {
                stack = [...stack, ...item.children];
            }            
        }

        return false;
    }
}

export default FakeRestService;