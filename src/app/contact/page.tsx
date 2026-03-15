import React from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Music2 } from 'lucide-react';
import Image from 'next/image';

const ContinuousContact = () => {
  // Shared background style preserved exactly
  const bgStyle = {
    backgroundImage: `url('/Images/contact-tea.png')`,
    backgroundSize: '618px 593px', 
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-24 font-sora">
      
      {/* ─── CONTACT SECTION ────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row gap-12 items-center">
        
        {/* Form Side */}
        <div className="flex-1 space-y-6 w-full flex flex-col">
          {/* Title stays at top (Order 1) */}
          <div className="order-1">
            <h1 className="font-bold md:text-[100px] text-[38px] text-[#9BA87D] leading-0 mt-2">
              Contact Us
            </h1>
            <h1 className="font-bold md:text-[100px] text-[38px] scale-y-[-1] bg-gradient-to-t from-[#9BA87D]/12 to-transparent 
                   bg-clip-text text-transparent select-none  -mt-1 ">
              Contact Us
            </h1>
          </div>

          {/* Form moves below image on mobile (Order 3) */}
          <form className="order-3 md:order-2 space-y-3 max-w-sm w-full">
            <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg border border-gray-200" />
            <input type="email" placeholder="Enter Email" className="w-full p-3 rounded-lg border border-gray-200" />
            <textarea placeholder="Any Message" rows={4} className="w-full p-3 rounded-lg border border-gray-200" />
            <div className='flex w-full justify-center items-center '>
              <button className="bg-[#869E4A] text-white px-8 py-2 rounded-full shadow-md mt-3 md:mt-4">
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* The Dissected Image Container (Order 2 on mobile) */}
        {/* Preserved your exact w/h and grid logic */}
        <div className="order-2 md:order-2 relative w-[358px] h-[408px] md:w-[618px] md:h-[593px] grid grid-cols-3 grid-rows-2 gap-3">
          
          {/* Top Left Div */}
          <div 
            className="col-span-2 rounded-2xl border-2 border-white"
            style={{ 
              ...bgStyle, 
              backgroundPosition: '0 0' 
            }}
          />

          {/* Top Right Div */}
          <div 
            className="col-span-1 rounded-2xl border-2 border-white"
            style={{ 
              ...bgStyle, 
              backgroundPosition: '-336px 0' 
            }}
          />

          {/* Bottom Curved Div */}
          <div 
            className="col-span-3 rounded-l-3xl overflow-hidden border-2 border-white"
            style={{ 
              ...bgStyle, 
              backgroundPosition: '0 -256px', 
              borderBottomRightRadius: '200px' 
            }}
          />
        </div>
      </section>

      {/* ─── LOCATION MAP SECTION ────────────────────────────────────────── */}
      <section className="w-full space-y-10">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900">Location Map</h2>
        
        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          {/* Info Cards */}
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
                <p className="text-gray-600">aromateanepal@gmail.com</p>
              </div>
            </div>

            <div className="bg-[#E9F5D8] p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-[#869E4A] p-2 rounded-full text-white">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Phone No</p>
                <p className="text-gray-600">+977-9761699953</p>
                <p className="text-gray-600">+977-9851150079</p>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-6">
              <p className="font-bold text-xl mb-4 text-center lg:text-left">Follow us on</p>
              <div className="flex justify-center lg:justify-start gap-6">
                <Facebook className="w-6 h-6 cursor-pointer hover:text-[#869E4A] transition-colors" />
                <Music2 className="w-6 h-6 cursor-pointer hover:text-[#869E4A] transition-colors" /> {/* TikTok icon alternative */}
                <Instagram className="w-6 h-6 cursor-pointer hover:text-[#869E4A] transition-colors" />
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 w-full h-[400px] md:h-[500px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl relative">
            <Image 
              src="/Images/location.png" 
              alt="Aroma Speciality Tea Industry Location" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContinuousContact;