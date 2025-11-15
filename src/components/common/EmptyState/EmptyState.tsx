import React from 'react';

interface EmptyStateProps {
    message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    message = "No items found"
}) => {
    return (
        <div className="empty-state">
            <p>{message}</p>
        </div>
    );
};

export default EmptyState;

