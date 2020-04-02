import React from 'react';
import './CreateTask.module.scss';

export default ({value, onChange, submit}) => {
    return (
        <form onSubmit={submit}>
            <input onChange={onChange}  value={value} type="text" placeholder="New task..." />
            <input type="submit" />
        </form>
    );
}