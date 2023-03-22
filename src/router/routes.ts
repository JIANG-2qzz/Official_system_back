import { RoutePath } from './name'
export default [
  {
    name: 'login',
    path: RoutePath.LOGIN,
    layout: false,
    component: './Login',
  },
  {
    path: '/posts',
    name: '编写',
    icon: 'EditOutlined',
    routes: [
      {
        path: RoutePath.POSTS_VIEW,
        name: '管理1',
        component: './Posts/view',
      },
      {
        path: RoutePath.POSTS_EDIT,
        name: '编写',
        icon: 'EditOutlined',
        component: './Posts/edit',
      },
      {
        path: RoutePath.POSTS_CATEGORY,
        name: '分类',
        access: 'canAdmin',
        component: './Posts/category',
      },
    ],
  },
  {
    path: RoutePath.AD,
    name: '机构',
    access: 'canAdmin',
    icon: 'NotificationOutlined',
    component: './Ad',
  },
  {
    path: RoutePath.CONFIG,
    name: '网站配置',
    access: 'canAdmin',
    icon: 'ToolOutlined',
    component: './Config',
  },
  {
    path: RoutePath.PERSON,
    name: '人员',
    access: 'canAdmin',
    component: './Person',
  },
  {
    path: '/',
    redirect: RoutePath.CONFIG,
  },
]
