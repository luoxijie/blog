import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Types from '../views/Types.vue'
import Search from '../views/Search.vue'
import Detail from '../views/Blog_detail.vue'
import Manager from '../views/Manager.vue'
import blog_management from '../views/manage_pages/blog_management.vue'
import tag_management from '../views/manage_pages/tag_management.vue'
import comment_management from '../views/manage_pages/comment_management.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/types',
    name: 'types',
    component: Types,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/manager',
    name: 'manager',
    component: Manager,
    children: [
      {
        path: '/blog_management',
        name: 'blog_management',
        component: blog_management,
      },
      {
        path: '/tag_management',
        name: 'tag_management',
        component: tag_management,
      },
      {
        path: '/comment_management',
        name: 'comment_management',
        component: comment_management,
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
