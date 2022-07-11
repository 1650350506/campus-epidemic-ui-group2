/**
 * 树上模糊查询判断id是否在数组中
 *
 */
export function checkIdInDomainList (id, domainList) {
    for (let i = 0; i < domainList.length; i++) {
        if (id === domainList[i].id) {
            return true
        }
    }
    return false
}

/**
 * 判断是否是最后1个节点
 *
 */
export function isLastId (id, domainList) {
    return false
    // return _.last(domainList).id === id
}

/**
 * 判断是否是最后1个节点
 *
 */
export function notLastId (id, domainList) {
    return false
    // return _.last(domainList).id !== id
}
