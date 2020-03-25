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
<<<<<<< HEAD
import { getUserInfo } from "@/api/user";
import { getProList } from "@/api/applicant";
=======
import { getUserInfo } from '@/api/user'
import { getProList } from '@/api/applicant'
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
<<<<<<< HEAD
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
=======
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
    }
  },
  data() {
    return {
      tableData: [],
      listLoading: true
<<<<<<< HEAD
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
=======
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserInfo().then(response => {
        const { userVo } = response
        getProList(userVo.id).then(response => {
          const { proList } = response

          this.tableData = proList
          for (var i = 0; i < proList.length; i++) {
            this.tableData[i].appName = proList[i].applicant.name
          }
          this.listLoading = false
        })
      })
      this.listLoading = false
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  }
}
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
</script>
