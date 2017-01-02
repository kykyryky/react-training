import {ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, ADD_TODO, UPDATE_TODO, DELETE_TODO} from './actions';
import {searchById} from './utils';

let uniqIndex = 1;

export function appReducers(state = [], action) {
    let category;
    switch(action.type) {
        case ADD_CATEGORY:    
            action.category.id = uniqIndex++;
            action.category.children = [];
            action.category.todos = [];
            if (action.parentId) {
                category = searchById(state, action.parentId);
                action.category.parent = category;
                category.children.push(action.category);
                return [...state];
            }
            return [...state, action.category];
        case UPDATE_CATEGORY:
            category = searchById(state, action.category.id);
            category.name = action.category.name;
            category.description = action.category.name;
            return [...state];
        case DELETE_CATEGORY: 
            category = searchById(state, action.id);
            let array = category.parent ? category.parent.children : state;
            array.splice(array.findIndex((el) => el.id === action.id), 1);
            return [...state];
        case ADD_TODO:
            category = searchById(state, action.categoryId);
            action.todo.id = uniqIndex++;
            category.todos.push(action.todo);
            return [...state];
        case UPDATE_TODO:
            category = searchById(state, action.categoryId);
            let todo = category.todos[category.todos.findIndex((el) => el.id === action.todo.id)];
            todo.name = action.todo.name;
            todo.description = action.todo.description;
            todo.done = action.todo.done;
            return [...state];
        case DELETE_TODO:
            category = searchById(state, action.categoryId);
            category.todos.splice(category.todos.findIndex((el) => el.id === action.id), 1);
            return [...state];
        default:
            return state;
    }
}
