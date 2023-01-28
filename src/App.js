import { Header } from "./components/Header";
import { Container } from "@mui/system";
import { Hero } from "./components/Hero";
import { Users } from "./components/Users";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <>
      <Container disableGutters maxWidth="lg">
        <Header />
        <Hero />
        <Users />
        <SignUp />
      </Container>
    </>
  );
}

export default App;
