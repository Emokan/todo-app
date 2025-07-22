import React from "react";
import TodoList from "../components/TodoList";

const Home = ({ onLogout }) => {
    return(
        <div>
            <h1>Görevlerim</h1>
            <button onClick={onLogout}>Çikiş Yap</button>
            <TodoList />
        </div>
    );
};

export default Home;