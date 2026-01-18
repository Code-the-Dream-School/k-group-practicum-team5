import { useState, useCallback } from "react";

export function useGenericModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return { open, show, hide, setOpen };
}
