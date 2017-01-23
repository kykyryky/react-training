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
    });    
});
