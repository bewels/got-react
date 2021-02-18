import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage'

//css
import styled from 'styled-components';
const BtnToggle = styled.button`
    position: relative;
    display: block;
    padding: 5px;
    border: 2px solid aqua;
    background-color: transparent;
    color: aqua;
    font-weight: 700;
    border-radius: 5px;
    outline: none;
    margin: 15px 0;
    :after {
        content: "";
        position: absolute;
        width: 0%;
        height: 100%
        z-index: -1;
        top: 0;
        left: 0;
        background: aqua;
        transition: .2s ease;
    }
    :hover:after{
        width: 100%;
        color: white;
    }
    :hover {
        color: #1c7b92;
    }
    :focus{
        outline:none;
    }
`



export default class App extends React.Component {

    state = {
        randomChar: true,
        selectedChar: null
    }

    togglerandomChar = () => {
        this.setState(({randomChar}) => {
            return {
                randomChar: !randomChar
            }
        })
    }



    render() {
        const {randomChar, selectedChar} = this.state
        const char = randomChar ? <RandomChar /> : null;
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                        </Col>
                    </Row>
                    <BtnToggle
                            onClick={this.togglerandomChar}
                        >Скрыть</BtnToggle>
                    <CharacterPage />
                </Container>
            </>
        );
    }
};