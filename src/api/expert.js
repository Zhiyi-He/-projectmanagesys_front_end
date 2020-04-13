import request from '@/utils/request'


export function getExpert(id) {
    const res = request({
        url: 'expert/expert/' + id,
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


export function updateExperts(experts) {
    const res = request({
        url: 'expert/expert',
        method: 'put',
        data: experts
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
