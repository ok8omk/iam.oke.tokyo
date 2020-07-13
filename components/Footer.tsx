import { FC } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  container: {
    background: "#546e7a",
    width: "100%",
    textAlign: "center",
    padding: "1.5rem",
    color: "#fff",
  },
});

const View: FC = () => {
  const classes = useStyles();
  return (
    <Container
      component="footer"
      maxWidth={false}
      disableGutters
      className={classes.container}
    >
      <Typography variant="body1" component="span">
        This site uses Google Analytics.
      </Typography>
    </Container>
  );
};

export default View;
