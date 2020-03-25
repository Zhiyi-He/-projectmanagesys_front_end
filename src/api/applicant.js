import request from '@/utils/request'

export function getAppInfo(id) {
    const res = request({
        url: 'applicant/appInfo/' + id,
        method: 'get',
    });
    return res;
}

export function updateAppInfo(appInfo) {
    // const { appInfo, rpdId } = data;
    const res = request({
        url: 'applicant/appInfo',
        method: 'put',
        data: appInfo
    });
    return res;
}

export function deleteApplicants(applicants) {
    const res = request({
        url: 'applicant/applicants',
        method: 'delete',
        data: applicants,
    });
    return res;
}

export function addApplicant(applicant) {
    const res = request({
        url: 'applicant/applicant',
        method: 'post',
        data: applicant,
    });
    return res;
}

export function getProList(id) {
    const res = request({
        url: 'applicant/proList/' + id,
        method: 'get',
    });
    return res;
}

<<<<<<< HEAD
export function addProject(data) {
    const { appId, project } = data;
=======
export function addProject(project, appId) {
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
    const res = request({
        url: 'applicant/project/' + appId,
        method: 'post',
        data: project
    });
    return res;
}

<<<<<<< HEAD
export function updateProject(project, currentStep) {
    const res = request({
        url: 'applicant/project/' + currentStep,
        method: 'put',
        data: project
=======
export function deleteProject(id) {
    const res = request({
        url: 'applicant/project/' + id,
        method: 'delete',
    });
    return res;
}

export function updateProjects(projects) {
    const res = request({
        url: 'applicant/projects',
        method: 'put',
        data: projects
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
    });
    return res;
}

<<<<<<< HEAD
export function getLaterProject() {
    const res = request({
        url: 'applicant/project',
        method: 'get',
=======
export function getLaterProject(applicant, proStatus) {
    console.log(applicant)
    const res = request({
        url: 'applicant/projects/' + proStatus,
        method: 'post',
        data: applicant
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
    });
    return res;
}