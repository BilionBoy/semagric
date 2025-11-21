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
import { validateCNPJ, validateCPF } from "@/lib/validators";
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
  });

  useEffect(() => {
    loadSegmentos();
  }, []);

  const loadSegmentos = async () => {
    try {
      const data = await segmentosApi.list();
      setSegmentos(data);
    } catch (error) {
      console.error("[v0] Error loading segments:", error);
      toast({
        title: "Erro ao Carregar Segmentos",
        description:
          "Não foi possível carregar os segmentos. Verifique a conexão com a API.",
        variant: "destructive",
      });
      setSegmentos([]);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (value: "juridica" | "fisica") => {
    setExhibitorType(value);
    setFormData({
      displayName: "",
      document: "",
      segment: "",
      responsibleName: "",
      email: "",
      phone: "",
      city: "Porto Velho",
      state: "RO",
    });
  };

  // trechinho corrigido do seu handleSubmit

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        e_expositor: {
          e_evento_id: 1,
          e_tipo_expositor_id: exhibitorType === "juridica" ? 2 : 1,
          e_segmento_id: Number.parseInt(formData.segment),
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
        },
      };

      await expositoresApi.create(payload);

      toast({
        title: "Cadastro realizado!",
        description: "Faça login como expositor para continuar.",
      });

      // ✅ LIMPA SESSÃO ERRADA
      setTimeout(() => {
        localStorage.clear();
        router.replace("/");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Erro ao Cadastrar",
        description: error.message || "Erro ao cadastrar expositor",
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
              <p className="text-gray-600">
                Participe da feira como empresa ou produtor autônomo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-green-800 font-semibold">
                  Tipo de Expositor *
                </Label>
                <RadioGroup
                  value={exhibitorType}
                  onValueChange={handleTypeChange}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="juridica" id="r1" />
                    <Label htmlFor="r1" className="cursor-pointer">
                      Pessoa Jurídica (Empresa)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fisica" id="r2" />
                    <Label htmlFor="r2" className="cursor-pointer">
                      Pessoa Física (Autônomo)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {exhibitorType === "juridica" ? (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="companyName"
                      className="text-green-800 font-semibold"
                    >
                      Nome da Empresa *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                      <Input
                        id="companyName"
                        required
                        value={formData.displayName}
                        onChange={(e) =>
                          handleChange("displayName", e.target.value)
                        }
                        className="pl-10 border-green-200 focus:border-green-500"
                        placeholder="Ex: Agro Máquinas Ltda"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="cnpj"
                      className="text-green-800 font-semibold"
                    >
                      CNPJ *
                    </Label>
                    <Input
                      id="cnpj"
                      required
                      value={formData.document}
                      onChange={(e) => handleChange("document", e.target.value)}
                      className="border-green-200 focus:border-green-500"
                      placeholder="00.000.000/0000-00"
                      maxLength={18}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="responsibleName"
                      className="text-green-800 font-semibold"
                    >
                      Nome do Responsável *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                      <Input
                        id="responsibleName"
                        required
                        value={formData.responsibleName}
                        onChange={(e) =>
                          handleChange("responsibleName", e.target.value)
                        }
                        className="pl-10 border-green-200 focus:border-green-500"
                        placeholder="Nome completo"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-green-800 font-semibold"
                    >
                      Nome Completo *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                      <Input
                        id="fullName"
                        required
                        value={formData.displayName}
                        onChange={(e) =>
                          handleChange("displayName", e.target.value)
                        }
                        className="pl-10 border-green-200 focus:border-green-500"
                        placeholder="Seu nome completo"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="cpf"
                      className="text-green-800 font-semibold"
                    >
                      CPF *
                    </Label>
                    <Input
                      id="cpf"
                      required
                      value={formData.document}
                      onChange={(e) => handleChange("document", e.target.value)}
                      className="border-green-200 focus:border-green-500"
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="segment"
                  className="text-green-800 font-semibold"
                >
                  Segmento Principal *
                </Label>
                <Select
                  value={formData.segment}
                  onValueChange={(value) => handleChange("segment", value)}
                  required
                >
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Selecione seu segmento de atuação" />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentos.map((segment) => (
                      <SelectItem key={segment.id} value={String(segment.id)}>
                        {segment.descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-green-800 font-semibold"
                  >
                    E-mail de Contato *
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
                      placeholder="email@contato.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-green-800 font-semibold"
                  >
                    Telefone/WhatsApp *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500"
                      placeholder="(69) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="city"
                    className="text-green-800 font-semibold"
                  >
                    Cidade *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500"
                      placeholder="Porto Velho"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="state"
                    className="text-green-800 font-semibold"
                  >
                    Estado *
                  </Label>
                  <Input
                    id="state"
                    required
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder="RO"
                    maxLength={2}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full amazon-gradient hover:opacity-90 text-lg py-6"
                disabled={loading}
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
