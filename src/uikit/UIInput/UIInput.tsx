import React from 'react';
import style from './UIInput.module.css';

interface UIInputProps {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UIInput = (props: UIInputProps) => {
  const { text, onChange } = props;

  return (
    <>
      <div className={style.clipboard_button_label}>
        <label htmlFor="fileInput" className={style.label}>
          <span>{text}</span>
        </label>
      </div>
      <input
        className={style.input_display}
        type="file"
        id="fileInput"
        onChange={onChange}
      />
    </>
  );
};

export default UIInput;
