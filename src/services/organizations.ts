import { request,useModel } from '@umijs/max'
import { flushSync } from 'react-dom'
export async function backOrganization(id:string){
    const orgAll = await request(`/organization/all`, {
        method: 'GET',
      })
      console.log(orgAll)
      let result
      orgAll.data.map((e:any,index:any)=>{
        // console.log(id , e._id, 'index') 
        if(id === e._id){
            if(index > 0){
                // console.log(orgAll.data[index-1]._id, "orgAll[index-1]")
                result = orgAll.data[index-1]._id
            }
        }
      })
      return result
}

export async function UpOrganization(id:string) {
    const orgAll = await request(`/organization/all`, {
        method: 'GET',
      })
      
      let result
      orgAll.data.map((e:any,index:any)=>{
        if(id === e._id){
            if(index === 3){
              result = orgAll.data[0]._id
            }
            if(index < 3){
              console.log('没进来吗')
                result = orgAll.data[index+1]._id
            }
        }
      })
      return result
}

export function reqOrgName1(){
  async function reqOrgName(){
    const { initialState,setInitialState} :any = useModel('@@initialState')
    const demo = await request(`/organization/${initialState?.currentUser.permission}`, {
      method: 'GET',
    })
  
    flushSync(() => {
      setInitialState((s:any) => ({
        ...s,
        demo,
      }))
    })  
  }
  reqOrgName()
}


export async function reqOrgName2(){
  return await request(`/organization/all`, {
    method: 'GET',
  })
}