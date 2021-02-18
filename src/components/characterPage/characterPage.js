import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class CharacterPage extends React.Component {

    state = {
        selectedChar: null
    }

    onCharSelect = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render () {
        const {randomChar, selectedChar} = this.state
        return (
            <Row>
            <Col md='6'>
                <ItemList onCharSelect={this.onCharSelect}/>
            </Col>
            <Col md='6'>
                <CharDetails itemId={selectedChar}/>
            </Col>
        </Row>
        )
    }
}