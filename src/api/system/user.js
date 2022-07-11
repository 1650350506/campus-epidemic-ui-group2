import request from '@/plugins/request';

import moduleName from '@/config/moduleName';

export function updateUser (data) {
    return request({
        url: moduleName.doraemon_user + '/user/update',
        method: 'post',
        data
    });
}

export function updatePassword (data) {
    return request({
        url: moduleName.doraemon_user + '/user/updatePassword',
        method: 'post',
        data
    });
}

export function getVoByUserName (data) {
    return request({
        url: moduleName.doraemon_user + '/user/getVoByUserName',
        method: 'get',
        params: {
            ...data
        }
    });
}
