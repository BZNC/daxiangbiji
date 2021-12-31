import request from '../helpers/request'
import { friendlyDate } from "@/helpers/util";

const URL = {
    GET: '/notebooks',
    ADD: 'notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET)
                .then(res => {
                    res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt)
                    res.data.forEach(notebook => {
                        notebook.createdAtFriendly = friendlyDate(notebook.createdAt)
                        notebook.updatedAtFriendly = friendlyDate(notebook.updatedAt)
                    });
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },

    updateNotebook(notebookId, { title = '' } = { title: '' }) {
        return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title })
    },

    deleteNotebook(noteBookId) {
        return request(URL.DELETE.replace(':id', noteBookId), 'DELETE')
    },

    addNotebook({ title = '' } = { title: '' }) {
        return new Promise((resolve, reject) => {
            request(URL.ADD, 'POST', { title })
                .then(res => {
                    res.data.CreatedAtfriendly = friendlyDate(res.data.createdAt)
                    res.data.updatedAtfriendly = friendlyDate(res.data.updatedAt)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    }
}