import './App.css';
import './reset.css';
import {TaskList} from "./components/TaskList.tsx";
import styled from "styled-components";

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

function App() {

    return (
        <AppContainer>
            <TaskList />
        </AppContainer>
    )
}

export default App
