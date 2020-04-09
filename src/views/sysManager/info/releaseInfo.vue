<template>
  <div class="app-container">
    <el-form
      label-position="left"
      ref="releaseInfo"
      :rules="rules"
      :model="releaseInfo"
      label-width="120px"
    >
      <el-row>
        <el-col :span="10" :offset="5">
          <el-form-item label="文件类别：" prop="fileType">
            <el-select v-model="releaseInfo.fileType" placeholder>
              <el-option
                v-for="item in fileType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="5">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="releaseInfo.title" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="5">
          <el-form-item label="文件：" prop="deptName">
            <el-upload
              ref="upload"
              :multiple="false"
              :limit="1"
              :on-exceed="handleExceed"
              :http-request="httpRequest"
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过10MB</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="7">
          <el-form-item style="align:center;">
            <el-button type="primary" @click="onSubmit(releaseInfo)">发布</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { filesUpload } from '@/api/files'
import router from '@/router'
export default {
  data() {
    const fileType = [
      { value: 0, label: '系统通知' },
      { value: 1, label: '使用手册' }
    ]
    return {
      rules: {
        title: [{ required: true, message: '请输入文件标题', trigger: 'blur' }]
      },
      fileType: fileType,
      releaseInfo: {
        fileType: 0,
        title: ''
      },
      fileList: []
    }
  },
  computed: {
    // 这里定义上传文件时携带的参数，即表单数据
    upData: function() {
      return this.releaseInfo
    }
  },
  methods: {
    //表单提交
    onSubmit(form) {
      this.$refs.releaseInfo.validate(valid => {
        if (valid) {
          //触发组件的action
          this.$refs.upload.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async httpRequest(param) {
      let fileObj = param.file // 相当于input里取得的files
      let fd = new FormData() // FormData 对象
      fd.append('files', fileObj) // 文件对象
      fd.append('fileType', this.releaseInfo.fileType)
      fd.append('title', this.releaseInfo.title)
      const { files } = await filesUpload(fd)
      this.resetForm('releaseInfo')
      this.fileList = []
      this.$message({
        message: '文件上传成功！',
        type: 'success'
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    }
  }
}
</script>

<style lang='scss' scoped>
.line {
  text-align: center;
}
</style>

