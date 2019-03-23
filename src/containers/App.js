import React from "react";
import {hot} from "react-hot-loader";
import axios from "axios";
import ColumnsList from "../containers/ColumnsList";
import ContentModal from "../components/AddColumnModal";
import {ToastContainer, toast, cssTransition} from "react-toastify";
import buttonsState from "../components/buttonsState.css"

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
            cardId: null,
            oldName: "",
            isNewColumn: null,
            isNewCard: null,
            checkUpdateColumn: null,
            checkUpdateCard: null,
            isWork: false,
            progressWork: buttonsState.imDontWork,
            visibility: buttonsState.imVisible
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
            this.imBusy(true);

            if (this.state.isNewColumn) {

                setTimeout(() => {
                    this.progressAddColumn(this.state.content);
                    this.addColumn();
                }, 100);

            } else if (this.state.isNewColumn === false) {

                setTimeout(() => {
                    this.progressUpdateColumn(this.state.content, this.state.oldName);
                    this.updateColumn();
                }, 100);
            }

            if (this.state.isNewCard) {

                setTimeout(() => {
                    this.progressAddCard(this.state.content);
                    this.addCard();
                }, 100);

            } else if (this.state.isNewCard === false) {

                setTimeout(() => {
                    this.progressUpdateCard(this.state.content, this.state.oldName);
                    this.updateCard();
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
                .then(this.getAllColumns.bind(this))
                .then(this.addColumnDone.bind(this))
                .then(() => this.imBusy(false))
                .catch(err => {
                    this.addColumnError(err);
                    this.imBusy(false);
                });
            this.setState({content: "", isNewColumn: null});
        }
    }

    removeColumn(id, name) {
        this.progressDelete(name);
        this.imBusy(true);
        axios.delete(this.state.baseUrl + "/column/" + id, {headers: this.state.myHeaders})
            .then(this.getAllColumns.bind(this))
            .then(this.deleteDone.bind(this))
            .then(() => this.imBusy(false))
            .catch((err) => {
                this.deleteError(err);
                this.imBusy(false);
            });
    }

    updateColumn() {

        if (this.state.content.length > 2) {
            let updateColumn = {
                id: this.state.columnId,
                name: this.state.content
            };
            axios.put(this.state.baseUrl + "/column/" + this.state.columnId, updateColumn, {headers: this.state.myHeaders})
                .then(() => this.setState({checkUpdateColumn: true}))
                .then(this.updateColumnDone.bind(this))
                .then(() => {
                    this.setState({checkUpdateColumn: false, content: "", isNewColumn: null});
                    this.imBusy(false);
                })
                .catch((err) => {
                    this.updateColumnError(err);
                    this.imBusy(false);
                    this.setState({checkUpdateColumn: false, content: "", isNewColumn: null});
                });
        }
    }

    updateCard() {

        if (this.state.content.length > 2) {
            let updateCard = {
                name: this.state.content,
                bootcamp_kanban_column_id: this.state.columnId
            };
            axios.put(this.state.baseUrl + "/card/" + this.state.cardId, updateCard, {headers: this.state.myHeaders})
                .then(() => this.setState({checkUpdateCard: true}))
                .then(this.updateCardDone.bind(this))
                .then(() => {
                    this.setState({checkUpdateCard: false, content: "", isNewCard: null});
                    this.imBusy(false);
                })
                .catch((err) => {
                    this.updateCardError(err);
                    this.imBusy(false);
                    this.setState({checkUpdateCard: false, content: "", isNewCard: null});
                });
        }
    }

    addCard() {

        if (this.state.content.length > 2) {
            let newCard = {
                name: this.state.content,
                bootcamp_kanban_column_id: this.state.columnId
            };
            axios.post(this.state.baseUrl + "/card", newCard, {headers: this.state.myHeaders})
                .then(this.getAllColumns.bind(this))
                .then(this.addCardDone.bind(this))
                .then(() => this.imBusy(false))
                .catch((err) => {
                    this.addCardError(err);
                    this.imBusy(false);
                });
            this.setState({content: "", isNewCard: null});
        }
    }

    removeCard(id, name) {
        this.progressDeleteCard(name);
        this.imBusy(true);
        axios.delete(this.state.baseUrl + "/card/" + id, {headers: this.state.myHeaders})
            .then(this.deleteCardDone)
            .then(this.getAllColumns.bind(this))
            .then(() => this.imBusy(false))
            .catch((err) => {
                this.deleteCardError(err);
                this.imBusy(false);
            })
    }

    takeNewCardName(columnId) {
        this.setState({isNewCard: true, columnId: columnId});
        toast.info(<ContentModal title="Enter the new card contents" progressContent={this.progressContent.bind(this)}
        />, {transition: Zoom, autoClose: false, position: "top-center", onOpen: () => this.imBusy(true),
            onClose: () => {
                setTimeout(() => {this.state.content.length < 3 ? this.imBusy(false) : []
                }, 100)}})
    }


    takeNewColumnName(id, oldName) {
        this.setState({isNewColumn: false, columnId: id, oldName: oldName});
        setTimeout(() => {
            toast.info(<ContentModal title={`Change column name from ${this.state.oldName} to`}
                                     progressContent={this.progressContent.bind(this)}/>,
                {autoClose: false, onOpen: () => this.imBusy(true),
                    onClose: () => {
                        setTimeout(() => {this.state.content.length < 3 ? this.imBusy(false) : []
                        }, 100)}});
        }, 100);
    }

    takeCardNameToChange(id, oldName, columnId) {
        this.setState({isNewCard: false, cardId: id, oldName: oldName, columnId: columnId});
        setTimeout(() => {
            toast.info(<ContentModal title={`Change contents of card from ${this.state.oldName} to`}
                                     progressContent={this.progressContent.bind(this)}/>,
                {autoClose: false, position: "top-center", transition: Zoom, onOpen: () => this.imBusy(true),
                    onClose: () => {
                        setTimeout(() => {this.state.content.length < 3 ? this.imBusy(false) : []
                        }, 100)}});
        }, 100);
    }

    imBusy(isBusy) {
        this.setState({
            isWork: isBusy,
            progressWork: isBusy ? buttonsState.imWork : buttonsState.imDontWork,
            visibility: isBusy ? buttonsState.imHidden : buttonsState.imVisible
        });
    }

    tooLittle = () => toast.error("You must enter at least 3 characters!!!", {autoClose: 5000, position: "top-left"});

    toastDeleteId = null;

    progressDelete = (name) => this.toastDeleteId = toast(`Deleting ${name} column in progress, please wait...`,
        {autoClose: false, position: "top-left"});

    deleteDone = () => toast.update(this.toastDeleteId, {
        render: `Deleting column DONE 😀`,
        type: toast.TYPE.SUCCESS, autoClose: 5000
    });

    deleteError = (error) => toast.update(this.toastDeleteId, {
        render: `Deleting ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000
    });

    toastAddColumnId = null;

    progressAddColumn = (name) => this.toastAddColumnId = toast(`Adding ${name} column in progress, please wait...`,
        {autoClose: false, position: "top-left"});

    addColumnDone = () => toast.update(this.toastAddColumnId, {
        render: "Adding column DONE 😀",
        type: toast.TYPE.SUCCESS, autoClose: 5000
    });

    addColumnError = (error) => toast.update(this.toastAddColumnId, {
        render: `Adding column ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000
    });

    toastUpdateColumnId = null;

    progressUpdateColumn = (name, oldName) => this.toastUpdateColumnId = toast(`Updating column name from ${oldName} to ${name}, please wait...`,
        {autoClose: false, position: "top-left"});

    updateColumnDone = () => toast.update(this.toastUpdateColumnId, {
        render: "Updating column DONE 😀",
        type: toast.TYPE.SUCCESS, autoClose: 5000
    });

    updateColumnError = (error) => toast.update(this.toastUpdateColumnId, {
        render: `Updating column ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000
    });

    toastDeleteCardId = null;

    progressDeleteCard = (name) => this.toastDeleteCardId = toast(`Deleting card with contents ${name} in progress, please wait...`,
        {autoClose: false, position: "top-left"});

    deleteCardDone = () => toast.update(this.toastDeleteCardId, {
        render: `Deleting card DONE 😀`,
        type: toast.TYPE.SUCCESS, autoClose: 5000
    });

    deleteCardError = (error) => toast.update(this.toastDeleteCardId, {
        render: `Deleting card ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000
    });

    toastAddCardId = null;

    progressAddCard = (name) => this.toastAddCardId = toast(`Adding contents: ${name} to card in progress, please wait...`,
        {autoClose: false, position: "top-left"});

    addCardDone = () => toast.update(this.toastAddCardId, {
        render: "Adding card DONE 😀",
        type: toast.TYPE.SUCCESS, autoClose: 5000
    });

    addCardError = (error) => toast.update(this.toastAddCardId, {
        render: `Adding card ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000
    });

    toastUpdateCardId = null;

    progressUpdateCard = (contents, oldContents) => this.toastUpdateCardId = toast(`Updating contents of card from ${oldContents} to ${contents}, please wait...`,
        {autoClose: false, position: "top-left"});

    updateCardDone = () => toast.update(this.toastUpdateCardId, {
        render: "Updating contents of card DONE 😀",
        type: toast.TYPE.SUCCESS, autoClose: 5000
    });

    updateCardError = (error) => toast.update(this.toastUpdateCardId, {
        render: `Updating contents of card ERROR !!! ${error}`,
        type: toast.TYPE.ERROR, autoClose: 5000
    });

    render() {
        return (
            <div className="main row">
                <div className="first-line row col-12">
                    <h1>{this.state.boardName}</h1>
                    <button onClick={() => {
                        toast.info(<ContentModal title="Enter the column name"
                                                 progressContent={this.progressContent.bind(this)}/>,
                            {autoClose: false, onOpen: () => this.imBusy(true), onClose: () => {
                                    setTimeout(() => {this.state.content.length < 3 ? this.imBusy(false) : []
                            }, 100)}});
                        this.setState({isNewColumn: true});
                    }} disabled={this.state.isWork} className={this.state.progressWork}>Add a column
                    </button>
                </div>
                <ColumnsList delCard={this.removeCard.bind(this)} takeNewCardName={this.takeNewCardName.bind(this)}
                             delColumn={this.removeColumn.bind(this)} isWork={this.state.isWork}
                             takeNewColumnName={this.takeNewColumnName.bind(this)} progressWork={this.state.progressWork}
                             data={this.state.columns} content={this.state.content} columnId={this.state.columnId}
                             checkUpdateColumn={this.state.checkUpdateColumn} visibility={this.state.visibility}
                             takeCardNameToChange={this.takeCardNameToChange.bind(this)}
                             cardId={this.state.cardId} checkUpdateCard={this.state.checkUpdateCard}/>
                <ToastContainer/>
            </div>
        )
    }
}

export default hot(module)(App);