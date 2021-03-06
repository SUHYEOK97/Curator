import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function CommentList({ post_id, user }) {
  const [comment, setComment] = useState(null);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    const authLogin = async () => {
      const config = {
        withCredentials: true,
      };
      const auth = await axios.get(
        "http://i5c207.p.ssafy.io:9000/curation/currentLogin",
        config
      );
      if (auth.data.nickname === "") {
      }
      setCurrentUser(auth.data.nickname);
    };
    const commentList = async () => {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(
        `http://i5c207.p.ssafy.io:9000/curation/post/${post_id}/commentList`,
        config
      );
      setComment(response.data);
    };
    const fetchArticle = async () => {
      try {
        setArticle(null);
        setLoading(true);
        const config = {
          withCredentials: true,
        };
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/post/${post_id}`,
          config
        );

        setArticle(response.data);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    commentList();
    authLogin();
    fetchArticle();
  }, []);

  const [text, setText] = useState({
    nickname: user,
    content: "",
    postId: post_id,
  });
  const { nickname, content, postId } = text;
  const onChange = (e) => {
    const { value, name } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };
  if (loading) return <div>?????????..</div>;
  if (error) return <div>????????? ??????????????????</div>;
  if (!article) return null;

  const onCreate = () => {
    let formData = new FormData();

    formData.append("nickname", nickname);
    formData.append("content", content);
    formData.append("postId", postId);

    const authLogin = async () => {
      const config = {
        withCredentials: true,
      };
      const auth = await axios.get(
        "http://i5c207.p.ssafy.io:9000/curation/currentLogin/",
        config
      );
      if (auth.data.nickname === "") {
      }
      setCurrentUser(auth.data.nickname);
    };

    try {
      const config = {
        withCredentials: true,
      };
      axios.post(
        `http://i5c207.p.ssafy.io/curation/post/${post_id}/commentList`,
        formData,
        config,
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    setText({ nickname: user });
    const fetchArticle = async () => {
      try {
        setArticle(null);
        setLoading(true);
        const config = {
          withCredentials: true,
        };
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/post/${post_id}`,
          config
        );

        setArticle(response.data);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    authLogin();
    fetchArticle();

    window.scrollTo = window.scrollY;
  };
  const onDelete = (comment_id) => {
    const authLogin = async () => {
      const config = {
        withCredentials: true,
      };
      const auth = await axios.get(
        "http://i5c207.p.ssafy.io:9000/curation/currentLogin/",
        config
      );
      if (auth.data.nickname === "") {
      }
      setCurrentUser(auth.data.nickname);
    };
    const config = {
      withCredentials: true,
    };
    axios.delete(
      ` http://i5c207.p.ssafy.io/curation/post/${post_id}/commentList/${comment_id}`,
      config
    );
    const fetchArticle = async () => {
      try {
        setArticle(null);
        setLoading(true);
        const config = {
          withCredentials: true,
        };
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/post/${post_id}`,
          config
        );

        setArticle(response.data);
        authLogin();
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    fetchArticle();
    fetchArticle();
    window.scrollTo = window.scrollY;
  };

  return (
    <div>
      {article.comment.length >= 1 ? (
        article.comment.map((com, index) => (
          <div
            key={index}
            style={{
              margin: "20px",
            }}
          >
            <p key={com.id}>
              {com.user !== null ? com.user.nickname : null}: {com.content}
              {com.user.nickname === user ? (
                <IconButton
                  style={{ padding: "0px" }}
                  aria-label="delete"
                  onClick={() => onDelete(com.id)}
                >
                  <HighlightOffIcon />
                </IconButton>
              ) : null}
            </p>
          </div>
        ))
      ) : (
        <p style={{ margin: "20px" }}> ????????? ?????????????</p>
      )}
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          value={content}
          onChange={onChange}
          name="content"
          id="standard-basic"
          label="????????? ????????? ??????:)"
          hidden="hidden"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onCreate();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={onCreate}>
                <BorderColorRoundedIcon />
              </IconButton>
            ),
          }}
        />
      </form>
    </div>
  );
}

export default CommentList;
