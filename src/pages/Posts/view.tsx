import { Button, Popconfirm, Table, Tag } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { message } from 'react-message-popup'
import { ContentLayout } from '@/components/layouts/content'
import { postDeleteRequest, postListRequest } from '@/services/post'
import type { IPaginate, IPostList } from '@/types/api/post'
import { relativeTimeFromNow } from '@/utils/time'
import { Link, useNavigate, useModel } from '@umijs/max'
import { statusFun } from '@/utils/status'

const View = () => {
  const nav = useNavigate()
  const [data, setData] = useState<IPostList[]>()
  const [page, setPage] = useState<IPaginate>({
    pageCurrent: 1,
    pageSize: 10,
  })
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const { initialState, setInitialState } = useModel('@@initialState')
 
  const fetchData = async () => {
    const userInfo:any = await initialState?.fetchUserInfo?.()
    console.log(userInfo, "???????")
    setLoading(true)
    const list = await postListRequest({
      pageCurrent: page.pageCurrent,
      pageSize: page.pageSize,
      permission: userInfo.permission,
      institutionCode : userInfo.institutionCode
    })
    console.log(list ," datalistlistlist")
    setTotalCount(list.totalCount)
    setData(list.postList)
    setLoading(false)
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage({
      pageCurrent: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    })
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const columns: ColumnsType<IPostList> = [
    {
      title: '公文标题',
      dataIndex: 'title',
      width: 400,
      render: (text, { _id }) => (
        <Link to={`/posts/edit?id=${_id}`}>{text}</Link>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 100,
      render: (_, { category }) => <span>{category?.name || '暂无'}</span>,
    },
    {
      title: '发起者',
      dataIndex: 'user',
      width: 100,
      render: (_, { user }) => <span>{user?.username || '暂无'}</span>,
    },
    {
      title: '标签',
      key: 'GWstatus',
      width: 200,
      dataIndex: 'GWstatus',
      render: (_, { GWstatus }) => {
        console.log(GWstatus , "status")
        return <>
        {
          <Tag color={statusFun(GWstatus)?.color}>
          {statusFun(GWstatus)?.name}
        </Tag>
        }
      </>
      },
    },
    {
      title: '机构',
      dataIndex: 'institutionNameDown',
      width: 80,
      render: (_, { institutionNameDown }) => {
        return <span>{institutionNameDown}</span>
      },
    },
    {
      title: '阅读量',
      dataIndex: 'read',
      width: 80,
      render: (_, { read }) => <span>{read || 0}</span>,
    },
    {
      title: '创建于',
      width: 100,
      dataIndex: 'created',
      render: (created) => <span>{relativeTimeFromNow(created)}</span>,
    },
    {
      title: '修改于',
      width: 100,
      dataIndex: 'updatedAt',
      render: (updatedAt) => <span>{relativeTimeFromNow(updatedAt)}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      render: (_, { title, _id }) => (
        <Popconfirm
          title={`确认删除 ${title} 吗`}
          onConfirm={async () => {
            await postDeleteRequest(_id)
            message.success('删除成功')
            fetchData()
          }}
        >
          <a>删除</a>
        </Popconfirm>
      ),
    },
  ]

  return (
    <ContentLayout
      actionsElement={
        <Button type="primary" onClick={() => nav('/posts/edit')}>
          编写
        </Button>
      }
    >
      <Table
        pagination={{
          current: page.pageCurrent,
          pageSize: page.pageSize,
          total: totalCount,
        }}
        loading={loading}
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        rowKey={({ _id }) => _id || 'uid'}
      />
    </ContentLayout>
  )
}

export default View
