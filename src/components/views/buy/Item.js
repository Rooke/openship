import { React } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: blue;
`;

const Title = styled.h2`
  color: blue;
`;

const Image = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

const Price = styled.div`
  color: blue;
`;

export default ({item}) =>
  <Wrapper>
    <Image src={item.src}/>
    <Title>{item.title}</Title>
    <Price>{item.price}</Price>
  </Wrapper>