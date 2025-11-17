import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Group2 from '../imports/Group2';

interface HomeNavigationProps {
  currentPage?: 'home' | 'about' | 'released' | 'story' | 'contact' | 'album' | 'article';
  onAboutClick?: () => void;
  onStoryClick?: () => void;
  onReleasedClick?: () => void;
  onHomeClick?: () => void;
  onContactClick?: () => void;
  onMenuOpenChange?: (isOpen: boolean) => void;
}

export function HomeNavigation({ currentPage = 'home', onAboutClick, onStoryClick, onReleasedClick, onHomeClick, onContactClick, onMenuOpenChange }: HomeNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = (open: boolean) => {
    setIsOpen(open);
    onMenuOpenChange?.(open);
  };

  const menuItems = [
    { label: 'HOME', action: () => onHomeClick?.(), id: 'home' },
    { label: 'ABOUT US', action: () => onAboutClick?.(), id: 'about' },
    { label: 'RELEASED', action: () => onReleasedClick?.(), id: 'released' },
    { label: 'OUR STORY', action: () => onStoryClick?.(), id: 'story' },
    { label: 'CONTACT', action: () => onContactClick?.(), id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴가 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 스크롤 상태에 따라 스타일 변경
  const navBgClass = isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent';
  const borderClass = isScrolled ? 'border-b border-gray-100/50' : '';
  const textColor = isScrolled ? 'text-black' : 'text-white';
  const logoColor = isScrolled ? '#476489' : '#ffffff';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${navBgClass} ${borderClass} transition-all duration-300`}>
        <div className="px-4 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={onHomeClick} className="hover:opacity-80 transition-opacity h-8 w-auto relative z-[60]">
              <div className="h-full w-auto" style={{ aspectRatio: '460/113' }}>
                <Group2 textColor={logoColor} />
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10 lg:gap-12">
              {menuItems.map((item) => {
                const isActive = currentPage === item.id;
                const baseClasses = `text-sm tracking-wide transition-all relative ${textColor}`;
                const underlineColor = isScrolled ? 'after:bg-black' : 'after:bg-white';
                const activeClasses = isActive 
                  ? `after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] ${underlineColor}` 
                  : "hover:opacity-60";
                
                return item.action ? (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`${baseClasses} ${activeClasses}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`${baseClasses} ${activeClasses}`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="https://artist.vlending.co.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-2 text-sm tracking-wide transition-colors rounded-full px-[24px] py-[12px] mx-[0px] my-[12px] inline-flex items-center justify-center ${
                  isScrolled 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-transparent text-white border border-white hover:bg-white/10'
                }`}
              >
                FOR ARTIST
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 ${textColor} relative z-[60]`}
              onClick={() => handleMenuToggle(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => handleMenuToggle(false)}
        />
      )}

      {/* Mobile Menu - Slide from Left */}
      <div className={`fixed top-0 left-0 h-full w-full bg-white z-[55] md:hidden transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-32 px-8 pb-8">
          {/* Close Button - Top Right */}
          <button
            onClick={() => handleMenuToggle(false)}
            className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Menu Items */}
          <div className="flex flex-col gap-8 flex-1">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              const activeClasses = isActive ? "opacity-100" : "opacity-70";
              
              return item.action ? (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action?.();
                    handleMenuToggle(false);
                  }}
                  className={`text-3xl tracking-wide hover:opacity-100 transition-opacity text-left ${activeClasses}`}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-3xl tracking-wide hover:opacity-100 transition-opacity ${activeClasses}`}
                  onClick={() => handleMenuToggle(false)}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="https://artist.vlending.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-black text-white text-xl tracking-wide hover:bg-gray-800 transition-colors rounded-full text-center mt-4 w-fit"
              onClick={() => handleMenuToggle(false)}
            >
              FOR ARTIST
            </a>
          </div>

          {/* Company Info */}
          <div className="border-t border-gray-200 pt-6 text-sm text-gray-600 space-y-2">
            <p className="font-medium text-black">VLENDING</p>
            <p className="pt-2">
              <a href="mailto:contact@vlending.co.kr" className="hover:text-black transition-colors">
                contact@vlending.co.kr
              </a>
            </p>
            <p>© 2025 VLENDING. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}