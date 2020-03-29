<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      height="900"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'id', order: 'ascending'}"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="id" label="项目编号" sortable></el-table-column>
      <el-table-column prop="proType" label="项目类型"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
      <el-table-column prop="subject" label="学科分类"></el-table-column>
      <el-table-column prop="funds" label="项目经费（元）" sortable></el-table-column>
      <el-table-column prop="time" label="研究年限（年）"></el-table-column>
      <el-table-column
        prop="proStatus"
        label="申报状态"
        :filters="statusFilter"
        :filter-method="filterStatus"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getProList } from '@/api/applicant'
export default {
  data() {
    const statusFilter = [
      { text: '未通过', value: 1 },
      { text: '打回修改', value: 2 },
      { text: '初级审核中', value: 3 },
      { text: '二级审核中', value: 4 },
      { text: '已通过', value: 5 }
    ]
    return {
      statusFilter: statusFilter,
      tableData: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserInfo().then(response => {
        const { userVo } = response
        getProList(userVo.id).then(response => {
          const { proList } = response

          this.tableData = proList
          this.listLoading = false
        })
      })
      this.listLoading = false
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    formatStatus(row, column) {
      return this.statusFilter[row.proStatus - 1].text
    },
    filterStatus(value, row) {
      return row.proStatus == value
    }
  }
}
</script>
