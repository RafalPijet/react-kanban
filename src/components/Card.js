import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            columnID: this.props.columnID,
            visibility: this.props.visibility,
            isWork: this.props.isWork
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.cardId === this.state.id && nextProps.content.length > 2 && (nextProps.checkUpdateCard)) {
            this.setState({name: nextProps.content});
        }
        this.setState({visibility: nextProps.visibility, isWork: nextProps.isWork})
    }

    render() {
        return (
            <li className="card row flex-between">
                <p className="col-10 row card-description">{this.state.name}</p>
                <button className="col-1 row btn-edit">
                    <img className={this.state.visibility}
                         onClick={() => this.props.takeCardNameToChange(this.state.id, this.state.name, this.state.columnID)}
                         src="./src/images/edit-regular.svg" alt="sorry"/></button>
                <button className="col-1 row btn-delete" disabled={this.state.isWork}
                        onClick={() => this.props.delCard(this.state.id, this.state.name)}>X
                </button>
            </li>
        )
    }
}

export default Card;