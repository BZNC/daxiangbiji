import Note from '@/apis/notes.js'
import { ColorPicker, Message } from 'element-ui'

const state = {
    notes: null,
    curNoteId: null
}

const getters = {
    //用于访问笔记的数据
    notes: state => state.notes || [],

    curNote: state => {
        if (!Array.isArray(state.notes)) return { title: '', content: '' }
        if (!state.curNoteId) return state.notes[0] || { title: '', content: '' }
        return state.notes.find(note => note.id == state.curNoteId) || { title: '', content: '' }
    }
}

const mutations = {
    //存入所有笔记
    setNotes(state, payload) {
        state.notes = payload.notes
        // console.log(state.notebooks)
    },

    //添加新笔记
    addNote(state, payload) {
        payload.note.createdAtFriendly = '刚刚'
        state.notes.unshift(payload.note)
    },

    //更新笔记
    updateNote(state, payload) {
        let note = state.notes.find(note => note.id == payload.noteId) || {}
        note.title = payload.title
        note.content = payload.content
    },

    //删除笔记
    deleteNote(state, payload) {
        state.notes = state.notes.filter(note => note.id != payload.noteId)
    },

    setCurNoteId(state, payload = {}) {
        state.curNoteId = payload.curNoteId
    }

}

//异步操作，与服务器交互，同时可以调用mutations中的方法，改动服务器的同时也改变本地
const actions = {
    getNotes({ commit }, { notebookId }) {
        return Note.getAll({ notebookId })
            .then(res => {
                commit('setNotes', { notes: res.data })
            })
    },

    addNote({ commit }, { notebookId, title, content }) {
        return Note.addNote({ notebookId }, { title, content })
            .then(res => {
                console.log(res.data)
                commit('addNote', { note: res.data })
                Message.success(res.msg)
            })
    },

    updateNote({ commit }, { noteId, title, content }) {
        return Note.updateNote({ noteId }, { title, content })
            .then(res => {
                commit('updateNote', { noteId, title, content })
                Message.success(res.msg)
            })
    },

    deleteNote({ commit }, { noteId }) {
        return Note.deleteNote({ noteId })
            .then(res => {
                commit('deleteNote', { noteId })
                Message.success(res.msg)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}