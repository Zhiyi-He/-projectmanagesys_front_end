<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="reviewTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
          <el-button type="text" size="small">评分</el-button>
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
      :total="reviewTable.length"
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
            <el-form-item label="关键词：" prop="keywords">
              <el-input v-model="projectDetails.keywords" />
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
        <el-button type="primary" @click="pass([projectDetails])">通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectsByStatus, updateProjects } from '@/api/applicant'
import { getApplicants } from '@/api/repDept'
import { getRepDepts, getRecDepts } from '@/api/recDept'
import { PASSRPD, EXPERTREVIEW } from '@/variables'
export default {
  data() {
    return {
      appNameFilter: [],
      rpdNameFilter: [],
      rcdNameFilter: [],
      reviewTable: [],
      firstData: [],
      listLoading: true,
      multipleSelection: [],
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
      this.resetTableData()
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
                status: [EXPERTREVIEW]
              })
              this.firstData = this.reviewTable = this.reviewTable.concat(
                projects
              )
            }
          }
        }
      }
      this.listLoading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetTableData() {
      this.reviewTable = []
      this.appNameFilter = []
      this.rpdNameFilter = []
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    filterProjectTable(filters) {
      this.reviewTable = this.firstData

      if (filters.appName && filters.appName.length != 0) {
        this.reviewTable = this.reviewTable.filter(project => {
          return filters.appName.indexOf(project.applicant.name) != -1
        })
      }
      if (filters.rpdName && filters.rpdName.length != 0) {
        this.reviewTable = this.reviewTable.filter(project => {
          return (
            filters.rpdName.indexOf(project.applicant.repDept.deptName) != -1
          )
        })
      }
      if (filters.rcdName && filters.rcdName.length != 0) {
        this.reviewTable = this.reviewTable.filter(project => {
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
