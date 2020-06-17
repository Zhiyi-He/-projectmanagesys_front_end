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
        @visible-change="getRcdNamesFilter"
      >
        <el-option v-for="item in rcdNameFilter" :key="item" :label="item" :value="item"></el-option>
      </el-select>-
      <el-select
        v-model="rpdNames"
        size="small"
        multiple
        collapse-tags
        placeholder="请选择申报单位"
        @visible-change="getRpdNamesFilter"
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
    <div class="header-toolbar">
      <el-button
        @click="multipleSelection.length==0?multipleSelectionTip():approve(multipleSelection)"
        icon="el-icon-check"
        type="primary"
        size="small"
        plain
      >批量审批</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      ref="projectTable"
      :data="projectTable"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      @filter-change="filterProjectTable"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="id" label="项目编号" sortable></el-table-column>
      <el-table-column prop="proType" label="项目类型" :filters="proTypeFilter" :column-key="'proType'"></el-table-column>
      <el-table-column prop="proName" width="150px" label="项目名称"></el-table-column>
      <el-table-column prop="subject" label="学科分类" :filters="subjectFilter" :column-key="'subject'"></el-table-column>
      <el-table-column prop="applicant.name" label="申报人"></el-table-column>
      <el-table-column prop="applicant.repDept.deptName" label="申报单位"></el-table-column>
      <el-table-column prop="applicant.repDept.recDept.deptName" label="推荐单位"></el-table-column>
      <el-table-column
        prop="reviewResult"
        label="评审结果"
        :filters="statusFilter"
        :column-key="'reviewResult'"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="approve([scope.row])" type="text" size="small">审批</el-button>
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
  </div>
</template>

<script>
import { getProjects, updateProjects, getAppNames } from '@/api/applicant'
import { getRecDepts } from '@/api/recDept'
import { getRpdNames } from '@/api/repDept'
import {
  NOTPASS,
  PENDING,
  PASS,
  PASSRPD,
  PROTYPES,
  SUBJECTS
} from '@/variables'
export default {
  data() {
    const statusList = [NOTPASS, PASS]
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
      rcdNames: [],
      rpdNames: [],
      appNames: [],
      projectTable: [],
      listLoading: true,
      multipleSelection: [],
      pageSizes: [5, 10, 15, 20],
      total: 0,
      query: {
        userType: '',
        userId: '',
        statusStr: '',
        pageSize: 5,
        pageNum: 1,
        proName: '',
        proTypesStr: '',
        subjectsStr: '',
        appNamesStr: '',
        rpdNamesStr: '',
        rcdNamesStr: ''
      }
    }
  },
  created() {
    this.query.statusStr = PENDING
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
      this.setFilter(this.projectTable)
      this.listLoading = false
    },
    queryData() {
      this.query.rcdNamesStr = this.rcdNames.join(',')
      this.query.rpdNamesStr = this.rpdNames.join(',')
      this.query.appNamesStr = this.appNames.join(',')
      this.query.pageNum = 1
    },
    async approve(projects) {
      for (let project of projects) {
        project.proStatus = project.reviewResult
      }
      const { updatePros } = await updateProjects(projects)
      if (updatePros.length != 0) {
        this.$message({
          type: 'success',
          message: '审批该项目成功！'
        })
        this.fetchData()
      }
    },
    async getRcdNamesFilter() {
      this.rcdNameFilter = []
      const { recDepts } = await getRecDepts()
      for (const recDept of recDepts) {
        this.rcdNameFilter.push(recDept.deptName)
      }
    },
    async getRpdNamesFilter() {
      const { rpdNames } = await getRpdNames(this.rcdNames)
      this.rpdNameFilter = rpdNames
    },
    async getAppNamesFilter() {
      const { appNames } = await getAppNames(this.rpdNames)
      this.appNameFilter = appNames
    },
    setFilter(projects) {
      for (const project of projects) {
        if (
          !this.appNameFilter.some(item => item.value == project.applicant.name)
        ) {
          this.appNameFilter.push({
            text: project.applicant.name,
            value: project.applicant.name
          })
        }
        if (
          !this.rpdNameFilter.some(
            item => item.value == project.applicant.repDept.deptName
          )
        ) {
          this.rpdNameFilter.push({
            text: project.applicant.repDept.deptName,
            value: project.applicant.repDept.deptName
          })
        }
        if (
          !this.rcdNameFilter.some(
            item => item.value == project.applicant.repDept.recDept.deptName
          )
        ) {
          this.rcdNameFilter.push({
            text: project.applicant.repDept.recDept.deptName,
            value: project.applicant.repDept.recDept.deptName
          })
        }
      }
    },
    formatStatus(row, column) {
      return this.statusFilter.filter(status => {
        return status.value == row.reviewResult
      })[0].text
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    multipleSelectionTip() {
      this.$message({
        message: '请选择项目',
        type: 'warning'
      })
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
span {
  margin-right: 10px;
}
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
</style> 