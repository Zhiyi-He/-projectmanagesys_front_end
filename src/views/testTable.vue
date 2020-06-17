<template>
  <div class="app-container">
    <el-row>
      <span class="search">
        <el-input v-model="query.proName" size="small" placeholder="请输入项目名称" />
        <el-button
          @click="query.pageNum = 1"
          icon="el-icon-search"
          type="primary"
          size="small"
          plain
        >查询</el-button>
      </span>
    </el-row>
    <tableMain
      ref="tableMain"
      :tableData="projectTable"
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
import { getUserInfo } from '@/api/user'
import { getProjects } from '@/api/applicant'
import { getApplicants } from '@/api/repDept'
import {
  NOTPASS,
  FIRSTREVIEW,
  SECONDREVIEW,
  PASS,
  DOWNLOADURL,
  REPDEPT
} from '@/variables'
export default {
  components: {
    TableMain
  },
  data() {
    const statusList = [NOTPASS, FIRSTREVIEW, SECONDREVIEW, PASS]
    return {
      projectTable: [],
      statusList: statusList,
      total: 0,
      query: {
        userType: '',
        userId: '',
        statusStr: statusList.join(','),
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
    setColumns() {
      const tableColumns = [
        {
          prop: 'id',
          label: '项目编号',
          isSort: true,
          filters: null,
          formatter: null
        },
        {
          prop: 'proType',
          label: '项目类型',
          isSort: false,
          filters: null,
          formatter: null
        },
        {
          prop: 'proName',
          label: '项目名称',
          isSort: false,
          filters: null,
          formatter: null
        },
        {
          prop: 'subject',
          label: '学科分类',
          isSort: false,
          filters: null,
          formatter: null
        },
        {
          prop: 'funds',
          label: '项目经费（元）',
          isSort: true,
          filters: null,
          formatter: null
        },
        {
          prop: 'time',
          label: '研究年限（年）',
          isSort: true,
          filters: null,
          formatter: null
        },
        {
          prop: 'applicant.name',
          label: '申报人',
          isSort: false,
          key: 'appName',
          filters: []
        },
        {
          key: 'proStatus',
          prop: 'proStatus',
          label: '申报状态',
          isSort: false,
          filters: this.statusList
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
    async fetchData() {
      const { projects, total } = await getProjects(this.query)
      this.projectTable = projects
      this.total = total
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
