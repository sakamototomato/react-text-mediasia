import classNames from "classnames";
import "./capacityLabel.scss";
interface IProps {
  current: number | string;
  max: number | string;
}
function CapacityLabel(props: IProps) {
  return (
    <span
      className={classNames({
        isFull: props.current == props.max,
        isEmpty: props.current == 0,
      })}
    >{`${props.current}/${props.max}`}</span>
  );
}

export default CapacityLabel;
