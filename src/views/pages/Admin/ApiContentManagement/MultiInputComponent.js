import React from "react";
import {
  Grid,
  Box,
  FormHelperText,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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
const MultiInputComponent = ({
  data,
  handleChangeInput,
  _onInputChange1,
  index,
  teamsDataError,
  type,
  classes,
  disabled,
}) => {
  return (
    <div>
      {type == "input" && (
        <Grid spacing={2} container>
          <Grid item xs={12} sm={6}>
            <Box className="inputfield">
              <label>Name</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                name="name"
                value={data.name}
                autoComplete="off"
                required
                disabled={disabled}
                error={
                  // eslint-disable-next-line
                  (teamsDataError && data.name == undefined) || // eslint-disable-next-line
                  (teamsDataError && data.name == "")
                }
                onChange={(e) => handleChangeInput(e, index, "name")}
              />
              <FormHelperText error>
                {(teamsDataError && // eslint-disable-next-line
                  data.name == undefined &&
                  "Please enter name.") || // eslint-disable-next-line
                  (teamsDataError && data.name == "" && "Enter name.")}
              </FormHelperText>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="inputfield">
              <label>Description </label>
              <TextField
                id="outlined-basic"
                fullWidth
                variant="outlined"
                name="description"
                value={data.description}
                disabled={disabled}
                autoComplete="off"
                required
                error={
                  // eslint-disable-next-line
                  (teamsDataError && data.description == undefined) || // eslint-disable-next-line
                  (teamsDataError && data.description == "")
                }
                onChange={(e) => handleChangeInput(e, index, "description")}
              />
              <FormHelperText error>
                {(teamsDataError && // eslint-disable-next-line
                  data.description == undefined &&
                  "Please enter description.") ||
                  (teamsDataError && // eslint-disable-next-line
                    data.description == "" &&
                    "Please enter description.")}
              </FormHelperText>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="inputfield">
              <label>Data Type </label>
              <FormControl fullWidth className={classes.formControl}>
                <Select
                  labelId={`demo-simple-select-label ${index}`}
                  id={`demo-simple-select ${index}`}
                  name="dataType"
                  MenuProps={menuProps}
                  variant="outlined"
                  disabled={disabled}
                  fullWidth
                  value={data.dataType}
                  onChange={(e) => handleChangeInput(e, index, "dataType")}
                  error={
                    // eslint-disable-next-line
                    (teamsDataError && data.dataType == undefined) || // eslint-disable-next-line
                    (teamsDataError && data.dataType == "")
                  }
                  displayEmpty 
                >
                  <MenuItem value="" disabled>
                    Select Data Type
                  </MenuItem>
                  <MenuItem value={"integer"}>Integer</MenuItem>
                  <MenuItem value={"string"}>String</MenuItem>
                  <MenuItem value={"number"}>Number</MenuItem>
                  <MenuItem value={"boolean"}>Boolean</MenuItem>
                </Select>
                <FormHelperText error>
                  {(teamsDataError && // eslint-disable-next-line
                    data.dataType == undefined &&
                    " Please select dataType.") || // eslint-disable-next-line
                    (teamsDataError &&
                      data.dataType == "" &&
                      " Please select dataType.")}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="inputfield">
              <FormControl component="fieldset">
                <label component="legend">Is Required Key</label>
                <RadioGroup
                  aria-label="gender"
                  name="required"
                  value={data.required}
                  disabled={disabled}
                  row
                  // style={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value={true}
                    name={"true"}
                    control={<Radio />}
                    label={"true"}
                    disabled={disabled}
                    onChange={(e) => handleChangeInput(e, index, "required")}
                  />
                  <FormControlLabel
                    value={false}
                    name={"false"}
                    control={<Radio />}
                    disabled={disabled}
                    label={"false"}
                    onChange={(e) => handleChangeInput(e, index, "required")}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box className="inputfield">
              <FormControl component="fieldset">
                <label component="legend">Request parameter type</label>
                <RadioGroup
                  aria-label="gender"
                  name="payloadType"
                  value={data.payloadType}
                  disabled={disabled}
                  row
                  // style={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value={"FORMDATA"}
                    name={"FORMDATA"}
                    control={<Radio />}
                    label={"FORMDATA"}
                    disabled={disabled}
                    onChange={(e) => handleChangeInput(e, index, "payloadType")}
                  />
                  <FormControlLabel
                    value={"QUERY"}
                    name={"QUERY"}
                    control={<Radio />}
                    disabled={disabled}
                    label={"QUERY"}
                    onChange={(e) => handleChangeInput(e, index, "payloadType")}
                  />
                  <FormControlLabel
                    value={"PATH"}
                    name={"PATH"}
                    control={<Radio />}
                    disabled={disabled}
                    label={"PATH"}
                    onChange={(e) => handleChangeInput(e, index, "payloadType")}
                  />
                  <FormControlLabel
                    value={"BODY"}
                    name={"BODY"}
                    control={<Radio />}
                    disabled={disabled}
                    label={"BODY"}
                    onChange={(e) => handleChangeInput(e, index, "payloadType")}
                  />
                </RadioGroup>
                <FormHelperText error>
                  {(teamsDataError && // eslint-disable-next-line
                    data.payloadType == undefined &&
                    " Please select parameter type.") || // eslint-disable-next-line
                    (teamsDataError &&
                      data.payloadType == "" &&
                      " Please select parameter type.")}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      )}
      {type == "response" && (
        <Grid spacing={2} container>
          <Grid item xs={12} sm={6}>
            <Box className="inputfield numberTextField">
              <label>Response Code</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                name="name"
                type="number"
                value={data.responseCode}
                disabled={disabled}
                autoComplete="off"
                required
                error={
                  (teamsDataError && data.responseCode === 0) ||
                  (teamsDataError && data.responseCode === undefined) ||
                  (teamsDataError && data.responseCode === "") ||
                  (teamsDataError && isNaN(data.responseCode))
                }
                // onChange={(e) => handleChangeInput(e, index, "responseCode")}
                onKeyPress={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (e.target.value && e.target.value !== "-") {
                    _onInputChange1(e, index, "responseCode");
                  } else {
                    handleChangeInput(e, index, "responseCode");
                  }
                }}
              />
              <FormHelperText error>
                {(teamsDataError &&
                  data.responseCode === undefined &&
                  "Please enter response code.") ||
                  (teamsDataError &&
                    data.responseCode === 0 &&
                    "Please enter a valid response code.") ||
                  (teamsDataError &&
                    data.responseCode === "" &&
                    "Please enter response code.") ||
                  (teamsDataError &&
                    isNaN(data.responseCode) &&
                    "Please enter a valid number.")}
              </FormHelperText>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="inputfield">
              <label>Response Message </label>
              <TextField
                id="outlined-basic"
                fullWidth
                variant="outlined"
                name="responseMessage"
                value={data.responseMessage}
                disabled={disabled}
                autoComplete="off"
                required
                error={
                  // eslint-disable-next-line
                  (teamsDataError && data.responseMessage == undefined) || // eslint-disable-next-line
                  (teamsDataError && data.responseMessage == "")
                }
                onChange={(e) => handleChangeInput(e, index, "responseMessage")}
              />
              <FormHelperText error>
                {(teamsDataError && // eslint-disable-next-line
                  data.responseMessage == undefined &&
                  "Please enter responseMessage.") ||
                  (teamsDataError && // eslint-disable-next-line
                    data.responseMessage == "" &&
                    "Please enter responseMessage.")}
              </FormHelperText>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default MultiInputComponent;
