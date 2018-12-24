import React from 'react'
import {Context} from '../MyProvider'

const Thumbnail = (props) => {
    return (
        <Context.Consumer>
            {(context) =>
                <img className="card-img-top mx-auto mt-3 img-thumbnail z-depth-2" 
                    onError={(e)=>{e.target.onerror = null; e.target.src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX28756542.jpg"}} 
                    src={`${context.state.logoApi}${props.url}`} 
                    style={{...props.cardBorder,width:'100px',height:'100px'}} 
                />
            }
        </Context.Consumer>
    )
}

export default Thumbnail;