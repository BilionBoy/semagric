"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.login(loginData.email, loginData.password);

      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao sistema.",
      });

      router.push("/admin");
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      const message =
        err?.message && err.message.trim() !== ""
          ? err.message
          : "E-mail ou senha inválidos.";

      toast({
        title: "Erro no login",
        description: message,
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
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="amazon-gradient w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-800">
            Acesso ao Sistema
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label>E-mail</Label>
            <Input
              type="email"
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
