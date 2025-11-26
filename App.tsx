import { useState, useEffect } from 'react';
import { Menu, X, MapPin, ChevronRight, Star, Quote, Phone, Instagram, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Smile, Stethoscope, Activity, Layers, Gem } from 'lucide-react';
import { CONTACT_INFO, SERVICES, TESTIMONIALS } from './constants';
import { Service } from './types';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { GeneratedImage } from './components/GeneratedImage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Handle scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'implantes': return <Gem size={32} strokeWidth={1.5} />;
      case 'ortodontia': return <Smile size={32} strokeWidth={1.5} />;
      case 'clareamento': return <Sparkles size={32} strokeWidth={1.5} />;
      case 'protese': return <Layers size={32} strokeWidth={1.5} />;
      case 'endodontia': return <Activity size={32} strokeWidth={1.5} />;
      case 'geral': return <Stethoscope size={32} strokeWidth={1.5} />;
      default: return <Star size={32} strokeWidth={1.5} />;
    }
  };

  const ServiceModal = ({ service, onClose }: { service: Service; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
        >
          <X size={20} className="text-gray-600" />
        </button>
        <div className="h-48 w-full relative">
          {service.imageUrl ? (
            <img 
              src={service.imageUrl} 
              alt={service.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <GeneratedImage 
              prompt={`Dental procedure close up of ${service.title}, clean clinic environment, professional medical photography, teal and white theme`}
              alt={service.title}
              className="w-full h-full"
              fallbackUrl={`https://picsum.photos/seed/${service.id}/600/300`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
            <h3 className="text-2xl font-bold text-white">{service.title}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">{service.details}</p>
          <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Olá, gostaria de saber mais sobre ${service.title}`}
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-primary text-white text-center py-3 rounded-xl font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Agendar Avaliação
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 text-xs md:text-sm hidden sm:block">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><MapPin size={14} /> 7 Unidades no Ceará</span>
            <span className="flex items-center gap-1"><ShieldCheck size={14} /> Atendimento Particular e Planos</span>
          </div>
          <div className="flex gap-4">
             <a href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="hover:text-gray-200 flex items-center gap-1">
               <Instagram size={14} /> {CONTACT_INFO.instagram}
             </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'top-0 bg-white shadow-md py-3' : 'top-0 sm:top-9 bg-white/95 backdrop-blur-sm py-5'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2" onClick={() => scrollToSection('inicio')}>
             {/* Logo text construction */}
            <div className="flex flex-col cursor-pointer group">
              <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight leading-none group-hover:text-secondary transition-colors">
                TOTALIS
              </h1>
              <span className="text-xs md:text-sm font-medium text-accent tracking-widest uppercase">Odonto</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center text-gray-600 font-medium">
            {['Inicio', 'Sobre', 'Serviços', 'Depoimentos', 'Contato'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item}
              </button>
            ))}
            <a 
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-secondary transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5"
            >
              Agendar
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-primary p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t py-4 px-4 flex flex-col gap-4">
             {['Inicio', 'Sobre', 'Serviços', 'Depoimentos', 'Contato'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                className="text-left py-2 text-gray-700 font-medium border-b border-gray-100 last:border-0"
              >
                {item}
              </button>
            ))}
             <a 
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-white text-center py-3 rounded-lg font-semibold mt-2"
            >
              Agendar Consulta
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
             src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1920&auto=format&fit=crop"
             alt="Clinica Totalis Odonto"
             className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent md:via-white/70"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-xl space-y-6 animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              <Star size={14} fill="currentColor" />
              <span>+4 Estrelas no Google</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              O sorriso que você <br/>
              <span className="text-primary">sempre sonhou.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Há mais de 30 anos cuidando de você. Tecnologia de ponta, profissionais especializados e 7 unidades preparadas para oferecer o melhor da odontologia no Ceará.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href={CONTACT_INFO.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
              >
                Agendar Agora <ChevronRight size={20} />
              </a>
              <button 
                onClick={() => scrollToSection('servicos')}
                className="bg-white text-primary border-2 border-primary/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/5 transition-colors"
              >
                Nossos Procedimentos
              </button>
            </div>
            
            <div className="flex gap-8 pt-8 text-gray-500 text-sm font-medium">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="text-accent" size={18} />
                 <span>Atendimento Humanizado</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="text-accent" size={18} />
                 <span>Equipamentos Modernos</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
                    alt="Dentista Totalis Odonto"
                    className="w-full h-full object-cover"
                  />
                </div>
             </div>
             <div className="space-y-6">
               <span className="text-accent font-bold tracking-wider uppercase text-sm">Sobre Nós</span>
               <h3 className="text-3xl md:text-4xl font-bold text-gray-900">30 anos construindo sorrisos e transformando vidas.</h3>
               <p className="text-gray-600 text-lg">
                 A Totalis Odonto não é apenas uma clínica, é um centro de excelência em odontologia. Nossa jornada começou há três décadas com um objetivo simples: oferecer odontologia de qualidade acessível a todos.
               </p>
               <p className="text-gray-600 text-lg">
                 Hoje, contamos com 7 unidades estrategicamente localizadas, aceitamos diversos convênios e planos, e mantemos uma equipe de especialistas apaixonados pelo que fazem.
               </p>
               <div className="grid grid-cols-2 gap-6 pt-4">
                 <div className="border-l-4 border-primary pl-4">
                   <span className="block text-3xl font-bold text-primary">30+</span>
                   <span className="text-gray-500">Anos de Experiência</span>
                 </div>
                 <div className="border-l-4 border-accent pl-4">
                   <span className="block text-3xl font-bold text-accent">7</span>
                   <span className="text-gray-500">Unidades no Ceará</span>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">Nossos Tratamentos</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Especialidades Completas</h3>
            <p className="text-gray-600 text-lg">
              Tecnologia e carinho em cada detalhe. Do check-up preventivo aos procedimentos estéticos mais avançados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/30 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-[0_8px_30px_rgb(0,106,120,0.12)] hover:-translate-y-2"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:bg-primary/10"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#006A78]/5 flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {getServiceIcon(service.id)}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-bold text-sm tracking-wide uppercase opacity-90 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    Saiba mais <ArrowRight size={18} className="ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section (Instagram Stories Vibe) */}
      <section id="depoimentos" className="py-20 bg-primary overflow-hidden relative">
         {/* Background pattern */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
         </div>

         <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div className="text-white">
                 <h3 className="text-3xl md:text-4xl font-bold mb-2">Quem ama sorrir, recomenda.</h3>
                 <p className="text-primary-100 opacity-90 text-lg">Veja o que nossos pacientes dizem nas redes sociais.</p>
               </div>
               <a 
                 href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@','')}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
               >
                 <Instagram size={18} /> Siga no Instagram
               </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {TESTIMONIALS.map((t) => (
                 <div key={t.id} className="bg-white rounded-2xl p-6 shadow-lg relative mt-8 md:mt-0">
                    <div className="absolute -top-6 left-6 w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-md">
                       {t.imageUrl ? (
                          <img 
                            src={t.imageUrl} 
                            alt={t.name} 
                            className="w-full h-full object-cover" 
                          />
                       ) : (
                          <GeneratedImage 
                             prompt={`Portrait of happy brazilian dental patient, natural smile, ${t.name.split(' ')[0]}, bright photo`}
                             alt={t.name}
                             className="w-full h-full"
                             fallbackUrl={`https://picsum.photos/seed/${t.id}/100/100`}
                          />
                       )}
                    </div>
                    <div className="mt-6">
                      <div className="flex text-yellow-400 mb-3 gap-1">
                        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-gray-700 italic mb-4 relative z-10">"{t.content}"</p>
                      <Quote className="absolute bottom-4 right-4 text-gray-100 z-0" size={48} />
                      <div className="border-t pt-4">
                        <h5 className="font-bold text-gray-900">{t.name}</h5>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">{t.role}</span>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Onde Estamos</h3>
           
           <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 aspect-video bg-gray-200 rounded-xl overflow-hidden relative shadow-md group">
                 {/* Functional Google Maps Iframe */}
                 <iframe 
                    width="100%" 
                    height="100%" 
                    id="gmap_canvas" 
                    src="https://maps.google.com/maps?q=Totalis%20Odonto%20Av.%20Bezerra%20de%20Menezes%20Fortaleza&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                    frameBorder="0" 
                    scrolling="no" 
                    title="Localização Totalis Odonto"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                    allowFullScreen
                    loading="lazy"
                 ></iframe>
                 <a 
                   href={CONTACT_INFO.mapsLink}
                   target="_blank" 
                   rel="noreferrer"
                   className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-primary px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 text-sm z-10"
                 >
                   <MapPin size={16} /> Abrir GPS
                 </a>
              </div>
              
              <div className="w-full md:w-1/2 text-left space-y-6">
                 <div>
                   <h4 className="text-xl font-bold text-gray-900 mb-2">Endereço Principal</h4>
                   <p className="text-gray-600">{CONTACT_INFO.address}</p>
                 </div>
                 
                 <div>
                   <h4 className="text-xl font-bold text-gray-900 mb-2">Contatos</h4>
                   <div className="space-y-3">
                     <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                       <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary"><Phone size={18} /></div>
                       {CONTACT_INFO.phone}
                     </a>
                     <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                       <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary"><WhatsAppIcon className="w-5 h-5" /></div>
                       WhatsApp Agendamento
                     </a>
                   </div>
                 </div>

                 <div className="pt-4">
                   <p className="text-sm text-gray-500">
                     <strong className="text-gray-700">Horário de Funcionamento:</strong><br/>
                     Segunda a Sexta: 08h às 18h<br/>
                     Sábado: 08h às 12h
                   </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-white mb-2">TOTALIS ODONTO</h2>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>

          <div className="flex gap-4">
            <a href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@','')}`} className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) */}
      <a 
        href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all transform hover:scale-110 z-50 flex items-center justify-center gap-2 group"
      >
        <WhatsAppIcon className="w-8 h-8" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">
          Agende sua consulta
        </span>
      </a>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </div>
  );
}

export default App;