import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Container } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container maxWidth="lg" style={{ height: "100dvh" }}>
      <App />
    </Container>
  </StrictMode>
);
