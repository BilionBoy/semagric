import { NextRequest } from "next/server";

const API_BASE = "http://31.97.168.215:4000";

const PUBLIC_ROUTES = ["e_segmentos", "e_expositores"];

function isPublicRoute(path: string) {
  return PUBLIC_ROUTES.some((r) => path.startsWith(r));
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const url = `${API_BASE}/api/v1/${path}`;

  const token = req.headers.get("authorization");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // ✅ Só envia Authorization se TIVER token
  if (token && token.trim() !== "") {
    headers.Authorization = token;
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

  const token = req.headers.get("authorization");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // ✅ Só envia Authorization se TIVER token
  if (token && token.trim() !== "") {
    headers.Authorization = token;
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
