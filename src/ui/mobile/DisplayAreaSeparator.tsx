import { Stack, IconButton, LinearProgress } from "@mui/joy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export interface DisplayAreaSeparatorProps {
  readonly isVisible: boolean;
  readonly isClickable: boolean;
  readonly isLoading: boolean;
  readonly onClick: () => void;
}

export function DisplayAreaSeparator(props: DisplayAreaSeparatorProps) {
  return (
    <Stack
      direction="row"
      spacing={3}
      alignItems="center"
      sx={{
        display: props.isVisible ? undefined : "none",
        height: "45px",
      }}
    >
      <LinearProgress
        variant="solid"
        color="primary"
        determinate={!props.isLoading}
        value={props.isLoading ? 25 : 100}
        sx={{
          maxWidth: "60vw",
          width: "60vw",
        }}
      />

      <IconButton
        variant="solid"
        size="lg"
        color="primary"
        sx={{
          display: props.isClickable ? undefined : "none",
          borderRadius: "50%",
        }}
        onClick={() => props.onClick()}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Stack>
  );
}