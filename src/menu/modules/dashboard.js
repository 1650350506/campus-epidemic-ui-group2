const pre = '/dashboard/'

export default {
  path: '/dashboard',
  title: 'Dashboard',
  header: 'home',
  custom: 'i-icon-demo i-icon-demo-dashboard',
  children: [
    {
      path: `${pre}organization`,
      title: '组织机构'
    }, {
      path: `${pre}monitor`,
      title: '监控页'
    },
    {
      path: `${pre}workplace`,
      title: '工作台'
    }
  ]
}
