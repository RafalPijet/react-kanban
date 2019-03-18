import React, {Component} from 'react';
import {toast} from 'react-toastify';

class AddColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            canClose: false
        }
    }

    render() {
        return (
            <div className="modal-add-column row">
                <label>Enter the column name:</label>
                <input className="col-12" onClick={(event) => event.stopPropagation()}
                       onChange={(event) =>  (event.target.value.length < 3) ? this.setState({canClose: false})
                           : this.setState({canClose: true, content: event.target.value})}
                       onKeyUp={(event) => {

                           if (event.keyCode === 13 && this.state.canClose) {
                               this.setState({
                                   content: event.target.value
                               });
                               /*ToDo*/
                           }}}/>
                <div className="row col-12 flex-end">
                    <button onClick={(event) => {
                        this.props.takeContent(this.state.content);
                        (!this.state.canClose) ? event.stopPropagation() : []}}>Submit</button>
                </div>
            </div>
        );
    }
}

export default AddColumn;
