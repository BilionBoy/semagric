"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { clientesApi } from "@/app/cadastro-expositor/api/clientes";

export default function ClientRegistration() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    interesse: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const expositorId = localStorage.getItem("currentExpositorId");

      if (!expositorId) {
        toast({
          title: "Erro",
          description: "ID do expositor não encontrado.",
          variant: "destructive",
        });
        router.push("/cadastro-expositor");
        return;
      }

      await clientesApi.create({
        e_cliente: {
          e_expositor_id: Number.parseInt(expositorId),
          ...formData,
        },
      });

      toast({
        title: "Cliente Registrado!",
        description: "Cliente cadastrado com sucesso.",
      });

      setTimeout(() => router.push("/painel-expositor"), 1500);
    } catch (error: any) {
      toast({
        title: "Erro ao Registrar",
        description: error.message || "Não foi possível registrar o cliente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="amazon-gradient text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/painel-expositor")}
            className="text-white hover:bg-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-100">
            <div className="text-center mb-8">
              <div className="amazon-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Registro de Cliente
              </h1>
              <p className="text-gray-600">
                Cadastre os visitantes interessados em seus produtos
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-green-800 font-semibold">
                  Nome Completo *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                  <Input
                    id="nome"
                    required
                    value={formData.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-500"
                    placeholder="Nome do cliente"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-green-800 font-semibold"
                  >
                    E-mail *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="telefone"
                    className="text-green-800 font-semibold"
                  >
                    Telefone *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                    <Input
                      id="telefone"
                      required
                      value={formData.telefone}
                      onChange={(e) => handleChange("telefone", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500"
                      placeholder="(69) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endereco"
                  className="text-green-800 font-semibold"
                >
                  Endereço *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                  <Input
                    id="endereco"
                    required
                    value={formData.endereco}
                    onChange={(e) => handleChange("endereco", e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-500"
                    placeholder="Rua, número, bairro, cidade"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="interesse"
                  className="text-green-800 font-semibold"
                >
                  Interesse *
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                  <Textarea
                    id="interesse"
                    required
                    value={formData.interesse}
                    onChange={(e) => handleChange("interesse", e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-500 min-h-[100px]"
                    placeholder="Descreva o interesse do cliente (produtos, serviços, etc.)"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full amazon-gradient hover:opacity-90 text-lg py-6"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrar Cliente"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
