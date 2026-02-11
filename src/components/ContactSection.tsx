import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Send, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { CONTACT_CONFIG } from "@/config/contact";
import { WEB3FORMS_CONFIG } from "@/config/web3forms";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const emails = CONTACT_CONFIG.recipients;
const phones = CONTACT_CONFIG.phones;

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [emailFormData, setEmailFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);

      // Check if Web3Forms is configured
      if (
        !WEB3FORMS_CONFIG.ACCESS_KEY ||
        WEB3FORMS_CONFIG.ACCESS_KEY === "YOUR_ACCESS_KEY_HERE"
      ) {
        toast({
          title: "تنبيه",
          description:
            "يرجى تكوين Web3Forms أولاً. راجع ملف src/config/web3forms.ts",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send email using Web3Forms
      // Professional Smart Routing: Send a notification for EACH recipient to the verified primary email.
      // This ensures the admin knows this message was intended for the whole team.
      const sendPromises = CONTACT_CONFIG.recipients.map(async (recipient) => {
        const formDataToEach = new FormData();
        formDataToEach.append("access_key", WEB3FORMS_CONFIG.ACCESS_KEY);
        formDataToEach.append("name", validated.name);
        formDataToEach.append("email", validated.email);
        formDataToEach.append("phone", validated.phone || "N/A");
        formDataToEach.append("message", validated.message);
        formDataToEach.append(
          "subject",
          `[موجه للجميع - ${recipient.label}] رسالة جديدة من ${validated.name}`,
        );
        formDataToEach.append("to_email", CONTACT_CONFIG.primaryEmail);
        formDataToEach.append("from_name", "Al-Samer Logistics - Contact Form");
        formDataToEach.append("replyto", validated.email);

        return fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formDataToEach,
        });
      });

      const responses = await Promise.all(sendPromises);
      const dataResults = await Promise.all(responses.map((res) => res.json()));

      if (dataResults.every((data) => data.success)) {
        toast({
          title: "✅ تم الإرسال بنجاح!",
          description: "شكراً لتواصلك معنا. تم إبلاغ جميع المختصين برسالتك.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("حدث خطأ في الإرسال");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        toast({
          title: "خطأ في التحقق",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "❌ فشل الإرسال",
          description: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
      }
    }

    setIsSubmitting(false);
  };

  const handleEmailClick = (email: string) => {
    setSelectedEmail(email);
    setIsEmailModalOpen(true);
  };

  const handleEmailModalClose = () => {
    setIsEmailModalOpen(false);
    setEmailFormData({ name: "", email: "", message: "" });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        !emailFormData.name ||
        !emailFormData.email ||
        !emailFormData.message
      ) {
        toast({
          title: "خطأ",
          description: "الرجاء ملء جميع الحقول",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Check if Web3Forms is configured
      if (
        !WEB3FORMS_CONFIG.ACCESS_KEY ||
        WEB3FORMS_CONFIG.ACCESS_KEY === "YOUR_ACCESS_KEY_HERE"
      ) {
        toast({
          title: "تنبيه",
          description:
            "يرجى تكوين Web3Forms أولاً. راجع ملف src/config/web3forms.ts",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send email using Web3Forms
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_CONFIG.ACCESS_KEY);
      formData.append("name", emailFormData.name);
      formData.append("email", emailFormData.email);

      // For the Modal: We still send to the verified primary email from config
      // BUT we clearly label the intended recipient in the subject
      formData.append("to_email", CONTACT_CONFIG.primaryEmail);

      formData.append("message", emailFormData.message);
      formData.append(
        "subject",
        `[مخصص لـ: ${selectedEmail}] رسالة من ${emailFormData.name}`,
      );

      formData.append("from_name", "Al-Samer Logistics");
      formData.append("replyto", emailFormData.email);
      // Helpful metadata in the body
      formData.append("intended_recipient", selectedEmail);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "✅ تم الإرسال بنجاح!",
          description: isRTL
            ? `تم إرسال رسالتك بنجاح إلى فريقنا المختص بـ ${selectedEmail}`
            : `Your message has been sent successfully to our staff at ${selectedEmail}`,
        });
        handleEmailModalClose();
      } else {
        throw new Error(data.message || "فشل الإرسال");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      toast({
        title: "❌ فشل الإرسال",
        description: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(0,40%,8%)] to-background opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="tag-warm mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs">
            {t("contact.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base px-2">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div
          className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={isRTL ? "lg:col-start-2" : ""}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6"
            >
              <div>
                <label className="block text-xs sm:text-sm text-white/60 mb-1.5 sm:mb-2">
                  {t("contact.name")}
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-10 sm:h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm sm:text-base"
                  placeholder={t("contact.name")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-white/60 mb-1.5 sm:mb-2">
                    {t("contact.email")}
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-10 sm:h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm sm:text-base"
                    placeholder={t("contact.email")}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-white/60 mb-1.5 sm:mb-2">
                    {t("contact.phone")}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-10 sm:h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm sm:text-base"
                    placeholder={t("contact.phone")}
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-white/60 mb-1.5 sm:mb-2">
                  {t("contact.message")}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="min-h-[120px] sm:min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none text-sm sm:text-base"
                  placeholder={t("contact.message")}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="hero"
                size="lg"
                className="w-full h-12 sm:h-14"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                    <span className="text-sm sm:text-base">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="text-sm sm:text-base">
                      {t("contact.send")}
                    </span>
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`space-y-4 sm:space-y-6 ${isRTL ? "lg:col-start-1" : ""}`}
          >
            {/* Emails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-4 sm:p-6"
            >
              <div
                className={`flex items-start gap-3 sm:gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-warm-orange/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    {t("contact.email.click")}
                  </h4>
                  <div className="space-y-1">
                    {emails.map((email) => (
                      <button
                        key={email.value}
                        onClick={() => handleEmailClick(email.value)}
                        className="block text-white/60 text-xs sm:text-sm hover:text-primary transition-colors break-words cursor-pointer w-full"
                        dir="ltr"
                        style={{ textAlign: "left" }}
                      >
                        {email.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-4 sm:p-6"
            >
              <div
                className={`flex items-start gap-3 sm:gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-warm-orange/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    {t("contact.whatsapp.click")}
                  </h4>
                  <div className="space-y-1">
                    {phones.map((phone) => (
                      <a
                        key={phone.value}
                        href={`https://wa.me/${phone.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white/60 text-xs sm:text-sm hover:text-primary transition-colors w-full"
                        dir="ltr"
                        style={{ textAlign: "left" }}
                      >
                        {phone.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-4 sm:p-6"
            >
              <div
                className={`flex items-start gap-3 sm:gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-warm-orange/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">
                    {t("contact.address")}
                  </h4>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed break-words">
                    {t("contact.address.value")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Google Maps */}
            <div className="glass-card overflow-hidden h-[250px] sm:h-[300px] lg:h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3323.874!2d44.444473!3d33.300847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDE4JzAzLjAiTiA0NMKwMjYnNDAuMSJF!5e0!3m2!1sen!2siq!4v1707600000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al-Samer Logistics Location"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Email Modal */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="bg-[hsl(0,40%,8%)] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              {t("contact.modal.title")}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {t("contact.modal.description")}{" "}
              <span className="text-primary font-semibold">
                {selectedEmail}
              </span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEmailSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">
                {t("contact.modal.yourname")}
              </label>
              <Input
                type="text"
                value={emailFormData.name}
                onChange={(e) =>
                  setEmailFormData({ ...emailFormData, name: e.target.value })
                }
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                {t("contact.modal.youremail")}
              </label>
              <Input
                type="email"
                value={emailFormData.email}
                onChange={(e) =>
                  setEmailFormData({ ...emailFormData, email: e.target.value })
                }
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                placeholder="Enter your email"
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                {t("contact.modal.message")}
              </label>
              <Textarea
                value={emailFormData.message}
                onChange={(e) =>
                  setEmailFormData({
                    ...emailFormData,
                    message: e.target.value,
                  })
                }
                className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                placeholder="Type your message here..."
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={handleEmailModalClose}
                variant="outline"
                className="flex-1 h-12 border-white/10 text-white hover:bg-white/5"
              >
                {t("contact.modal.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="hero"
                className="flex-1 h-12"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {isRTL ? "جاري الإرسال..." : "Sending..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t("contact.modal.send")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
