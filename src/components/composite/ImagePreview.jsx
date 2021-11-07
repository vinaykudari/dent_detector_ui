import React, { useRef, useEffect, useState, useContext } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { apiTypes } from '@actionTypes/index';
import { resetData } from '@actions/index';
import { apiStatus, mobile } from '@constants/index';
import { getImage } from '@utils/imageHelper';
import useCanvasDimensions from '@hooks/useCanvasDimensions';
import Progressbar from '@base/Progressbar';
import RoundedIcon from '@base/RoundedIcon';
import Download from '@base/Download';

const scanAnimation = keyframes`
  0% {
    top: 10px;
  }
  50% {
    top: calc(100% - 10px);
  }
  100% {
    top: 10px;
  }
`;

const Scanner = styled.div`
  width: 120%;
  height: 2px;
  background-color: red;
  position: absolute;
  top: 10px;
  left: -10%;
  box-shadow: 1px 1px 4px 1px rgb(255 0 0);
  animation-name: ${scanAnimation};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 108%;
    left: -4%;
  }
`;

const fadeInScaleAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const CanvasContainer = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
  opacity: 0;
  transform: scale(0.5);
  animation-name: ${fadeInScaleAnimation};
  animation-duration: 800ms;
  animation-fill-mode: forwards;
`;

const iconSize = 28;

const Icon = styled(RoundedIcon)`
  position: absolute;
  right: -${iconSize / 2}px;
  top: -${iconSize / 2}px;
`;

const Canvas = styled.canvas`
  background-color: #dcdcdc;
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
`;

const DownloadBtn = styled(Download)`
  position: absolute;
  left: 8px;
  bottom: 8px;
`;

const Score = styled.div`
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background-color: ${({ theme, $score }) =>
    $score >= 95 ? theme.colors.blue : theme.colors.red};
  position: absolute;
  left: 8px;
  top: 8px;
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getWidth = (newHeight, aspectRatio) => newHeight * aspectRatio;
const getHeight = (newWidth, aspectRatio) => newWidth / aspectRatio;

const ImagePreview = ({ className, borderRadius }) => {
  const canvasDimensions = useCanvasDimensions();
  const theme = useContext(ThemeContext);
  const canvasRef = useRef();
  const image = useSelector(({ data }) => data.image);
  const isResponseReceived = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.successful
  );
  const response = useSelector(({ data }) => data.response);
  const uploadProgress = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.SEND_FOR_ANALYSIS].uploadProgress || 0
  );
  const isRequesting = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.requesting
  );
  const isAnalyzing = isRequesting && uploadProgress === 100;
  const isUploading = isRequesting && uploadProgress < 100;
  const [imageDimensions, setImageDimensions] = useState({
    width: canvasDimensions.width,
    height: canvasDimensions.height
  });
  const canvasDataRef = useRef({
    aspectRatio: canvasDimensions.width / canvasDimensions.height
  });
  const actualImageDimensions = useRef({
    width: 0,
    height: 0
  });

  const score = isResponseReceived
    ? 100 - Math.round(Number(response.image_details.damage))
    : 0;

  // must use function to override this pointer
  // eslint-disable-next-line func-names
  const drawImageOnCanvas = function () {
    // eslint-disable-next-line no-underscore-dangle
    const _image = this;
    actualImageDimensions.current.width = _image.naturalWidth;
    actualImageDimensions.current.height = _image.naturalHeight;
    const aspectRatio = _image.naturalWidth / _image.naturalHeight;
    const dimensions = {
      width: 0,
      height: 0
    };
    if (
      aspectRatio < canvasDataRef.current.aspectRatio &&
      _image.naturalWidth > canvasDimensions.width
    ) {
      // width is overflowing
      dimensions.height = canvasDimensions.height;
      dimensions.width = getWidth(canvasDimensions.height, aspectRatio);
    } else if (_image.naturalHeight > canvasDimensions.height) {
      // height is overflowing
      dimensions.width = canvasDimensions.width;
      dimensions.height = getHeight(canvasDimensions.width, aspectRatio);
    } else {
      dimensions.width = _image.naturalWidth;
      dimensions.height = _image.naturalHeight;
    }

    setImageDimensions({ ...dimensions });

    const ctx = canvasRef.current.getContext('2d');
    const { width, height } = dimensions;
    ctx.drawImage(_image, 0, 0, width, height);
  };

  useEffect(() => {
    if (image.previewUrl) {
      const imageEl = new Image();
      imageEl.src = image.previewUrl;
      imageEl.onload = drawImageOnCanvas;
    } else {
      // clear image
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasDimensions.height, canvasDimensions.width, image.previewUrl]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (isResponseReceived) {
      // mark faces
      const damagedAreas = response.image_details.boxes || [];
      const notWearingMaskColor = theme.colors.red;
      const faceColor = notWearingMaskColor;
      damagedAreas.forEach((damagedArea, index) => {
        const targetColor = faceColor;
        const x = damagedArea[0];
        const y = damagedArea[1];
        const width = damagedArea[2] - x;
        const height = damagedArea[3] - y;
        const lineWidth = 2;
        // draw rect over face
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = targetColor;
        ctx.strokeRect(x, y, width, height);
        // fill rect for id
        ctx.fillStyle = targetColor;
        const fontSize = Math.min(14, Math.round(width / 6.43));
        const lineHeight = fontSize * 1.58;
        const padding = lineHeight / 2;
        const idBoxHeight = lineHeight;
        const idBoxWidth = Math.min(width, fontSize * 3 + (2 * lineHeight) / 5);
        ctx.fillRect(x - lineWidth / 2, y + height, idBoxWidth, idBoxHeight);
        // draw text
        ctx.fillStyle = theme.colors.white;
        ctx.font = `300 ${fontSize}px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`;
        ctx.fillText(
          `id = ${index.toString()}`,
          x + lineHeight / 5,
          y + height + lineHeight / 2 + padding / 2
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResponseReceived, theme.colors.green, theme.colors.red]);

  const dispatch = useDispatch();
  const onCloseClick = () => {
    dispatch(resetData());
    dispatch({ type: `${apiTypes.SEND_FOR_ANALYSIS}_RESET_API_CALL` });
  };

  return (
    <CanvasContainer
      className={className || ''}
      $width={imageDimensions.width}
      $height={imageDimensions.height}
      $borderRadius={borderRadius}
    >
      <Icon
        onClick={onCloseClick}
        size={iconSize}
        imgSrc={getImage('/images/close.svg')}
      />
      <Canvas
        ref={canvasRef}
        width={imageDimensions.width}
        height={imageDimensions.height}
        $borderRadius={borderRadius}
      />
      {isResponseReceived && (
        <>
          <Score $score={score}>{score}</Score>
          <DownloadBtn canvasRef={canvasRef} />
        </>
      )}
      {isUploading && (
        <Progressbar value={uploadProgress} borderRadius={borderRadius} />
      )}
      {isAnalyzing && <Scanner />}
    </CanvasContainer>
  );
};

ImagePreview.propTypes = {
  className: PropTypes.string,
  borderRadius: PropTypes.number
};

ImagePreview.defaultProps = {
  className: '',
  borderRadius: 0
};

export default ImagePreview;
