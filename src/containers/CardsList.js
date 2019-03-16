import React from "react";
import Card from "../components/Card";

class CardsList extends React.Component {
    constructor(props) {
        super(props)
    }

    get cards() {
        return this.props.cards.map((card) => <Card key={card.id} id={card.id} name={card.name}
                                                    columnID={card.bootcamp_kanban_column_id}
                                                    delCard={this.props.delCard}/>)
    }

    render() {
        return (
            <div className="col-12">
                {this.cards}
            </div>
        )
    }
}

export default CardsList;