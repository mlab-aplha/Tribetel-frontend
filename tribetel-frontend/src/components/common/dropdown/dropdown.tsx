// dropdown component - default|active|error|deactive states

import React from 'react';
import './dropdown.module.css';

export type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  state?: 'default' | 'active' | 'error' | 'deactive';
  options: { value: string; label: string }[];
};

export const Dropdown: React.FC<DropdownProps> = ({
  state = 'default',
  options,
  ...props
}) => {
  return (
    <select className={`dropdown ${state}`} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
export default Dropdown;