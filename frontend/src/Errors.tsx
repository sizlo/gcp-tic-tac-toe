import React from 'react';
import { StateContext } from "./StateContext";

function Errors() {
    const { state } = React.useContext(StateContext);

    let content = <React.Fragment />

    if (state.errors.length > 0) {
        const list = state.errors.map((error, index) => <div key={index}>{error}</div>);

        content = (
            <React.Fragment>
                <div className="header">Errors</div>
                {list}
            </React.Fragment>
        );
    }

    return (
        <div className="Errors">
            {content}
        </div>
    )
}

export default Errors;