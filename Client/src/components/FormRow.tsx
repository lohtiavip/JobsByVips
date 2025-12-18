export default function FormRow({
  type,
  label,
  name,
  defaultValue = "",
  onChange,
}: {
  type: string;
  label?: string;
  name: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="form-row">
      <label htmlFor={label} className="form-label">
        {label ? label : name}
      </label>
      <input
        id={type}
        name={name}
        defaultValue={defaultValue}
        className="form-input"
        required
        onChange={onChange}
      />
    </div>
  );
}
