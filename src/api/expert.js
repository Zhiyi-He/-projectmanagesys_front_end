import request from '@/utils/request'


export function getRcdInfo(rcdId) {
    const res = request({
        url: 'recDept/rcdInfo/' + rcdId,
        method: 'get',
    });
    return res;
}

export function addExpert(expert) {
    const res = request({
        url: 'expert/expert',
        method: 'post',
        data: expert
    });
    return res;
}

export function deleteExperts(experts) {
    const res = request({
        url: 'expert/expert',
        method: 'delete',
        data: experts
    });
    return res;
}

export function updateExpert(expert) {
    const res = request({
        url: 'expert/expert',
        method: 'put',
        data: expert
    });
    return res;
}


export function getExperts() {
    const res = request({
        url: 'expert/experts',
        method: 'get',
    });
    return res;
}