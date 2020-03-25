import request from '@/utils/request'


<<<<<<< HEAD
export function getRpdInfo() {
    const res = request({
        url: 'repDept/rpdInfo',
=======
export function getRpdInfo(rpdId) {
    const res = request({
        url: 'repDept/rpdInfo/' + rpdId,
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
        method: 'get',
    });
    return res;
}

<<<<<<< HEAD
=======
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

>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
export function updateRpdInfo(rpdInfo) {
    const res = request({
        url: 'repDept/rpdInfo',
        method: 'put',
        data: rpdInfo
    });
    return res;
}

<<<<<<< HEAD
export function getApplicants() {
    const res = request({
        url: 'repDept/applicants',
=======
export function getApplicants(rpdId) {
    const res = request({
        url: 'repDept/applicants/' + rpdId,
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
        method: 'get',
    });
    return res;
}

<<<<<<< HEAD
=======
export function getProjectsByProStatus(applicant, proStatus) {
    console.log(applicant);
    // const res = request({
    //     url: 'repDept/projects/' + proStatus,
    //     method: 'get',
    // });
    // return res;
}
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
