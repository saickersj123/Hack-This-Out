import React, { useState } from "react";
import Main from '../../components/section/Main';
import Machine from "./Machine";
import '../../css/Contest.scss';

const Contest = () => {
    const [activeTab, setActiveTab] = useState("Machine");

    const renderContent = () => {
        switch (activeTab) {
            case "Machine":
                return <Machine />;
            default:
                return <Machine />;
        }
    };

    return (
        <Main title="Contest" description="Contest 화면입니다.">
            <div className="event">대회같은 event를 추가</div>
            <div>
                <nav className="tab" style={{ display: "flex", gap: "0px", marginBottom: "20px" }}>
                    <button onClick={() => setActiveTab("Machine")}>Machine</button>
                </nav>
                <div>{renderContent()}</div>
            </div>
        </Main>
    );

};

export default Contest;
