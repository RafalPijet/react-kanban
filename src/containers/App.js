import React from "react";
import {hot} from "react-hot-loader";
import axios from "axios";
import ColumnsList from "../containers/ColumnsList";
import Msg from "../components/Modal";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: "https://cors-anywhere.herokuapp.com/https://kodilla.com/pl/bootcamp-api",
            myHeaders: {
                'X-Client-Id': 3667,
                "X-Auth-Token": "1c84e562cacd1d7bbdc02ef320618dec"
            },
            myHeadersForPUT: {
                'X-Client-Id': 3667,
                "X-Auth-Token": "1c84e562cacd1d7bbdc02ef320618dec",
                'Content-Type': 'application/json'
            },
            boardName: "",
            columns: []
        }
    }

    componentDidMount() {
        this.getAllColumns();
    }

    getAllColumns() {
        let columns = [];
        axios.get(this.state.baseUrl + "/board", {headers: this.state.myHeaders})
            .then(resp => {
                resp.data.columns.map((column) => {
                    columns.push(column);
                });
                this.setState({
                    boardName: resp.data.name,
                    columns: columns
                });
            });
    }

    removeColumn(id) {
        console.log(`Id of column ${id}`);
    }

    removeCard(id) {
        console.log(`Id of card ${id}`);
    }

    render() {
        return (
            <div className="main row">
                <div className="first-line row col-12">
                    <h1>{this.state.boardName}</h1>
                    <button onClick={() => toast(<Msg/>)}>Add a column</button>
                </div>
                <ColumnsList delCard={this.removeCard.bind(this)}
                             delColumn={this.removeColumn.bind(this)}
                             data={this.state.columns}/>
                <ToastContainer/>
            </div>
        )
    }
}

export default hot(module)(App);