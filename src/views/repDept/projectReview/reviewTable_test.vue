<template>
  <div class="app-container">
    <el-row>
      <span class="header-toolbar">
        <el-button
          @click="multipleSelection.length==0?multipleSelectionTip():pass(multipleSelection)"
          icon="el-icon-check"
          type="primary"
          size="small"
          plain
        >通过多选</el-button>
        <el-button
          @click="multipleSelection.length==0?multipleSelectionTip():backModify(multipleSelection)"
          icon="el-icon-edit"
          type="warning"
          size="small"
          plain
        >打回修改多选</el-button>
        <el-button
          @click="multipleSelection.length==0?multipleSelectionTip():notPass(multipleSelection)"
          icon="el-icon-close"
          type="danger"
          size="small"
          plain
        >不通过多选</el-button>
      </span>
      <span class="search">
        <el-input v-model="query.proName" size="small" placeholder="请输入项目名称" />
        <el-button
          @click="query.pageNum=1,fetchData()"
          icon="el-icon-search"
          type="primary"
          size="small"
          plain
        >查询</el-button>
      </span>
    </el-row>
    <tableMain
      ref="tableMain"
      :isSelection="true"
      :tableData="reviewTable"
      :tableColumns="setColumns()"
      :operations="setOperations()"
      v-bind.sync="query"
      :statusList="statusList"
      :total="total"
    />
  </div>
</template>

<script>
import TableMain from '@/components/Table/TableMain'
import { getApplicants } from '@/api/repDept'
import { getProjects, updateProjects } from '@/api/applicant'
import { getUserInfo } from '@/api/user'
import {
  FIRSTREVIEW,
  NOTPASS,
  BACKMODIFY,
  SECONDREVIEW,
  REPDEPT
} from '@/variables'
export default {
  components: {
    TableMain
  },
  data() {
    return {
      reviewTable: [],
      total: 0,
      query: {
        userType: '',
        userId: '',
        statusStr: [FIRSTREVIEW].join(','),
        pageSize: 5,
        pageNum: 1,
        proName: '',
        appNamesStr: ''
      }
    }
  },
  created() {
    this.setQuery()
  },
  watch: {
    query: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.$refs.tableMain.listLoading = true
        this.fetchData()
        this.$refs.tableMain.listLoading = false
      }
    }
  },
  methods: {
    async fetchData(proName) {
      const { projects, total } = await getProjects(this.query)
      this.reviewTable = projects
      this.total = total
    },
    setColumns() {
      const tableColumns = [
        {
          prop: 'id',
          label: '项目编号',
          isSort: true
        },
        {
          prop: 'proType',
          label: '项目类型',
          isSort: false
        },
        {
          prop: 'proName',
          label: '项目名称',
          isSort: false
        },
        {
          prop: 'subject',
          label: '学科分类',
          isSort: false
        },
        {
          prop: 'applicant.name',
          label: '申报人',
          isSort: false,
          key: 'appName',
          filters: []
        }
      ]
      return tableColumns
    },
    setOperations() {
      const operations = [
        {
          name: '查看详情',
          click: 'viewDetail'
        }
      ]
      return operations
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
            this.dialogFormVisible = false
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
    notPass(projects) {
      projects.forEach(project => {
        project.proStatus = NOTPASS
      })
      this.review(projects, '是否要不通过该项目', '不通过该项目成功！')
    },
    backModify(projects) {
      projects.forEach(project => {
        project.proStatus = BACKMODIFY
      })
      this.review(projects, '是否要打回修改该项目', '打回修改该项目成功！')
    },
    pass(projects) {
      projects.forEach(project => {
        project.proStatus = SECONDREVIEW
      })
      this.review(projects, '是否要通过该项目', '通过该项目成功！')
    },
    multipleSelectionTip() {
      this.$message({
        message: '请选择项目',
        type: 'warning'
      })
    },
    async setQuery() {
      const { userVo } = await getUserInfo()
      this.query.userType = REPDEPT
      this.query.userId = userVo.id
    }
  }
}
</script>
<style lang='scss' scoped>
.link {
  line-height: 25px;
}
span {
  margin-right: 10px;
}
.search {
  .el-input {
    width: 150px;
    margin-right: 10px;
  }
}
</style> 
