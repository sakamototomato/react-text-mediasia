import { Table } from "antd";
import { ComponentProps, useCallback, useMemo, useState } from "react";
import Loading from "../../components/Loading";
import { Planet } from "../../api/space/types";
import "./planets.scss";
import { useGetPlanetsQuery } from "../../api/space";
import NewMinerToPlanetModal from "./NewMinerToPlanetModal";
import CapacityLabel from "../components/CapacityLabel";

function Planets() {
  const { data, isLoading } = useGetPlanetsQuery(undefined);
  const [planetOfNewMiner, setPlanetOfNewMiner] = useState<Planet>();
  const columns: ComponentProps<typeof Table>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Miners",
      dataIndex: "Miners",
      key: "Miners",
      render: function (_: unknown, record: Planet) {
        return <span>{record.miners}</span>;
      } as never,
    },
    {
      title: "Minerals",
      dataIndex: "Minerals",
      key: "Minerals",
      render: function (_: unknown, record: Planet) {
        return (
          <CapacityLabel
            current={record.capability}
            max={record.capability}
          ></CapacityLabel>
        );
      } as never,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: function (_: unknown, record: Planet) {
        const cost = 1000;
        return record.minerals > cost ? (
          <div
            className="action-btn"
            onClick={() => setPlanetOfNewMiner(record)}
          >
            <i className="add"></i>
            <span>Create a miner</span>
          </div>
        ) : (
          <span>-</span>
        );
      } as never,
    },
  ];
  const handCloseModal = useCallback(
    () => setPlanetOfNewMiner(undefined),
    [setPlanetOfNewMiner]
  );

  const planets = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        key: item._id,
        capability: item.minerals,
      })),
    [data]
  );
  if (isLoading) return <Loading />;
  return (
    <div>
      <Table
        dataSource={planets}
        columns={columns}
        pagination={false}
        footer={undefined}
      ></Table>
      <NewMinerToPlanetModal
        planet={planetOfNewMiner}
        onClose={handCloseModal}
      />
    </div>
  );
}

export default Planets;
