import React, { Component } from 'react';
import Create from './components/CreateTask/CreateTask';
import axios from './axios-instance';
import Tasks from './components/getTasks/getTasks';
import classes from './App.module.scss';

export default class extends Component {

    state = {
        newTitle: '',
        tasks: [],
        updateId: null,
        loading: true
    }

    // did Mount
    componentDidMount() {
        this.getAllTaskHandler();
    }

    getAllTaskHandler () {
        axios.get('/newtask')
        .then(response => {
            this.setState({
                tasks: response.data.reverse(),
                loading: false
            })
        })
        .catch(err => console.log(`Error getting task ${err}`));
    }

    // inputHandler
    inputHandler = e => {
        this.setState({
            newTitle: e.target.value
        });

    }

    // Deleting Task
    taskDeleteHandler = (id) => {
        axios.delete('/newtask/'+id)
            .then(response => {
                this.getAllTaskHandler()
            })
    }

    // Edit Task
    editTaskHandler = (value, id) => {
        // update thi input bar
        this.setState({
            newTitle: value,
            updateId: id
        });
    } 

    // formSubmit
    onFormSubmit = (e) => {
        e.preventDefault();

        // task
        const task = {
            title: this.state.newTitle
        }

        if(!this.state.updateId)
        {
            axios.post('/newtask', task)
                .then(res => {
                    this.setState({ newTitle: ''})
                    this.getAllTaskHandler();
                })
        }
        else
        {
            axios.put('/newtask/'+this.state.updateId, task)
            .then(res => {
                this.setState({ newTitle: ''})
                this.getAllTaskHandler();
            })
        }
       
    }

    render() {

        // Desc
        const { newTitle, tasks, loading } = this.state;

        return (
            <div className={classes.container}>
                <h1 className={classes.headline}>Todo Task App</h1>
                <Create submit={this.onFormSubmit} value={newTitle} onChange={this.inputHandler} />
                <Tasks 
                    load={loading}
                    getTasks={tasks}
                    deleteTask={this.taskDeleteHandler}
                    editTask={this.editTaskHandler} 
                />
            </div>
        );
    }
}