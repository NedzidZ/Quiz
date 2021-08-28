import classes from "./Loading.module.css";

const Loading = (props) => {
  return (
    <div
      className={
        props.className === "categoryloader"
          ? classes.categoryloader
          : classes.loaderparent
      }
    >
      <div
        className={
          props.className2 === "categoryloader2"
            ? classes.categoryloader2
            : classes.loader
        }
      ></div>
    </div>
  );
};

export default Loading;
