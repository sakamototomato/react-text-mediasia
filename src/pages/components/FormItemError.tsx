import React from "react";
import "./formItemError.scss";
interface IProps {
  errorMsg?: string;
}
function FormItemError(props: IProps) {
  if (!props.errorMsg) return <></>;
  return <div className="form-error">{props.errorMsg}</div>;
}

export default FormItemError;
