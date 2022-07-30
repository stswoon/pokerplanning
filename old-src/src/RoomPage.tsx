import React from "react";
import { useEffect } from "react";

const W = window as any;

let inited = false;

function RoomPage() {
    useEffect(() => {
        if (!inited) { //TOD WA
            W.initRoom();
            inited = true;
        }
    }, []);

    return (
        <div className="room-container">
            <div className="room">

                <div className="room__info">
                    <button className="room__info-item" onClick={() => W.clearCards()}>Clear cards</button>
                    <button className="room__info-item" onClick={() => W.flipCards()}>Flip cards</button>
                    <div id="info-average" className="room__info-item">
                        <div>Average: ??</div>
                    </div>
                    <div id="info-user-cards" className="room__info-item"></div>
                </div>

                <div className="room__floor-container">
                    <div className="room__table-bench" id="bench-up"></div>
                    <div className="room__table-carpet">
                        <div className="room__table-carpet__left"></div>
                        <div className="room__table-carpet__middle">
                            <div className="room__table" id="table-up"></div>
                            <div className="room__table" id="table-down"></div>
                        </div>
                        <div className="room__table-carpet__right"></div>
                    </div>
                    <div className="room__table-bench" id="bench-down"></div>
                </div>

                <div className="room__cards">
                    <button onClick={() => W.throwCard(0)}>0</button>
                    <button onClick={() => W.throwCard(0.5)}>1/2</button>
                    <button onClick={() => W.throwCard(1)}>1</button>
                    <button onClick={() => W.throwCard(2)}>2</button>
                    <button onClick={() => W.throwCard(3)}>3</button>
                    <button onClick={() => W.throwCard(4)}>4</button>
                    <button onClick={() => W.throwCard(5)}>5</button>
                    <button onClick={() => W.throwCard(6)}>6</button>
                    <button onClick={() => W.throwCard(7)}>7</button>
                    <button onClick={() => W.throwCard(8)}>8</button>
                    <button onClick={() => W.throwCard(9)}>9</button>
                    <button onClick={() => W.throwCard(10)}>10</button>
                    <button onClick={() => W.throwCard(12)}>12</button>
                    <button onClick={() => W.throwCard(15)}>15</button>
                    <button onClick={() => W.throwCard(30)}>30</button>
                    <button onClick={() => W.throwCard('?')}>?</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(RoomPage)