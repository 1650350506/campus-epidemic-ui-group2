import BasicLayout from '@/layouts/basic-layout'

const meta = {
  auth: true
}

const pre = 'dashboard-'

export default {
  path: '/dashboard',
  name: 'dashboard',
  redirect: {
    name: `${pre}workplace`
  },
  component: BasicLayout,
  children: [
    {
      path: 'workplace',
      name: `${pre}workplace`,
      meta: {
        auth: false,
        title: '工作台'
      },
      component: () => import('@/pages/dashboard/workplace')
    }
  ]
}
