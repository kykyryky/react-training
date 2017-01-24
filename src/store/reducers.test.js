import {appReducers} from './reducers';
import {ADD_CATEGORY} from './actions';

describe('unit test for reducer', () => {
    it('add category action unit test', () => {
        const category = {
            name: 'name',
            description: 'description'
        }

        const state = [];

        const action = {
            type: `${ADD_CATEGORY}_FULFILLED`,
            payload: {category}
        }

        const updatedState = appReducers([], action);

        expect(updatedState.length).toBe(1);
        
        const addedCategory = updatedState[0];
        expect(addedCategory.name).toEqual(category.name);
        expect(addedCategory.description).toEqual(category.description);
        expect(addedCategory.id).not.toBeNull();
        expect(addedCategory.todo).not.toBeNull();
        expect(addedCategory.children).not.toBeNull();
    });    
});
