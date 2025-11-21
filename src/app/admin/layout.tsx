import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  /**
   * NÃO proteger aqui.
   * O layout deve ser neutro para não quebrar o fluxo de navegação.
   * A proteção deve estar APENAS nas páginas sensíveis (ex: /admin/page.tsx).
   */
  return <>{children}</>;
}
