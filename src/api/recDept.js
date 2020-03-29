import request from '@/utils/request'


export function getRcdInfo(rcdId) {
    const res = request({
        url: 'recDept/rcdInfo/' + rcdId,
        method: 'get',
    });
    return res;
}

export function updateRcdInfo(rcdInfo) {
    const res = request({
        url: 'recDept/rcdInfo',
        method: 'put',
        data: rcdInfo
    });
    return res;
}

export function getRepDepts(rcdId) {
    const res = request({
        url: 'recDept/repDepts/' + rcdId,
        method: 'get',
    });
    return res;
}

export function getDeptList() {
    const res = request({
        url: 'recDept/deptList',
        method: 'get',
    });
    return res;
}