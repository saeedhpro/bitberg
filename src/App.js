import './assets/styles/App.css';
import {useEffect, useState} from "react";
import {getPriceList} from "./services/prices";
import HeaderComponent from "./components/HeaderComponent";
import MainComponent from "./components/MainComponent";

function App() {
    const [list, setList] = useState(null)
    useEffect(() => {
        getPriceList()
            .then(prices => {
                setList(prices)
            })
    }, [])
    return (
        <div dir="rtl" className="App">
            <HeaderComponent />
            <MainComponent />
        </div>
    );
}

export default App;
