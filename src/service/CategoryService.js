import FakeRestService from './FakeRestService';

class CatalogService extends FakeRestService{
    constructor() {
        super('Catalog');
    }
}

export default new CatalogService();