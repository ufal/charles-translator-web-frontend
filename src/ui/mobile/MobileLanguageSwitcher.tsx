import { Box, Button, IconButton, Stack } from "@mui/joy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

export function MobileLanguageSwitcher() {
  return (
    <Stack direction="row" spacing={1} sx={{
      padding: "0 10px 10px 10px"
    }}>
      <Button variant="soft" fullWidth>
        Czech
      </Button>
      <IconButton variant="plain">
        <SwapHorizIcon />
      </IconButton>
      <Button variant="soft" fullWidth>
        Ukrainian
      </Button>
    </Stack>
  )
}