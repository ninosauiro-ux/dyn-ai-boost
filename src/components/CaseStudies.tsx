import { TrendingUp, Clock, Calendar } from "lucide-react";
import successImage from "@/assets/success-metrics.jpg";

const cases = [
  {
    icon: TrendingUp,
    stat: "+120 leads",
    period: "en 30 días",
    business: "Restaurante Local",
    description: "Chatbot de reservas + campañas automatizadas",
  },
  {
    icon: Clock,
    stat: "24/7",
    period: "atención",
    business: "Centro Estético",
    description: "Asistente virtual que convierte consultas en citas",
  },
  {
    icon: Calendar,
    stat: "+60%",
    period: "en reservas",
    business: "Gimnasio Urbano",
    description: "Sistema de automatización + presencia digital optimizada",
  },
];

<<<<<<< HEAD
=======
const testimonials = [
  {
    name: "Raul Mart.",
    stars: "⭐⭐⭐⭐⭐",
    service: "Automatización de reservas y atención 24/7 en WhatsApp para su restaurante.",
    review:
      "DYN Agency nos ayudó a captar más clientes con su chatbot para reservas. Ahora gestionamos todo de forma automática y hemos aumentado nuestras reservas online. El apoyo del equipo es excelente.",
  },
  {
    name: "Sara Lpz.",
    stars: "⭐⭐⭐⭐",
    service: "Optimización web y posicionamiento en Google Maps para su centro de estética.",
    review:
      "La nueva página y la automatización de WhatsApp han sido clave. Nuestra visibilidad en Google Maps mejoró muchísimo y recibimos más clientes gracias a la estrategia de IA.",
  },
  {
    name: "Javier Rdz.",
    stars: "⭐⭐⭐⭐⭐",
    service: "Estrategia digital y automatización en redes sociales para su gimnasio.",
    review:
      "Con la automatización de respuestas y el contenido digital creado por DYN Agency, aumentaron nuestras reservas online y recibimos el doble de consultas en Instagram. ¡Resultados rápidos y efectivos!",
  },
  {
    name: "Marta Chz.",
    stars: "⭐⭐⭐⭐",
    service: "Implementación de asistentes de voz para atención telefónica en su clínica dental.",
    review:
      "El asistente de voz gestiona las citas y consultas de pacientes de manera eficiente. La automatización nos ahorra mucho tiempo y nuestros clientes lo valoran.",
  },
  {
    name: "Elena Prz.",
    stars: "⭐⭐⭐⭐⭐",
    service: "Chatbot inteligente para atención y reservas en restaurante mediterráneo.",
    review:
      "Desde que implementamos el chatbot la atención es mucho más ágil y no perdemos reservas. La automatización nos dio tranquilidad y el equipo de DYN es muy atento.",
  },
  {
    name: "Carlos Msg.",
    stars: "⭐⭐⭐⭐",
    service: "Automatización de respuestas y gestión de Instagram para tienda de ropa local.",
    review:
      "La digitalización de mensajes nos permitió responder al momento, incluso fuera de horario. Muy profesional y claro todo el proceso. Recomiendo mucho sus servicios.",
  },
  {
    name: "Lucía Gmz.",
    stars: "⭐⭐⭐⭐⭐",
    service: "Asistente de voz para captación de citas en clínica de fisioterapia.",
    review:
      "La solución de DYN Agency fue perfecta. Los clientes reservan solos y nosotros nos centramos en trabajar. Han sido transparentes y cumplieron plazos.",
  },
  {
    name: "David Fdz.",
    stars: "⭐⭐⭐⭐⭐",
    service: "Estrategia de Google Maps y posicionamiento local para taller mecánico.",
    review:
      "En pocas semanas, aparecimos en los primeros lugares de búsqueda. Nos llegan más llamadas y los resultados se notan. El trato es excelente.",
  },
  {
    name: "Andrea Cln.",
    stars: "⭐⭐⭐⭐⭐",
    service: "Automatización de procesos internos para franquicia de cafetería.",
    review:
      "Automatizamos pedidos y la gestión del personal, reduciendo errores y tiempo. Estamos encantados con el trabajo de DYN Agency y el soporte continuo.",
  },
  {
    name: "Sergio Rnz.",
    stars: "⭐⭐⭐⭐",
    service: "Optimización web y contenido estratégico para despacho de abogados.",
    review:
      "Mejoramos imagen digital y recibimos más consultas gracias a la automatización. La web quedó profesional y el seguimiento es constante. Grandes resultados.",
  },
];

>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
const CaseStudies = () => {
  return (
    <section id="casos" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Resultados <span className="text-primary text-glow">Reales con IA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Negocios como el tuyo que han transformado su operación y ventas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cases Grid */}
          <div className="grid gap-6">
            {cases.map((caseItem, index) => {
              const Icon = caseItem.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:card-glow transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-primary">{caseItem.stat}</span>
                        <span className="text-muted-foreground">{caseItem.period}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-1">{caseItem.business}</h3>
                      
                      <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
            <img
              src={successImage}
              alt="Success Metrics Dashboard"
              className="relative rounded-3xl shadow-2xl border border-primary/20"
            />
          </div>
        </div>
<<<<<<< HEAD
=======
          
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-6 text-center">Opiniones de nuestros clientes</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-primary">{t.stars}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">Servicio: {t.service}</div>
                  <p className="text-sm leading-relaxed">“{t.review}”</p>
                </div>
              ))}
            </div>
          </div>

>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
      </div>
    </section>
  );
};

export default CaseStudies;
