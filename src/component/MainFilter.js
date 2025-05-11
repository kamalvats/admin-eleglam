import {
  Box,
  Paper,
  makeStyles,
  Grid,
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";

import React, { useMemo } from "react";
import { IoSearchOutline } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  mainTopBox: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px !important",
    },
  },
  mainfilter: {
    "& .displayEnd": {
      marginTop: "30px",
    },
    "& .filterpaper": {
      padding: "30px",
    },
  },
  filterBox: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
    "& .MuiIconButton-root": {
      padding: "0px",
    },
    "& p": {
      paddingRight: "20px",
    },
    "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: "rgb(24 141 242)",
      color: "#fff",
    },
  },
  resetBtnBox: {
    [theme.breakpoints.up("md")]: {
      padding: "10px 28px",
    },
  },
}));

const menuArray = [
  { key: "Completed", value: "Completed" },
  { key: "Pending", value: "Pending" },
  { key: "Cancelled", value: "Cancelled" },
];
const checkBlockArray = [
  { key: "Active", value: "Active" },
  { key: "In-Active", value: "InActive" },
];

export default function MainFilter({
  selectFilter,
  setSelectFilter,
  handleCallApi,
  type,
  types,
  placeholder,
  fromDate,
  setFromDate,
  search,
  setSearch,
  toDate,
  setToDate,
  handleSortChange,
  sortCriteria,
  handleClear,
}) {
  const classes = useStyles();

  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    elevation: 0,
    PaperProps: {
      style: {
        top: "0px !important",
        maxHeight: 250,
      },
    },
  };

  const checkArray = useMemo(() => {
    return type === "Product" ? menuArray : checkBlockArray;
  }, [type]);

  return (
    <Box className={classes.mainTopBox}>
      <Paper elevation={2} style={{ padding: "15px 20px 20px" }}>
       
        <Grid container spacing={1} alignItems="end">
          {types !== "API" && (
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="body2">Search</Typography>
              <FormControl fullWidth className="roundfiled">
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder={placeholder}
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="bottom">
                        <IconButton
                          style={{ display: "flex", alignItems: "flex-end" }}
                        >
                          <IoSearchOutline
                            fontSize="25px"
                            color="rgb(0 0 0 / 44%)"
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
          )}
          {types !== "API" && (
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="body2">Status</Typography>
              <Box className={classes.filterBox}>
                <FormControl fullWidth className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    fullWidth
                    MenuProps={menuProps}
                    value={sortCriteria}
                    onChange={handleSortChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {checkArray.map((itm, i) => {
                      return <MenuItem value={itm.value}>{itm.key}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography variant="body2">From</Typography>
            <Box className={classes.filterBox}>
              <FormControl fullWidth>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="MM/DD/YYYY"
                  placeholder="From Date"
                  disableFuture
                  InputProps={{ readOnly: true }}
                  value={fromDate}
                  onChange={(date) => {
                    setFromDate(new Date(date));
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography variant="body2">To</Typography>
            <Box className={classes.filterBox}>
              <FormControl fullWidth>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="MM/DD/YYYY"
                  placeholder="To Date"
                  InputProps={{ readOnly: true }}
                  value={toDate}
                  disableFuture
                  onChange={(date) => {
                    setToDate(date);
                  }}
                  disabled={!fromDate}
                  minDate={fromDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={types !== "API" ? 12 : 12}
            sm={types !== "API" ? 12 : 12}
            md={types !== "API" ? 12 : 6}
            lg={types !== "API" ? 12 : 6}
            align="right"
            style={{
              alignItems: "end",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Box className="displayEnd" style={{ marginTop: "6px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClear()}
              >
                Clear
              </Button>
              &nbsp; &nbsp;
              <Box className="rectangularButton">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCallApi()}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
