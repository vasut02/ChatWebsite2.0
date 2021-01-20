import React from 'react'

const Room = ({name}) => {
    return (
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <p>{name}</p>
                </div>
            </div>
        </div>
    )
}

export default Room
