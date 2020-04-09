<template>
  <div class="app-container">
    <el-button
      @click="multipleSelection.length==0?multipleSelectionTip():deleteRow(multipleSelection)"
      icon="el-icon-close"
      type="danger"
      plain
    >批量删除</el-button>
    <el-table
      v-loading="listLoading"
      :data="sysFileTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      @filter-change="filterSysFiles"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="date" label="发布日期"></el-table-column>
      <el-table-column
        prop="fileType"
        label="文件类型"
        :filters="fileTypeFilter"
        :column-key="'fileType'"
        :formatter="formatFileType"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteRow([scope.row])" type="text" size="small">删除</el-button>
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
      :total="sysFileTable.length"
    ></el-pagination>
  </div>
</template>

<script>
import { getFilesByType, deleteFiles } from '@/api/files'
import { UNDEREVIEW } from '@/variables'
export default {
  data() {
    const fileTypeFilter = [
      { text: '系统通知', value: 0 },
      { text: '使用手册', value: 1 }
    ]
    return {
      sysFileTable: [],
      firstData: [],
      fileTypeFilter: fileTypeFilter,
      listLoading: true,
      multipleSelection: [],
      pageSize: 5,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20]
      // pageSizes: [1, 2, 3, 4]
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
      const { files } = await getFilesByType([0, 1])
      this.firstData = this.sysFileTable = files
      this.listLoading = false
    },
    deleteRow(sysFiles) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteFiles(sysFiles)
          this.$message({
            message: '删除文件成功！',
            type: 'success'
          })
          this.fetchData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    formatFileType(row, column) {
      return this.fileTypeFilter.filter(fileType => {
        return fileType.value == row.fileType
      })[0].text
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    multipleSelectionTip() {
      this.$message({
        message: '请选择文件',
        type: 'warning'
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    filterSysFiles(filters) {
      this.sysFileTable = this.firstData

      if (filters.fileType && filters.fileType.length != 0) {
        this.sysFileTable = this.sysFileTable.filter(sysFile => {
          return filters.fileType.indexOf(sysFile.fileType) != -1
        })
      }
      this.currentPage = 1
    }
  }
}
</script>
