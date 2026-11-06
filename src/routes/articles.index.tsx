import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/articles/")({
  component: ArticlesIndexRedirect,
});

function ArticlesIndexRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home #articles section
    if (typeof window !== "undefined") {
      window.location.replace("/#articles");
    } else {
      navigate({ to: "/" });
    }
  }, [navigate]);

  return null;
}
