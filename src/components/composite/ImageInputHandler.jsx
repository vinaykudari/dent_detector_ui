import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { imageInputModes } from '@constants/index';
import { setImage, resetData, setImageInputMode } from '@actions/index';
import { apiTypes } from '@actionTypes/index';
import resizeAndStore from '@utils/resizeAndStore';
import useCanvasDimensions from '@hooks/useCanvasDimensions';
import Button from '@base/Button';

const FileInput = styled.input`
  display: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TakePicButton = styled(Button)`
  margin-left: 20px;
`;

const ImageInputHandler = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const resetApp = () => {
    dispatch(resetData());
    dispatch({ type: `${apiTypes.SEND_FOR_ANALYSIS}_RESET_API_CALL` });
  };
  const onClick = () => {
    resetApp();
    dispatch(setImageInputMode(imageInputModes.chooseFile));
    dispatch(setImage({ isLoading: true }));
    inputRef.current.click();
  };
  const canvasDimensions = useCanvasDimensions();
  const handleImageLoad = (evt) => {
    if (evt.target.files[0]) {
      resizeAndStore({
        file: evt.target.files[0],
        dispatch,
        width: canvasDimensions.width,
        height: canvasDimensions.height
      });
    }
  };
  const onTakePicClick = () => {
    resetApp();
    dispatch(setImageInputMode(imageInputModes.takePic));
  };
  return (
    <>
      <FileInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageLoad}
      />
      <ButtonsContainer>
        <Button label="Choose File" onClick={onClick} />
        <TakePicButton label="Take Picture" onClick={onTakePicClick} />
      </ButtonsContainer>
    </>
  );
};

export default ImageInputHandler;
