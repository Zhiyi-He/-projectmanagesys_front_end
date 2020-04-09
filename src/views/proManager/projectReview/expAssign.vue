<template>
  <div class="app-container">
    <el-button
      @click="multipleSelection.length==0?multipleSelectionTip():pass(multipleSelection)"
      icon="el-icon-check"
      type="primary"
      plain
    >批量分配</el-button>
    <el-table
      v-loading="listLoading"
      :data="assignTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
      <el-table-column prop="proType" label="项目类型"></el-table-column>
      <el-table-column prop="proName" width="150px" label="项目名称"></el-table-column>
      <el-table-column prop="subject" label="学科分类"></el-table-column>
      <el-table-column
        prop="applicant.name"
        label="申报人"
        :filters="appNameFilter"
        :column-key="'appName'"
      ></el-table-column>
      <el-table-column
        prop="applicant.repDept.deptName"
        label="申报单位"
        :filters="rpdNameFilter"
        :column-key="'rpdName'"
      ></el-table-column>
      <el-table-column
        prop="applicant.repDept.recDept.deptName"
        label="推荐单位"
        :filters="rcdNameFilter"
        :column-key="'rcdName'"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="220px">
        <template slot-scope="scope">
          <el-button @click="pass([scope.row])" type="text" size="small">分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="assignTable.length"
    ></el-pagination>
  </div>
</template>

<script>
import { getProjectsByStatus, updateProjects } from '@/api/applicant'
import { PASSRPD, EXPERTASSIGN, EXPERTREVIEW } from '@/variables'
export default {
  data() {
    return {
      appNameFilter: [],
      rpdNameFilter: [],
      rcdNameFilter: [],
      assignTable: [],
      firstData: [],
      listLoading: true,
      multipleSelection: [],
      pageSize: 5,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20]
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    indexComputed() {
      return (this.currentPage - 1) * this.pageSize + 1
    }
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { projects } = await getProjectsByStatus([EXPERTASSIGN])
      this.firstData = this.assignTable = projects
      this.setFilter(this.firstData)
      this.listLoading = false
    },
    review(projects, msg, confirmMsg) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { updatePros } = await updateProjects(projects)
          if (updatePros.length != 0) {
            this.$message({
              message: confirmMsg,
              type: 'success'
            })
            this.fetchData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    pass(projects) {
      projects.forEach(project => {
        project.proStatus = EXPERTREVIEW
      })
      this.review(projects, '是否要分配专家到该项目', '分配专家成功！')
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
    resetTableData() {
      this.assignTable = []
      this.appNameFilter = []
      this.rpdNameFilter = []
      this.rcdNameFilter = []
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
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    filterProjectTable(filters) {
      this.assignTable = this.firstData

      if (filters.appName && filters.appName.length != 0) {
        this.assignTable = this.assignTable.filter(project => {
          return filters.appName.indexOf(project.applicant.name) != -1
        })
      }
      if (filters.rpdName && filters.rpdName.length != 0) {
        this.assignTable = this.assignTable.filter(project => {
          return (
            filters.rpdName.indexOf(project.applicant.repDept.deptName) != -1
          )
        })
      }
      if (filters.rcdName && filters.rcdName.length != 0) {
        this.assignTable = this.assignTable.filter(project => {
          return (
            filters.rcdName.indexOf(
              project.applicant.repDept.recDept.deptName
            ) != -1
          )
        })
      }
      this.currentPage = 1
    }
  }
}
</script>
