import axios from 'axios';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function addCategory(category, parentId) {
    return {
        type: ADD_CATEGORY, 
        payload: axios.get('http://httpbin.org/delay/1').then((response) => {
            return {category, parentId};
        })};
}

export function updateCategory(category) {
    return {
        type: UPDATE_CATEGORY, 
        payload: axios.get('http://httpbin.org/delay/1').then((response) => {
            return {category};
        })};
}

export function deleteCategory(id) {
    return {
        type: DELETE_CATEGORY, 
        payload: axios.get('http://httpbin.org/delay/1').then((response) => {
            return {id};
        })};
}

export function addTodo(categoryId, todo) {
    return {
        type: ADD_TODO, 
        payload: axios.get('http://httpbin.org/delay/1').then((response) => {
            return {categoryId, todo};
        })};
}

export function updateTodo(categoryId, todo) {
    return {
        type: UPDATE_TODO, 
        payload: axios.get('http://httpbin.org/delay/1').then((response) => {
            return {categoryId, todo};
        })};
}

export function deleteTodo(categoryId, id) {
    return {
        type: DELETE_TODO, 
        payload: axios.get('http://httpbin.org/delay/1').then((response) => {
            return {categoryId, id};
        })};
}