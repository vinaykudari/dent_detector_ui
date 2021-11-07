import React from 'react';
import styled from 'styled-components';
import Text from '@base/Text';
import { mobile } from '@constants/index';
import { getImage } from '@utils/imageHelper';

const Wrapper = styled.div`
  > * {
    position: relative;
  }
`;

const Bg = styled.div`
  height: 82px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.paleGreen};
  position: absolute;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    height: 54px;
  }
`;

const AppTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const AppIcon = styled.img`
  width: 300px;
`;

const Title = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blueGreen};
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 66%;
    margin: auto;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <Bg />
      <AppTitleContainer>
        <AppIcon src={getImage('/logo.png')} alt="logo with title" />
      </AppTitleContainer>
      <Title>
        <strong>#</strong>ACVAuctions
      </Title>
    </Wrapper>
  );
};

export default Header;
