import request from '@/utils/request'


export function getDeptList() {
    const res = request({
        url: 'recDept/deptList',
        method: 'get',
    });
    return res;
}