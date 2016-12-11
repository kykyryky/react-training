import CategoryStore from './CategoryStore';

class TodoService {
    constructor() {
        this.index = 100;
    }

    add(categoryId, todo) {
        const category = CategoryStore._searchById(categoryId);
        todo.id = this.index++;
        if (!category.todos) {
            category.todos = [];
        }
        category.todos.push(todo);
        return todo;
    }

    update(categoryId, updateTodo) {
        const category = CategoryStore._searchById(categoryId);
        const todo = category.todos[category.todos.findIndex((el) => el.id === updateTodo.id)];

        todo.name = updateTodo.name;
        todo.description = updateTodo.description;
        todo.done = updateTodo.done;
        return todo;        
    }

    remove(categoryId, todoId) {
        const category = CategoryStore._searchById(categoryId);
        category.todos.splice(category.todos.findIndex((el) => el.id === todoId), 1);
    }

    list(categoryId) {
        const category = CategoryStore._searchById(categoryId);
        return category.todos;
    }
}

export default new TodoService();