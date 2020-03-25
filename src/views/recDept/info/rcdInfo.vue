<template>
  <div class="app-container">
    <el-form label-position="left" ref="rcdInfo" :model="rcdInfo" label-width="120px">
      <el-divider content-position="center">单位基本信息</el-divider>
      <el-form-item label="单位编号" style="display:none;">
        <el-input v-model="rcdInfo.id" />
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="单位名称：" prop="deptName">
            <el-input v-model="rcdInfo.deptName" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="法人:" prop="legalPerson">
            <el-input v-model="rcdInfo.legalPerson" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="联系人：" prop="contact">
            <el-input v-model="rcdInfo.contact" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="地址：" prop="address">
            <el-input v-model="rcdInfo.address" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="邮政编码：" prop="postalCode">
            <el-input v-model="rcdInfo.postalCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="电话：" prop="tel">
            <el-input v-model="rcdInfo.tel" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="rcdInfo.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">科技部门</el-divider>
      <el-form-item label-width="0" prop="techDepts">
        <el-table :data="rcdInfo.techDepts" highlight-current-row fit border>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="principal" label="负责人">
            <template slot-scope="scope">
              <el-input v-model="scope.row.principal"></el-input>
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit(rcdInfo)">提交</el-button>
        <el-button @click="resetForm('rcdInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import {} from '@/api/repDept'
import { getRcdInfo, updateRcdInfo } from '@/api/recDept'
import router from '@/router'
export default {
  data() {
    return {
      rcdInfo: {
        id: 0,
        deptName: '',
        legalPerson: '',
        contact: '',
        address: '',
        postalCode: '',
        tel: '',
        email: '',
        techDepts: []
      }
    }
  },
  methods: {
    async onSubmit(rcdInfo) {
      const { updateUser } = await updateRcdInfo(rcdInfo)
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
      const { userInfo } = await getRcdInfo(userVo.id)
      this.rcdInfo = userInfo
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

