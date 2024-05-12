import { Table } from "antd";
import { ComponentProps, useMemo } from "react";
import Loading from "../../components/Loading";
import { Planet } from "../../api/types";
import "./planets.scss";
import { useGetPlanetsQuery } from "../../api";

function Planets() {
  const { data, isLoading } = useGetPlanetsQuery(undefined);
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
        return <span>{`${record.minerals}/${record.capability}`}</span>;
      } as never,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: function (_: unknown, record: Planet) {
        return (
          <div className="action-btn" onClick={() => {}}>
            <i className="add"></i>
            <span>Create a miner</span>
          </div>
        );
      } as never,
    },
  ];

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
    </div>
  );
}

export default Planets;
