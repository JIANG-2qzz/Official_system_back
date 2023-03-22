import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { reqOrgName1 } from '@/services/organizations'
import { useRouteData ,useModel} from '@umijs/max'

interface ContentLayoutProps extends PropsWithChildren {
  actionsElement?: ReactNode
}


export const ContentLayout: FC<ContentLayoutProps> = ({
  children,
  actionsElement,
}) => {
  const route = useRouteData() as any
  reqOrgName1()
  let [title ,setTitle] = useState()
  const { initialState,setInitialState} :any = useModel('@@initialState')
console.log(initialState, '!!!!')
   
   
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex justify-between">
        <h1 className="text-2xl">{initialState.demo ? `${initialState.demo.organizationName}-${route.route.name}` : ''}</h1>
        {actionsElement}
      </div>
      {children}
    </div>
  )
}
