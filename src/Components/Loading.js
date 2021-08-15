import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loaderparent}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default Loading;
