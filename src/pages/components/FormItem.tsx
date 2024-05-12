import React, { PropsWithChildren } from "react";
import "./formItem.scss";
interface IProps {
  label?: string;
}
function FormItem(props: PropsWithChildren<IProps>) {
  return (
    <div className="form-item">
      <span className="form-item-label">{props.label}</span>
      {props.children}
    </div>
  );
}

export default FormItem;
