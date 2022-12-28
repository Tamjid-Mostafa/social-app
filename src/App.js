import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Social App</title>
        <link rel="" href="" />
      </Helmet>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
