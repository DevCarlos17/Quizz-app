import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import JavaScriptLogo from "./JavaScriptLogo";

import { useQuestionsStore } from "./store/question";
import Game from "../src/components/Game";
import Start from "./components/Start";

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center">
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            Javascript Quizz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
