import { APPLICANT, REPDEPT, RECDEPT, PROMANAGER, SYSMANAGER, EXPERT, DOUBLEDEPT } from '@/variables'

let jumpUrl;

export default function jump(userType) {
  switch (userType) {
    case APPLICANT:
      jumpUrl = '/index';
      break;
    case REPDEPT:
      jumpUrl = '/example/table'
      break
    case RECDEPT:
      jumpUrl = '/example/tree'
      break
    case PROMANAGER:
      jumpUrl = '/form/index'
      break
    case SYSMANAGER:
      jumpUrl = '/nested/menu1/menu1-1'
      break
    case EXPERT:
      jumpUrl = '/nested/menu1/menu1-3'
      break
    case DOUBLEDEPT:
      jumpUrl = '/nested/menu2'
      break
    default:
      jumpUrl = '/404'
      break;
  }
  return jumpUrl
}

