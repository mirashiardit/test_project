import AxiosHelper from "@/helpers/axios.helper";
import withAxiosHelper from "@/hocs/withAxiosHelper";
import { App } from "@/interfaces/data/app.interface";
import { Button, FormGroup, TextField } from "@mui/material";
import { useState } from "react";

import styles from "../styles/applications-page.module.css";

interface ApplicationPostInputProps {
  axiosHelper?: AxiosHelper;
  onFetchApplications: () => void;
}

function ApplicationPostInput({
  onFetchApplications,
  axiosHelper,
}: ApplicationPostInputProps) {
  const [textInput, setTextInput] = useState<string>("");

  const [postApplicationLoading, setPostApplicationLoading] =
    useState<boolean>(false);
  const [postApplicationError, setPostApplicationError] = useState<string>("");

  const postApplicationHandler = async (url: string) => {
    try {
      setPostApplicationLoading(true);
      await axiosHelper?.request<App>({
        method: "POST",
        url: "/apps",
        data: {
          url,
        },
      });

      setPostApplicationLoading(false);
      setPostApplicationError("");
      setTextInput("");
      onFetchApplications();
    } catch (err: any) {
      setPostApplicationError(err.response?.data?.error || err.message);
      setPostApplicationLoading(false);
    }
  };

  const onChangeTextInput = (value: string) => {
    setPostApplicationError("");
    setTextInput(value);
  };

  return (
    <div className={styles.applicationsPageInputContainer}>
      <FormGroup classes={{
        error: styles.applicationsPageInputErrorText
      }}>
        <TextField
          value={textInput}
          onChange={(event) => onChangeTextInput(event.target.value)}
          error={Boolean(postApplicationError.length)}
          helperText={postApplicationError}
          classes={{ root: styles.applicationsPageInput }}
        />
      </FormGroup>
      <Button
        onClick={() => {
          postApplicationHandler(textInput);
        }}
        variant="contained"
        color="primary"
        className={styles.applicationsPageButton}
      >
        {postApplicationLoading ? "Adding..." : "Add"}
      </Button>
    </div>
  );
}

export default withAxiosHelper<ApplicationPostInputProps>(ApplicationPostInput);
