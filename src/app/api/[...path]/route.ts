import { NextRequest } from "next/server";

const API_BASE = "http://31.97.168.215:4000";

export async function GET(req: NextRequest, { params }: any) {
  const path = params.path.join("/");
  const url = `${API_BASE}/api/v1/${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // ✅ NÃO envia token para segmentos
  if (!path.startsWith("e_segmentos")) {
    const auth = req.headers.get("authorization");

    if (auth && auth.startsWith("Bearer ")) {
      headers.Authorization = auth;
    }
  }

  const res = await fetch(url, { headers });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest, { params }: any) {
  const path = params.path.join("/");
  const url = `${API_BASE}/api/v1/${path}`;

  const body = await req.text();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // ✅ NÃO envia token para segmentos
  if (!path.startsWith("e_segmentos")) {
    const auth = req.headers.get("authorization");

    if (auth && auth.startsWith("Bearer ")) {
      headers.Authorization = auth;
    }
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
