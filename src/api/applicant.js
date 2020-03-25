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

export function addProject(data) {
    const { appId, project } = data;
    const res = request({
        url: 'applicant/project/' + appId,
        method: 'post',
        data: project
    });
    return res;
}

export function updateProject(project, currentStep) {
    const res = request({
        url: 'applicant/project/' + currentStep,
        method: 'put',
        data: project
    });
    return res;
}

export function getLaterProject() {
    const res = request({
        url: 'applicant/project',
        method: 'get',
    });
    return res;
}