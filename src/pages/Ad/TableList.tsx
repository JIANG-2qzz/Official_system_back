import { Button, Divider, Space, Tag , Select } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import React, { useRef, useState } from 'react'
import { insDelete , newInstitutionAll } from '@/services/institution' 
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'

import CreateForm from './components/CreateForm'
import UpdateForm from './components/UpdateForm'

export const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false)
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false)
  const [stepFormValues, setStepFormValues] = useState({})
  const actionRef = useRef<ActionType>()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [advUrl, setAdvUrl] = useState<string>('')

  const columns: ProColumns[] = [
    {
      title: '机构类别',
      dataIndex: 'institutionName',
    },
    {
      title: '机构Code',
      dataIndex: 'institutionCode',
    },
    {
      title: '部门',
      dataIndex: 'institutionNameDown',
      render: (_: any, record) => {
        // console.log(_, record, "_, record)")
        return (
          <Space size={[0, 8]} wrap>
            {
              _.map((e: any, index: any) => {
                return <Tag key={index}>{e}</Tag>
              })
            }
          </Space>
        )
      },
      renderFormItem: (_: any, record) => {
        return (
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
          // onChange={handleChange}
          // options={options}
          />
        )
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
            onClick={async () => {
              await insDelete(record._id)
              if (actionRef.current) {
                actionRef.current.reload()
              }
            }}
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
        title: '机构模块',
      }}
    >
      <ProTable
        actionRef={actionRef}
        rowKey="_id"
        search={false}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async () => {
          const result = await newInstitutionAll()
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
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        columns={columns}
        advUrl={advUrl}
        actionRef={actionRef}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onCancel={() => {
            handleUpdateModalVisible(false)
            setStepFormValues({})
          }}
          handleUpdateModalVisible={handleUpdateModalVisible}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
          actionRef={actionRef}
        />
      ) : null}
    </PageContainer>
  )
}
