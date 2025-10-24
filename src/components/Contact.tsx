import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Instagram, Send, Star, Bot, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+34 ",
    message: "",
  });

  const [reviewData, setReviewData] = useState({
    rating: 0,
    service: "",
    description: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviewThanks, setShowReviewThanks] = useState(false);

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [hasGreeted, setHasGreeted] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure a persistent sessionId for n8n memory
    const key = "chat_session_id";
    let sid = localStorage.getItem(key);
    if (!sid) {
      sid = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      localStorage.setItem(key, sid);
    }
    setSessionId(sid);
  }, []);

  // Initialize greeted flag for this session
  useEffect(() => {
    if (!sessionId) return;
    const greeted = localStorage.getItem(`chat_greeted_${sessionId}`) === "1";
    setHasGreeted(greeted);
  }, [sessionId]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  // Auto-greeting once per session
  useEffect(() => {
    if (!chatOpen || !sessionId || hasGreeted) return;
    setMessages((prev) => [...prev, { role: "assistant", content: "¿En qué puedo ayudarte hoy?" }]);
    setHasGreeted(true);
    try { localStorage.setItem(`chat_greeted_${sessionId}`, "1"); } catch {}
  }, [chatOpen, sessionId, hasGreeted]);

  const CHAT_URL = "https://n8n-n8n.s9u5gg.easypanel.host/webhook/b699b932-8ede-4872-b1c4-ed8d9ab51e4d/chat";

  const sendChat = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;


    const userMsg = { role: "user" as const, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, chatInput: text }),
      });

      if (!res.ok) throw new Error("request_failed");
      const data = await res.json();
      const output = data?.output ?? "";
      if (output) {
        setMessages((prev) => [...prev, { role: "assistant", content: output }]);
      }
    } catch (e) {
      toast({ title: "Error", description: "No se pudo enviar el mensaje", variant: "destructive" });
    } finally {
      setChatLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("https://n8n-n8n.s9u5gg.easypanel.host/webhook-test/f42509e5-c86f-4726-9cd7-74f2a1977e2d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) throw new Error("request_failed");

      toast({
        description: "Formulario enviado. Nos pondremos en contacto contigo. Gracias",
      });

      setFormData({ name: "", email: "", phone: "+34 ", message: "" });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo enviar el formulario. Inténtalo de nuevo",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reviewData.rating < 0 || reviewData.rating > 5 || !reviewData.service || !reviewData.description) {
      toast({
        title: "Error",
        description: "Completa la valoración (0-5), el servicio y la reseña",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetch("https://n8n-n8n.s9u5gg.easypanel.host/webhook-test/f42509e5-c86f-4726-9cd7-74f2a1977e2d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "review", ...reviewData }),
      });
    } catch (err) {
      // Ignoramos errores del webhook; mostramos confirmación igualmente
    } finally {
      toast({ description: "¡Gracias por tu reseña!" });
      setShowReviewThanks(true);
      setTimeout(() => setShowReviewThanks(false), 4000);
      setReviewData({ rating: 0, service: "", description: "" });
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Solicita tu <span className="text-primary text-glow">Evaluación Gratuita</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Agenda una demo personalizada y descubre cómo la IA puede transformar tu negocio
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre completo *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 600 123 456"
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu negocio y qué te gustaría automatizar..."
                  rows={5}
                  required
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all group"
              >
                Solicitar Evaluación Gratuita
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in delay-200">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <a
                  href="mailto:dynagencyia@gmail.com"
                  className="flex items-start gap-4 group hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground">dynagencyia@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/34653705275"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">WhatsApp</div>
                    <div className="text-muted-foreground">Chatea con nosotros</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/dyn.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Instagram</div>
                    <div className="text-muted-foreground">@dyn.agency</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Horarios de Atención</h3>
              <p className="text-muted-foreground mb-2">Lunes a Viernes: 9:00 - 18:00</p>
              <p className="text-muted-foreground">Sábados: 10:00 - 14:00</p>
              <p className="text-sm text-primary mt-4">Respuesta en menos de 24 horas</p>
            </div>
          </div>
        </div>
      
        {/* Reviews Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">
              ¿Ya has trabajado con nosotros?
            </h3>
            <p className="text-muted-foreground mt-2 mb-4">
              Déjanos tu experiencia en una breve reseña.
            </p>
            <Button size="lg" onClick={() => setShowReviewForm((s) => !s)}>
              DEJA TU RESEÑA
            </Button>
          </div>

          {showReviewForm && (
            <div className="bg-card border border-border rounded-2xl p-8 animate-fade-in">
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Valoración
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`${i} estrellas`}
                          onClick={() => setReviewData({ ...reviewData, rating: i })}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${reviewData.rating >= i ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                          />
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setReviewData({ ...reviewData, rating: 0 })}
                        className="ml-3 text-xs text-muted-foreground hover:text-foreground underline"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Tipo de servicio
                    </label>
                    <Input
                      id="service"
                      name="service"
                      value={reviewData.service}
                      onChange={(e) => setReviewData({ ...reviewData, service: e.target.value })}
                      placeholder="p. ej., Chatbot de reservas, Optimización web, Asistente de voz..."
                      className="bg-background border-border focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Reseña
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={reviewData.description}
                    onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                    placeholder="Escribe una breve descripción de tu experiencia..."
                    className="bg-background border-border focus:border-primary resize-none"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Enviar Reseña
                </Button>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* Overlay de agradecimiento reseña */}
      {showReviewThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center shadow-2xl">
            <h4 className="text-xl font-bold mb-2">¡Gracias por tu reseña!</h4>
            <p className="text-muted-foreground">
              Gracias a ella, nos ayudas a escalar y mejorar nuestro servicio.
            </p>
          </div>
        </div>
      )}

      {/* Floating Assistant Chat Button */}
      <button
        onClick={() => {
          if (!chatOpen) {
            setMessages([{ role: "assistant", content: "¿En qué puedo ayudarte hoy?" }]);
          }
          setChatOpen((s) => !s);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50 bg-yellow-400 hover:bg-yellow-300 text-black border border-yellow-500/50"
        aria-label="Abrir asistente"
      >
        {chatOpen ? <X className="w-7 h-7" /> : <Bot className="w-7 h-7" />}
      </button>

      {/* Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-[480px] max-h-[82vh] bg-card/95 backdrop-blur border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black">
            <div className="flex flex-col">
              <div className="text-[11px] uppercase tracking-wide font-medium opacity-80 leading-none">DYN Agency</div>
              <div className="flex items-center gap-2 font-semibold text-base">
                <div className="w-7 h-7 rounded-full bg-black/10 grid place-items-center">
                  <Bot className="w-4 h-4" />
                </div>
                Asistente IA
              </div>
              <div className="text-xs opacity-80 leading-none">Respuestas rápidas • Online</div>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label="Cerrar" className="hover:opacity-80">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-5 space-y-3 overflow-y-auto text-[16px] custom-scrollbar" style={{ maxHeight: "66vh" }}>
            {messages.length === 0 && (
              <div className="text-muted-foreground">
                Empieza a chatear. Respuestas breves y claras.
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed shadow-sm ${
                  m.role === "user" ? "bg-yellow-400 text-black" : "bg-muted text-foreground border border-border"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-muted text-foreground inline-flex items-center gap-2 border border-border">
                  <Loader2 className="w-4 h-4 animate-spin" /> Pensando...
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex items-center gap-2 bg-background">
            <Input
              placeholder="Escribe tu mensaje..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="text-[16px] py-3"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendChat();
                }
              }}
            />
            <Button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} className="h-12 px-5 text-[15px]">
              {chatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
