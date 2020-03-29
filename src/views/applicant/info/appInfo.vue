<template>
  <div class="app-container">
    <el-form label-position="left" ref="appInfo" :model="appInfo" label-width="120px">
      <el-form-item label="编号" style="display:none;" prop="id">
        <el-input v-model="appInfo.id" />
      </el-form-item>
      <el-row>
        <el-col :span="22">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="appInfo.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="身份证号：" prop="idCard">
            <el-input v-model="appInfo.idCard" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="身份证号：" prop="sex">
            <el-select v-model="appInfo.sex" placeholder="请选择性别">
              <el-option label="男" :value="0" />
              <el-option label="女" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="appInfo.birthday"
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="民族：" prop="folk">
            <el-input v-model="appInfo.folk" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="学校：" prop="school">
            <el-input v-model="appInfo.school" />
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="学历:" prop="edu" label-width="110px">
            <el-select v-model="appInfo.edu" placeholder="请选择学历">
              <el-option label="专科" value="专科" />
              <el-option label="本科" value="本科" />
              <el-option label="硕士" value="硕士" />
              <el-option label="博士" value="博士" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="专业领域：" prop="profession">
            <el-input v-model="appInfo.profession" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="手机号：" prop="tel">
            <el-input v-model="appInfo.tel" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="appInfo.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="单位科室：" prop="deptName">
            <!-- <el-cascader v-model="deptIds" :options="deptNames" :props="{ expandTrigger: 'hover' }">
              <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf">({{ data.children.length }})</span>
              </template>
            </el-cascader>-->
            <el-input v-model="deptName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="项目数量：" prop="proNum">
            <el-input v-model="appInfo.proNum" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="个人描述" prop="desc">
        <el-input v-model="appInfo.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(appInfo)">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAppInfo, updateAppInfo } from '@/api/applicant'
import { getUserInfo } from '@/api/user'
import router from '@/router'
export default {
  data() {
    return {
      appInfo: {
        id: '',
        name: '',
        sex: 0,
        idCard: '',
        folk: '',
        school: '',
        edu: '',
        profession: '',
        birthday: '',
        tel: '',
        email: '',
        proNum: 0,
        desc: ''
      },
      // deptIds: [],
      // deptNames: []
      deptName: ''
    }
  },
  methods: {
    onSubmit(appInfo) {
      // updateAppInfo({ appInfo: this.appInfo, rpdId: this.deptIds[1] });
      // appInfo.sex = Number(appInfo.sex);
      console.log(appInfo)
      updateAppInfo(appInfo).then(response => {
        const { updateUser } = response
        if (updateUser != null) {
          this.$message({
            message: '修改个人成功！',
            type: 'success'
          })
        }
      })
    },
    onCancel() {
      this.fetchData()
    },
    fetchData() {
      getUserInfo().then(response => {
        const { userVo } = response
        getAppInfo(userVo.id).then(response => {
          const { user } = response
          this.appInfo = user
          this.deptName =
            user.repDept.recDept.deptName + '/' + user.repDept.deptName
          // this.deptIds = [user.repDept.recDept.id, user.repDept.id];
          // getDeptList().then(response => {
          //   const { deptNames } = response;
          //   this.deptNames = deptNames;
          // });
        })
      })
      // let { user } = await getUserInfo();
      // let data = await getAppInfo(user.id);
      // this.appInfo = data.user;
      // data = await getDeptList();
      // this.deptNames = data.deptNames;
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang='scss' scoped>
.line {
  text-align: center;
}
</style>

