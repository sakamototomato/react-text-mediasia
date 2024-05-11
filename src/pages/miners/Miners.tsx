import React, { ComponentProps, useMemo } from 'react'
import { useGetMiners } from '../../api'
import { EMinerStatus, Miner } from '../../api/types'
import { Table } from 'antd'
import Loading from '../../components/Loading'

function Miners() {
    const {data,isLoading} = useGetMiners()
    const miners = useMemo(() => data?.map(item => ({...item, key: item?._id})), [data])
    const minerStatusMap = EMinerStatus as Record<number,string>
    const columns: ComponentProps<typeof Table>["columns"] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'carryCapacity',
          dataIndex: 'carryCapacity',
          key: 'carryCapacity',
        },
        {
          title: 'travelSpeed',
          dataIndex: 'travelSpeed',
          key: 'travelSpeed',
        },
        {
          title: 'miningSpeed',
          dataIndex: 'miningSpeed',
          key: 'miningSpeed',
        },
        {
          title: 'Position',
          render: function(_: unknown, record: Miner, ) {
              return <span>{`${Math.floor(record.x)},${Math.floor(record.y)}` }</span>
          } as never
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: function(val){
              return <span >{minerStatusMap[val]}</span>
          }
        },
      ];

   return <>
   {isLoading ? <Loading /> : <Table dataSource={miners} columns={columns} pagination={false} footer={undefined} ></Table>}
   </>
    
}

export default Miners
