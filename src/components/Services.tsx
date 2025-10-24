import { Bot, Zap, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description:
      "Automatiza la atención al cliente 24/7 con asistentes virtuales que reservan citas, responden preguntas y generan leads mientras duermes.",
    features: ["Respuestas instantáneas", "Integración WhatsApp", "Reservas automáticas"],
  },
  {
    icon: Zap,
    title: "Automatización de Procesos",
    description:
      "Elimina tareas repetitivas y optimiza tu operación interna con flujos de trabajo inteligentes que ahorran tiempo y reducen errores.",
    features: ["Gestión automatizada", "Workflows personalizados", "Reportes inteligentes"],
  },
  {
    icon: Globe,
    title: "Presencia Digital",
    description:
      "Sitios web modernos, posicionamiento local SEO y estrategias de contenido que atraen clientes y construyen autoridad en tu mercado.",
    features: ["Webs profesionales", "SEO Local", "Marketing de contenido"],
  },
];

const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="servicios" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Nuestros <span className="text-primary text-glow">Servicios</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluciones de IA diseñadas para impulsar tu negocio local
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-2xl hover:card-glow transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:bg-primary/20 transition-all">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center animate-fade-in">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group"
          >
            Ver Todos los Servicios
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
