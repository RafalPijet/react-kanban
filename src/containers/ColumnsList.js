import React from "react";
import Column from "../components/Column";

class ColumnsList extends React.Component {
    constructor(props) {
        super(props)
    }
    
    get columns() {
        return this.props.data.map((column) => 
            <Column key={column.id} id={column.id} name={column.name} cards={column.cards} cardId={this.props.cardId}
                    delCard={this.props.delCard} delColumn={this.props.delColumn} checkUpdateCard={this.props.checkUpdateCard}
                    takeNewColumnName={this.props.takeNewColumnName} content={this.props.content} isWork={this.props.isWork}
                    columnId={this.props.columnId} checkUpdateColumn={this.props.checkUpdateColumn}
                    progressWork={this.props.progressWork} visibility={this.props.visibility}
                    takeNewCardName={this.props.takeNewCardName} takeCardNameToChange={this.props.takeCardNameToChange}/>)
    }

    render() {
        return (
            <div className="column-space row col-12 flex-around">
                {this.columns}
            </div>
        )
    }
}

export default ColumnsList;