const Button = (props) => {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      key={props.key}
      onClick={props.onClick}
      value={props.value}
    >
      {props.children}
    </button>
  );
};
export default Button;
