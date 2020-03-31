
import request from '@/utils/request'

export function updateScore(projectExpert) {
    const res = request({
        url: 'score/score',
        method: 'put',
        data: projectExpert
    });
    return res;
}