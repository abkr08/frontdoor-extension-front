import React, { FC } from 'react';

interface Props {
  text: string;
  position: {
    top: number;
    left: number;
  };
}

const Tooltip: FC<Props> = ({ text, position }) => {
  return (
    <div
      style={{ position: 'fixed', top: position.top, left: position.left }}
      className="tooltip"
    >
      <p>{text}</p>
    </div>
  );
};

export default Tooltip;

