import { FC } from "react";
import Link from "@material-ui/core/Link";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const View: FC = () => {
  return (
    <Appbar position="relative" variant="outlined">
      <Toolbar>
        <Typography variant="h6" component="p">
          <Link href="/" color="textPrimary">
            iam.oke.tokyo
          </Link>
        </Typography>
      </Toolbar>
    </Appbar>
  );
};

export default View;
