import { request } from '@umijs/max'

interface objProps {
  value: string
  label: string
  children: any
}

interface InsProps {
  institutionCode: string
  institutionName: string
  institutionNameDown: string[]
}

export async function institutionAll() {
  const institutionsAll = await request(`/institution/all`, {
    method: 'GET',
  })
  //   console.log(institutionsAll,"institutionsAll")
  const arr: any = []
  institutionsAll.data.forEach((element: any, index: any) => {
    const obj: objProps = {
      value: '',
      label: '',
      children: [],
    }
    obj.value = element.institutionCode
    obj.label = element.institutionName
    element.institutionNameDown.forEach((element: any) => {
      obj.children.push({ value: element, label: element })
    })

    arr.push(obj)
  })

  //   console.log(arr, 'newArr')
  return arr
}

export async function newInstitutionAll() {
  const institutionsAll = await request(`/institution/all`, {
    method: 'GET',
  })

  return institutionsAll
}

export async function  updateIns(body:InsProps) {
   await request(`/institution`, {
    method: 'POST',
    data: body
  })
}

export async function  addIns(body:InsProps) {
  await request(`/institution/add`, {
   method: 'POST',
   data: body
 })
}

export function insDelete(id: string) {
  return request(`/institution/${id}`, {
    method: 'DELETE',
  })
}