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

export function getAppNames(rpdNames) {
    const res = request({
        url: 'applicant/appNames',
        method: 'post',
        data: rpdNames
    });
    return res;
}

export function addProject(project, appId) {
    const res = request({
        url: 'applicant/project/' + appId,
        method: 'post',
        data: project
    });
    return res;
}

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
    });
    return res;
}


export function getProjects(data) {
    const res = request({
        url: 'applicant/projects',
        method: 'get',
        params: {
            userType: data.userType,
            userId: data.userId,
            statusStr: data.statusStr,
            proName: data.proName,
            isScore: data.isScore,
            pageSize: data.pageSize,
            pageNum: data.pageNum,
            proTypesStr: data.proTypesStr,
            subjectsStr: data.subjectsStr,
            appNamesStr: data.appNamesStr,
            rpdNamesStr: data.rpdNamesStr,
            rcdNamesStr: data.rcdNamesStr
        }
    });
    return res;
}
