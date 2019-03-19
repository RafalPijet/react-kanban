import React from "react";
import {hot} from "react-hot-loader";
import axios from "axios";
import ColumnsList from "../containers/ColumnsList";
import ContentModal from "../components/AddColumnModal";
import {ToastContainer, toast, cssTransition} from "react-toastify";

const Zoom = cssTransition({
    enter: 'zoomIn',
    exit: 'zoomOut',
    duration: 500
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: "https://cors-anywhere.herokuapp.com/https://kodilla.com/pl/bootcamp-api",
            myHeaders: {
                'X-Client-Id': 3667,
                "X-Auth-Token": "1c84e562cacd1d7bbdc02ef320618dec"
            },
            boardName: "",
            columns: [],
            content: "",
            columnId: null,
            oldName: "",
            isNew: null,
            checkUpdateColumn: null
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

    progressContent(content) {

        if (content.length < 3) {
            this.tooLittle();
        } else {
            this.setState({content: content});

            if (this.state.isNew) {
                setTimeout(() => {
                    this.progressAddColumn(this.state.content);
                    this.addColumn()
                }, 100);
            } else {
                setTimeout(() => {
                    this.progressUpdateColumn(this.state.content, this.state.oldName);
                    this.updateColumn();
                }, 100);
            }
        }
    }

    addColumn() {

        if (this.state.content.length > 2) {
            let newColumn = {
                name: this.state.content
            };
            axios.post(this.state.baseUrl + "/column", newColumn, {headers: this.state.myHeaders})
                .then(() => this.setState({content: ""}))
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

    updateColumn() {

        if (this.state.content.length > 2) {
            let updateColumn = {
                id: this.state.columnId,
                name: this.state.content
            };
            axios.put(this.state.baseUrl +"/column/" + this.state.columnId, updateColumn, {headers: this.state.myHeaders})
                .then(() => this.setState({checkUpdateColumn: true}))
                .then(this.updateColumnDone.bind(this))
                .then(() => this.setState({checkUpdateColumn: false, content: ""}))
                .catch((err) => this.updateColumnError(err));
        }
    }

    addCard() {
        toast.info(<ContentModal title="Enter the new card contents" progressContent={this.progressContent.bind(this)}
        />, {transition: Zoom, autoClose: false, position: "top-center"})
    }

    removeCard(id, name) {
        this.progressDeleteCard(name);
        axios.delete(this.state.baseUrl + "/card/" + id, {headers: this.state.myHeaders})
            .then(this.deleteCardDone)
            .then(this.getAllColumns.bind(this))
            .catch((err) => this.deleteCardError(err))
    }
/*todo*/
    takeNewColumnName(id, name) {
        this.setState({isNew: false, columnId: id, oldName: name});
        setTimeout(() => {
            toast.info(<ContentModal title={`Change column name from ${this.state.oldName} to`} progressContent={this.progressContent.bind(this)}/>,
                {autoClose: false});
        }, 100);
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

    progressAddColumn = (name) => this.toastAddColumnId = toast(`Adding ${name} column in progress, please wait...`,
        {autoClose: false, position: "top-left"});

    addColumnDone = () => toast.update(this.toastAddColumnId, {render: "Adding column DONE 😀",
        type: toast.TYPE.SUCCESS, autoClose: 5000});

    addColumnError = (error) => toast.update(this.toastAddColumnId, {render: `Adding column ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000});

    toastUpdateColumnId = null;

    progressUpdateColumn = (name, oldName) => this.toastUpdateColumnId = toast(`Updating column name from ${oldName} to ${name}, please wait...`,
        {autoClose: false, position: "top-left"});

    updateColumnDone = () => toast.update(this.toastUpdateColumnId, {render: "Updating column DONE 😀",
        type: toast.TYPE.SUCCESS, autoClose: 5000});

    updateColumnError = (error) => toast.update(this.toastUpdateColumnId, {render: `Updating column ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000});

    toastDeleteCardId = null;

    progressDeleteCard = (name) => this.toastDeleteCardId = toast(`Deleting ${name} card in progress, please wait...`,
        { autoClose: false, position: "top-left" });

    deleteCardDone = () => toast.update(this.toastDeleteCardId, {render: `Deleting card DONE 😀`,
        type: toast.TYPE.SUCCESS, autoClose: 5000 });

    deleteCardError = (error) => toast.update(this.toastDeleteCardId, {render: `Deleting card ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000});

    render() {
        return (
            <div className="main row">
                <div className="first-line row col-12">
                    <h1>{this.state.boardName}</h1>
                    <button onClick={() => {
                        toast.info(<ContentModal title="Enter the column name" progressContent={this.progressContent.bind(this)}/>,
                        {autoClose: false});
                        this.setState({isNew: true});
                    }}>Add a column</button>
                </div>
                <ColumnsList delCard={this.removeCard.bind(this)} addCard={this.addCard.bind(this)}
                             delColumn={this.removeColumn.bind(this)} takeNewColumnName={this.takeNewColumnName.bind(this)}
                             data={this.state.columns} content={this.state.content} columnId={this.state.columnId}
                             checkUpdateColumn={this.state.checkUpdateColumn}/>
                <ToastContainer/>
            </div>
        )
    }
}

export default hot(module)(App);