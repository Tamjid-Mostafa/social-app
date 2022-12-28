import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import PostProvider from "./context/PostProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PostProvider>
          <Toaster />
          <App />
        </PostProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
