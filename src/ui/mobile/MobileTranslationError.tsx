import { Alert } from "@mui/joy";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export interface MobileTranslationErrorProps {
  readonly error: string | null;
}

export function MobileTranslationError(props) {
  if (props.error === null) {
    return null;
  }

  return (
    <Alert variant="soft" color="warning" startDecorator={<WarningAmberIcon />}>
      <strong>Translation failed:</strong>
      {props.error}
    </Alert>
  );
}
