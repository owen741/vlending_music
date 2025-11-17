interface FooterProps {
  onAdminClick?: () => void;
}

export function Footer({ onAdminClick }: FooterProps = {}) {
  return (
    <footer className="bg-black text-white" id="contact">
      <div className="px-4 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h3 className="text-3xl md:text-4xl tracking-tight mb-6">VLENDING</h3>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              음악 유통의 새로운 기준
            </p>
          </div>
          
          <div>
            <h4 className="tracking-wide mb-6 text-sm opacity-60">CONTACT</h4>
            <div className="text-sm text-gray-400 space-y-3">
              <p>info@vlending.com</p>
              <p>02-1234-5678</p>
            </div>
          </div>
          
          <div>
            <h4 className="tracking-wide mb-6 text-sm opacity-60">FOLLOW US</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="https://www.instagram.com/vlending/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://x.com/vlending" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
              <a href="https://www.youtube.com/@vlending" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-xs text-gray-500">
          <p>© 2025 VLENDING. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}