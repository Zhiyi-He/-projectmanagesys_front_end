<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      height="900"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="proType" label="项目类别"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
      <el-table-column prop="subject" label="学科分类"></el-table-column>
      <el-table-column prop="unitDept" label="单位科室"></el-table-column>
      <el-table-column prop="funds" label="项目经费"></el-table-column>
      <el-table-column prop="appName" label="申报人"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { getProList } from "@/api/applicant";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableData: [],
      listLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getUserInfo().then(response => {
        const { user } = response;
        getProList(user.id).then(response => {
          const { proList } = response;

          this.tableData = proList;
          for (var i = 0; i < proList.length; i++) {
            this.tableData[i].appName = proList[i].applicant.name;
          }
          this.listLoading = false;
        });
      });
      this.listLoading = false;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  }
};
</script>
