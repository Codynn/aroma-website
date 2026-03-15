// app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center  px-6 py-28  font-sora">
      <div className="w-full max-w-[502px] text-center">
        
        {/* Image Section */}
        {/* Note: I used the standard <img> here so you don't have to worry about 
            setting explicit width/height in the Next Image component if you don't want to. */}
        <div className="mb-8">
          <img 
            src="/Images/404.png" 
            alt="404 Tea Spill" 
            className="w-full h-auto object-contain mx-auto"
            style={{ maxWidth: '502px' }}
          />
        </div>

        {/* Text Section */}
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-[#666] text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The page you’re looking for seems to have wandered off like tea leaves in the wind.
        </p>

        {/* Next.js Link for optimized routing */}
        <Link 
          href="/" 
          className="inline-block bg-[#7A933E] hover:bg-[#6b8235] text-white font-semibold 
                     px-10 py-3 rounded-xl transition-all duration-200 active:scale-95"
        >
          Back to Home
        </Link>
        
      </div>
    </main>
  )
}