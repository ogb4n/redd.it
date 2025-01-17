import { Stack, Typography } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <Stack>
      <Typography className="text-error font-bold">Oh no !</Typography>
      <Typography>
        The page or the place you're looking for seems not to be here...
      </Typography>
    </Stack>
  );
};
