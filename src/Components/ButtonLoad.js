import React from "react";


const ButtonLoad = ({loadBtn, loading}) =>{
    
    return(
        <button 
        className={`loading_btn ${loading ? 'loading' : ''}`}
        onClick={()=>loadBtn()}
        >
            Load party
        </button>
    )
}
export default ButtonLoad