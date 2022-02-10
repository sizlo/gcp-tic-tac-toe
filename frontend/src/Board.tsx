import Cell from "./Cell";
import "./Board.css";

function Board() {
    return (
        <div className="Board">
            <div className="boardContent">
                <div className="row">
                    <Cell borderClasses="borderRight borderBottom" index={0} />
                    <Cell borderClasses="borderLeft borderRight borderBottom" index={1} />
                    <Cell borderClasses="borderLeft borderBottom" index={2} />
                </div>
                <div className="row">
                    <Cell borderClasses="borderRight borderTop borderBottom" index={3} />
                    <Cell borderClasses="borderLeft borderRight borderTop borderBottom" index={4} />
                    <Cell borderClasses="borderLeft borderTop borderBottom" index={5} />
                </div>
                <div className="row">
                    <Cell borderClasses="borderRight borderTop" index={6} />
                    <Cell borderClasses="borderLeft borderRight borderTop" index={7} />
                    <Cell borderClasses="borderLeft borderTop" index={8} />
                </div>
                </div>
        </div>
    )
}

export default Board;