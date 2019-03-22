import React from "react";
import Card from "../components/Card";
import Sortable from "react-sortablejs";
import uniqueId from 'lodash.uniqueid';

class CardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.cards) {
            this.setState({cards: this.props.cards});
        }
    }

    get cards() {
        return this.props.cards.map(
            (card) => <Card key={card.id} id={card.id} name={card.name} columnID={card.bootcamp_kanban_column_id}
                            delCard={this.props.delCard} takeCardNameToChange={this.props.takeCardNameToChange}
                            checkUpdateCard={this.props.checkUpdateCard} cardId={this.props.cardId}
                            content={this.props.content}/>)
    }

    render() {

        return (
            <div className="col-12">
                <Sortable
                    options={{
                        group: "shared"
                    }}
                    onChange={(order) => {
                        this.setState({cards: order})
                   }}
                    tag="ul" >
                    {this.cards}
                </Sortable>
            </div>
        );
    }
}

export default CardsList;