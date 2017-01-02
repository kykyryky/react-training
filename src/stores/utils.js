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