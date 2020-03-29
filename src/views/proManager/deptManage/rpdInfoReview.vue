<template>
  <div class="app-container">
    <el-button
      @click="multipleSelection.length==0?multipleSelectionTip():pass(multipleSelection)"
      icon="el-icon-check"
      type="primary"
      plain
    >批量通过</el-button>
    <el-button
      @click="multipleSelection.length==0?multipleSelectionTip():notPass(multipleSelection)"
      icon="el-icon-close"
      type="danger"
      plain
    >批量不通过</el-button>
    <el-table
      v-loading="listLoading"
      :data="reviewTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="deptName" label="申报单位"></el-table-column>
      <el-table-column prop="deptCode" label="单位代码"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="notPass([scope.row])" type="text" size="small">不通过</el-button>
          <el-button @click="pass([scope.row])" type="text" size="small">通过</el-button>
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
      :total="reviewTable.length"
    ></el-pagination>
  </div>
</template>

<script>
import { getRepDeptsByRpdStatus,updateRepDepts } from '@/api/repDept'
import { NOTPASSRPD, UNDEREVIEW, PASSRPD } from '@/variables'
export default {
  data() {
    return {
      reviewTable: [],
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
      const { repDepts } = await getRepDeptsByRpdStatus(UNDEREVIEW)
      this.reviewTable = repDepts
      this.listLoading = false
    },
    review(repDepts, msg, confirmMsg) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { updateUsers } = await updateRepDepts(repDepts)
          if (updateUsers.length != 0) {
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
    notPass(repDepts) {
      for (let repDept of repDepts) {
        repDept.rpdStatus = NOTPASSRPD
      }
      this.review(repDepts, '是否要不通过该申报单位', '不通过该申报单位成功！')
    },
    pass(repDepts) {
      for (let repDept of repDepts) {
        repDept.rpdStatus = PASSRPD
      }
      this.review(repDepts, '是否要通过该申报单位', '通过该申报单位成功！')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    multipleSelectionTip() {
      this.$message({
        message: '请选择申报单位',
        type: 'warning'
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>
