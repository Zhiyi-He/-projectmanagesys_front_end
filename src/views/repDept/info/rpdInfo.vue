<template>
  <div class="app-container">
    <el-form label-position="left" ref="rpdInfo" :model="rpdInfo" label-width="120px">
      <el-divider content-position="center">单位基本信息</el-divider>
      <el-form-item label="单位编号" style="display:none;">
        <el-input v-model="rpdInfo.id" />
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="单位名称：" prop="deptName">
            <el-input v-model="rpdInfo.deptName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="推荐单位：" prop="recDept.recDeptName">
            <el-input v-model="rpdInfo.recDept.deptName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="单位性质：" prop="deptType">
            <el-select v-model="rpdInfo.deptType" placeholder="请选择单位类别">
              <el-option label="医院" :value="0" />
              <el-option label="学校" :value="1" />
              <el-option label="研究所" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="法人:" prop="legalPerson">
            <el-input v-model="rpdInfo.legalPerson" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="联系人：" prop="contact">
            <el-input v-model="rpdInfo.contact" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="地址：" prop="address">
            <el-input v-model="rpdInfo.address" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="邮政编码：" prop="postalCode">
            <el-input v-model="rpdInfo.postalCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="电话：" prop="tel">
            <el-input v-model="rpdInfo.tel" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="rpdInfo.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">单位负责人信息</el-divider>
      <el-form-item label-width="0" prop="principals">
        <el-table :data="rpdInfo.principals" highlight-current-row fit border>
          <el-table-column prop="personnel" label="人员"></el-table-column>
          <el-table-column prop="name" label="姓名">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="position" label="职务">
            <template slot-scope="scope">
              <el-input v-model="scope.row.position"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="tel" label="电话号码">
            <template slot-scope="scope">
              <el-input v-model="scope.row.tel"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱">
            <template slot-scope="scope">
              <el-input v-model="scope.row.email"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-divider content-position="center">单位证明材料</el-divider>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(rpdInfo)">提交</el-button>
        <el-button @click="resetForm('rpdInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRpdInfo, updateRpdInfo } from '@/api/repDept'
import { getUserInfo } from '@/api/user'
import router from '@/router'
export default {
  data() {
    return {
      rpdInfo: {
        id: 0,
        deptName: '',
        deptType: 0,
        legalPerson: '',
        contact: '',
        address: '',
        postalCode: '',
        tel: '',
        email: '',
        principals: [],
        recDept: {
          deptName: ''
        }
      }
    }
  },
  methods: {
    async onSubmit(rpdInfo) {
      const { updateUser } = await updateRpdInfo(rpdInfo)
      if (updateUser != null) {
        this.$message({
          message: '修改用户信息成功！',
          type: 'success'
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async fetchData() {
      const { userVo } = await getUserInfo()
      const { userInfo } = await getRpdInfo(userVo.id)
      this.rpdInfo = userInfo
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
.el-divider {
  margin-top: 2px;
  .el-divider__text {
    font-size: 18px;
  }
}
</style>

