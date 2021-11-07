import React from 'react';
import styled from 'styled-components';
import ImageInputHandler from '@composite/ImageInputHandler';
import PreviewResponse from '@composite/PreviewResponse';
import Analyze from '@composite/Analyze';
import Header from '@composite/Header';
import { mobile } from '@constants/index';

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  min-height: calc(100vh - 120px);
  > * {
    position: relative;
  }
`;

const Bg = styled.div`
  font-size: 8rem;
  color: ${({ theme }) => theme.colors.lightGrey};
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    font-size: 3rem;
  }
`;

const Home = () => {
  return (
    <>
      <Wrapper>
        <Bg>#UBHacking21</Bg>
        <Header />
        <ImageInputHandler />
        <PreviewResponse />
        <Analyze />
      </Wrapper>
    </>
  );
};

export default Home;
