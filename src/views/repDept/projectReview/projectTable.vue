<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="projectTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @filter-change="filterProjectTable"
    >
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="id" label="项目编号" sortable></el-table-column>
      <el-table-column prop="proType" label="项目类型"></el-table-column>
      <el-table-column prop="proName" width="150px" label="项目名称"></el-table-column>
      <el-table-column prop="subject" label="学科分类"></el-table-column>
      <el-table-column prop="funds" width="150px" label="项目经费（元）" sortable></el-table-column>
      <el-table-column prop="time" width="150px" label="研究年限（年）" sortable></el-table-column>
      <el-table-column
        prop="applicant.name"
        label="申报人"
        :filters="appNameFilter"
        :column-key="'appName'"
      ></el-table-column>
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
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="projectTable.length"
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
import { getProjectsByStatus } from '@/api/applicant'
import { getApplicants } from '@/api/repDept'
import {
  NOTPASS,
  FIRSTREVIEW,
  SECONDREVIEW,
  PASS,
  DOWNLOADURL
} from '@/variables'
export default {
  data() {
    const statusList = [NOTPASS, FIRSTREVIEW, SECONDREVIEW, PASS]
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
      appNameFilter: [],
      projectTable: [],
      firstData: [],
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
        files: []
      },
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
      const { userVo } = await getUserInfo()
      let { projects } = await getProjectsByStatus([FIRSTREVIEW])
      projects = projects.filter(project => {
        return project.applicant.repDept.id == userVo.id
      })
      this.firstData = this.projectTable = this.projectTable.concat(projects)
      this.setFilter(this.firstData)
      this.listLoading = false
    },
    downloadFile(path) {
      window.location.href = DOWNLOADURL + path
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
    formatStatus(row, column) {
      return this.statusFilter.filter(status => {
        return status.value == row.proStatus
      })[0].text
    },
    filterAppName(value, row) {
      return row.applicant.name == value
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    filterProjectTable(filters) {
      this.projectTable = this.firstData

      if (filters.appName && filters.appName.length != 0) {
        this.projectTable = this.projectTable.filter(project => {
          return filters.appName.indexOf(project.applicant.name) != -1
        })
      }
      if (filters.proStatus && filters.proStatus.length != 0) {
        this.projectTable = this.projectTable.filter(project => {
          return filters.proStatus.indexOf(project.proStatus) != -1
        })
      }
      this.currentPage = 1
    }
  }
}
</script>
<style lang='scss' scoped>
.link {
  line-height: 25px;
}
</style> 
