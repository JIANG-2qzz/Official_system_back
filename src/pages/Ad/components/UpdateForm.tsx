import { Button, Form, Input, Modal , Select } from 'antd'
import React from 'react'
import { updateIns } from '@/services/institution';
import type { SelectProps } from 'antd';


export const UpdateForm = (props: any) => {
  const {
    updateModalVisible,
    handleUpdateModalVisible,
    onCancel,
    values,
    actionRef,
  } = props
  // const [options,setOptions] = useState([...values.institutionNameDown])
  console.log(props, "props")
  const options: SelectProps['options'] = [];
  const onFinish = async (values: any) => {
    console.log(values ,"提交数据")
    await updateIns(values)
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
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
          institutionName: `${values.institutionName}`,
          institutionCode: `${values.institutionCode}`,
        }}
      >
        <Form.Item label="机构类别" name="institutionName" getValueFromEvent={normFile}>
          <Input />
        </Form.Item>
        <Form.Item label="机构Code" name="institutionCode">
          <Input />
        </Form.Item>
        <Form.Item label="部门" name="institutionNameDown">
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            onChange={handleChange}
            options={options}
            defaultValue={values.institutionNameDown}
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

export default UpdateForm
