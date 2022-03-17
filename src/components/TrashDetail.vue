<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <div class="notebook-title">回收站</div>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>

      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{note.updatedAtFriendly}}</span>
            <span class="title">{{note.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span>创建日期:{{curTrashNote.createdAtFriendly}}</span>
        <span>|</span>
        <span>更新日期:{{curTrashNote.updatedAtFriendly}}</span>
        <span>|</span>

        <span>所属笔记本:{{belongTo}}</span>

        <a class="btn action" @click="onDelete">彻底删除</a>
        <a class="btn action" @click="onRevert">恢复</a>
      </div>

      <!-- note-title -->
      <div class="note-title">
        <span>{{curTrashNote.title}}</span>
      </div>

      <hr />

      <!-- note-content -->
      <div class="editor">
        <span>{{curTrashNote.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  date() {
    return {};
  },

  created() {
    this.checkLogin({ path: "/login" });
    this.getNotebooks();
    this.getTrashNotes().then(() => {
      this.setCurTrashNoteId({ curTrashNoteId: this.$route.query.noteId });
      this.$router.replace({
        path: "/trash",
        query: { noteId: this.curTrashNote.id }
      });
    });
  },

  computed: {
    ...mapGetters(["trashNotes", "curTrashNote", "belongTo"])
  },

  methods: {
    ...mapMutations(["setCurTrashNoteId"]),

    ...mapActions([
      "checkLogin",
      "deleteTrashNote",
      "revertTrashNote",
      "getTrashNotes",
      "getNotebooks"
    ]),

    onDelete() {
      this.$confirm("删除后将无法恢复", "确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteTrashNote({ noteId: this.curTrashNote.id }).then(() => {
          this.setCurTrashNoteId();
          this.$router.replace({
            path: "/trash",
            query: { noteId: this.curTrashNote.id }
          });
        });
      });
    },

    onRevert() {
      this.revertTrashNote({ noteId: this.curTrashNote.id }).then(() => {
        this.setCurTrashNoteId();
        this.$router.replace({
          path: "/trash",
          query: { noteId: this.curTrashNote.id }
        });
      });
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNoteId({ curTrashNoteId: to.query.noteId });
    next();
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;
    }
  }
}
</style>