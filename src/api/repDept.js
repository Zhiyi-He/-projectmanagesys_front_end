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

export function updateRpdInfo(rpdInfo) {
    const res = request({
        url: 'repDept/rpdInfo',
        method: 'put',
        data: rpdInfo
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

export function getProjectsByProStatus(applicant, proStatus) {
    console.log(applicant);
    // const res = request({
    //     url: 'repDept/projects/' + proStatus,
    //     method: 'get',
    // });
    // return res;
}
