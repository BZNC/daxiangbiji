import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import NotebooksList from '@/components/NotebooksList'
import NoteDetail from '@/components/NoteDetail'
import TrashDetail from '@/components/TrashDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/notebooks',
      name: 'notebooks',
      component: NotebooksList
    },
    {
      path: '/note/:noteId',
      name: 'noteID',
      component: NoteDetail
    },
    {
      path: '/trash/:noteId',
      name: 'trash',
      component: TrashDetail
    }
  ]
})
