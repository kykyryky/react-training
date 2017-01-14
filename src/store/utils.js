import {remove, find, isEmpty, reduce} from 'lodash';

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

export function filter(category, query = {}, categories, index) {
    const children = [];

    for (let i = index + 1; i < categories.length; i++) {
        if (categories[i].level <= category.level) {
            break;
        }
        children.push(categories[i]);
    }
    
    for (const child of children) {
        if (_filter(child, query)) {
            return true;
        }
    }

    return _filter(category, query);
}

function _filter(category, query) {
    const {filterTextInput, onlyDone} = query;

    let categoryDone = true;

    for (let todo of category.todos) {
        categoryDone = todo.done;
        if (!categoryDone) {
            break;
        }
    }

    if (!isEmpty(filterTextInput) && category.name.indexOf(filterTextInput) === -1) {
        return false;
    }

    if (onlyDone === 'true' && categoryDone !== onlyDone) {
        return false;
    }

    return true;
}

export function getProgress(categories) {
    const all = categories.length;
    const completed = reduce(categories, (result, value) => {
        if (isEmpty(value.todos)) {            
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