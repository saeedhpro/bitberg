import './assets/styles/App.css';
import HeaderComponent from "./components/HeaderComponent";
import MainComponent from "./components/MainComponent";
import {useSelector} from "react-redux";

function App() {
    const isDark = useSelector(state => state.mode.isDark)
    return (
        <div dir="rtl" className={"App" + (isDark ? " is-dark" : "")}>
            <HeaderComponent />
            <MainComponent />
        </div>
    );
}

export default App;
