import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./routes/homepage/homepage.component";
import Navigation from "./routes/navigation/navigation.component";

const Shop = () => {
  return <h1>This is the shop page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
