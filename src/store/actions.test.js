import {addCategory, ADD_CATEGORY} from './actions';

describe('unit test for action', () => {
    it('addCategory', () => {
        const category = 'category';
        const parentId = 'parentId';

        const action = addCategory(category, parentId);

        expect(action.type).toBe(ADD_CATEGORY);
    });    
});