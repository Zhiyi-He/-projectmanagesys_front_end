<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="reviewTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @filter-change="filterProjectTable"
    >
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="project.id" label="项目编号" sortable></el-table-column>
      <el-table-column prop="project.proType" label="项目类型"></el-table-column>
      <el-table-column prop="project.proName" width="150px" label="项目名称"></el-table-column>
      <el-table-column prop="project.subject" label="学科分类"></el-table-column>
      <el-table-column
        prop="project.applicant.name"
        label="申报人"
        :filters="appNameFilter"
        :column-key="'appName'"
      ></el-table-column>
      <el-table-column
        prop="project.applicant.repDept.deptName"
        label="申报单位"
        :filters="rpdNameFilter"
        :column-key="'rpdName'"
      ></el-table-column>
      <el-table-column
        prop="project.applicant.repDept.recDept.deptName"
        label="推荐单位"
        :filters="rcdNameFilter"
        :column-key="'rcdName'"
      ></el-table-column>
      <el-table-column prop="score" label="评审分数"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220px">
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
      :total="reviewTable.length"
    ></el-pagination>

    <el-dialog title="项目详情" :visible.sync="dialogFormVisible" top="10px">
      <el-form
        label-position="left"
        ref="projectDetails"
        :model="projectDetails"
        label-width="120px"
      >
        <el-row>
          <el-col :span="22">
            <el-form-item label="项目编号：" prop="project.id">
              <el-input v-model="projectDetails.project.id" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="项目名称：" prop="project.proName">
              <el-input v-model="projectDetails.project.proName" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="项目类型：" prop="project.proType">
              <el-input v-model="projectDetails.project.proType" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="学科分类：" prop="project.subject">
              <el-input v-model="projectDetails.project.subject" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="项目经费：" prop="project.funds">
              <el-input v-model="projectDetails.project.funds" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="研究年限：" prop="project.time">
              <el-input v-model="projectDetails.project.time" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="申报人：" prop="project.applicant.name">
              <el-input v-model="projectDetails.project.applicant.name" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="申报单位：" prop="project.applicant.repDept.deptName">
              <el-input
                v-model="projectDetails.project.applicant.repDept.deptName"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="推荐单位：" prop="project.applicant.repDept.recDept.deptName">
              <el-input
                v-model="projectDetails.project.applicant.repDept.recDept.deptName"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="关键词：" prop="project.keywords">
              <el-input v-model="projectDetails.project.keywords" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="项目内容摘要" prop="project.desc">
              <el-input
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="projectDetails.project.desc"
                type="textarea"
                placeholder="300字以内"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="项目文件" prop="project.desc">
              <el-input
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="projectDetails.project.desc"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="评审分数" prop="score">
              <el-input v-model="projectDetails.score" :disabled="false"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible=false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
// import { getProjectsByStatus, updateProjects } from '@/api/applicant'
// import { getApplicants } from '@/api/repDept'
// import { getRepDepts, getRecDepts } from '@/api/recDept'
import { getExpert } from '@/api/expert'
import { updateScore } from '@/api/score'
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
      dialogFormVisible: false,
      projectDetails: {
        score: 0,
        project: {
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
      const { userVo } = await getUserInfo()
      const { userInfo } = await getExpert(userVo.id)
      for (const score of userInfo.scores) {
        this.setFilter([score.project])
        this.firstData = this.reviewTable = this.reviewTable.concat(score)
      }
      this.listLoading = false
    },
    resetTableData() {
      this.reviewTable = []
      this.appNameFilter = []
      this.rpdNameFilter = []
      this.dialogFormVisible = false
    },
    setFilter(projects) {
      for (const project of projects) {
        if (
          !this.appNameFilter.some(item => item.value == project.applicant.name)
        ) {
          this.appNameFilter.push({
            text: project.applicant.name,
            value: project.applicant.name
          })
        }
        if (
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
