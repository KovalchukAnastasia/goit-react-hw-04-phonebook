import styled from 'styled-components';

export const List = styled.ol`
  list-style: none;
  counter-reset: item;
`;

export const ListItem = styled.li`
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 18px;
  counter-increment: item;
  margin-bottom: 5px;
  ::before {
    margin-right: 10px;
    content: counter(item);
    background: #afafaf;
    border-radius: 100%;
    color: white;
    width: 1.2em;
    text-align: center;
    display: inline-block;
  }
`;

export const ListText = styled.p`
  margin-right: 10px;
`;

export const Button = styled.button``;
