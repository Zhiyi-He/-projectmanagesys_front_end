import { APPLICANT, REPDEPT, RECDEPT, PROMANAGER, SYSMANAGER, EXPERT } from '@/variables'

let jumpUrl;

export default function jump(userType) {
  switch (userType) {
    case APPLICANT:
      jumpUrl = '/index';
      break;
    case REPDEPT:
      // jumpUrl = '/example/table'
      jumpUrl = '/index';
      break
    case RECDEPT:
      // jumpUrl = '/example/tree'
      jumpUrl = '/index';
      break
    case PROMANAGER:
      // jumpUrl = '/form/index'
      jumpUrl = '/index';
      break
    case SYSMANAGER:
      // jumpUrl = '/nested/menu1/menu1-1'
      jumpUrl = '/index';
      break
    case EXPERT:
      // jumpUrl = '/nested/menu1/menu1-3'
      jumpUrl = '/index';
      break
    // case DOUBLEDEPT:
    //   jumpUrl = '/nested/menu2'
    //   break
    default:
      jumpUrl = '/404'
      break;
  }
  return jumpUrl
}

