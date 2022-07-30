import { useEffect } from "react";

const W = window as any;

export function GreetingPage() {
    useEffect(() => {
        W.initGreetingForm();
    }, []);

    return (
        <div className="greeting-form-container">
            <div className="greeting-form">
                <input type="text" id="userNameInput" placeholder="Enter your name" onKeyUp={(e) => W.saveUserName(e.currentTarget.value)}></input>
                <button className="_hidden" id="createRoomButton" onClick={() => W.createRoom()}>Create Room</button>
                <button className="_hidden" id="backToRoomButton" onClick={() => W.backToRoom()}>Back to Room</button>
            </div>
        </div>
    )
}