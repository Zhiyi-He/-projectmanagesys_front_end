<template>
  <div class="app-container">
    <div class="search">
      <el-input v-model="query.proName" size="small" placeholder="请输入项目名称" />
      <el-select
        v-model="rcdNames"
        size="small"
        multiple
        collapse-tags
        placeholder="请选择推荐单位"
        @visible-change="selectDisabled1?null:getRcdNamesFilter()"
        :disabled="selectDisabled1"
      >
        <el-option v-for="item in rcdNameFilter" :key="item" :label="item" :value="item"></el-option>
      </el-select>-
      <el-select
        v-model="rpdNames"
        size="small"
        multiple
        collapse-tags
        placeholder="请选择申报单位"
        @visible-change="selectDisabled2?null:getRpdNamesFilter()"
        :disabled="selectDisabled2"
      >
        <el-option v-for="item in rpdNameFilter" :key="item" :label="item" :value="item"></el-option>
      </el-select>-
      <el-select
        v-model="appNames"
        size="small"
        multiple
        collapse-tags
        placeholder="请选择申报人"
        @visible-change="getAppNamesFilter"
      >
        <el-option v-for="item in appNameFilter" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-button @click="queryData()" icon="el-icon-search" type="primary" size="small" plain>查询</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="projectTable"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @filter-change="filterProjectTable"
    >
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="id" label="项目编号" sortable></el-table-column>
      <el-table-column prop="proType" label="项目类型" :filters="proTypeFilter" :column-key="'proType'"></el-table-column>
      <el-table-column prop="proName" width="150px" label="项目名称"></el-table-column>
      <el-table-column prop="subject" label="学科分类" :filters="subjectFilter" :column-key="'subject'"></el-table-column>
      <el-table-column prop="applicant.name" label="申报人"></el-table-column>
      <el-table-column prop="applicant.repDept.deptName" label="申报单位"></el-table-column>
      <el-table-column
        prop="proStatus"
        label="申报状态"
        :filters="statusFilter"
        :column-key="'proStatus'"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="dialogFormVisible=true,projectDetails=scope.row"
            type="text"
            size="small"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNum"
      :page-sizes="pageSizes"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog title="项目详情" :visible.sync="dialogFormVisible" top="10px">
      <el-form
        label-position="left"
        ref="projectDetails"
        :model="projectDetails"
        label-width="120px"
        :disabled="true"
      >
        <el-row>
          <el-col :span="22">
            <el-form-item label="项目编号：" prop="id">
              <el-input v-model="projectDetails.id" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="项目名称：" prop="proName">
              <el-input v-model="projectDetails.proName" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="项目类型：" prop="proType">
              <el-input v-model="projectDetails.proType" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="学科分类：" prop="subject">
              <el-input v-model="projectDetails.subject" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="项目经费：" prop="funds">
              <el-input v-model="projectDetails.funds" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="研究年限：" prop="time">
              <el-input v-model="projectDetails.time" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="申报人：" prop="applicant.name">
              <el-input v-model="projectDetails.applicant.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="申报单位：" prop="applicant.repDept.deptName">
              <el-input v-model="projectDetails.applicant.repDept.deptName" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="关键词：" prop="keywords">
              <el-input v-model="projectDetails.keywords" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="项目内容摘要:" prop="desc">
              <el-input v-model="projectDetails.desc" type="textarea" placeholder="300字以内" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="项目文件:" prop="files">
              <div class="link" :key="item.id" v-for="item in projectDetails.files">
                <el-link
                  :underline="false"
                  href="javascript:;"
                  @click.native="downloadFile(item.path)"
                  type="primary"
                >{{item.title}}</el-link>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="pass([projectDetails])">通过</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getProjects, getAppNames } from '@/api/applicant'
