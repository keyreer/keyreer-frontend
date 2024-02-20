import {
  Autocomplete,
  Chip,
  Container,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function Keyword() {
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleChangeKeywords = (newValue: string[]) => {
    setKeywords(newValue);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "80vh" }}
      >
        <h1>/keywords</h1>
        <Box maxWidth="450px" width="100%">
          <Autocomplete
            multiple
            options={[]}
            value={keywords}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={"+"}
                label="Add your keywords"
                variant="standard"
                inputProps={{
                  ...params.inputProps,
                  maxLength: 20,
                  sx: { paddingLeft: 10 },
                }}
                // 여기서 width와 height 스타일은 필요 없으므로 제거했습니다.
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={index}
                  variant="outlined"
                  color="primary"
                  label={option}
                  sx={{
                    padding: 1,
                    paddingBottom: 1.1,
                    fontWeight: "bold",
                    fontSize: "14px",
                    borderWidth: 2,
                  }}
                />
              ))
            }
            onChange={(e, newValue) => {
              handleChangeKeywords(newValue);
            }}
            // Autocomplete에 직접 style을 적용하지 않고 Grid item의 width를 조절하여 너비를 설정합니다.
            style={{ width: "100%" }}
          />
        </Box>
        <Box maxWidth="450px" width="100%" marginTop="25px">
          <Button
            variant="contained"
            size="large"
            style={{ width: "100%" }}
            onClick={() => {
              console.log("button clicked");
            }}
          >
            register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
