import Vue from 'vue'
import VueRouter from 'vue-router'
import { APPLICANT, REPDEPT, RECDEPT, PROMANAGER, SYSMANAGER, EXPERT } from '@/variables'

Vue.use(VueRouter)

import Layout from '../layout'

const routes = [
  {
    path: '/',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/home/index'),
    hidden: true
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  //首页路由
  {
    path: '/index',
    component: Layout,
    redirect: '/index/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' },
    }, {
      path: 'updatePwd',
      name: 'updatePwd',
      component: () => import('@/views/dashboard/updatePwd'),
      meta: { title: '修改密码' },
      hidden: true
    },
    {
      path: 'message',
      name: 'message',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '消息中心', icon: 'dashboard' },
      hidden: true
    }]
  },

  //申报人路由
  {
    path: '/applicantInfo',
    component: Layout,
    redirect: '/applicantInfo/appInfo',
    name: 'applicantInfo',
    meta: { title: '申报人信息', icon: 'example', subsystem: APPLICANT },
    children: [
      {
        path: 'appInfo',
        name: 'appInfo',
        component: () => import('@/views/applicant/info/appInfo'),
        meta: { title: '个人信息管理', icon: 'form', subsystem: APPLICANT }
      },
      {
        path: 'projectTable',
        name: 'projectTable',
        component: () => import('@/views/applicant/info/projectTable'),
        meta: { title: '项目管理', icon: 'table', subsystem: APPLICANT }
      },
    ]
  },

  {
    path: '/projectApply',
    component: Layout,
    redirect: '/projectApply/basicInfo',
    name: 'projectApply',
    meta: {
      title: '项目申请管理',
      icon: 'nested', subsystem: APPLICANT
    },
    children: [
      {
        path: 'basicInfo',
        component: () => import('@/views/applicant/projectApply/basicInfo'), // Parent router-view
        name: 'basicInfo',
        meta: {
          title: '项目基本信息', icon: 'form', subsystem: APPLICANT
        },
      },
      {
        path: 'projectContent',
        component: () => import('@/views/applicant/projectApply/projectContent'), // Parent router-view
        name: 'projectContent',
        meta: {
          title: '项目内容', icon: 'form', subsystem: APPLICANT
        },
      },
      {
        path: 'fileUpload',
        component: () => import('@/views/applicant/projectApply/fileUpload'), // Parent router-view
        name: 'fileUpload',
        meta: {
          title: '项目文件提交', icon: 'form', subsystem: APPLICANT
        },
      },
      {
        path: 'projectApp',
        component: () => import('@/views/applicant/projectApply/projectApp'), // Parent router-view
        name: 'projectApp',
        meta: {
          title: '项目申报', icon: 'form', subsystem: APPLICANT
        },
      }
    ]
  },

  //申报单位路由
  {
    path: '/repDeptInfo',
    component: Layout,
    redirect: '/repDeptInfo/rpdInfo',
    name: 'repDeptInfo',
    meta: { title: '申报单位信息', icon: 'example', subsystem: REPDEPT },
    children: [
      {
        path: 'rpdInfo',
        name: 'rpdInfo',
        component: () => import('@/views/repDept/info/rpdInfo'),
        meta: { title: '单位信息管理', icon: 'form', subsystem: REPDEPT }
      },
      {
        path: 'appAccount',
        name: 'appAccount',
        component: () => import('@/views/repDept/info/appAccount'),
        meta: { title: '申报人账号管理', icon: 'table', subsystem: REPDEPT }
      },
    ]
  },

  {
    path: '/appProjectReview',
    component: Layout,
    redirect: '/projectReview/appsReviewTable',
    name: 'appProjectReview',
    meta: { title: '项目审核', icon: 'nested', subsystem: REPDEPT },
    children: [
      {
        path: 'appsReviewTable',
        name: 'appsReviewTable',
        component: () => import('@/views/repDept/projectReview/reviewTable'),
        meta: { title: '待审核项目列表', icon: 'table', subsystem: REPDEPT }
      },
      {
        path: 'appsProjectTable',
        name: 'appsProjectTable',
        component: () => import('@/views/repDept/projectReview/projectTable'),
        meta: { title: '项目列表', icon: 'table', subsystem: REPDEPT }
      },
    ]
  },

  //组织推荐单位路由
  {
    path: '/recDeptInfo',
    component: Layout,
    redirect: '/recDeptInfo/rcdInfo',
    name: 'recDeptInfo',
    meta: { title: '组织推荐单位信息', icon: 'example', subsystem: RECDEPT },
    children: [
      {
        path: 'rcdInfo',
        name: 'rcdInfo',
        component: () => import('@/views/recDept/info/rcdInfo'),
        meta: { title: '单位信息管理', icon: 'form', subsystem: RECDEPT }
      },
      {
        path: 'rpdAccount',
        name: 'rpdAccount',
        component: () => import('@/views/recDept/info/rpdAccount'),
        meta: { title: '申报单位账号管理', icon: 'table', subsystem: RECDEPT }
      },
    ]
  },

  {
    path: '/rpdProjectReview',
    component: Layout,
    redirect: '/rcdProjectReview/rpdsReviewTable',
    name: 'rpdProjectReview',
    meta: { title: '项目审核', icon: 'nested', subsystem: RECDEPT },
    children: [
      {
        path: 'rpdsReviewTable',
        name: 'rpdsReviewTable',
        component: () => import('@/views/recDept/projectReview/reviewTable'),
        meta: { title: '待审核项目列表', icon: 'table', subsystem: RECDEPT }
      },
      {
        path: 'rpdsProjectTable',
        name: 'rpdsProjectTable',
        component: () => import('@/views/recDept/projectReview/projectTable'),
        meta: { title: '项目列表', icon: 'table', subsystem: RECDEPT }
      },
    ]
  },

  // {
  //   path: '/external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: '外部链接', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const router = new VueRouter({
  routes
})

export default router
