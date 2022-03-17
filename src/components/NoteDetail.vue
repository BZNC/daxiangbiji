<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>

    <div class="note-detail">
      <div class="note-empty" v-show="!curBook.id">请创建笔记本</div>
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期:{{curNote.createdAtFriendly}}</span>
          <span>更新日期:{{curNote.updatedAtFriendly}}</span>
          <span>{{statusText}}</span>
          <span class="iconfont icon-delete" @click="ondeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <!-- :class="isShowPreview?'icon-edit':''" -->

        <!-- note-title -->
        <div class="note-title">
          <input
            type="text"
            v-model:value="curNote.title"
            @input="onupdateNote"
            @keydown="statusText='正在输入...'"
            placeholder="input title"
          />
        </div>

        <hr />
        <!-- note-content -->
        <div class="editor">
          <textarea
            v-show="!isShowPreview"
            v-model:value="curNote.content"
            @input="onupdateNote"
            @keydown="statusText='正在输入...'"
            placeholder="输入内容，支持markdown语法"
          ></textarea>

          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "@/components/NoteSidebar.vue";
import _ from "lodash"; // debounce函数
import MarkdownIt from "markdown-it";
import { mapGetters, mapMutations, mapActions } from "vuex";

let md = new MarkdownIt();

export default {
  name: "NoteDetail",

  components: {
    NoteSidebar
  },

  data() {
    return {
      statusText: "未改动",
      isShowPreview: false
    };
  },

  created() {
    this.checkLogin();
  },

  // 实时监听data中数据,
  computed: {
    ...mapGetters(["notes", "curNote", "curBook"]),

    previewContent() {
      return md.render(this.curNote.content || "");
    }
  },

  methods: {
    ...mapMutations(["setCurNoteId"]),

    ...mapActions(["updateNote", "deleteNote", "checkLogin"]),

    onupdateNote: _.debounce(function() {
      if (!this.curNote.id) return;
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content
      })
        .then(data => {
          this.statusText = "已保存";
        })
        .catch(data => {
          this.statusText = "保存出错";
        });
    }, 1000),

    ondeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then(data => {
        this.$router.replace({ path: "/note" });
      });
    }
  },

  // curNote的更新是随着RouteUpdate来的
  beforeRouteUpdate(to, from, next) {
    this.setCurNoteId({ curNoteId: to.query.noteId });
    next();
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>