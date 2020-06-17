<template>
  <div class="app-container">
    <div class="search">
      <el-input v-model="query.proName" size="small" placeholder="请输入项目名称" />
      <el-button
        @click="query.pageNum = 1"
        icon="el-icon-search"
        type="primary"
        size="small"
        plain
      >查询</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @filter-change="filterTable"
    >
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="id" label="项目编号" sortable></el-table-column>
      <el-table-column prop="proType" label="项目类型" :filters="proTypeFilter" :column-key="'proType'"></el-table-column>
      <el-table-column prop="proName" width="150px" label="项目名称"></el-table-column>
      <el-table-column prop="subject" label="学科分类" :filters="subjectFilter" :column-key="'subject'"></el-table-column>
      <el-table-column prop="funds" label="项目经费（元）" sortable></el-table-column>
      <el-table-column prop="time" label="研究年限（年）"></el-table-column>
      <el-table-column
        prop="proStatus"
        label="申报状态"
        :filters="statusFilter"
        :column-key="'proStatus'"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            @click="dialogFormVisible=true,projectDetails=scope.row"
            type="text"
            size="small"
          >查看详情</el-button>
          <el-button
            v-if="scope.row.proStatus==2"
            @click="edit(scope.row)"
            type="text"
            size="small"
          >修改</el-button>
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
              <el-input v-model="projectDetails.id" />
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
            <el-form-item label="推荐单位：" prop="applicant.repDept.recDept.deptName">
              <el-input v-model="projectDetails.applicant.repDept.recDept.deptName" />
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
import { getProjects, updateProjects } from '@/api/applicant'
import {
  APPLICANT,
  PROTYPES,
  SUBJECTS,
  DOWNLOADURL,
  PROJECTUPDATE
} from '@/variables'
export default {
  data() {
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
    ]
    return {
      statusFilter: statusFilter,
      proTypeFilter: PROTYPES,
      subjectFilter: SUBJECTS,
      tableData: [],
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
            deptName: '',
            recDept: {
              deptName: ''
            }
          }
        }
      },
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
        subjectsStr: ''
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
      this.tableData = projects
      this.total = total
      this.listLoading = false
    },
    async edit(project) {
      project.proStatus = PROJECTUPDATE
      const { updatePros } = await updateProjects([project])
      if (updatePros != null) {
        this.$message({
          type: 'info',
          message: '请修改项目信息'
        })
        this.$router.push('/projectApply/projectContent')
      }
    },
    downloadFile(path) {
      window.location.href = DOWNLOADURL + path
    },
    async setQuery() {
      const { userVo } = await getUserInfo()
      this.query.userType = APPLICANT
      this.query.userId = userVo.id
    },
    formatStatus(row, column) {
      return this.statusFilter.filter(status => {
        return status.value == row.proStatus
      })[0].text
    },
    filterStatus(value, row) {
      return row.proStatus == value
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.query.pageNum = 1
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
    },
    filterTable(filters) {
      if (filters.proType) {
        this.query.proTypesStr = filters.proType.join(',')
      }
      if (filters.subject) {
        this.query.subjectsStr = filters.subject.join(',')
      }
      if (filters.proStatus) {
        this.query.statusStr = filters.proStatus.join(',')
      }
      this.query.pageNum = 1
    }
  }
}
</script>
<style lang='scss' scoped>
.link {
  line-height: 25px;
}
.search {
  margin-bottom: 5px;
  .el-input {
    width: 150px;
    margin-right: 10px;
  }
}
</style> 
