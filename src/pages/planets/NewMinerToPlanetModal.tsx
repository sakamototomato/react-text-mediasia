import { Button, Input, InputNumber, Modal, Select, Table } from "antd";
import { ComponentProps, useMemo, useState } from "react";
import "./newMinerToPlanetModal.scss";
import { Planet, EMinerStatus, Miner } from "../../api/space/types";
import CloseIcon from "../../components/CloseIcon";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { minerSchema } from "./newMinerForm";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "../components/FormItem";
import FormItemError from "../components/FormItemError";
import { useGetPlanets } from "../../store/selectors/spaces";
import { usePostNewMinerMutation } from "../../api/space";
interface IProps {
  planet?: Planet;
  onClose: () => void;
}
function NewMinerToPlanetModal(
  props: IProps & Omit<ComponentProps<typeof Modal>, "title">
) {
  const [addPost, { isLoading }] = usePostNewMinerMutation();
  const { data: planets } = useGetPlanets();
  const [isSuccess, setIsSuccess] = useState(false);
  const planetOptions = useMemo(() => {
    return planets.map((item) => ({ value: item._id, label: item.name }));
  }, [planets]);
  const f = useForm({
    mode: "all",
    resolver: yupResolver(minerSchema),
  });
  const { errors } = f.formState;
  const onSubmitHandler = async () => {
    if (isLoading) return;
    const check = await f.trigger();
    if (!check) return;
    const formData = { ...f.getValues() };
    // "Miner validation failed: minerals: Path `minerals` is required., status: Path `status` is required., angle: Path `angle` is required., y: Path `y` is required., x: Path `x` is required."

    addPost({
      ...formData,
      minerals: Math.floor(Math.random() * 500),
      status: 0,
      angle: 0,
      x: 0,
      y: 0,
    }).then((res) => {
      console.log("res", res);
      setIsSuccess(true);
    });
  };
  const onClose = () => {
    setIsSuccess(false);
    f.reset();
    props.onClose();
  };
  if (!props.planet) return <></>;
  return (
    <Modal
      open
      title={
        isSuccess ? (
          <></>
        ) : (
          <div className="miner-modal-title">Create a miner</div>
        )
      }
      className="miner-modal"
      closeIcon={<CloseIcon />}
      footer={false}
      centered
      width={600}
      {...props}
      onCancel={onClose}
      onOk={onClose}
    >
      {isSuccess ? (
        <h2 className="primary-text text-center ">
          The miner was successfully created
        </h2>
      ) : (
        <FormProvider {...f}>
          <form action="submit">
            <FormItem label="Name">
              <Controller
                name="name"
                control={f.control}
                render={({ field }) => <Input {...field} />}
              />
              <FormItemError errorMsg={errors["name"]?.message} />
            </FormItem>
            <FormItem label="Planet">
              <Controller
                name="planet"
                control={f.control}
                render={({ field }) => (
                  <Select
                    onChange={(val) => field.onChange(val)}
                    options={planetOptions}
                  />
                )}
              />
              <FormItemError errorMsg={errors["planet"]?.message} />
            </FormItem>

            <div className="point-container">
              <h4>Assign points</h4>
              <div className="row">
                <FormItem label="carryCapacity">
                  <Controller
                    name="carryCapacity"
                    control={f.control}
                    render={({ field }) => <InputNumber {...field} />}
                  />
                </FormItem>
                <FormItem label="travelSpeed">
                  <Controller
                    name="travelSpeed"
                    control={f.control}
                    render={({ field }) => <InputNumber {...field} />}
                  />
                </FormItem>
                <FormItem label="miningSpeed">
                  <Controller
                    name="miningSpeed"
                    control={f.control}
                    render={({ field }) => <InputNumber {...field} />}
                  />
                </FormItem>
              </div>
              <FormItemError
                errorMsg={
                  errors["carryCapacity"]?.message ||
                  errors["travelSpeed"]?.message ||
                  errors["miningSpeed"]?.message
                }
              />
            </div>
            <div className="actions">
              <Button disabled={isLoading} onClick={onSubmitHandler}>
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
}

export default NewMinerToPlanetModal;
