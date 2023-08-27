import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuestionsStore } from "../store/question";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { type Question as QuestionType } from "../types";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import getBackGroundColor from "../helper/getBgColor";

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card
      variant="outlined"
      sx={{ textAlign: "left", bgcolor: "#222", p: 2, marginTop: 4 }}>
      {/* Question */}
      <Typography variant="h5">{info.question}</Typography>

      {/* Code */}
      <SyntaxHighlighter lenguage="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      {/* Answer list */}
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackGroundColor(info, index) }}>
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Question;
