import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  inputbutton: {
    padding: "6px 25px",
    backgroundColor: "#FF6600",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
  },
  button: {
    margin: theme.spacing(1),
  },
  roots: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Update({
  onCreate,
  onChange,
  title,
  description,
  ingredients,
  uploadFile,
  post_id,
  history,
}) {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: "50px",
        padding: "30px",
      }}
    >
      <div style={{ margin: "auto" }}>
        <div
          className={classes.roots}
          style={{
            width: "100%",
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                작성요령가이드
              </Typography>
              <LiveHelpIcon />
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                ✔ 창의력 넘치는 멋진 제목을 만들어 주세요!! <br />
                ✔ 나만의 레시피를 자유롭게 작성해주세요!!
                <br />
                ✔ ingredients란에 재료를 적어주세요!! <br />✔ 요리 사진을
                자유롭게 올려주세요!!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>주의!</Typography>
              <WarningIcon />
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                타인을 비방하는 목적으로 글을 작성하면, "오늘저녁은미정"
                이용수칙 10조 2항에 의거 강제 탈퇴됨을 알립니다.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <form
          onSubmit={() => onCreate()}
          action={`/articles/detail/${post_id}`}
        >
          <div>
            <TextField
              onChange={onChange}
              id="standard-basic"
              label="제목"
              name="title"
              value={title}
              style={{ width: "100%" }}
              required
            />
          </div>
          <div>
            <textarea
              onChange={onChange}
              label="description"
              value={description}
              name="description"
              style={{ width: "100%", height: "300px" }}
              placeholder="레시피 입력"
              required
            />
          </div>
          <div>
            <TextField
              onChange={onChange}
              id="outlined-basic"
              label="-Ingredients"
              value={ingredients}
              name="ingredients"
              style={{ width: "100%" }}
              required
            />
          </div>
          <div style={{ margin: "8px" }}>
            <input
              id="upload-file"
              type="file"
              accept="image/*"
              multiple
              onChange={uploadFile}
            />
          </div>

          <button>등록</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
