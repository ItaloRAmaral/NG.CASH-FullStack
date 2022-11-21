type GenericInputProps = {
  labelName: string;
  labelClassname: string;
  className: string;
  type: string;
  name: string;
  value: string | number;
  placeholder: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


function GenericInput(props: GenericInputProps) {
  return (
    <label className={`${props.labelClassname}`} htmlFor={`${props.name}`}>
      <span>{props.labelName}</span>
      <input
        className={`${props.className}`}
        type={`${props.type}`}
        name={`${props.name}`}
        value={`${props.value}`}
        placeholder={`${props.placeholder}`}
        onChange={props.handleChange}
      />
    </label>
  );
}

export default GenericInput;
