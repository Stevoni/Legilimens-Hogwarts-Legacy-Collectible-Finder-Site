import logo from './logo.svg';
import './style/App.css';
import AchivementsPage from './AchivementsPage';
import Header from "./Header";
import Footer from "./Footer";
import initSqlJs from 'sql.js';

function App() {

    return (
        <div className="app">
            <Header/>
            <AchivementsPage/>
            <Footer />
        </div>
    );
}

export default App;
