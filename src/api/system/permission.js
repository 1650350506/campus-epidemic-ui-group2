import request from '@/plugins/request';
import moduleName from '@/config/moduleName';

// 模糊查询权限列表
export function listByName (data) {
    return request({
        url: moduleName.doraemon_system + '/permission/listTopNByCname',
        method: 'get',
        params: {
            ...data
        }
    });
}

// 树结构
export function getPermissionTree (data) {
    return request({
        url: moduleName.doraemon_system + '/permission/listTree',
        method: 'post',
        data
    });
}

// 获取所有父ID
export function listParentIdsById (data) {
    return request({
        url: moduleName.doraemon_system + '/permission/listParentIdsById',
        method: 'post',
        data
    });
}

// 获取所有父
export function listParentById (data) {
    return request({
        url: moduleName.doraemon_system + '/permission/listParentById',
        method: 'get',
        params: {
            ...data
        }
    });
}

// 模糊查询所有权限列表
export function listAllByName (data) {
    return request({
        url: moduleName.doraemon_system + '/permission/listByCname',
        method: 'get',
        params: {
            ...data
        }
    });
}
