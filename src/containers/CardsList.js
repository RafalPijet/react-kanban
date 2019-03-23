import React from "react";
import Card from "../components/Card";
import Sortable from "react-sortablejs";
import uniqueId from 'lodash.uniqueid';

class CardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards,
            isWork: this.props.isWork,
            progressWork: this.props.progressWork,
            visibility: this.props.visibility
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.cards) {
            this.setState({cards: this.props.cards});
        }
        this.setState({
            progressWork: nextProps.progressWork,
            visibility: nextProps.visibility,
            isWork: nextProps.isWork
        })
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
                        group: "shared",
                        disabled: this.state.isWork
                    }}
                    onChange={() => {}}
                    tag="ul" >
                    {this.cards}
                </Sortable>
            </div>
        );
    }
}

export default CardsList;