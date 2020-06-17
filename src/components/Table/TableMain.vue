<!--  -->
<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      @filter-change="filterTable"
    >
      <template v-if="isSelection">
        <el-table-column type="selection" width="55"></el-table-column>
      </template>
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column
        :key="column.key"
        v-for="column in tableColumns"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.isSort"
        :filters="column.filters"
        :column-key="column.key"
        :formatter="column.formatter"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            v-for="item in operations"
            :key="item.name"
            @click="getFun(item.click,scope.row)"
            type="text"
            size="small"
          >{{item.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSizeTemp"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <template v-if="dialogFormVisible">
      <el-dialog title="项目详情" :visible.sync="dialogFormVisible" top="10px">
        <projectForm :projectDetails="projectDetails"></projectForm>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import ProjectForm from '@/components/ProjectForm'
export default {
  components: {
    ProjectForm
  },
  name: 'TableMain',
  props: {
    isSelection: {
      type: Boolean,
      required: false,
      default: false
    },
    tableData: {
      type: Array,
      required: true
    },
    tableColumns: {
      type: Array,
      required: true
    },
    operations: {
      type: Array,
      required: false
    },
    pageSize: {
      type: Number,
      required: false
    },
    pageNum: {
      type: Number,
      required: false
    },
    appNamesStr: {
      type: String,
      required: false,
      default: null
    },
    statusStr: {
      type: String,
      required: false,
      default: null
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
    statusList: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      listLoading: true,
      statusFilter: [
        { text: '未通过', value: 1 },
        { text: '打回修改', value: 2 },
        { text: '初级审核中', value: 3 },
        { text: '二级审核中', value: 4 },
        { text: '三级审核中', value: 5 },
        { text: '待分配专家', value: 6 },
        { text: '专家评审', value: 7 },
        { text: '待审批', value: 8 },
        { text: '已通过', value: 9 }
      ],
      appNameFilter: [],
      multipleSelection: [],
      dialogFormVisible: false,
      projectDetails: [],
      pageSizes: [5, 10, 15, 20],
      currentPage: this.pageNum,
      pageSizeTemp: this.pageSize,
      appNamesStrTemp: this.appNamesStr,
      statusStrTemp: this.statusStr
    }
  },
  computed: {
    indexComputed() {
      return (this.currentPage - 1) * this.pageSizeTemp + 1
    }
  },
  watch: {
    tableColumns: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.tableColumns.forEach(item => {
          if (item.key == 'proStatus') {
            this.$set(
              item,
              'filters',
              this.statusFilter.filter(status => {
                return this.statusList.indexOf(status.value) != -1
              })
            )
            this.$set(item, 'formatter', this.formatStatus)
          } else if (item.key == 'appName') {
            this.setFilter(this.tableData)
            this.$set(item, 'filters', this.appNameFilter)
          }
        })
      }
    },
    pageSizeTemp() {
      this.$emit('update:pageSize', this.pageSizeTemp)
    },
    currentPage() {
      this.$emit('update:pageNum', this.currentPage)
    },
    appNamesStrTemp() {
      this.$emit('update:appNamesStr', this.appNamesStrTemp)
    },
    statusStrTemp() {
      this.$emit('update:statusStr', this.statusStrTemp)
    }
  },
  methods: {
    formatStatus(row, column) {
      return this.statusFilter.filter(status => {
        return status.value == row.proStatus
      })[0].text
    },
    setFilter(projects) {
      for (const project of projects) {
        if (
          this.appNameFilter &&
          !this.appNameFilter.some(item => item.value == project.applicant.name)
        ) {
          this.appNameFilter.push({
            text: project.applicant.name,
            value: project.applicant.name
          })
        }
        if (
          this.rpdNameFilter &&
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
          this.rcdNameFilter &&
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
    getFun(funName, row) {
      switch (funName) {
        case 'viewDetail':
          return this.viewDetail(row)
      }
    },
    viewDetail(row) {
      this.dialogFormVisible = true
      this.projectDetails = row
    },
    filterTable(filters) {
      if (filters.appName) {
        this.appNamesStrTemp = filters.appName.join(',')
      }
      if (filters.proStatus) {
        if (filters.proStatus.length != 0) {
          this.statusStrTemp = filters.proStatus.join(',')
        } else {
          this.statusStrTemp = this.statusList.join(',')
        }
      }
      this.currentPage = 1
    },
    handleSizeChange(val) {
      this.pageSizeTemp = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>