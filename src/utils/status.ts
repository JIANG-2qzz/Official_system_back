

export function statusFun(status:string){
    if(status == 'check'){
        return {
            name: '审核中',
            color : 'processing'
        }
    }
    if(status == 'error'){
        return {
            name: '退回',
            color : 'error'
        }
    }
    if(status == 'success'){
        return {
            name: '审核完成',
            color : 'success'
        }
    }
}