import { Board } from "@/modules/board/components/Board/Board";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box component="main" sx={{ margin: "0 auto", maxWidth: "1200px" }}>
      <Board />
    </Box>
  );
}
