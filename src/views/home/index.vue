<template>
  <el-container class="home_container">
    <el-header height="100px">
      <div class="header-content" @click="backHome">
        <div class="header-image">
          <img src="..\..\assets\images\nation.png" />
        </div>
        <div class="header-text">
          <span>湖北省卫生计生委</span>
          <br />
          <span>---科研项目管理系统</span>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="notice">
        <el-tabs
          v-model="activeName"
          type="card"
          style="height:100%;width:100%;"
          @tab-click="handleClick"
        >
          <el-tab-pane label="系统通知" name="notice">
            <div :key="item.id" v-for="item in files">
              <el-link
                :underline="false"
                :href="noticeUrl+item.newFileName"
                type="primary"
              >{{item.title}}</el-link>
              <span>{{item.date}}</span>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="系统使用手册" name="manual">
            <div :key="item.id" v-for="item in files">
              <el-link
                :underline="false"
                :href="manualUrl+item.newFileName"
                type="primary"
              >{{item.title}}</el-link>
              <span>{{item.date}}</span>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="btns">
        <span>用户入口</span>
        <el-divider></el-divider>
        <el-row>
          <el-button type="primary" @click="login('applicant')">申报人入口</el-button>
          <el-button type="primary" @click="login('repDept')">申报单位入口</el-button>
          <el-button type="primary" @click="login('recDept')">组织推荐单位入口</el-button>
          <el-button type="primary" @click="login('proManager')">项目管理员入口</el-button>
          <el-button type="primary" @click="login('sysManager')">系统管理员入口</el-button>
          <el-button type="primary" @click="login('expert')">评审专家入口</el-button>
        </el-row>
        <!-- <el-row>
          <el-button type="primary" @click="login('doubleDept')">组织单位兼申报单位入口</el-button>
        </el-row>-->
      </div>
    </el-main>
    <el-footer style="height:80px">
      <span>地址：湖北省武汉市卓刀泉北路2号省疾控中心</span>
      <br />
      <span>邮编：430070</span>
      <span>联系电话：15623852312</span>
      <br />
      <span>湖北省卫生和计划委员会版权所有</span>
      <span>技术支持：湖北省卫生计生委员会</span>
    </el-footer>
  </el-container>
</template>

<script>
import {
  APPLICANT,
  REPDEPT,
  RECDEPT,
  PROMANAGER,
  SYSMANAGER,
  EXPERT,
  NOTICEURL,
  MANUALURL
} from '@/variables'
import { getFilesByType } from '@/api/files'
export default {
  data() {
    return {
      files: [],
      noticeUrl: NOTICEURL,
      manualUrl: MANUALURL,
      activeName: 'notice'
    }
  },

  methods: {
    async handleClick(tab, event) {
      if (tab.name == 'notice') {
        const { files } = await getFilesByType([0])
        this.files = files
      } else {
        const { files } = await getFilesByType([1])
        this.files = files
      }
    },
    backHome() {
      this.$router.push('/home')
    },
    login(name) {
      var loginName = ''
      // switch (name) {
      //   case APPLICANT:
      //     loginName = '申报人'
      //     break
      //   case REPDEPT:
      //     loginName = '申报单位'
      //     break
      //   case RECDEPT:
      //     loginName = '组织推荐单位'
      //     break
      //   case PROMANAGER:
      //     loginName = '项目管理员'
      //     break
      //   case SYSMANAGER:
      //     loginName = '系统管理员'
      //     break
      //   case EXPERT:
      //     loginName = '评审专家'
      //     break
      // case DOUBLEDEPT:
      //   loginName = "组织单位兼申报单位";
      //   break;
      // }
      this.$router.push({
        path: '/login',
        query: {
          // loginName: loginName,
          loginParam: name
        }
      })
    }
  },
  async mounted() {
    const { files } = await getFilesByType(0)
    this.files = files
  }
}
</script>

<style lang='scss' scoped>
@media only screen and (max-width: 540px) {
  .header-text {
    font-size: 25px;
    :last-child {
      font-size: 18px;
      float: right;
    }
  }
  .title-container {
    margin-top: 0;
    .title {
      font-size: 22px;
    }
  }
  .el-main {
    .notice {
      height: 250px;
      width: 100%;
      .el-divider {
        margin: 5px;
      }
    }
    .btns {
      width: 100%;
      .el-button {
        width: 150px;
        height: 72px;
        font-size: 16px;
        margin: 5px;
      }
    }
  }
  .el-footer {
    padding: 10px 0;
    font-size: 12px;
    line-height: 20px;
    span {
      margin-left: 5px;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .el-header {
    height: 100px;
    .header-content {
      width: 50%;
      .header-text {
        font-size: 34px;
        br {
          display: none;
        }
        :last-child {
          font-size: 24px;
        }
      }
    }
  }
  .title-container {
    margin-top: -40px;
    .title {
      font-size: 26px;
    }
  }
  .el-main {
    display: flex;
    .notice {
      width: 50%;
      border-right: 1px dashed #2b4b6b;
      .el-divider {
        margin: 10px;
      }
    }
    .btns {
      width: 50%;
      .el-button {
        width: 27%; //180px 27%
        height: 100px; //100px
        font-size: 18px; //18px
        margin: 10px;
      }
    }
  }
  .el-footer {
    padding: 10px;
    font-size: 14px;
    line-height: 35px; //35px
    br {
      &:first-of-type {
        display: none;
      }
    }
    span {
      margin-left: 20px;
    }
  }
}
.home_container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  margin: auto;
}

.el-header {
  padding: 0;
  color: #ffffff;
  font-weight: 500;
  .header-content {
    margin-left: 40px;
    display: flex;
    height: 100%; //100px
    align-items: center;
    cursor: pointer;
    .header-image {
      margin-right: 10px;
      height: 80px;
      width: 80px;
    }
    .header-text {
      margin-top: 10px;
    }
  }
}

.el-footer {
  bottom: 0;
  width: 100%;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  .notice {
    .el-link {
      font-size: 16px;
    }
    span {
      font-size: 16px;
      float: right;
      margin-right: 20px;
    }
  }
  .btns {
    // w:662.5px;h:402.3px
    text-align: center;
    span {
      font-size: 25px;
      font-weight: bolder;
    }
    .el-row {
      width: 100%;
    }
    .el-divider {
      margin-top: 7px;
      margin-bottom: 9px;
    }
    .el-button {
      font-weight: 550;
    }
    // :last-child {
    //   .el-button {
    //     width: 300px; //300px 45.3%
    //   }
    // }
  }
}
</style> 