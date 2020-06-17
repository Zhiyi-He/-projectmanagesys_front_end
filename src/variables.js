
module.exports = {
    //用户常量
    APPLICANT: 'applicant',
    REPDEPT: 'repDept',
    RECDEPT: 'recDept',
    PROMANAGER: 'proManager',
    SYSMANAGER: 'sysManager',
    EXPERT: 'expert',
    // DOUBLEDEPT: 'doubleDept',

    //URL常量
    DOWNLOADURL: 'http://localhost:8080/files/download?path=',
    BASEURL: 'http://localhost:8080/',

    //项目类型
    PROTYPES: [
        { text: '青年人才', value: '青年人才' },
        { text: '面上项目', value: '面上项目' },
        { text: '指导性项目（资助）', value: '指导性项目（资助）' },
        { text: '指导性项目（非资助）', value: '指导性项目（非资助）' }
    ],
    //学科分类
    SUBJECTS: [
        { text: '基础医学', value: '基础医学' },
        { text: '临床医学', value: '临床医学' },
        { text: '公共卫生与预防医学', value: '公共卫生与预防医学' },
        { text: '中医学', value: '中医学' },
        { text: '中西医结合', value: '中西医结合' },
        { text: '药学', value: '药学' },
        { text: '护理学', value: '护理学' }
    ],
    //项目经费
    FUNDS: [10000, 20000, 50000, 100000],

    //项目状态常量
    PROJECTUPDATE: 0,        //项目更新--创建项目或者修改项目时，状态唯一
    NOTPASS: 1,              //项目未通过
    BACKMODIFY: 2,           //打回修改
    FIRSTREVIEW: 3,          //初级审核--申报单位         
    SECONDREVIEW: 4,         //二级审核--组织推荐单位
    THREEREVIEW: 5,          //三级审核--项目管理员
    EXPERTASSIGN: 6,          //待分配专家--项目管理员
    EXPERTREVIEW: 7,          //专家评审
    PENDING: 8,                //项目待审批
    PASS: 9,                 //项目已通过

    //申报单位状态
    NOTPASSRPD: 0,          //审核未通过
    UNDEREVIEW: 1,           //申报单位待审核
    PASSRPD: 2,            //审核通过

}