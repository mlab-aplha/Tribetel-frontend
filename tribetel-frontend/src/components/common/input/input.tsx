// input box component - text + password + email types, default|active|error|deactive states

import React from 'react';
import './input.module.css';

export type inputType = 'text' | 'password' | 'email';
export type inputState = 'default' | 'active' | 'error' | 'deactive';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    type?: inputType;
    state?: inputState;
};

export const Input: React.FC<InputProps> = ({
    type = 'text',
    state = 'default',
    ...props
}) => {
    return (
        <input
            type={type}
            className={`input ${state}`}
            {...props}
        />
    );
};
