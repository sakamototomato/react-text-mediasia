import classNames from "classnames";

interface IProps {
  current: number | string;
  max: number | string;
}
function CapacityLabel(props: IProps) {
  return (
    <span
      className={classNames({ isFull: props.current === props.max })}
    >{`${props.current}/${props.max}`}</span>
  );
}

export default CapacityLabel;
