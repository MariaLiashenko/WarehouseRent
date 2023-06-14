import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";

const queryClient = new QueryClient({
    defaultOptions: {
        cacheTime: Infinity,
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <SearchContextProvider>
                <App />
            </SearchContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);
