import classes from "./Loading.module.css";
import { useState } from "react";

const Loading = (props) => {
  return (
    <div className={(classes.loaderparent, props.className)}>
      <div className={(classes.loader, props.className2)}></div>
    </div>
  );
};

export default Loading;
