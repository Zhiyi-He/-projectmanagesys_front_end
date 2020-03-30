<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      ref="projectTable"
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
              <el-input v-model="projectDetails.id" :disabled="true" />
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
            <el-form-item label="项目内容摘要" prop="desc">
              <el-input v-model="projectDetails.desc" type="textarea" placeholder="300字以内" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="项目文件" prop="desc">
              <el-input v-model="projectDetails.desc" />
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
import { getProjectsByStatus } from '@/api/applicant'
import { getApplicants } from '@/api/repDept'
import { getRecDepts, getRepDepts } from '@/api/recDept'
import {
  NOTPASS,
  THREEREVIEW,
  EXPERTASSIGN,
  EXPERTREVIEW,
  PASS,
  PASSRPD
} from '@/variables'
export default {
  data() {
    const statusList = [NOTPASS, THREEREVIEW, EXPERTASSIGN, EXPERTREVIEW, PASS]
    const statusFilter = [
      { text: '未通过', value: 1 },
      { text: '打回修改', value: 2 },
      { text: '初级审核中', value: 3 },
      { text: '二级审核中', value: 4 },
      { text: '三级审核中', value: 5 },
      { text: '待分配专家', value: 6 },
      { text: '专家评审', value: 7 },
      { text: '已通过', value: 8 }
    ].filter(status => {
      return statusList.indexOf(status.value) != -1
    })
    return {
      statusList: statusList,
      statusFilter: statusFilter,
      appNameFilter: [],
      rpdNameFilter: [],
      rcdNameFilter: [],
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
      const { recDepts } = await getRecDepts()
      for (const recDept of recDepts) {
        this.rcdNameFilter.push({
          text: recDept.deptName,
          value: recDept.deptName
        })
        const { repDepts } = await getRepDepts(recDept.id)
        for (const repDept of repDepts) {
          if (repDept.rpdStatus == PASSRPD) {
            this.rpdNameFilter.push({
              text: repDept.deptName,
              value: repDept.deptName
            })
            const { applicants } = await getApplicants(repDept.id)
            for (const applicant of applicants) {
              this.appNameFilter.push({
                text: applicant.name,
                value: applicant.name
              })
              const { projects } = await getProjectsByStatus({
                applicant: applicant,
                status: this.statusList
              })
              this.firstData = this.projectTable = this.projectTable.concat(
                projects
              )
            }
          }
        }
      }
      this.listLoading = false
    },
    formatStatus(row, column) {
      return this.statusFilter.filter(status => {
        return status.value == row.proStatus
      })[0].text
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
      if (filters.rpdName && filters.rpdName.length != 0) {
        this.projectTable = this.projectTable.filter(project => {
          return (
            filters.rpdName.indexOf(project.applicant.repDept.deptName) != -1
          )
        })
      }
      if (filters.rcdName && filters.rcdName.length != 0) {
        this.projectTable = this.projectTable.filter(project => {
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
