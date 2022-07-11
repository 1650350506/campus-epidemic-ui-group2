// 菜单，顶栏
// import { listSortBySeq } from '@/api/setup/headerMenu';

export default [
    {
        path: '/index',
        title: '首页',
        icon: 'md-home',
        hideSider: false,
        name: 'home'
    },
    {
        path: '/log',
        title: '日志',
        icon: 'md-locate',
        hideSider: true,
        name: 'system'
    }
];
// const headerMenuList = []

// listSortBySeq()
//     .then(rst => {
//         console.log(rst)
//         rst.forEach(function (item) {
//             const headerMenu = {
//                 id: item.id,
//                 title: item.cname,
//                 custom: item.ico,
//                 hideSider: true,
//                 name: item.ename
//             }
//             headerMenuList.push(headerMenu)
//         })
//     })

// export default headerMenuList
