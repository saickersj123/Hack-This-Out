import Main from "../../components/main/Main";
import Progress from "../../components/mypage/Progress";
import UserStats from "../../components/mypage/UserStats";

const MyStats = () => {
    return (
        <Main>
            <div className="my_stats_container">
                <>
                <UserStats />
                <Progress />
                </>
            </div>
        </Main>
    );
};

export default MyStats;