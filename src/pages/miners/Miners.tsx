import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EMinerStatus, Miner } from "../../api/space/types";
import { Table } from "antd";
import Loading from "../../components/Loading";
import MinerHistoryModal from "./MinerHistoryModal";
import { useGetMinersQuery } from "../../api/space";
import { useGetPlanets } from "../../store/selectors/spaces";
import { EGameEvent, ws } from "../../api/ws";
import { useDispatch } from "react-redux";
import { add } from "../../store/slices/miners";

function Miners() {
  const planets = useGetPlanets()?.dataMap;
  const { data, isLoading } = useGetMinersQuery();

  const miners = useMemo(
    () => data?.map((item) => ({ ...item, key: item?._id })),
    [data]
  );
  const minerStatusMap = EMinerStatus as Record<number, string>;
  const [selectedMiner, setSelectedMiner] = useState<Miner>();
  const handCloseModal = useCallback(
    () => setSelectedMiner(undefined),
    [setSelectedMiner]
  );

  const dipatch = useDispatch();
  // registe event callback of websock in components
  useEffect(() => {
    const callback = (newMiner: Miner) => {
      // update state in redux
      dipatch(add(newMiner));
    };
    ws.addListener(EGameEvent.minerCreate, callback);
    ws.removeListener(EGameEvent.minerCreate, callback);
  }, [dipatch]);

  const columns: ComponentProps<typeof Table>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: function (_: unknown, record: Miner) {
        return <a onClick={() => setSelectedMiner(record)}>{record.name}</a>;
      } as never,
    },
    {
      title: "Planet",
      dataIndex: "planet",
      key: "planet",
      render: function (_: unknown, record: Miner) {
        return <span>{planets.get(record.planet)?.name}</span>;
      } as never,
    },
    {
      title: "carryCapacity",
      dataIndex: "carryCapacity",
      key: "carryCapacity",
    },
    {
      title: "travelSpeed",
      dataIndex: "travelSpeed",
      key: "travelSpeed",
    },
    {
      title: "miningSpeed",
      dataIndex: "miningSpeed",
      key: "miningSpeed",
    },
    {
      title: "Position",
      render: function (_: unknown, record: Miner) {
        return <span>{`${Math.floor(record.x)},${Math.floor(record.y)}`}</span>;
      } as never,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: function (val) {
        return <span>{minerStatusMap[val]}</span>;
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          dataSource={miners}
          columns={columns}
          pagination={false}
          footer={undefined}
        ></Table>
      )}
      {selectedMiner && (
        <MinerHistoryModal
          onOk={handCloseModal}
          onCancel={handCloseModal}
          miner={selectedMiner}
        />
      )}
    </>
  );
}

export default Miners;
