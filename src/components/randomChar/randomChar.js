import React, {Component} from 'react';

import gotService from '../../service/service'; 
import Spiner from '../spiner';
import Error from '../error'

//css
import styled from 'styled-components'
const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;
const RandomBlockTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;
const Term = styled.span`
    font-weight: bold;
`;

export default class RandomChar extends Component {
    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({error: true})
    }

    updateChar = () => {
        let id = Math.floor(Math.random() * 2100 + 25)
        this.gotService.getCharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updateChar()
        this.timerId = setInterval(this.updateChar, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        const {char , loading, error} = this.state;
        const spiner = loading ? <Spiner /> : null;
        const errorM = error ? <Error /> : null;
        const content = !(loading || error) ? <Viwe char={char}/> : null; 
        return (
            <RandomBlock className="random-block rounded">
                {spiner}
                {errorM}
                {content}
            </RandomBlock>
        );
    }


}

const Viwe = ({char}) => {
    const {name,gender, born, died, culture} = char
    return (
        <>
            <RandomBlockTitle>Random Character: {name}</RandomBlockTitle>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term className="term">Gender </Term>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term className="term">Born </Term>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term className="term">Died </Term>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term className="term">Culture </Term>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
