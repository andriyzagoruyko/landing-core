export function filterArrayByKeyword(treeNodes = [], keyword, childrenName = "children", searchField = 'title') {
    let result = [];

    for (let index = 0; index <= treeNodes.length - 1; index++) {
        let currentNode = treeNodes[index],
            currentChildren = currentNode[childrenName];

        if (currentNode[searchField].includes(keyword)) {
            result = result.concat([currentNode]);
        }
        else {
            let foundDescendant = filterArrayByKeyword(currentChildren, keyword);

            if (foundDescendant.length) {
                result = result.concat([...foundDescendant]);
            }
        }
    }

    return result;
};