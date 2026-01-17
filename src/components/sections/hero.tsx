import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start overflow-hidden bg-[#fffaf5] px-6 lg:px-[44px] pt-[160px] pb-[100px] min-h-[1000px] lg:min-h-[1587px] w-full"
    >
      {/* Background Assets */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Starry Sky Background Image */}
        <div className="absolute inset-0 opacity-100">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/rioDBjHp4Ker1doqwtmPpPW9o-11.jpg"
            alt="Starry Background"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
        
        {/* Noise Overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
        
        {/* Page Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f9f9f9]/20" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-[1200px] w-full mx-auto">
        
        {/* Device Mockup with Radial Glow */}
        <div className="relative flex justify-center w-full mb-12">
          {/* Soft Orange Glow Behind Device */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
             <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/VkmUcVisuWxL6xmS3bXenYoZ7hQ-9.jpg"
                alt="Glow effect"
                fill
                className="object-contain mix-blend-multiply opacity-80"
             />
          </div>

          <div className="relative w-[320px] lg:w-[400px] aspect-[400/772]">
            {/* iPhone Frame */}
            <div className="absolute inset-0 z-20">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/M5BYpFV5ukCc6wJlq4Wqvkzw-1.png"
                alt="iPhone Device Render"
                fill
                className="object-contain"
              />
            </div>
            
            {/* iPhone Screen Content */}
            <div className="absolute top-[2.5%] left-[6.5%] w-[87%] h-[95%] rounded-[36px] overflow-hidden z-10">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/wii2kgLZGjyANjDVVTkjNVF2cRs-2.png"
                alt="Wallet App UI"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text and Actions */}
        <div className="flex flex-col items-center text-center">
          <h1 className="max-w-[800px] text-[48px] lg:text-[88px] font-bold leading-[1.1] tracking-[-0.04em] text-[#121111] mb-6">
            Reimagine How You Interact With Bitcoin
          </h1>
          
          <p className="max-w-[440px] text-[18px] lg:text-[20px] leading-[1.4] text-[#121111]/75 mb-10">
            From transactions to dapps — explore every corner of the Bitcoin universe with ease.
          </p>

          <a 
            href="#" 
            className="flex items-center justify-center h-[56px] px-8 bg-[#fae8e1] text-[#ff4f00] rounded-full font-button text-[16px] transition-transform hover:scale-105 active:scale-95 mb-12"
          >
            Download for free
          </a>

          {/* Browser Icons Row */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 p-1 bg-white rounded-xl shadow-sm border border-[#e5e5e5] overflow-hidden">
                <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/mTHPSeB0Je3f3BGonkQ3KKXNya8-1.png" alt="Arc" width={40} height={40} className="object-cover" />
              </div>
              <div className="w-10 h-10 p-1 bg-white rounded-xl shadow-sm border border-[#e5e5e5] overflow-hidden">
                <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/UGOf15HarMoiVLKyFn2iNYEjkb4-2.png" alt="Chrome" width={40} height={40} className="object-cover" />
              </div>
              <div className="w-10 h-10 p-1 bg-white rounded-xl shadow-sm border border-[#e5e5e5] overflow-hidden">
                <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/ayKZRQX9AdZvVllYXU0oo3hEEA-10.png" alt="Firefox" width={40} height={40} className="object-cover" />
              </div>
            </div>
            <p className="font-meta text-[#121111]/70">Also available in browsers</p>
          </div>
        </div>
      </div>

      {/* Floating browser action images from HTML structure (Side Elements) */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none select-none">
        {/* Top left floating elements */}
        <div className="absolute top-[20%] left-[10%] w-[320px] h-[68px] opacity-20">
          <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/b5NVDoS0N14mdeqZXlwlNtq66Tg-3.png" alt="Floating Action" width={320} height={68} className="rounded-xl border border-white/10" />
        </div>
        <div className="absolute top-[35%] left-[5%] w-[320px] h-[68px] opacity-15">
          <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/aH1bBLy4Drsovp6eIcG1ZlaG2Fw-4.png" alt="Floating Action" width={320} height={68} className="rounded-xl border border-white/10" />
        </div>
        
        {/* Top right floating elements */}
        <div className="absolute top-[25%] right-[10%] w-[320px] h-[68px] opacity-20">
          <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/DQgZgOJ2wtctgNhcuqR8g67L8s-5.png" alt="Floating Action" width={320} height={68} className="rounded-xl border border-white/10" />
        </div>
        <div className="absolute top-[40%] right-[5%] w-[320px] h-[68px] opacity-15">
          <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/acdafd40-d370-462e-9d03-ec385abca710-wallettemplate-framer-website/assets/images/Wl5vnM6B2urkYZ4guqafBpAxKU-6.png" alt="Floating Action" width={320} height={68} className="rounded-xl border border-white/10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;