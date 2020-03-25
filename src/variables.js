
module.exports = {
    //用户常量
    APPLICANT: 'applicant',
    REPDEPT: 'repDept',
    RECDEPT: 'recDept',
    PROMANAGER: 'proManager',
    SYSMANAGER: 'sysManager',
    EXPERT: 'expert',
    // DOUBLEDEPT: 'doubleDept',
<<<<<<< HEAD
    NOTICEURL: 'http://localhost:8080/files/download/?parentPath=notice&filename=',
    MANUALURL: 'http://localhost:8080/files/download/?parentPath=manual&filename=',
    BASEURL: 'http://localhost:8080/'
=======

    //URL常量
    NOTICEURL: 'http://localhost:8080/files/download/?parentPath=notice&filename=',
    MANUALURL: 'http://localhost:8080/files/download/?parentPath=manual&filename=',
    BASEURL: 'http://localhost:8080/',

    //项目状态常量
    PROJECTUPDATE: 0,        //项目更新--创建项目或者修改项目时，状态唯一
    NOTPASS: 1,              //项目未通过
    BACKMODIFY: 2,           //打回修改
    FIRSTREVIEW: 3,          //初级审核--申报单位         
    SECONDREVIEW: 4,         //二级审核--组织推荐单位
    FINALREVIEW: 5,          //最终审核--项目管理员
    PASS: 6,                 //项目已通过

    //申报单位状态
    NOTPASSRPD: 0,          //审核未通过
    UNDEREVIEW: 1,           //申报单位待审核
    PASS2RPD: 2,            //审核通过
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
}