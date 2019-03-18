import React from "react";
import CardsList from "../containers/CardsList";

class Column  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name
        }
    }
    
    render() {
        return (
            <div className="column row flex-content-between">
                <div className="row col-12 flex-end">
                    <button className="btn-edit hidden"><img className="edit-column" src="./src/images/edit-regular.svg" alt="sorry"/></button>
                    <button className="btn-delete" onClick={() => this.props.delColumn(this.state.id, this.state.name)}>X</button>
                </div>
                <h2 className="column-title col-12 text-center">{this.props.name}</h2>
                <div className="row col-12 flex-content-end flex-center">
                    <CardsList cards={this.props.cards} delCard={this.props.delCard}/>
                    <button className="add-card">Add a card</button>
                </div>
            </div>
        )
    }
}

export default Column;