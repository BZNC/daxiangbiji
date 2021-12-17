<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="addNote">添加笔记</span>

    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{curBook.title}}
        <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="notebook in notebooks"
          :command="notebook.id"
          :key="notebook.id"
        >{{notebook.title}}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from "@/apis/notebook";
import Notes from "@/apis/notes";
import Bus from "@/helpers/bus";

export default {
  created() {
    // 组件创建阶段即请求获取所有的notebook
    // 存放在notebooks中
    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data;
        //设置一个表示当前被选中book的变量curBook
        // 表现为展示在下拉菜单项目中
        // 值为booklist列表组件跳转过来时点击的那个笔记本
        // 获取办法为查询route的query值 或 为 默认第一个 或为 空
        this.curBook =
          this.notebooks.find(
            notebook => notebook.id == this.$route.query.notebookId
          ) ||
          this.notebooks[0] ||
          {};
        // 根据bookID ，获取笔记本中的笔记列表，并将这一promis对象返回
        return Notes.getAll({ notebookId: this.curBook.id });
      })
      // 将获取到的数据存入notes变量中
      // 通过自定义事件的形式向父组件共享数据
      .then(res => {
        this.notes = res.data;
        this.$emit("update:notes", this.notes);
        Bus.$emit("update:notes", this.notes);
      });
  },

  data() {
    return {
      notebooks: [],
      curBook: {},
      notes: []
    };
  },

  methods: {
    handleCommand(notebookId) {
      if (notebookId == "trash") {
        return this.$router.push({ path: "/trash" });
      }
      this.curBook = this.notebooks.find(notebook => notebook.id == notebookId);
      Notes.getAll({ notebookId }).then(res => {
        this.notes = res.data;
        this.$emit("update:notes", this.notes);
      });
    },

    addNote() {
      Notes.addNote({ notebookId: this.curBook.id }).then(res => {
        console.log(res);
        this.notes.unshift(res.data);
      });
    }
  }
};
</script>


<style lang="less" >
@import url(../assets/css/note-sidebar.less);
</style>


