const Button = (props) => {
  return (
    <button
      className={props.className}
      key={props.key}
      onClick={props.onClick}
      value={props.value}
    >
      {props.children}
    </button>
  );
};
export default Button;
