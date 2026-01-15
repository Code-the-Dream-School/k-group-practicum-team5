import { useState, useCallback } from "react";

export function usePageModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return { open, show, hide, toggle, setOpen };
}
