import React, {Component} from 'react';

class ContentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            canClose: false
        }
    }

    handleClick(event) {
        this.props.progressContent(this.state.content);
        (!this.state.canClose) ? event.stopPropagation() : [];
    }

    render() {
        return (
            <form className="modal-add-column row"  onSubmit={(event) => event.preventDefault()}>
                <label>{this.props.title}:</label>
                <input autoFocus={true} className="col-12" onClick={(event) => event.stopPropagation()}
                       onChange={(event) =>  (event.target.value.length < 3)
                           ? this.setState({canClose: false, content: event.target.value})
                           : this.setState({canClose: true, content: event.target.value})}/>
                <div className="row col-12 flex-end">
                    <button onClick={this.handleClick.bind(this)}>Submit</button>
                </div>
            </form>
        );
    }
}

export default ContentModal;
