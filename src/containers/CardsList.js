import React from "react";
import Card from "../components/Card";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

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
            (card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                    <div  ref={provided.innerRef} {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                        <Card key={card.id} id={card.id} name={card.name} columnID={card.bootcamp_kanban_column_id}
                            delCard={this.props.delCard} takeCardNameToChange={this.props.takeCardNameToChange}
                            checkUpdateCard={this.props.checkUpdateCard} cardId={this.props.cardId}
                            content={this.props.content} visibility={this.props.visibility}
                            isWork={this.props.isWork}/>
                    </div>
                    )}
                </Draggable>
            ))}

    onDragEnd(result) {

    };

    render() {

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps}
                             ref={provided.innerRef} className="col-12">
                            {this.cards}
                        </div>
                        )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default CardsList;