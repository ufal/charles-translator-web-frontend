import { Button, IconButton, Sheet, Stack } from "@mui/joy";
import MicIcon from "@mui/icons-material/Mic";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import iconImage from "../../favicon/android-chrome-256x256.png"; // TODO: dedicated svg logo instead
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SourceInfo } from "../SourceInfo";

export interface MobileAppBarProps {
  readonly sourceInfo: SourceInfo;
  readonly setSourceInfo: (s: SourceInfo) => void;

  readonly isSourceFieldEmpty: boolean;
  readonly isSubmittedView: boolean;
}

export function MobileAppBar(props: MobileAppBarProps) {
  function clearSourceField() {
    props.setSourceInfo({
      ...props.sourceInfo,
      text: "",
    });
  }

  return (
    <Sheet sx={{ padding: "10px" }}>
      <Stack direction="row" spacing={1}>
        {props.isSourceFieldEmpty ? (
          <>
            <img height={40} alt="Charles Translator" src={iconImage} />
          </>
        ) : (
          <>
            <Button
              variant="plain"
              color="neutral"
              startDecorator={<ArrowBackIosIcon />}
              onClick={() => clearSourceField()}
            >
              Home
            </Button>
          </>
        )}

        <div style={{ flexGrow: "1" }}></div>

        <IconButton>
          {/* Input method rotation button */}
          <MicIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
    </Sheet>
  );
}
