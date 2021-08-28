const Button = (props) => (
  <button
    className={props.className}
    disabled={props.disabled}
    onClick={props.onClick}
    value={props.value}
  >
    {props.children}
  </button>
);

export default Button;
