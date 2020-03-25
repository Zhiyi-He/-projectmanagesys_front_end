import { APPLICANT, REPDEPT, RECDEPT, PROMANAGER, SYSMANAGER, EXPERT } from '@/variables'


export function formatLoginName(loginParam) {
  let loginName = ""
  switch (loginParam) {
    case APPLICANT:
      loginName = "申报人"
      break;
    case REPDEPT:
      // jumpUrl = '/example/table'
      loginName = "申报单位"
      break;
    case RECDEPT:
      // jumpUrl = '/example/tree'
      loginName = "组织推荐单位"
      break;
    case PROMANAGER:
      // jumpUrl = '/form/index'
      loginName = "项目管理员"
      break;
    case SYSMANAGER:
      // jumpUrl = '/nested/menu1/menu1-1'
      loginName = "系统管理员"
      break;
    case EXPERT:
      // jumpUrl = '/nested/menu1/menu1-3'
      loginName = "评审专家"
      break;
    // case DOUBLEDEPT:
    //   jumpUrl = '/nested/menu2'
    //   break
  }
  return loginName
}

