import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { institutionAll } from '@/services/institution'
import { reqOrgName2 } from '@/services/organizations'
import { newData } from '@/services/user'
// import { updateIns } from '@/services/institution';
// import type { SelectProps } from 'antd';

export const UpdateForm = (props: any) => {
  const {
    updateModalVisible,
    handleUpdateModalVisible,
    onCancel,
    values,
    actionRef,
  } = props
  const [options, setOptions] = useState<any>()
  const [optionsm, setOptionsm] = useState<any>()
  const [options2, setOptions2] = useState<any>()
  const [defoptions2, setdefOptions2] = useState<any>()
  console.log(defoptions2,"defoptions2")
  console.log(values,"values")
  async function initfunction() {
    const result = await institutionAll()
    const reqData = await reqOrgName2()
    const arr: any = []
    const arrm:any = []
    console.log(result,"result")
    result.forEach((element: any) => {  
      arrm.push({value:element.value,label:element.value})
      if (element.value === values.institutionCode) {
        const arr: any = []
        element.children.forEach((e: any) => {
          arr.push(e)
        })
        setOptions(arr)
      }
      console.log(arrm,"arrm")
    });
     
    reqData.data.forEach((element: any) => {
      if(element._id === values.permission){
        setdefOptions2(element.organizationName)
      }
      arr.push({value:element._id , label:element.organizationName})
    });
    setOptionsm([...arrm])
    setOptions2(arr)
  }
  useEffect(() => {
    initfunction()
  }, [])

  const handleChange=async (value:any)=>{
    const result = await institutionAll();
    console.log(result,"result")
    
    result.forEach((element: any) => {  
      if(value === element.value){
        const arr:any = []
        element.children.forEach((element:any) => {
          arr.push(element)
        });
        setOptions(arr)
      }
    });
  }
  const onFinish = (value:any) => {
    console.log(value,"value")
    newData({
      ...value,
    },values._id )
    handleUpdateModalVisible(false)
    if (actionRef.current) {
      actionRef.current.reload()
    }
  }
  const normFile = (e: any) => {
    const result = e.file.response
    if (result) {
      return result.data
    }
  }
  return (
    <Modal
      destroyOnClose
      title="修改"
      width={420}
      open={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        onFinish={onFinish}
        initialValues={{
          username: `${values.username}`,
          institutionName: `${values.institutionName}`,
          institutionCode: `${values.institutionCode}`,
          institutionNameDown:`${values.institutionNameDown}`
        }}
      >
        <Form.Item label="名字" name="username" getValueFromEvent={normFile}>
          <Input />
        </Form.Item>
        <Form.Item label="机构标识" name="institutionCode">
          <Select
            // mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            onChange={handleChange}
            options={optionsm}
            // defaultValue={values.institutionNameDown}
          />
        </Form.Item>
        <Form.Item label="机构" name="institutionNameDown">
          <Select
            // mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            // onChange={handleChange}
            options={options}
            // defaultValue={values.institutionNameDown}
          />
        </Form.Item>
        <Form.Item label="权限" name="permission">
        <Select
            // mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            // onChange={handleChange}
            options={options2}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}