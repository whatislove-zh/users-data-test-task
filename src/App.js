import { Header } from "./components/Header";
import { Container } from "@mui/system";
import { Hero } from "./components/Hero";

function App() {
  return (
    <>
      <Container disableGutters maxWidth="lg">
        <Header />
        <Hero />
      </Container>
    </>
  );
}

export default App;