import { getRpdNames } from '@/api/repDept'
import { getRcdInfo } from '@/api/recDept'
import {
  NOTPASS,
  SECONDREVIEW,
  THREEREVIEW,
  PASS,
  PASSRPD,
  RECDEPT,
  DOWNLOADURL,
  PROTYPES,
  SUBJECTS
} from '@/variables'
export default {
  data() {
    const statusList = [NOTPASS, SECONDREVIEW, THREEREVIEW, PASS]
    const statusFilter = [
      { text: '未通过', value: 1 },
      { text: '打回修改', value: 2 },
      { text: '初级审核中', value: 3 },
      { text: '二级审核中', value: 4 },
      { text: '三级审核中', value: 5 },
      { text: '待分配专家', value: 6 },
      { text: '专家评审', value: 7 },
      { text: '待审批', value: 8 },
      { text: '已通过', value: 9 }
    ].filter(status => {
      return statusList.indexOf(status.value) != -1
    })
    return {
      statusList: statusList,
      statusFilter: statusFilter,
      proTypeFilter: PROTYPES,
      subjectFilter: SUBJECTS,
      appNameFilter: [],
      rpdNameFilter: [],
      rcdNameFilter: [],
      appNames: [],
      rpdNames: [],
      rcdNames: [],
      selectDisabled1: false,
      selectDisabled2: false,
      projectTable: [],
      listLoading: true,
      dialogFormVisible: false,
      projectDetails: {
        id: '',
        proName: '',
        proType: '',
        subject: '',
        funds: 0,
        time: 0,
        keywords: '',
        desc: '',
        files: [],
        applicant: {
          name: '',
          repDept: {
            deptName: ''
          }
        }
      },
      pageSizes: [5, 10, 15, 20],
      total: 0,
      query: {
        userType: '',
        userId: '',
        statusStr: statusList.join(','),
        pageSize: 5,
        pageNum: 1,
        proName: '',
        proTypesStr: '',
        subjectsStr: '',
        appNamesStr: '',
        rpdNamesStr: ''
      }
    }
  },
  created() {
    this.setQuery()
  },
  computed: {
    indexComputed() {
      return (this.query.pageNum - 1) * this.query.pageSize + 1
    }
  },
  watch: {
    query: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.fetchData()
      }
    }
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { projects, total } = await getProjects(this.query)
      this.projectTable = projects
      this.total = total
      this.listLoading = false
    },
    queryData() {
      this.query.rcdNamesStr = this.rcdNames.join(',')
      this.query.rpdNamesStr = this.rpdNames.join(',')
      this.query.appNamesStr = this.appNames.join(',')
      this.query.pageNum = 1
    },
    downloadFile(path) {
      window.location.href = DOWNLOADURL + path
    },
    async getRpdNamesFilter() {
      const { rpdNames } = await getRpdNames(this.rcdNames)
      this.rpdNameFilter = rpdNames
    },
    async getAppNamesFilter() {
      const { appNames } = await getAppNames(this.rpdNames)
      this.appNameFilter = appNames
    },
    async setQuery() {
      const { userVo } = await getUserInfo()
      this.query.userType = RECDEPT
      this.query.userId = userVo.id
      const { userInfo } = await getRcdInfo(userVo.id)
      this.rcdNameFilter = this.rcdNames = [userInfo.deptName]
      this.selectDisabled1 = true
      this.selectDisabled2 = false
    },
    formatStatus(row, column) {
      return this.statusFilter.filter(status => {
        return status.value == row.proStatus
      })[0].text
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.query.pageNum = 1
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
    },
    filterProjectTable(filters) {
      if (filters.proType) {
        this.query.proTypesStr = filters.proType.join(',')
      }
      if (filters.subject) {
        this.query.subjectsStr = filters.subject.join(',')
      }
      if (filters.proStatus) {
        if (filters.proStatus.length != 0) {
          this.query.statusStr = filters.proStatus.join(',')
        } else {
          this.query.statusStr = this.statusList.join(',')
        }
      }

      this.query.pageNum = 1
    }
  }
}
</script>
<style lang='scss' scoped>
.search {
  margin-bottom: 5px;
  .el-input {
    width: 150px;
    margin-right: 10px;
  }
  .el-select {
    width: 180px;
    margin-right: 6px;
  }
}
.link {
  line-height: 25px;
}
</style> 