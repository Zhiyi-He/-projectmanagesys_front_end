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
    <el-table
      v-loading="listLoading"
      :data="reviewTable"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @filter-change="filterProjectTable"
    >
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="id" label="项目编号" sortable></el-table-column>
      <el-table-column prop="proType" label="项目类型" :filters="proTypeFilter" :column-key="'proType'"></el-table-column>
      <el-table-column prop="proName" width="150px" label="项目名称"></el-table-column>
      <el-table-column prop="subject" label="学科分类" :filters="subjectFilter" :column-key="'subject'"></el-table-column>
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
      <el-table-column prop="score" label="评审分数">
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.scores.filter(score => {
           return score.expert.id == query.userId
         })[0].score"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="score(scope.row)">评分</el-button>
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
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { updateProjects, getProjects } from '@/api/applicant'
import { getExpert, updateExperts } from '@/api/expert'
import { getScoresByProject, deleteScores } from '@/api/score'
import {
  PASSRPD,
  EXPERTREVIEW,
  PENDING,
  PASS,
  NOTPASS,
  EXPERT,
  PROTYPES,
  SUBJECTS
} from '@/variables'
export default {
  data() {
    return {
      proTypeFilter: PROTYPES,
      subjectFilter: SUBJECTS,
      appNameFilter: [],
      rpdNameFilter: [],
      rcdNameFilter: [],
      reviewTable: [],
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
        statusStr: EXPERTREVIEW,
        pageSize: 5,
        pageNum: 1,
        proName: '',
        isScore: true,
        proTypesStr: '',
        subjectsStr: '',
        appNamesStr: '',
        rpdNamesStr: '',
        rcdNamesStr: ''
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
      this.reviewTable = projects
      this.total = total
      // this.getScore(projects)
      this.setFilter(this.reviewTable)
      this.listLoading = false
    },
    async score(project) {
      if (!project.scores.some(item => item.score == 0)) {
        let totalScore = 0
        let experts = []
        for (const score of project.scores) {
          totalScore += score.score
          score.expert.proNum--
          experts = experts.concat(score.expert)
        }
        project.proStatus = PENDING
        project.score = totalScore / project.scores.length
        await deleteScores(project.scores)
        await updateExperts(experts)
        project.scores = []
        if (project.score > 60) {
          project.reviewResult = PASS
        } else {
          project.reviewResult = NOTPASS
        }
      } else {
        project.score = 0
      }
      await updateProjects([project])
      this.$message({
        type: 'success',
        message: '评分该项目成功！'
      })
      this.fetchData()
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
    async setQuery() {
      const { userVo } = await getUserInfo()
      this.query.userType = EXPERT
      this.query.userId = userVo.id
    },
    // getScore(projects) {
    //   for (const project of projects) {
    //     project.score = project.scores.filter(score => {
    //       return score.expert.id == this.query.userId
    //     })[0].score
    //   }
    // },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.query.pageNum = 1
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
    },
    filterProjectTable(filters) {
      if (filters.proType) {
        this.query.proTypesStr = filters.proType.join(',')
      }
      if (filters.subject) {
        this.query.subjectsStr = filters.subject.join(',')
      }
      if (filters.appName) {
        this.query.appNamesStr = filters.appName.join(',')
      }
      if (filters.rpdName) {
        this.query.rpdNamesStr = filters.rpdName.join(',')
      }
      if (filters.rcdName) {
        this.query.rcdNamesStr = filters.rcdName.join(',')
      }

      this.query.pageNum = 1
    }
  }
}
</script>
<style lang='scss' scoped>
.search {
  .el-input {
    width: 150px;
    margin-right: 10px;
  }
}
.link {
  line-height: 25px;
}
</style> 