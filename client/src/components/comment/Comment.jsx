import React from 'react'

function Comment(props) {
    return (
        <div className='row py-2 px-2 bg-light my-1'>
            <div className='col'>
                <i><b>{props.name}</b></i> : {props.cmnt}
            </div>
        </div>
    )
}

export default Comment
