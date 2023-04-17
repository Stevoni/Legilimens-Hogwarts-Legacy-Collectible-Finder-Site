import React from 'react'
import './style/App.css';
import AchievementsPage from './AchievementsPage';
import Header from "./Header";
import Footer from "./Footer";

function App() {

    return (
        <div className="app">
            <Header/>
            <AchievementsPage/>
            <Footer />
        </div>
    );
}

export default App;
