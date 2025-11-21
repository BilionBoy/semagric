'use client';

import { motion } from 'framer-motion';
import { Building2, BarChart3, Leaf, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: Building2,
      title: 'Cadastro de Expositores',
      description: 'Registre sua empresa e participe da feira',
      action: () => router.push('/cadastro-expositor')
    },
    {
      icon: BarChart3,
      title: 'Painel do Expositor',
      description: 'Visualize seus dados e visitantes',
      action: () => router.push('/painel-expositor')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <header className="amazon-gradient text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="w-10 h-10" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">AGROTEC PVH 2025</h1>
                <p className="text-sm text-green-100">Plataforma de Gestão da Feira / Prefeitura de Porto Velho</p>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => router.push('/admin')}
              size="icon"
              className="md:hidden"
            >
              <UserCog className="h-5 w-5" />
              <span className="sr-only">Acesso Admin</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push('/admin')}
              className="hidden md:flex"
            >
              <UserCog className="h-4 w-4 mr-2" />
              Acesso Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Bem-vindo à AGROTEC PVH 2025
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            A maior feira de agronegócios da Amazônia. Gerencie seu stand,
            registre visitantes e acompanhe o sucesso do seu negócio em tempo real.
          </p>
          <img
            className="w-full h-64 object-cover rounded-2xl shadow-2xl"
            alt="Máquinas agrícolas de alta tecnologia trabalhando em um campo verde ao pôr do sol"
            src="https://horizons-cdn.hostinger.com/9e118616-9220-4d23-a7dc-60b1b99fea28/logo02-CNA36.jpg"
          />
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300"
            >
              <div className="amazon-gradient w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>
              <Button
                onClick={feature.action}
                className="w-full amazon-gradient hover:opacity-90"
              >
                Acessar
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-800 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-green-200">Expositores Esperados</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-5xl font-bold mb-2">50k+</div>
              <div className="text-green-200">Visitantes Estimados</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">R$ 100M+</div>
              <div className="text-green-200">Volume de Negócios</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 AGROTEC PVH. Todos os direitos reservados. Desenvolvido por Smart-tech/Dhiunix/techhouse
          </p>
        </div>
      </footer>
    </div>
  );
}
