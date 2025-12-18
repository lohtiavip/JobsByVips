const FormRowSelect = ({
  name,
  label,
  list,
  defaultValue,
  onChange,
}: {
  name: string;
  label: string;
  list: object;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {Object.values(list).map((iValue) => {
          return (
            <option key={iValue} value={iValue}>
              {iValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
