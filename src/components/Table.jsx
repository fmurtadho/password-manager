import React from 'react'
import moment from 'moment'

const Table = props => {
    
    return (
    <table className="table table-striped">
        <thead>
            <tr>
            {props.columns.map(column => <th scope="col">{column.name}</th>)}
            </tr>
        </thead>
        <tbody>
            {props.datas.map(data => 
            <tr>
            <td>{data.url}</td>
            <td>{data.username}</td>
            <td>{data.password}</td>
            <td>{data.createdAt}</td>
            <td>{data.updatedAt}</td>
            </tr>
            )}
        </tbody>
    </table>
    )
}

export default Table;