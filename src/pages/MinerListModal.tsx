import { Modal, Table } from "antd"
import { ComponentProps, useMemo } from "react"
import { useGetPlanetMiners } from "../api"
import Loading from "../components/Loading"
import { EMinerStatus, Miner, Planet } from "../api/types"
import CloseIcon from "../components/CloseIcon"
import "./minerListModal.scss"


interface IProps   {
    planet: Planet
}
function MinerListModal(props: IProps & Omit<ComponentProps<typeof Modal>, "title"> ) {
    const {isLoading, data} = useGetPlanetMiners(props?.planet?._id)
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
  return (
    <Modal title={<div className="miner-list-modal-title" >
        List of miners of {props.planet.name}
    </div>}
    className="miner-list-modal" closeIcon={ <CloseIcon />} footer={false} centered width={700} {...props}>
   
   {isLoading ? <Loading /> : <Table dataSource={miners} columns={columns} pagination={false} footer={undefined} ></Table>}
  </Modal>
  )
}


export default MinerListModal