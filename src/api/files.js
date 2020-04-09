import request from '@/utils/request'

export function filesUpload(fileData) {
    const res = request({
        url: 'files/upload',
        method: 'post',
        data: fileData
    });
    return res;
}

export function getFilesByType(fileType) {
    const res = request({
        url: 'files/files/' + fileType,
        method: 'get',
    });
    return res;
}

export function deleteFiles(files) {
    const res = request({
        url: 'files/files',
        method: 'delete',
        data: files,
    });
    return res;
}