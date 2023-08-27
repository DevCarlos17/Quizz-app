import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/question";

const LMIT_QUESITONS = 10;

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  fetchQuestions;
  const handleClick = () => {
    fetchQuestions(LMIT_QUESITONS);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      Empezar!
    </Button>
  );
};

export default Start;
