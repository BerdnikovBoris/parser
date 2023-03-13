import React from 'react';
import style from './UIButton.module.css';

interface UIButtonProps {
  text: string;
  onClick: () => void;
}

const UIButton = (props: UIButtonProps) => {
  const { text, onClick } = props;
  return (
    <button onClick={onClick} className={style.button}>
      {text}
    </button>
  );
};

export default UIButton;
