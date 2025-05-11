import {
  Box,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  topheadBox: {
    "& .displaySpacebetween": {
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
    "& h3": {
      color: "#262424",
    },
    "& .roundfiled": {
      [theme.breakpoints.down("xs")]: {
        marginTop: "8px",
      },
      "& .MuiOutlinedInput-adornedStart":{
        "paddingLeft": "2px",
      },
    },
  },
}));

export default function Topheading({ heading, searchname }) {
  const classes = useStyles();
  return (
    <Box className={classes.topheadBox}>
      <Box className="displaySpacebetween">
        <Box>
          <Typography variant="h3">{heading}</Typography>
        </Box>
        {/* {searchname && (
          <Box>
            <FormControl fullWidth className="roundfiled">
              <TextField
                variant="outlined"
                placeholder={searchname}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <IoSearchOutline fontSize="25px" color="#FFFFFF" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>
        )} */}
      </Box>
      <Box mt={2} mb={2}>
        <Divider className="borderBox"/>
      </Box>
    </Box>
  );
}
