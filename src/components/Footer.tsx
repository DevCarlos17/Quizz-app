import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/question";
import useQuestionsData from "../hooks/useQuestionsData";

const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓${unanswered} sin responder`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button variant="contained" onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
