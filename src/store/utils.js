import _ from 'lodash';

export function searchById(tree, id) {
    let stack = [...tree];

    while (stack.length) {
        const item = stack.shift();
        if (item.id == id) {
            return item;
        }
        if (item.children) {
            stack = [...stack, ...item.children];
        }            
    }

    return false;
}

export function flatten(treeObj, idAttr, parentAttr, childrenAttr, levelAttr) {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'parent';
    if (!childrenAttr) childrenAttr = 'children';
    if (!levelAttr) levelAttr = 'level';

    function flattenChild(childObj, parentId, level) {
        var array = []; 

        var childCopy = Object.assign({}, childObj);
        childCopy[levelAttr] = level;
        childCopy[parentAttr] = parentId;
        delete childCopy[childrenAttr];
        array.push(childCopy);

        array = array.concat(processChildren(childObj, level));

        return array;
    };

    function processChildren(obj, level) {
        if (!level) level = 0;
        var array = [];

        obj[childrenAttr].forEach(function(childObj) {
            array = array.concat(flattenChild(childObj, obj[idAttr], level+1));
        });

        return array;
    };

    var result = processChildren(treeObj);
    return result;
};

export function filter(categories, query = {}) {
    const {filterTextInput, onlyDone} = query;
    _.remove(categories, (category) => {
        let remove = false;
        if (filterTextInput && category.name.indexOf(filterTextInput) === -1) {
            remove = true;
        }

        const todos = category.todos;
        const notDone = !!_.find(todos, (todo) => !todo.done);

        if (!remove && !_.isEmpty(onlyDone) && onlyDone === 'true' && notDone) {
            remove = true;
        }

        return remove;
    });

    for (let category of categories) {
        filter(category.children, query);
    }
}

export function getProgress(categories) {
    const all = categories.length;
    const completed =_.reduce(categories, (result, value) => {
        if (_.isEmpty(value.todos)) {            
            return result;
        }

        for (const todo of value.todos) {
            if (!todo.done) {
                return result;
            }            
        }
        
        return ++result;
    }, 0);

    const progress = completed/all * 100;

    return progress;
}