<!--  -->
<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
      default: 0
    },
    pageSize: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pageSizes: [5, 10, 15, 20]
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.$emit('update:currentPage', this.currentPage)
      this.$emit('update:pageSize', this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('update:currentPage', this.currentPage)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>