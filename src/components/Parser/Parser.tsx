import React, { useState } from 'react';
import style from './Parser.module.css';
import LoadArea from '../../components/LoadArea';
import { GiSharkJaws } from 'react-icons/gi';
import { TbAd2 } from 'react-icons/tb';
import UIButton from '../../uikit/UIButton';
import UIInput from '../../uikit/UIInput';

const Parser = () => {
  const [drag, setDrag] = useState(false);
  const [dataFiles, setDataFiles] = useState<File[]>([]);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isParsing, setIsParsing] = useState<boolean>(false);

  const dragStartHandler = (e: any) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: any) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      console.log(files[i].name);
    }
    setDataFiles((prevDataFiles) => [...prevDataFiles, ...Array.from(files)]);
  };

  const handleClipboardParseButtonClick = async () => {
    setIsParsing(true);
    const clipboardData = await navigator.clipboard.readText();
    const parsedClipboardData = clipboardData
      .split('\n')
      .map((row) => row.split(','));
    setTableData((prevTableData) => [...prevTableData, ...parsedClipboardData]);
  };

  const handleParseButtonClick = () => {
    setIsParsing(true);
    const rows: string[][] = [];
    const allFiles = [
      ...dataFiles,
      ...Array.from(
        (document.getElementById('fileInput') as HTMLInputElement).files || []
      ),
    ];
    allFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event) => {
        const csvText = event.target?.result as string;
        const parsedRows = csvText.split('\n').map((row) => row.split(','));
        rows.push(...parsedRows);
        setTableData(rows);
      };
    });
    const parsedText = inputValue.split('\n').map((row) => row.split(','));
    setTableData((prevTableData) => [...prevTableData, ...parsedText]);

    navigator.clipboard.readText().then((clipboardData) => {
      const parsedClipboardData = clipboardData
        .split('\n')
        .map((row) => row.split(','));
      setTableData((prevTableData) => [
        ...prevTableData,
        ...parsedClipboardData,
      ]);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const fileArray: File[] = [];
    if (files)
      for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i]);
      }

    setDataFiles(fileArray);
  };

  const handleCancelClick = () => {
    const inputElement = document.getElementById(
      'fileInput'
    ) as HTMLInputElement;
    inputElement.value = '';
    setDataFiles([]);
  };

  const handleCancelParsing = () => {
    setIsParsing(false);
  };

  return (
    <div className={style.parser_wrapper}>
      <div className={style.parser}>
        <div className={style.header}>
          <div className={style.logo_wrapper}>
            <GiSharkJaws className={style.logo_icon} />
            <div className={style.header_logo}>
              <h3 className={style.header_logo_title}>Shark</h3>
              <p className={style.header_logo_text}>Smart data parser</p>
            </div>
          </div>
          {!isParsing ? (
            <UIButton text={'Парсить'} onClick={handleParseButtonClick} />
          ) : (
            <UIButton text={'Oтменить'} onClick={handleCancelParsing} />
          )}
        </div>
        {!isParsing ? (
          <div className={style.drop_wrapper}>
            {drag ? (
              <div
                className={style.drag_area}
                onDragStart={(e) => dragStartHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDrop={(e) => dropHandler(e)}
              >
                <div className={style.drag_title}>
                  <h3 className={style.drag_info}>
                    Перетащите файл с профилями
                  </h3>
                </div>
              </div>
            ) : dataFiles.length === 0 ? (
              <div>
                <div
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                >
                  {/* внутри дропа */}
                  <LoadArea
                    handleClipboardParseButtonClick={
                      handleClipboardParseButtonClick
                    }
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleButtonClick={handleButtonClick}
                    handleCancelClick={handleCancelClick}
                    dataFiles={dataFiles}
                  />

                  {/* внутри дропа */}
                </div>
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
        ) : (
          <div className={style.pars_result_wrap}>
            {tableData.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Parser;
