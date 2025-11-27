"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Key, Shield, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";

type LoginMode = "admin" | "expositor" | null;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [mode, setMode] = useState<LoginMode>(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mode) {
      toast({
        title: "Escolha o tipo de acesso",
        description: "Selecione Admin ou Expositor",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      localStorage.clear();

      if (mode === "admin") {
        await auth.loginAdmin(loginData.email, loginData.password);
      } else {
        await auth.loginExpositor(loginData.email, loginData.password);
      }

      console.log("✅ Login OK, redirecionando...");

      // ✅ Delay pequeno pra garantir navegação
      setTimeout(() => {
        const target = mode === "admin" ? "/admin" : "/painel-expositor";
        console.log("➡️ Redirect para:", target);
        router.replace(target);
      }, 300);
    } catch (err: any) {
      console.error("❌ ERRO LOGIN:", err);

      toast({
        title: "Erro no login",
        description: err?.message || "Credenciais inválidas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4"
      >
        <div className="text-center">
          <div className="amazon-gradient w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-800">
            Acesso ao Sistema
          </h1>
        </div>

        {/* SELETOR */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === "admin" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setMode("admin")}
          >
            <Shield className="w-4 h-4 mr-2" />
            Sou Admin
          </Button>

          <Button
            type="button"
            variant={mode === "expositor" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setMode("expositor")}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Sou Expositor
          </Button>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label>E-mail</Label>
            <Input
              type="email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>

          <div>
            <Label>Senha</Label>
            <Input
              type="password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData((p) => ({ ...p, password: e.target.value }))
              }
            />
          </div>

          <Button className="w-full amazon-gradient" disabled={loading}>
            <LogIn className="w-4 h-4 mr-2" />
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
