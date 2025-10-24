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
      </div>
    </section>
  );
};

export default CaseStudies;
