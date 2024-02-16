import { Autocomplete, Chip, Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function Keyword() {
  const [tags, setTags] = useState<string[]>([]);

  const handleChangeTags = (newValue: string[]) => {
    setTags(newValue);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item>
          <Autocomplete
            autoSelect
            multiple
            filterSelectedOptions
            options={["tag1"]}
            value={tags}
            open={false}
            freeSolo
            style={{ width: 300, height: 50 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={"+"}
                label="Tags"
                variant="standard"
                inputProps={{ ...params.inputProps, maxLength: 20 }}
              />
            )}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  {...getTagProps({ index })}
                  key={index}
                  color="primary"
                  label={option}
                />
              ))
            }
            onChange={(e, newValue) => {
              handleChangeTags(newValue);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
