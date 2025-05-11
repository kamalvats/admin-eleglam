import React from "react";
import {
  TableContainer,
  Table,
  Box,
  TableCell,
  TableBody,
  makeStyles,
  TableRow,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles((theme) => ({
  PostBox: {
    backgroundColor: "theme",
    position: "relative",

    "& .MuiCardHeader-root": {
      padding: "0 0 16px 0",
    },
    "& .MuiCardContent-root": {
      padding: "16px 16px 16px 0",
    },
  },
  postImg: {
    height: 300,
  },
}));
export default function TopTradingSkeleton({ skeleton }) {
  const classes = useStyles();
  return (
    <Box className={classes.PostBox}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              {skeleton &&
                skeleton?.map((data, index) => (
                  <TableCell key={index}>
                    <Skeleton
                      animation="wave"
                      height={15}
                      width="40%"
                      style={{ marginBottom: 6 }}
                    />
                  </TableCell>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
