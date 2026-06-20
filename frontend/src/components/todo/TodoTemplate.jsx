// TodoTemplate.jsx

import React from 'react'
import styled from 'styled-components'

const TodoTemplate = ({ children }) => {
    return (
        <Container>

            <TitleBox>
                <Title>📋 일정관리</Title>
                <SubTitle>
                    오늘의 할 일을 관리해보세요
                </SubTitle>
            </TitleBox>

            <Content>
                {children}
            </Content>

        </Container>
    )
}

export default TodoTemplate


const Container = styled.div`
    width: 100%;
    max-width: 600px;

    margin: 50px auto;

    background: white;

    border-radius: 20px;

    padding: 30px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`

const TitleBox = styled.div`
    text-align: center;

    margin-bottom: 30px;
`

const Title = styled.h1`
    font-size: 36px;
    color: #343a40;

    margin-bottom: 10px;
`

const SubTitle = styled.p`
    color: #868e96;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;

    gap: 20px;
`