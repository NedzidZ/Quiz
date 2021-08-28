import classes from "./Dropdown.module.css";
const Dropdown = (props) => {
  return (
    <select className={classes.select} onChange={props.onChange} id={props.id}>
      {props.pick.map((options, i) => (
        <option key={i++} value={options.id}>
          {options.name}
        </option>
      ))}
    </select>
  );
};
export default Dropdown;
