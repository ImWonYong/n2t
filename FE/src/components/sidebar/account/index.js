import React from 'react';
import styled from 'styled-components';
import {FaCircle} from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 30px;
  margin-left: 40px;
  color: ${({theme}) => theme.color.white};
  background: #0000;
  align-items: center;
  font-size: x-large;
  span {
    display: block;
    height: 100%;
    margin-right: 10px;

    font-size: xxx-large;
    color: ${({theme}) => theme.color.white};
  }
`;

const Account = () => {
  return (
    <Wrapper>
      <span>
        <FaCircle />
      </span>
      유현진
    </Wrapper>
  );
};

export default Account;
