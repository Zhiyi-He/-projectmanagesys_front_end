
import request from '@/utils/request'

export function updateScore(projectExpert) {
    const res = request({
        url: 'score/score',
        method: 'put',
        data: projectExpert
    });
    return res;
}

export function getScoresByProject(project) {
    const res = request({
        url: 'score/score',
        method: 'post',
        data: project
    });
    return res;
}

export function deleteScores(scores) {
    const res = request({
        url: 'score/score',
        method: 'delete',
        data: scores
    });
    return res;
}