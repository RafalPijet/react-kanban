import React from "react";
import CardsList from "../containers/CardsList";
import Sortable from "react-sortablejs";

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            isWork: this.props.isWork,
            progressWork: this.props.progressWork,
            visibility: this.props.visibility
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.columnId === this.state.id && nextProps.content.length > 2 && (nextProps.checkUpdateColumn)) {
            this.setState({name: nextProps.content});
        }

        this.setState({
            progressWork: nextProps.progressWork,
            visibility: nextProps.visibility,
            isWork: nextProps.isWork
        })
    }

    render() {
        return (
            <div className="column row flex-content-between">
                <div className="row col-12 flex-end">
                    <button className={this.state.visibility}><img className={this.state.visibility}
                        onClick={() => this.props.takeNewColumnName(this.state.id, this.state.name)}
                        src="./src/images/edit-regular.svg" alt="sorry"/></button>
                    <button className={this.state.visibility}
                            onClick={() => this.props.delColumn(this.state.id, this.state.name)}>X
                    </button>
                </div>
                <h2 className="column-title col-12 text-center">{this.state.name}</h2>
                <div className="row col-12 flex-content-end flex-center">
                    <Sortable options={{disabled: this.props.isWork}} className="col-12" onChange={(order) => {this.onUpdate(order)}}>
                        <CardsList cards={this.props.cards} delCard={this.props.delCard} isWork={this.props.isWork}
                                   takeCardNameToChange={this.props.takeCardNameToChange} visibility={this.props.visibility}
                                   cardId={this.props.cardId} checkUpdateCard={this.props.checkUpdateCard} 
                                   content={this.props.content} progressWork={this.props.progressWork}/>
                    </Sortable>
                    <button disabled={this.state.isWork} className={this.state.progressWork} onClick={() => this.props.takeNewCardName(this.state.id)}>Add a card</button>
                </div>
            </div>
        )
    }
}

export default Column;