<template>
  <div class="app-container">
    <el-button
      @click="multipleSelection.length==0?multipleSelectionTip():pass(multipleSelection)"
      icon="el-icon-check"
      type="primary"
      plain
    >批量通过</el-button>
    <el-button
      @click="multipleSelection.length==0?multipleSelectionTip():backModify(multipleSelection)"
      icon="el-icon-edit"
      type="warning"
      plain
    >批量打回修改</el-button>
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
          <el-button @click="notPass([scope.row])" type="text" size="small">不通过</el-button>
          <el-button @click="backModify([scope.row])" type="text" size="small">打回修改</el-button>
          <el-button @click="pass([scope.row])" type="text" size="small">通过</el-button>
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
        <el-button type="primary" @click="pass([projectDetails])">通过</el-button>
        <el-button type="warning" @click="backModify([projectDetails])">打回修改</el-button>
        <el-button type="danger" @click="notPass([projectDetails])">不通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectsByStatus, updateProjects } from '@/api/applicant'
import {
  PASSRPD,
  NOTPASS,
  BACKMODIFY,
  THREEREVIEW,
  EXPERTASSIGN
} from '@/variables'
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
      const { projects } = await getProjectsByStatus([THREEREVIEW])
      this.firstData = this.reviewTable = projects
      this.setFilter(this.firstData)
      this.listLoading = false
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
        project.proStatus = EXPERTASSIGN
      })
      this.review(projects, '是否要通过该项目', '通过该项目成功！')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    multipleSelectionTip() {
      this.$message({
        message: '请选择项目',
        type: 'warning'
      })
    },
    resetTableData() {
      this.reviewTable = []
      this.appNameFilter = []
      this.rpdNameFilter = []
      this.rcdNameFilter = []
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
<style lang='scss' scoped>
.link {
  line-height: 25px;
}
</style> 