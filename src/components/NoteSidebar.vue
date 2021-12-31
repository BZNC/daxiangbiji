<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>

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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  created() {
    this.getNotebooks()
      .then(() => {
        //根据路由地址确定curBookId
        this.setCurBookId({ curBookId: this.$route.query.notebookId });
        //根据curBookId确定当前的notes
        if (this.curBook.id) this.getNotes({ notebookId: this.curBook.id });
      })
      .then(() => {
        this.setCurNoteId({ curNoteId: this.$route.query.noteId });
        this.$router.replace({
          path: "/note",
          query: {
            noteId: this.curNote.id,
            notebookId: this.curBook.id
          }
        });
      });
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["notebooks", "notes", "curBook", "curNote"])
  },

  methods: {
    ...mapMutations(["setCurBookId", "setCurNoteId"]),

    ...mapActions(["getNotebooks", "getNotes", "addNote"]),

    handleCommand(notebookId) {
      if (notebookId == "trash") {
        return this.$router.push({ path: "/trash" });
      }
      this.setCurBookId({ curBookId: notebookId });
      this.getNotes({ notebookId: this.curBook.id }).then(() => {
        this.setCurNote();
        this.$router.replace({
          path: "/note",
          query: {
            noteId: this.curNote.id,
            notebookId: this.curBook.id
          }
        });
      });
    },

    onAddNote() {
      this.addNote({ notebookId: this.curBook.id });
    }
  }
};
</script>

<style lang="less" >
@import url(../assets/css/note-sidebar.less);
</style>