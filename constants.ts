import { ContactInfo, Service, Testimonial } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: "(85) 3333-0000",
  whatsapp: "5585999999999", // Placeholder
  address: "Av. Bezerra de Menezes, Fortaleza - CE",
  mapsLink: "https://share.google/Uoe2aQg9rIsOJnhtO",
  instagram: "@totalisodontoceara"
};

export const SERVICES: Service[] = [
  {
    id: 'implantes',
    title: 'Implantes Dentários',
    description: 'Recupere sua autoestima e a funcionalidade da mordida.',
    details: 'Utilizamos materiais de titânio de alta qualidade e técnicas minimamente invasivas para garantir a melhor integração e durabilidade do seu implante.',
    iconName: 'Drill',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f72?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ortodontia',
    title: 'Ortodontia',
    description: 'Aparelhos estéticos, metálicos e alinhadores invisíveis.',
    details: 'Tratamentos personalizados para alinhar seu sorriso, desde aparelhos convencionais até alinhadores transparentes de última geração.',
    iconName: 'Smile',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'clareamento',
    title: 'Clareamento',
    description: 'Sorriso mais branco e brilhante com segurança.',
    details: 'Protocolos de clareamento a laser ou caseiro supervisionado, garantindo resultados rápidos sem comprometer a saúde do esmalte.',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'protese',
    title: 'Prótese Dentária',
    description: 'Reabilitação oral completa, fixa ou removível.',
    details: 'Devolvemos a função mastigatória e estética com próteses desenhadas digitalmente para um encaixe perfeito.',
    iconName: 'Spline',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'endodontia',
    title: 'Canal (Endodontia)',
    description: 'Tratamento eficaz para salvar dentes danificados.',
    details: 'Utilizamos microscopia e tecnologias rotatórias para tratamentos de canal mais rápidos, precisos e indolores.',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'geral',
    title: 'Clínica Geral',
    description: 'Limpeza, restaurações e prevenção.',
    details: 'Manutenção preventiva da sua saúde bucal com check-ups regulares, limpeza profunda e restaurações estéticas.',
    iconName: 'Stethoscope',
    imageUrl: 'https://images.unsplash.com/photo-1600170457229-1436a56e5428?q=80&w=800&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Silva',
    role: 'Paciente há 5 anos',
    content: 'Atendimento impecável! Fiz meu implante com a equipe da Totalis e me senti muito segura. O resultado ficou natural e lindo.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'João Costa',
    role: 'Paciente de Ortodontia',
    content: 'Coloquei aparelho e em pouco tempo já vi resultados. As meninas da recepção são uns amores e os dentistas muito competentes.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Ana Pereira',
    role: 'Paciente de Estética',
    content: 'Fiz clareamento e facetas. Meu sorriso mudou completamente. Recomendo demais pela estrutura e profissionalismo.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
  }
];