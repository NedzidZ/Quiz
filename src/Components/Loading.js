import classes from "./Loading.module.css";

const Loading = ({ size }) => (
  <div
    className={
      size === "large" ? classes.loaderparentLarge : classes.loaderParentSmall
    }
  >
    <div
      className={size === "large" ? classes.loaderLarge : classes.loaderSmall}
    ></div>
  </div>
);

export default Loading;
