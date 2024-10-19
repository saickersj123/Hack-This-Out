import React, { useState } from "react";
import Main from '../components/section/Main.jsx';
import MachineList from "../components/contest/MachineList";
import '../assets/scss/contest/ContestPage.scss';
import withAuth from '../components/withAuth';

const ContestPage = () => {
    const [activeTab, setActiveTab] = useState("Machine");

    const renderContent = () => {
        switch (activeTab) {
            case "Machine":
                return <MachineList />;
            default:
                return <MachineList />;
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

export default withAuth(ContestPage);
