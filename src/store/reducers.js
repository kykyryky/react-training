import {ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, ADD_TODO, UPDATE_TODO, DELETE_TODO} from './actions';
import {searchById} from './utils';

function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export function appReducers(state = [], action) {
    let category;
    const payload = action.payload;
    switch(action.type) {
        case `${ADD_CATEGORY}_FULFILLED`:                        
            payload.category.id = generateQuickGuid();
            payload.category.children = [];
            payload.category.todos = [];
            if (payload.parentId) {
                category = searchById(state, payload.parentId);
                payload.category.parentId = category.id;
                category.children.push(payload.category);
                return [...state];
            }
            return [...state, payload.category];
        case `${UPDATE_CATEGORY}_FULFILLED`:
            category = searchById(state, payload.category.id);
            category.name = payload.category.name;
            category.description = payload.category.name;
            return [...state];
        case `${DELETE_CATEGORY}_FULFILLED`:
            category = searchById(state, payload.id);
            if (category.parentId) {
                parent = searchById(state, category.parentId);
            }            
            let array = category.parentId ? parent.children : state;
            array.splice(array.findIndex((el) => el.id === payload.id), 1);
            return [...state];
        case `${ADD_TODO}_FULFILLED`:
            category = searchById(state, payload.categoryId);
            payload.todo.id = generateQuickGuid();
            category.todos.push(payload.todo);
            return [...state];
        case `${UPDATE_TODO}_FULFILLED`:
            category = searchById(state, payload.categoryId);
            let todo = category.todos[category.todos.findIndex((el) => el.id === payload.todo.id)];
            todo.name = payload.todo.name;
            todo.description = payload.todo.description;
            todo.done = payload.todo.done;
            return [...state];
        case `${DELETE_TODO}_FULFILLED`:
            category = searchById(state, payload.categoryId);
            category.todos.splice(category.todos.findIndex((el) => el.id === payload.id), 1);
            return [...state];
        default:
            return state;
    }
}

export function pendingReducers(state = false, action) {
    return action.type.indexOf(`PENDING`) !== -1;
}