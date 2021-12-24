import request from '../helpers/request'
import { friendlyDate } from '@/helpers/util'

const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/notes/to/:notebookId',
    UPDATE: '/notes/:noteId',
    DELETE: '/notes/:noteId'
}

export default {
    getAll({ notebookId }) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookId', notebookId))
                .then(res => {
                    res.data = res.data.map(note => {
                        note.createdAtFriendly = friendlyDate(note.createdAt)
                        note.updatedAtFriendly = friendlyDate(note.createdAt)
                        return note
                    }).sort((note1, note2) => {
                        return note1.updatedAt < note2.updatedAt
                    })
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


    // 注意，此处要和后端约定好，
    // 用户传递了title就更新title，
    // 如果没传，用原来的。
    // content同理。
    updateNote({ noteId }, { title, content }) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', { title, content })
    },

    deleteNote({ noteId }) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },

    //   ADD: '/notes/to/:notebookId',
    addNote({ notebookId }, { title = '', content = '' } = { title: '', content: '' }) {
        // return request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
        return new Promise((resolve, reject) => {
            request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
                .then(res => {
                    res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
                    res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })

    }
    // Notes.addNote({notebookId:38},{title:'a',content:'b'}).then(res=>{console.log(res)})
}