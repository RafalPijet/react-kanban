import React from "react";
import Card from "../components/Card";

class Column  extends React.Component {
    constructor(props) {
        super(props);
    }
    get tasks() {

    }
    render() {
        return (
            <div className="column row flex-content-between">
                <div className="row col-12 flex-end">
                    <button className="btn-edit hidden"><img className="edit-column" src="./src/images/edit-regular.svg" alt="sorry"/></button>
                    <button className="btn-delete">X</button>
                </div>
                <h2 className="column-title col-12 text-center">Progress</h2>
                <div className="row col-12 flex-content-end flex-center">
                    <Card/>
                    <button className="add-card">Add a card</button>
                </div>
            </div>
        )
    }
}

export default Column;