import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="card row flex-between">
                <p className="col-10 row card-description">First Test and More Information</p>
                <button className="col-1 row btn-edit hidden"><img className="edit-card" src="./src/images/edit-regular.svg" alt="sorry"/></button>
                <button className="col-1 row btn-delete">X</button>
            </div>
        )
    }
}

export default Card;