import { Table } from "antd";
import { ComponentProps, useMemo } from "react";
import Loading from "../../components/Loading";
import "./asteroids.scss";
import { useGetAsteroidsQuery } from "../../api/space";
import { Asteroid } from "../../api/space/types";
import CapacityLabel from "../components/CapacityLabel";
import { useGetMiners } from "../../store/selectors/spaces";

function Asteroids() {
  const { data, isLoading } = useGetAsteroidsQuery(undefined);
  const { minersMap } = useGetMiners();
  const columns: ComponentProps<typeof Table>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Minerals",
      dataIndex: "minerals",
      key: "minerals",
      render: function (_: unknown, record: Asteroid) {
        const randomMax = Math.floor(Math.random() * 400 + 800);
        return (
          <CapacityLabel
            current={record.minerals}
            max={randomMax < record.minerals ? record.minerals : randomMax}
          ></CapacityLabel>
        );
      } as never,
    },
    {
      title: "Current miner",
      render: function (_: unknown, record: Asteroid) {
        return <span>{minersMap.get(record._id)?.name || "N/A"}</span>;
      } as never,
    },
    {
      title: "Position",
      dataIndex: "Position",
      key: "Position",
      render: function (_: unknown, record: Asteroid) {
        return <span>{`${record.position.x},${record.position.y}`}</span>;
      } as never,
    },
  ];

  const asteroids = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        key: item._id,
      })),
    [data]
  );
  if (isLoading) return <Loading />;
  return (
    <div>
      <Table
        dataSource={asteroids}
        columns={columns}
        footer={undefined}
      ></Table>
    </div>
  );
}

export default Asteroids;
