import React from "react";
import Column from "../components/Column";

class ColumnsList extends React.Component {
    constructor(props) {
        super(props)
    }
    
    get columns() {
        return this.props.data.map((column) => <Column key={column.id} id={column.id} name={column.name} cards={column.cards}
                                                delCard={this.props.delCard}
                                                delColumn={this.props.delColumn}/>)
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