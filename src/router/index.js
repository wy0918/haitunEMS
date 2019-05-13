import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/common/login'
import version from '@/components/admin/version.vue'
import archives from '@/components/admin/archives.vue'
import spareparts from '@/components/admin/spareparts.vue'
import repair from '@/components/admin/repair.vue'
import repairHistory from '@/components/admin/repairHistory.vue'
import lend from '@/components/admin/lend.vue'
import lendHistory from '@/components/admin/lendHistory.vue'
import user from '@/components/admin/user.vue'
import notice from '@/components/admin/notice.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Login, name: 'login' },
    {
      path: '/home',
      component: Home,
      redirect: '/home/archives',
      children: [
        { path: 'version', component: version, name: 'version' },
        { path: 'archives', component: archives, name: 'archives' },
        { path: 'spareparts', component: spareparts, name: 'spareparts' },
        { path: 'repair', component: repair, name: 'repair' },
        { path: 'repairHistory', component: repairHistory, name: 'repairHistory' },
        { path: 'lend', component: lend, name: 'lend' },
        { path: 'lendHistory', component: lendHistory, name: 'lendHistory' },
        { path: 'user', component: user, name: 'user' },
        { path: 'notice', component: notice, name: 'notice' },
      ]
    }
  ]
})
