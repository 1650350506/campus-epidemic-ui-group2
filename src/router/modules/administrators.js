const meta = {
  auth: true
}
export default {
  path: '/journey',
  name: 'dashboard',
  children: [
    {
      path: '/journey/local',
      name: '',
      component: () => import('@/pages/administrators/journey/local')
    },
    {
      path: '/journey/cross',
      name: '',
      component: () => import('@/pages/administrators/journey/cross')
    }
  ]
}
