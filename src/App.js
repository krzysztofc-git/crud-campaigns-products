import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Read />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/read",
    element: <Read />,
  },
  {
    path: "/update",
    element: <Update />,
  }
]);

function App() {
  return (
    <>
      <h1 id="title">CRUD Campaigns Products</h1>
      <main>
        <RouterProvider router={router} />
        <br />
      </main>
    </>
  );
}

export default App;
