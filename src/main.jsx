import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/system";
import Login from "./pages/auth/Login.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <div>Not Found</div> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </NextUIProvider>
  </StrictMode>
);
