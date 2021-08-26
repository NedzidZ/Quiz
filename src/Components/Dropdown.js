import classes from "./Dropdown.module.css";
const Dropdown = (props) => {
  return (
    <select
      className={classes.select}
      onChange={props.onChange}
      id={props.id}
      value={props.value}
    >
      {props.pick.map((options, i) => (
        <option key={i++} value={options.value}>
          {options.label}
        </option>
      ))}
    </select>
  );
};
export default Dropdown;
