import request from '@/plugins/request';
import website from '@/config/website';
import moduleName from '@/config/moduleName';

export function AccountLogin (data) {
    // data['tenant_id'] = '000000'
    data.client_id = website.clientId
    data.client_secret = website.clientSecret
    data.grant_type = 'password'
    data.scope = 'all'
    return request({
        url: moduleName.doraemon_oauth + '/oauth/token',
        method: 'post',
        data
    });
}

export function AccountRegister (data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    });
}
