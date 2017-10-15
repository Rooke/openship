import { React } from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  margin: 20%;
`;

const Title = styled.h2`
  
`;

const Image = styled.img`
  max-width: 400px;
  max-height: 400px;
`

const Description = styled.div`
  max-width: 400px;
`

export default ({item}) =>
  <Wrapper>
    <Title>{item.title}</Title>
    <Image src={item.src} />
    <Description>{item.description}</Description>
    {item.price}
  </Wrapper>