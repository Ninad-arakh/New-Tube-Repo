import { Provider } from "react-redux";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Store from "./Utiliy/Store/Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainBody from "./Components/MainBody";
import Watch from "./Components/Watch";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainBody />,
      },
      {
        path: "watch",
        element: <Watch />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={Store}>
      <div className="  w-full">
        <Header />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
