//A floeating action button to allow custonmers to quickly access support.

import React from "react";
import './fab.module.css'

export type FabSize = 'small' | 'medium' | 'large';
export type FabProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: FabSize;
    icon: React.ReactNode;
    variety?: 'primary' | 'secondary' | 'tertiary';
    label?: string; // Accessible label for the button
};

export const Fab: React.FC<FabProps> = ({
    size = 'medium',
    icon,
    variety = 'primary',
    label,
    ...props
}) => {
    return (
        <button
            className={`fab fab--${size} fab--${variety}`}
            aria-label={label}
            {...props}
        >
            {icon}
        </button>
    );
};
