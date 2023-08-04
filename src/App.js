import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Calculator from "./pages/Calculator";
import Home from "./pages/Home";
import { FormProvider } from "./context/FormProvider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="calculator"
          element={
            <FormProvider>
              <Calculator />
            </FormProvider>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
