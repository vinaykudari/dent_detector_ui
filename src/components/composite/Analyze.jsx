import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sendForAnalysis, setUseMaxArea } from '@actions/index';
import { apiTypes } from '@actionTypes/index';
import { apiStatus, mobile } from '@constants/index';
import Button from '@base/Button';
import Text from '@base/Text';

const ConsentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Checkbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 18px;
    height: 18px;
  }
`;

const ConsentText = styled(Text)`
  margin-left: 16px;
`;

const UploadBtn = styled(Button)`
  margin-top: 12px;
  padding-left: 28px;
  padding-right: 28px;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    margin-top: 30px;
  }
`;

const Upload = () => {
  const dispatch = useDispatch();
  const useMaxAreaOnly = useSelector(({ data }) => data.useMaxAreaOnly);
  const image = useSelector(({ data }) => data.image);
  const isResponseReceived = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.successful
  );
  const onClick = () => {
    const formData = new FormData();
    formData.append('image', image.uri, image.name);
    formData.append('use_max_area', useMaxAreaOnly ? 1 : 0);
    dispatch(sendForAnalysis(formData));
  };
  const onCheckboxChange = (e) => {
    dispatch(setUseMaxArea(e.target.checked));
  };
  return (
    <>
      {image.previewUrl && !isResponseReceived && (
        <>
          <ConsentContainer>
            <Checkbox
              onChange={onCheckboxChange}
              defaultChecked={useMaxAreaOnly}
            />
            <ConsentText>Use max area only</ConsentText>
          </ConsentContainer>
          <UploadBtn label="Analyze" onClick={onClick} />
        </>
      )}
    </>
  );
};

export default Upload;
