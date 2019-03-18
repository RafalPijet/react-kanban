import React from "react";
import {hot} from "react-hot-loader";
import axios from "axios";
import ColumnsList from "../containers/ColumnsList";
import AddColumn from "../components/AddColumnModal";
import {ToastContainer, toast} from "react-toastify";

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
            columns: [],
            content: ""
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

    takeContent(content) {

        if (content.length < 3) {
            this.tooLittle();
        } else {
            this.setState({content: content});
            this.progressAddColumn();
            setTimeout(() => this.addColumn(), 1000);
        }
    }

    addColumn() {

        if (this.state.content.length > 2) {
            let newColumn = {
                name: this.state.content
            };
            axios.post(this.state.baseUrl + "/column", newColumn, {headers: this.state.myHeaders})
                .then((rest) => this.setState({content: ""}))
                .then(this.getAllColumns.bind(this))
                .then(this.addColumnDone.bind(this))
                .catch(err => this.addColumnError(err));
        }
    }

    removeColumn(id, name) {
        this.progressDelete(name);
        axios.delete(this.state.baseUrl + "/column/" + id, {headers: this.state.myHeaders})
            .then(this.getAllColumns.bind(this))
            .then(this.deleteDone.bind(this))
            .catch((err) => this.deleteError(err));
    }

    removeCard(id) {

    }

    tooLittle = () => toast.error("You must enter at least 3 characters!!!", {autoClose: 5000, position: "top-left"});

    toastDeleteId = null;

    progressDelete = (name) => this.toastDeleteId = toast(`Deleting ${name} column in progress, please wait...`,
        { autoClose: false, position: "top-left" });

    deleteDone = () => toast.update(this.toastDeleteId, {render: `Deleting column DONE 😀`,
        type: toast.TYPE.SUCCESS, autoClose: 5000 });

    deleteError = (error) => toast.update(this.toastDeleteId, {render: `Deleting ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000});

    toastAddColumnId = null;

    progressAddColumn = () => this.toastAddColumnId = toast("Adding column in progress, please wait...",
        {autoClose: false, position: "top-left"});

    addColumnDone = () => toast.update(this.toastAddColumnId, {render: "Adding column DONE 😀",
        type: toast.TYPE.SUCCESS, autoClose: 5000});

    addColumnError = (error) => toast.update(this.toastAddColumnId, {render: `Adding column ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000});

    render() {
        return (
            <div className="main row">
                <div className="first-line row col-12">
                    <h1>{this.state.boardName}</h1>
                    <button onClick={() => toast.info(<AddColumn takeContent={this.takeContent.bind(this)}/>,
                        {autoClose: false})}>Add a column</button>
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