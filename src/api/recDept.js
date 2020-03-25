import request from '@/utils/request'


<<<<<<< HEAD
=======
export function getRcdInfo(rcdId) {
    const res = request({
        url: 'recDept/rcdInfo/' + rcdId,
        method: 'get',
    });
    return res;
}

export function updateRcdInfo(rcdInfo) {
    const res = request({
        url: 'recDept/rcdInfo',
        method: 'put',
        data: rcdInfo
    });
    return res;
}

export function getRepDepts(rcdId) {
    const res = request({
        url: 'recDept/repDepts/' + rcdId,
        method: 'get',
    });
    return res;
}

>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
export function getDeptList() {
    const res = request({
        url: 'recDept/deptList',
        method: 'get',
    });
    return res;
}