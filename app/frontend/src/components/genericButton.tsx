type GenericButtonProps = {
  buttonName: string;
  className: string;
  isDisabled: boolean;
  handleClick: () => any;
} & typeof defaultProps;

const defaultProps = {
  isDisabled: false,
}

function GenericButton(props: GenericButtonProps) {
  const LOW_OPACITY = 0.3;
  const HIGH_OPACITY = 1;

  return (
    <button
      type="button"
      name={ props.buttonName }
      className={ `${props.className}` }
      onClick={ props.handleClick }
      disabled={ props.isDisabled }
      style={ { opacity: props.isDisabled ? LOW_OPACITY : HIGH_OPACITY } }
    >
      {props.buttonName}
    </button>
  );
}

GenericButton.defaultProps = defaultProps;

export default GenericButton;