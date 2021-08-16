import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import CommentList from "./CommentList";
import back from "../components/images/qq.png";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import EditIcon from "@material-ui/icons/Edit";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Typography } from "@material-ui/core";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  roots: {
    // maxWidth: ,
    display: "flex",
    justifyContent: "center",
    maxWidth: "2600px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#00ff0000",
  },
  root: {
    maxWidth: 1000,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 500,
    display: "block",
    maxWidth: 2500,
    overflow: "hidden",
    width: "100%",
  },
}));

function DetailPage({ article, onDelete }) {
  const [check, setCheck] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = article.imagePath.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const userCheck = async () => {
    const response = await axios.get(
      `http://i5c207.p.ssafy.io/curation/like/${article.id}/list`
    );
    const user = "오잉";

    {
      response.data.map((item) =>
        item.nickname.includes(user) ? setCheck(true) : setCheck(false)
      );
    }
  };
  userCheck();
  const userLike = async () => {
    const response = await axios.post(
      `http://i5c207.p.ssafy.io/curation/like/${article.id}/?userNickname=오잉`
    );
    // setCheck(true);
    userCheck();
    setCheck(!check);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        // width: "100%",
        marginBottom: "5%",
        padding: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "2000px",
        }}
      >
        {/* <img src={back} width="40%" /> */}
      </div>
      <div className={classes.roots}>
        <Card style={{ width: "70%", padding: "0" }}>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            🥨{article.title}🥨
          </h1>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img src={article.profileImage} style={{ width: "100%" }} />
              </Avatar>
            }
            subheader={article.user.nickname}
          />
          <div>
            <div className={classes.root} style={{ margin: "auto" }}>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {article.imagePath.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <img
                        className={classes.img}
                        src={step}
                        style={{ margin: "auto" }}
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              />
            </div>
          </div>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={userLike}>
              {check ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Link
              to={{
                pathname: `/update/${article.id}`,
                state: {
                  title: article.title,
                  description: article.description,
                  ingredients: article.ingredients,
                },
              }}
            >
              <IconButton aria-label="add to favorites">
                <EditIcon />
              </IconButton>
            </Link>

            {/* <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <QuestionAnswerIcon />
            </IconButton> */}
          </CardActions>
          <h4 style={{ display: "flex", justifyContent: "center" }}>
            Ingredients: {article.ingredients}
          </h4>
          <Typography
            style={{
              // display: "flex",
              // justifyContent: "center",
              margin: "35px",
              textAlign: "center",
            }}
          >
            Recipe <br />
            {article.description}
          </Typography>
          <CommentList post_id={article.id} />
        </Card>
      </div>
    </div>
  );
}

export default DetailPage;
