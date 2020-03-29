import request from '@/utils/request'


export function getRcdInfo(rcdId) {
    const res = request({
        url: 'recDept/rcdInfo/' + rcdId,
        method: 'get',
    });
    return res;
}

export function addRecDept(recDept) {
    const res = request({
        url: 'recDept/recDept',
        method: 'post',
        data: recDept
    });
    return res;
}

export function deleteRecDepts(recDepts) {
    const res = request({
        url: 'recDept/recDepts',
        method: 'delete',
        data: recDepts
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

export function getRecDepts() {
    const res = request({
        url: 'recDept/recDepts',
        method: 'get',
    });
    return res;
}