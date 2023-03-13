import React, { useState } from 'react';
import style from './LoadArea.module.css';
import { TbAd2 } from 'react-icons/tb';
import UIButton from '../../uikit/UIButton';
import UIInput from '../../uikit/UIInput';

interface PropsLoadArea {
  handleClipboardParseButtonClick: () => void;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleButtonClick(event: React.ChangeEvent<HTMLInputElement>): void;
  handleCancelClick: () => void;
  dataFiles: File[];
}

const LoadArea = (props: PropsLoadArea) => {
  const {
    handleClipboardParseButtonClick,
    inputValue,
    handleInputChange,
    handleCancelClick,
    handleButtonClick,
    dataFiles,
  } = props;

  return (
    <div className={style.loaded_container}>
      {dataFiles.length === 0 ? (
        <div>
          <div className={style.load_buttons_wrap}>
            <div className={style.load_label}>
              <TbAd2 className={style.load_icon} />
              <h2>Перетащите файл с профилями</h2>
              <p>Или нажмите "Выбрать файл"</p>
              <div className={style.load_buttons}>
                <div className={style.button_group}>
                  <UIInput text={'Выбрать файл'} onChange={handleButtonClick} />
                  <UIButton
                    text={'Вставить из буффура'}
                    onClick={handleClipboardParseButtonClick}
                  />
                </div>
              </div>
            </div>
          </div>

          <textarea
            className={style.load_textarea}
            id="textInput"
            placeholder="Введите или вставьте данные из шопов"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className={style.loaded_area}>
          <TbAd2 className={style.load_icon} />
          {dataFiles.map((item, index) => (
            <div key={index} className={style.file_name}>
              {item.name}
            </div>
          ))}

          <div className={style.downlowded_buttons_wrap}>
            <UIInput
              text={'Выбeрете другой файл'}
              onChange={handleButtonClick}
            />
            <UIButton text={'Oтменить'} onClick={handleCancelClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadArea;
