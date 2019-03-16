import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            columnID: this.props.columnID
        }
    }
    render() {
        return (
            <div className="card row flex-between">
                <p className="col-10 row card-description">{this.props.name}</p>
                <button className="col-1 row btn-edit hidden"><img className="edit-card" src="./src/images/edit-regular.svg" alt="sorry"/></button>
                <button className="col-1 row btn-delete" onClick={() => this.props.delCard(this.state.id)}>X</button>
            </div>
        )
    }
}

export default Card;