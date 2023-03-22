import { Divider } from 'antd'
import React, { useEffect, useState ,useRef} from 'react'
import type { ProColumns } from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { reqAllUser } from '@/services/user'
import { UpdateForm } from './UpdateForm'
import { reqOrgName2 } from '@/services/organizations'
export const TableList = () => {
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false)
  const [stepFormValues, setStepFormValues] = useState({})
  const [orgData,setOrgData] = useState()
  const actionRef = useRef()
  console.log(orgData,"orgData")
  async function Init(){
    const result = await reqOrgName2()
    setOrgData(result)
  }
  useEffect(()=>{
    Init()
  },[])
  const columns: ProColumns[] = [
    {
      title: '名字',
      dataIndex: 'username',
    },
    {
      title: '机构标识',
      dataIndex: 'institutionCode',
    },
    {
      title: '机构',
      dataIndex: 'institutionNameDown',
    },
    {
      title: '权限',
      dataIndex: 'permission',
      render:(_,record,index)=>{      
        return <span>
          {
            orgData.data.map((element:any)=>{
              if(element._id === record.permission){
                return element.organizationName
              }
            })
          }
        </span>
      }
    },
    {
      title: '操作',
      // dataIndex: 'institutionCode',
      valueType: 'option',
      width: 100,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true)
              setStepFormValues(record)
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
          // onClick={async () => {
          //   await insDelete(record._id)
          //   if (actionRef.current) {
          //     actionRef.current.reload()
          //   }
          // }}
          >
            删除
          </a>
        </>
      ),
    },
  ]

  return (
    <PageContainer
      header={{
        title: '人员模块',
      }}
    >
      <ProTable
        // actionRef={actionRef}
        rowKey="_id"
        search={false}
        request={async () => {
          const result = await reqAllUser()
          console.log(result, "result")
          if (!result) {
            return {
              data: [],
              success: true,
            }
          }
          return {
            data: result.data || [],
            success: true,
          }
        }}
        columns={columns}
        actionRef={actionRef}
      />
      {
        updateModalVisible ?
          <UpdateForm
            updateModalVisible
            onCancel={() => { handleUpdateModalVisible(false) }}
            values={stepFormValues}
            actionRef={actionRef}
            handleUpdateModalVisible={handleUpdateModalVisible}
          /> : null
      }
    </PageContainer>
  )
}