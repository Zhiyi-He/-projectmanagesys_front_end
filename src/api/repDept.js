import request from '@/utils/request'


export function getRpdInfo() {
    const res = request({
        url: 'repDept/rpdInfo',
        method: 'get',
    });
    return res;
}

export function updateRpdInfo(rpdInfo) {
    const res = request({
        url: 'repDept/rpdInfo',
        method: 'put',
        data: rpdInfo
    });
    return res;
}

export function getApplicants() {
    const res = request({
        url: 'repDept/applicants',
        method: 'get',
    });
    return res;
}

