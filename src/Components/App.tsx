import * as React from 'react';
import Header from './Header/Header';
import { Routes, Route } from 'react-router-dom';
import RouterTest from "./RouterTest/RouterTest";
import Recipes from './Recipes/Recipes'

const App: React.FC = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/recipes" element={<Recipes/>}/>
                <Route path="/routertest" element={<RouterTest/>}/>
                <Route path="*" element={<Recipes/>}/>
            </Routes>
        </>
    )
}

export default App