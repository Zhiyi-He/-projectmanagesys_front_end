import request from '@/utils/request'

export function filesUpload(fileData) {
    const res = request({
        url: 'files/upload',
        method: 'post',
        data: fileData
    });
    return res;
}