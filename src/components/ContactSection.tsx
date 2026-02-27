import { Instagram, Mail, PhoneCall, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
      <div className="mb-10 text-center md:text-left">
        <h2 className="section-title text-white">Contact Us</h2>
        <p className="section-subtitle">Get in touch for any queries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Socials & Email Card */}
        <div className="bg-[#111] p-8 rounded-xl border border-white/10 flex flex-col justify-center gap-8 shadow-lg">
          <h3 className="text-xl font-heading font-bold text-white mb-2">Connect With Us</h3>
          
          <a 
            href="https://www.instagram.com/iea_mit/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 text-gray-300 hover:text-[#ff2d2d] transition-colors group"
          >
            <div className="p-3 bg-black/50 rounded-full group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6" />
            </div>
            <span className="font-body text-lg font-medium">iea mit</span>
          </a>

          <a 
            href="mailto:iea.26.mit@gmail.com" 
            className="flex items-center gap-4 text-gray-300 hover:text-[#ff2d2d] transition-colors group"
          >
            <div className="p-3 bg-black/50 rounded-full group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="font-body text-lg font-medium">iea.26.mit@gmail.com</span>
          </a>
        </div>

        {/* Student Coordinators Card */}
        <div className="bg-[#111] p-8 rounded-xl border border-white/10 flex flex-col gap-6 shadow-lg">
          <h3 className="text-xl font-heading font-bold text-white mb-2">Student Coordinators</h3>
          
          
          <div className="flex flex-col gap-5">
            <a href="tel:6381655601" className="flex justify-between items-center text-gray-300 hover:text-[#ff2d2d] transition-colors group">
              <span className="font-body text-base">Viswa R</span>
              <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
                <span className="font-mono tracking-wider">6381655601</span>
              </div>
            </a>

            <a href="tel:8248985695" className="flex justify-between items-center text-gray-300 hover:text-[#ff2d2d] transition-colors group">
              <span className="font-body text-base">Sanjay kumar</span>
              <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
                <span className="font-mono tracking-wider">8248985695</span>
              </div>
            </a>

            <a href="tel:6369564232" className="flex justify-between items-center text-gray-300 hover:text-[#ff2d2d] transition-colors group">
              <span className="font-body text-base">Kalaiselvan L</span>
              <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
                <span className="font-mono tracking-wider">6369564232</span>
              </div>
            </a>

            <a href="tel:6374001217" className="flex justify-between items-center text-gray-300 hover:text-[#ff2d2d] transition-colors group">
              <span className="font-body text-base">Karthikeyan M</span>
              <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
                <span className="font-mono tracking-wider">6374001217</span>
              </div>
            </a>

            <a href="tel:6379062742" className="flex justify-between items-center text-gray-300 hover:text-[#ff2d2d] transition-colors group">
              <span className="font-body text-base">Pavithra G</span>
              <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
                <span className="font-mono tracking-wider">6379062742</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Google Maps Card */}
      <div className="mt-8 bg-[#111] p-6 md:p-8 rounded-xl border border-white/10 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="text-[#ff2d2d] w-6 h-6" />
          <h3 className="text-xl font-heading font-bold text-white">Location</h3>
        </div>
        <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-white/10">
          <iframe
            src="https://maps.google.com/maps?q=Madras%20Institute%20of%20Technology,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Madras Institute of Technology Location"
            className="filter invert-[90%] hue-rotate-180 contrast-[85%] hover:filter-none transition-all duration-500"
          ></iframe>
        </div>
      </div>

    </section>
  );
};

export default ContactSection;
