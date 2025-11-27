import { NextRequest } from "next/server";

const API_BASE = "http://31.97.168.215:4000";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const url = `${API_BASE}/api/v1/${path}`;

  // ✅ Headers limpos
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // ✅ NÃO enviar Authorization pros segmentos
  if (!path.startsWith("e_segmentos")) {
    const auth = req.headers.get("authorization");
    if (auth) headers.Authorization = auth;
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await res.text();

  return new Response(data, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const url = `${API_BASE}/api/v1/${path}`;
  const body = await req.text();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // ✅ Mesma regra aqui
  if (!path.startsWith("e_segmentos")) {
    const auth = req.headers.get("authorization");
    if (auth) headers.Authorization = auth;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const data = await res.text();

  return new Response(data, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
