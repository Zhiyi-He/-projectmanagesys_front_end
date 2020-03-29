import request from '@/utils/request'


export function getRpdInfo(rpdId) {
    const res = request({
        url: 'repDept/rpdInfo/' + rpdId,
        method: 'get',
    });
    return res;
}

export function addRepDept(repDept) {
    const res = request({
        url: 'repDept/repDept',
        method: 'post',
        data: repDept,
    });
    return res;
}

export function deleteRepDepts(repDepts) {
    const res = request({
        url: 'repDept/repDepts',
        method: 'delete',
        data: repDepts,
    });
    return res;
}

export function updateRepDepts(repDepts) {
    const res = request({
        url: 'repDept/repDept',
        method: 'put',
        data: repDepts
    });
    return res;
}

export function getApplicants(rpdId) {
    const res = request({
        url: 'repDept/applicants/' + rpdId,
        method: 'get',
    });
    return res;
}

export function getRepDeptsByRpdStatus(status) {
    const res = request({
        url: 'repDept/repDepts/' + status,
        method: 'get',
    });
    return res;
}
