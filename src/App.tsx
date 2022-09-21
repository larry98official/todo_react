import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ErrorBoundary from "./pages/views/error/errorPage";
import {NotFound} from "./pages/views/error/notFound";
import Home from "./pages/views/firstView/home";
import {RecoilRoot} from "recoil";

export default function App() {
    return (
        <div>
            <ErrorBoundary>
                <BrowserRouter>
                    <RecoilRoot>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/active" element={<Home/>}/>
                            <Route path="/completed" element={<Home/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </RecoilRoot>
                </BrowserRouter>
            </ErrorBoundary>
        </div>
    );
}
