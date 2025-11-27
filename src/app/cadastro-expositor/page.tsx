"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { segmentosApi } from "@/app/cadastro-expositor/api/segmentos";
import { expositoresApi } from "@/app/cadastro-expositor/api/expositores";
import type { Segmento } from "@/@types";

export default function ExhibitorRegistration() {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [segmentos, setSegmentos] = useState<Segmento[]>([]);
  const [exhibitorType, setExhibitorType] = useState<"juridica" | "fisica">(
    "juridica"
  );

  const [formData, setFormData] = useState({
    displayName: "",
    document: "",
    segment: "",
    responsibleName: "",
    email: "",
    phone: "",
    city: "Porto Velho",
    state: "RO",
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    loadSegmentos();
  }, []);

  const loadSegmentos = async () => {
    try {
      const data = await segmentosApi.list();
      setSegmentos(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar segmentos",
        description: "API não respondeu corretamente",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (value: "juridica" | "fisica") => {
    setExhibitorType(value);
    setFormData((prev) => ({
      ...prev,
      displayName: "",
      document: "",
      responsibleName: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.passwordConfirmation) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        e_expositor: {
          e_evento_id: 1,
          e_tipo_expositor_id: exhibitorType === "juridica" ? 2 : 1,
          e_segmento_id: Number(formData.segment),
          status: "ativo",

          empresa: exhibitorType === "juridica" ? formData.displayName : null,
          cnpj: exhibitorType === "juridica" ? formData.document : null,

          nome_completo:
            exhibitorType === "fisica" ? formData.displayName : null,
          cpf: exhibitorType === "fisica" ? formData.document : null,

          responsavel:
            exhibitorType === "juridica"
              ? formData.responsibleName
              : formData.displayName,

          email_contato: formData.email,
          telefone_contato: formData.phone,
          cidade: formData.city,
          estado: formData.state,

          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
        },
      };

      await expositoresApi.create(payload);

      toast({
        title: "✅ Cadastro realizado",
        description: "Agora você pode fazer login como expositor",
      });

      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error?.message || "Não foi possível registrar o expositor",
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
            onClick={() => router.push("/")}
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
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Cadastro de Expositor
              </h1>
              <p className="text-gray-600">Crie sua conta de expositor</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* TIPO */}
              <div>
                <Label className="text-green-800 font-semibold">
                  Tipo de Expositor
                </Label>
                <RadioGroup
                  value={exhibitorType}
                  onValueChange={handleTypeChange}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="juridica" id="pj" />
                    <Label htmlFor="pj">Pessoa Jurídica</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="fisica" id="pf" />
                    <Label htmlFor="pf">Pessoa Física</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* CAMPOS DINÂMICOS */}
              {exhibitorType === "juridica" ? (
                <>
                  <Input
                    placeholder="Nome da empresa"
                    required
                    value={formData.displayName}
                    onChange={(e) =>
                      handleChange("displayName", e.target.value)
                    }
                  />

                  <Input
                    placeholder="CNPJ"
                    required
                    value={formData.document}
                    onChange={(e) => handleChange("document", e.target.value)}
                  />

                  <Input
                    placeholder="Nome do responsável"
                    required
                    value={formData.responsibleName}
                    onChange={(e) =>
                      handleChange("responsibleName", e.target.value)
                    }
                  />
                </>
              ) : (
                <>
                  <Input
                    placeholder="Nome completo"
                    required
                    value={formData.displayName}
                    onChange={(e) =>
                      handleChange("displayName", e.target.value)
                    }
                  />

                  <Input
                    placeholder="CPF"
                    required
                    value={formData.document}
                    onChange={(e) => handleChange("document", e.target.value)}
                  />
                </>
              )}

              {/* SEGMENTO */}
              <Select
                value={formData.segment}
                onValueChange={(v) => handleChange("segment", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
                <SelectContent>
                  {segmentos.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* CONTATOS */}
              <Input
                placeholder="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />

              <Input
                placeholder="Telefone"
                required
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />

              <Input
                placeholder="Cidade"
                required
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />

              <Input
                placeholder="UF"
                required
                maxLength={2}
                value={formData.state}
                onChange={(e) =>
                  handleChange("state", e.target.value.toUpperCase())
                }
              />

              {/* SENHAS */}
              <Input
                type="password"
                required
                placeholder="Criar senha"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              <Input
                type="password"
                required
                placeholder="Confirmar senha"
                value={formData.passwordConfirmation}
                onChange={(e) =>
                  handleChange("passwordConfirmation", e.target.value)
                }
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full amazon-gradient"
              >
                {loading ? "Cadastrando..." : "Finalizar Cadastro"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
