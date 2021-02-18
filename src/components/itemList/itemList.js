import React, {Component} from 'react';
import gotService from '../../service/service';
import Spiner from '../spiner'; 
//css
import styled from 'styled-components'
const Li = styled.li`
    cursor: pointer;
`;

export default class ItemList extends Component {
    constructor() {
        super()
        console.log(3);
    }
    gotService = new gotService();

    state = {
        charList: null
    }

    componentDidMount() {
        console.log(1);
        this.gotService.getAllCharacters(5, 3)
            .then((charList) => {
                this.setState({charList})
            })
    }

    renderItem(arr) {
        return arr.map((item, i) => {
            return (
                <Li
                    key={item.url.replace(/[^\d]/g)}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelect(item.url.replace(/[^\d]/g, ''))}
                >
                    {item.name}
                </Li>
            )
        })
    }

    render() {
        const {charList} = this.state
        console.log(2);
        if (!charList) {
            return <Spiner />
        }
        const item = this.renderItem(charList)
        return (
            <ul className="item-list list-group">
                {item}
            </ul>
        );
    }
}
