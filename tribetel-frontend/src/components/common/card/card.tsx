// Card component for displaying information

import React from 'react';
import './card.module.css';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  content: string;
  footer?: string;
  image?: string;
  label?: string;
  link?: string;
};

export const Card: React.FC<CardProps> = ({ label, image, link, ...rest}) => {
    return (
        <div className="card" {...rest}>
            {image && <img src={image} alt={label} />}
            <h2>{label}</h2>
            <p>{"content"}</p>
            {link && <a href={link}>Learn more</a>}
        </div>
    );
};