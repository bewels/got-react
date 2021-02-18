import React, {Component} from 'react';

import gotService from '../../service/service'; 
import Spiner from '../spiner';



//css
import styled from 'styled-components'
const CharDetail = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;
const CharDetailTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`
const ErrorSpan = styled.span`
        color: #fff;
        text-align: center;
        font-size: 26px;
`


export default class CharDetails extends Component {
    
    state = {
        char: null,
        loading: true
    }

    gotService = new gotService();

    componentDidMount() {
        this.requestItem()
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId){
            this.requestItem()
        }
    }

    requestItem =  () => {
        const {itemId} = this.props

        if (!itemId) {
            return;
        }

        this.gotService.getCharacters(itemId)
            .then((char) => {
                this.setState({
                    char,
                    loading: false
                })
            })
    }

    render() {

        if (!this.state.char) {
            return <ErrorSpan>Error</ErrorSpan>
        }

        const {char:{name, gender, born, died, culture}, loading} = this.state
        

        if (loading) {
            return (
                <CharDetail className="rounded">
                    <Spiner />
                </CharDetail>
            )
        }

        return (
            <CharDetail className="rounded">
                <CharDetailTitle>{name}</CharDetailTitle>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </CharDetail>
        );
    }
}