<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" class="steps">
      <el-step title="项目基本信息" icon="el-icon-edit"></el-step>
      <el-step title="项目内容" icon="el-icon-view"></el-step>
      <el-step title="文件上传" icon="el-icon-upload"></el-step>
      <el-step title="项目申报" icon="el-icon-finished"></el-step>
    </el-steps>
    <el-divider content-position="left">项目资料</el-divider>
    <el-upload
      ref="upload"
      action="#"
      :http-request="uploadFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :auto-upload="false"
      multiple
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload()">上传文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传doc/pdf/excel/ppt文件，且不超过10MB</div>
    </el-upload>
  </div>
</template>

<script>
import { filesUpload } from "@/api/files";
import router from "@/router";
import { BASEURL } from "@/variables";
export default {
  data() {
    return {
      active: 2,
      fileData: {},
      fileList: []
    };
  },
  methods: {
    submitUpload() {
      this.fileData = new FormData();
      this.$refs.upload.submit();
      filesUpload(this.fileData).then(response => {
        this.fileList.push({ name: "开题答辩.ppt", url: "" });
        this.$message({
          message: "文件上传成功！",
          type: "success"
        });
      });
    },
    uploadFile(item) {
      this.fileData.append("file", item.file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  created() {}
};
</script>

<style lang='scss' scoped>
.line {
  text-align: center;
}
.el-divider {
  margin-top: 2px;
  .el-divider__text {
    font-size: 18px;
  }
}
.steps {
  margin-bottom: 10px;
}
</style>

