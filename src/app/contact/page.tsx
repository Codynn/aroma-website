"use client"; // Required for form handling and toast

import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

const ContinuousContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Shared background style preserved exactly
  const bgStyle = {
    backgroundImage: `url('/Images/contact-tea.png')`,
    backgroundSize: '618px 593px', 
    backgroundRepeat: 'no-repeat',
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    
    // Add your Access Key here
    formData.append("access_key", process.env.WEB3_FORM_KEY || '');
    formData.append("subject", "New Contact Form Submission - Aroma Tea");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        (event.target as HTMLFormElement).reset();
      } else {
        toast.error("Form submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-24 font-sora">
      
      {/* ─── CONTACT SECTION ────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row gap-12 items-center">
        
        {/* Form Side */}
        <div className="flex-1  w-full flex flex-col">
          <div className="order-1">
            <h1 className="font-bold md:text-[100px] text-[38px] text-[#9BA87D] leading-0 mt-2">
              Contact Us
            </h1>
            <h1 className="font-bold md:text-[100px] text-[38px] scale-y-[-1] bg-gradient-to-t from-[#9BA87D]/12 to-transparent 
                   bg-clip-text text-transparent select-none  -mt-1  ">
              Contact Us
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="order-3 md:order-2 space-y-3 max-w-sm w-full">
            <input 
              type="text" 
              name="name"
              required
              placeholder="Full Name" 
              className="w-full px-5 py-[17px] text-[20px] text-[#989898] font-semibold rounded-[16px] border border-[#869E4A] outline-none" 
            />
            <input 
              type="email" 
              name="email"
              required
              placeholder="Enter Email" 
              className="w-full px-5 py-[17px] font-semibold text-[20px] text-[#989898] rounded-[16px] border border-[#869E4A] outline-none" 
            />
            <textarea 
              name="message"
              required
              placeholder="Any Message" 
              rows={4} 
              className="w-full p-3 rounded-[16px] font-semibold text-[20px] text-[#989898] border border-[#869E4A] outline-none" 
            />
            <div className='flex w-full justify-center items-center '>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-[#869E4A] text-white px-8 py-2 rounded-full shadow-md mt-3 md:mt-4 disabled:opacity-50 transition-all active:scale-95"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* The Dissected Image Container */}
        <div className="order-2 md:order-2 relative w-[358px] h-[408px] md:w-[618px] md:h-[593px] grid grid-cols-3 grid-rows-2 gap-3">
          <div 
            className="col-span-2 rounded-[16px] border-2 border-white"
            style={{ ...bgStyle, backgroundPosition: '0 0' }}
          />
          <div 
            className="col-span-1 rounded-[16px] border-2 border-white"
            style={{ ...bgStyle, backgroundPosition: '-336px 0' }}
          />
          <div 
            className="col-span-3 rounded-l-3xl overflow-hidden border-2 border-white"
            style={{ ...bgStyle, backgroundPosition: '0 -256px' }}
          />
        </div>
      </section>

      {/* ─── LOCATION MAP SECTION ────────────────────────────────────────── */}
      <section className="w-full space-y-10">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900">Location Map</h2>
        
        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          <div className="w-full lg:w-[400px] space-y-4">
            <div className="bg-[#E9F5D8] p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-[#869E4A] p-2 rounded-full text-white">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Location</p>
                <p className="text-gray-600">Fikkal, Ilam, Nepal</p>
              </div>
            </div>

            <div className="bg-[#E9F5D8] p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-[#869E4A] p-2 rounded-full text-white">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Email</p>
                <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=aromateanepal@gmail.com&su=Regarding%20Bussiness&body=I%20want%20to%20setup%20standard%20package%20for%20my%20business`} target="_blank" className="text-gray-600 hover:text-[#869E4A] transition-colors">
                  <p className="text-gray-600">aromateanepal@gmail.com</p> 
                </Link>
              </div>
            </div>

            <div className="bg-[#E9F5D8] p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-[#869E4A] p-2 rounded-full text-white">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Phone No</p>
                <Link href="https://api.whatsapp.com/send/?phone=9761669953&text=I%20want%20to%20setup%20standard%20package%20for%20my%20business" target="_blank" className="text-gray-600 hover:text-[#869E4A] transition-colors">
                  <p className="text-gray-600">+977-9761699953</p>
                </Link>
                <Link href="https://api.whatsapp.com/send/?phone=9851150079&text=I%20want%20to%20setup%20standard%20package%20for%20my%20business" target="_blank" className="text-gray-600 hover:text-[#869E4A] transition-colors">
                  <p className="text-gray-600">+977-9851150079</p>
                </Link>
              </div>
            </div>

            <div className="pt-6">
              <p className="font-bold text-xl mb-4 text-center lg:text-left">Follow us on</p>
              <div className="flex justify-center lg:justify-start gap-6">
                <Image src={`/Images/facebook.png`} width={24} height={24} alt='facebook' className="w-6 h-6 cursor-pointer" />
                <Image src={`/Images/tiktok.png`} width={24} height={24} alt='tiktok' className="w-6 h-6 cursor-pointer" />
                <Image src={`/Images/instagram.png`} width={24} height={24} alt='instagram' className="w-6 h-6 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex-1 w-full h-[297px] md:h-[547px] rounded-[16px] overflow-hidden relative">
            <iframe
              title="Aroma Tea Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18397.626562083417!2d88.06887267205178!3d26.89580960716351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5cff2246b2487%3A0xa3d0f1bcada5a6b0!2sAroma%20Speciality%20Tea%20Industry!5e0!3m2!1sen!2snp!4v1774368917956!5m2!1sen!2snp?t=k"
              width="100%"
              height="547"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContinuousContact;