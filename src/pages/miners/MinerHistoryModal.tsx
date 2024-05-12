import { Modal, Table } from "antd";
import { Miner, MiningEntity } from "../../api/types";
import CloseIcon from "../../components/CloseIcon";
import "./minerHistoryModal.scss";
import { ComponentProps, useMemo } from "react";
import { useGetMinerHistoryQuery } from "../../api";
import Loading from "../../components/Loading";
import { formatDate } from "../../utils/date";
import CapacityLabel from "../components/CapacityLabel";
interface IProps {
  miner: Miner;
}
function MinerHistoryModal(props: IProps & ComponentProps<typeof Modal>) {
  const { data, isLoading } = useGetMinerHistoryQuery(props.miner._id);

  const entries = useMemo(
    () => data?.map((item) => ({ ...item, key: item._id })) || [],
    [data]
  );
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: function (_: unknown, record: MiningEntity) {
        return <span>{formatDate(record.createdAt)}</span>;
      } as never,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Planet",
      dataIndex: "planet",
      key: "planet",
    },
    {
      title: "carryCapacity",
      dataIndex: "carryCapacity",
      key: "carryCapacity",
      render: function (_: unknown, record: MiningEntity) {
        return (
          <CapacityLabel
            current={record.capacity.current}
            max={record.capacity.max}
          />
        );
      } as never,
    },
    {
      title: "travelSpeed",
      dataIndex: "travelSpeed",
      key: "travelSpeed",
      render: function (_: unknown, record: MiningEntity) {
        return <span>{record.speed.travel}</span>;
      } as never,
    },
    {
      title: "miningSpeed",
      dataIndex: "miningSpeed",
      key: "miningSpeed",
      render: function (_: unknown, record: MiningEntity) {
        return <span>{record.speed.mining}</span>;
      } as never,
    },
    {
      title: "Position",
      dataIndex: "Position",
      key: "Position",
      render: function (_: unknown, record: MiningEntity) {
        return <span>{`${record.position.x},${record.position.y}`}</span>;
      } as never,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: function (_: unknown, record: MiningEntity) {
        return <span>{record.status}</span>; // TODO: map to some other texts
      } as never,
    },
  ];

  return (
    <Modal
      open
      title={
        <div className="miner-list-modal-title">
          History of {props.miner.name}
        </div>
      }
      className="miner-list-modal"
      closeIcon={<CloseIcon />}
      footer={false}
      centered
      width={1000}
      {...props}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          dataSource={entries}
          columns={columns}
          footer={undefined}
        ></Table>
      )}
    </Modal>
  );
}

export default MinerHistoryModal;
