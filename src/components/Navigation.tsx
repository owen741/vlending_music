import React from 'react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Group2 from '../imports/Group2';

interface NavigationProps {
  currentPage?: 'home' | 'about' | 'released' | 'story' | 'contact' | 'album' | 'article';
  onAboutClick?: () => void;
  onStoryClick?: () => void;
  onReleasedClick?: (tab?: 'album' | 'spotlight') => void;
  onHomeClick?: () => void;
  onContactClick?: () => void;
  onMenuOpenChange?: (isOpen: boolean) => void;
}

export function Navigation({ currentPage = 'home', onAboutClick, onStoryClick, onReleasedClick, onHomeClick, onContactClick, onMenuOpenChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [releasedDropdownOpen, setReleasedDropdownOpen] = useState(false);

  const handleMenuToggle = (open: boolean) => {
    setIsOpen(open);
    onMenuOpenChange?.(open);
  };

  const menuItems: Array<{ label: string; action?: () => void; id: string; href?: string }> = [
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300">
        <div className="px-4 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={onHomeClick} className="hover:opacity-80 transition-opacity h-8 w-auto relative z-[60]">
              <div className="h-full w-auto" style={{ aspectRatio: '460/113' }}>
                <Group2 />
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10 lg:gap-12">
              {menuItems.map((item) => {
                const isActive = currentPage === item.id;
                const baseClasses = "text-sm tracking-wide transition-all relative";
                const activeClasses = isActive 
                  ? "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-black" 
                  : "hover:opacity-60";
                
                // Special handling for RELEASED menu item
                if (item.id === 'released') {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setReleasedDropdownOpen(true)}
                      onMouseLeave={() => setReleasedDropdownOpen(false)}
                    >
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault();
                          item.action?.();
                        }}
                        className={`${baseClasses} ${activeClasses}`}
                      >
                        {item.label}
                      </button>
                      
                      {/* Dropdown Menu */}
                      {releasedDropdownOpen && (
                        <div className="absolute top-full left-0 pt-2">
                          <div className="bg-white shadow-lg rounded-md overflow-hidden min-w-[160px] border border-gray-100">
                            <button
                              onMouseDown={(e) => {
                                e.preventDefault();
                                onReleasedClick?.('album');
                                setReleasedDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-3 text-sm tracking-wide hover:bg-gray-50 transition-colors"
                            >
                              ALBUM
                            </button>
                            <button
                              onMouseDown={(e) => {
                                e.preventDefault();
                                onReleasedClick?.('spotlight');
                                setReleasedDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-3 text-sm tracking-wide hover:bg-gray-50 transition-colors border-t border-gray-100"
                            >
                              SPOTLIGHT
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
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
                className="px-4 py-2 bg-black text-white text-sm tracking-wide hover:bg-gray-800 transition-colors rounded-full"
              >
                음원유통신청
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 relative z-[60]"
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
              음원유통신청
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