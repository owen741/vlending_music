import React from 'react';
import { motion } from 'motion/react';
import { Music, Globe, TrendingUp, Award, HelpCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { SectionTitle } from './SectionTitle';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

interface AboutPageProps {
  scrollToFaq?: boolean;
}

export function AboutPage({ scrollToFaq = false }: AboutPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const faqSectionRef = useRef<HTMLElement>(null);
  const firstCategoryButtonRef = useRef<HTMLButtonElement>(null);

  // FAQ 섹션으로 스크롤 및 포커스
  useEffect(() => {
    if (scrollToFaq && faqSectionRef.current) {
      // 페이지 로드 후 약간의 지연을 두고 스크롤
      setTimeout(() => {
        faqSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // 스크롤 완료 후 첫 번째 카테고리 버튼에 포커스
        setTimeout(() => {
          firstCategoryButtonRef.current?.focus();
        }, 500);
      }, 100);
    }
  }, [scrollToFaq]);

  const services = [
    {
      icon: Music,
      title: '글로벌 음악 배급',
      description: '전 세계 주요 음악 플랫폼에 당신의 음악을 배급합니다. 간편한 업로드로 전 세계 리스너에게 다가가세요.'
    },
    {
      icon: Globe,
      title: '다채널 유통',
      description: '국내외 50개 이상의 음악 스트리밍 및 소셜 플랫폼에 동시 배급하여 최대한의 노출 효과를 제공합니다.'
    },
    {
      icon: TrendingUp,
      title: '실시간 분석',
      description: '스트리밍 수, 재생 횟수, 수익 등을 실시간으로 확인하고 분석하여 전략적인 음악 활동을 지원합니다.'
    },
    {
      icon: Award,
      title: '투명한 정산',
      description: '정확하고 투명한 수익 정산 시스템으로 아티스트의 권리를 보호하고 공정한 수익 분배를 보장합니다.'
    }
  ];

  const faqCategories: FAQCategory[] = [
    {
      category: '음원 유통 절차',
      items: [
        {
          question: '음원 유통은 어떻게 진행되나요?',
          answer: 'VLENDING for Artist 플랫폼에서 회원가입 후 음원 등록을 진행하시면 됩니다. 음원 정보 입력 → 음원 파일 업로드 → 발매일 설정 → 검수 → 배포 순서로 진행됩니다. 보통 검수 완료 후 2-3영업일 내에 각 플랫폼에 배포됩니다.'
        },
        {
          question: '발매일은 어떻게 설정하나요?',
          answer: '음원 등록 시 원하시는 발매일을 설정하실 수 있습니다. 단, 검수 기간을 고려하여 최소 등록일로부터 7일 이후의 날짜를 선택해주셔야 합니다. 금요일 발매를 권장하며, 글로벌 배포 시 시차를 고려하여 설정됩니다.'
        },
        {
          question: '음원 수정이나 삭제가 가능한가요?',
          answer: '발매 전에는 자유롭게 수정 가능합니다. 발매 후에는 앨범 정보(커버 이미지, 가사 등) 일부만 수정 가능하며, 음원 파일 자체는 수정이 불가능합니다. 삭제는 플랫폼별로 2-4주 정도 소요되며, 삭제 요청 시 고객센터로 문의해주시면 됩니다.'
        },
        {
          question: '앨범 커버 이미지는 어떤 규격이어야 하나요?',
          answer: '앨범 커버는 최소 3000x3000px 이상의 정사각형 이미지여야 하며, JPG 또는 PNG 형식으로 제출해야 합니다. 파일 크기는 10MB 이하를 권장합니다. 이미지에 텍스트를 넣을 경우 가독성을 고려하여 충분한 크기로 작성해주세요.'
        }
      ]
    },
    {
      category: '플랫폼 & 비용',
      items: [
        {
          question: '유통 가능한 플랫폼은 어디인가요?',
          answer: '국내 주요 음원 플랫폼(멜론, 지니뮤직, 벅스, 플로 등)과 글로벌 플랫폼(Spotify, Apple Music, YouTube Music, Amazon Music, Deezer 등) 50개 이상의 플랫폼에 배포 가능합니다.'
        },
        {
          question: '음원 유통 비용은 얼마인가요?',
          answer: '싱글 앨범(5곡 이하) 기준 연간 30,000원, 정규 앨범(6곡 이상) 기준 연간 50,000원입니다. 수익 배분은 별도의 수수료 없이 100% 아티스트에게 정산됩니다. 단, 플랫폼 수수료는 각 플랫폼 정책에 따릅니다.'
        },
        {
          question: '특정 플랫폼만 선택해서 유통할 수 있나요?',
          answer: '네, 가능합니다. 음원 등록  원하는 플랫폼만 선택하여 배포할 수 있습니다. 다만 가능한 많은 플랫폼에 배포하는 것이 노출과 수익 측면에서 유리합니다. 나중에 추가 플랫폼 배포도 가능하지만 별도 검수 기간이 소요됩니다.'
        }
      ]
    },
    {
      category: '정산 & 수익',
      items: [
        {
          question: '정산은 언제, 어떻게 이루어지나요?',
          answer: '매월 각 플랫폼으로부터 정산 받은 수익을 다음 달 말일에 지급합니다. 예를 들어 1월 발생 수익은 3월 말일에 정산됩니다. VLENDING for Artist 대시보드에서 실시간으로 스트리밍 현황과 예상 수익을 확인하실 수 있습니다.'
        },
        {
          question: '최소 정산 금액이 있나요?',
          answer: '네, 최소 정산 금액은 10,000원입니다. 정산 금액이 최소 금액 미만인 경우 다음 달로 이월되며, 최소 금액이 충족되면 자동으로 정산됩니다. 정산 수수료는 별도로 발생하지 않습니다.'
        },
        {
          question: '해외 수익도 받을 수 있나요?',
          answer: '네, 글로벌 플랫폼에서 발생한 수익도 함께 정산됩니다. 다만 환율 변동에 따라 수익이 달라질 수 있으며, 정산 시점의 환율이 적용됩니다. 모든 수익은 원화(KRW)로 환산되어 지급됩니다.'
        }
      ]
    },
    {
      category: '저작권 & 법적 사항',
      items: [
        {
          question: '저작권 등록은 별도로 해야 하나요?',
          answer: '음원 유통과 저작권 등록은 별개입니다. 저작권 보호를 위해서는 한국음악저작권협회(KOMCA)에 저작권 등록을 하시는 것을 권장합니다. 저작인접권은 한국음악실연자연합회(FKMP)와 한국음반산업협회(RIAK)에 등록하실 수 있습니다.'
        },
        {
          question: '커버곡이나 리메이크도 유통 가능한가요?',
          answer: '원저작권자의 허락을 받은 경우에만 가능합니다. 저작권 사용 허가서를 음원 등록 시 함께 제출해주셔야 하며, 원곡 저작권자 정보를 정확히 입력해주셔야 합니다.'
        },
        {
          question: '샘플링을 사용한 곡도 유통 가능한가요?',
          answer: '샘플링을 사용한 경우 원 샘플의 저작권자로부터 사용 허가를 받아야 합니다. 저작권 클리어런스(clearance) 문서를 제출해야 하며, 미제출 시 검수 과정에서 반려될 수 있습니다. 로열티 프리 샘플팩은 사용 가능합니다.'
        }
      ]
    },
    {
      category: '기술적 요구사항',
      items: [
        {
          question: 'ISRC 코드는 무엇이며 꼭 필요한가요?',
          answer: 'ISRC(International Standard Recording Code)는 음원을 식별하는 국제 표준 코드입니다. VLENDING에서는 ISRC 코드가 없는 경우 자동으로 발급해드립니다. 이미 다른 유통사를 통해 발급받으신 코드가 있다면 그대로 사용하실 수 있습니다.'
        },
        {
          question: '음원 파일은 어떤 포맷으로 제출해야 하나요?',
          answer: 'WAV 또는 FLAC 형식의 무손실 오디오 파일을 제출해야 합니다. 권장 사양은 44.1kHz / 16bit 이상이며, 최대 96kHz / 24bit까지 지원합니다. MP3 파일은 품질 문제로 인해 검수 과정에서 반려될 수 있습니다.'
        },
        {
          question: '음원의 음질 기준이 있나요?',
          answer: '음원은 피크 레벨 -1dB 이하, 평균 라우드니스 -14 LUFS를 권장합니다. 과도한 리미팅으로 인한 왜곡이나 클리핑이 발견되면 검수 과정에서 반려될 수 있습니다. 마스터링 완료된 고품질 파일을 제출해주세요.'
        }
      ]
    },
    {
      category: '기타',
      items: [
        {
          question: '해외 아티스트도 이용 가능한가요?',
          answer: '네, 가능합니다. 다만 국내 사업자등록증이 있거나 국내 거주자여야 하며, 정산 시 국내 계좌가 필요합니다. 외국인 등록증 또는 여권 정보를 통해 본인 인증을 진행합니다.'
        },
        {
          question: '여러 명이 참여한 곡의 저작권은 어떻게 처리하나요?',
          answer: '작곡, 작사, 편곡자 등 모든 참여자의 정보를 등록 시 입력해야 합니다. 수익 배분은 참여자들 간의 계약에 따라 진행되며, VLENDING은 대표 아티스트에게 전체 수익을 지급합니다. 내부 배분은 참여자들 간에 직접 진행하셔야 합니다.'
        },
        {
          question: '유통 계약 기간은 얼마나 되나요?',
          answer: '기본 계약 기간은 1년이며, 자동 갱신됩니다. 계약 해지를 원하실 경우 해지 요청일로부터 30일 후 모든 플랫폼에서 음원이 내려갑니다. 계약 해지 후에도 이미 발생한 수익은 정상적으로 정산됩니다.'
        }
      ]
    }
  ];

  const allPlatforms: Array<{ name: string; color: string; url: string; logo?: string }> = [
    // Domestic
    { name: 'Melon', color: '#00CD3C', url: 'https://www.melon.com' },
    { name: 'genie', color: '#00D0DB', url: 'https://www.genie.co.kr' },
    { name: 'Bugs!', color: '#E8344E', url: 'https://music.bugs.co.kr' },
    { name: 'VIBE', color: '#000000', url: 'https://vibe.naver.com' },
    { name: 'FLO', color: '#4F7CFF', url: 'https://www.music-flo.com' },
    // International
    { name: 'YouTube', color: '#FF0000', url: 'https://www.youtube.com' },
    { name: 'YouTube Music', color: '#FF0000', url: 'https://music.youtube.com' },
    { name: 'Spotify', color: '#1DB954', url: 'https://www.spotify.com' },
    { name: 'Apple Music', color: '#FA243C', url: 'https://music.apple.com' },
    { name: 'Amazon Music', color: '#00A8E1', url: 'https://music.amazon.com' },
    { name: 'Deezer', color: '#EF5466', url: 'https://www.deezer.com' },
    { name: 'TIDAL', color: '#000000', url: 'https://tidal.com' },
    { name: 'Pandora', color: '#3668FF', url: 'https://www.pandora.com' },
    { name: 'LINE MUSIC', color: '#00C300', url: 'https://music.line.me' },
    { name: 'kkbox', color: '#0E8EE9', url: 'https://www.kkbox.com' },
    { name: 'JOOX', color: '#FF4C00', url: 'https://www.joox.com' },
    { name: 'Yandex Music', color: '#FFCC00', url: 'https://music.yandex.ru' },
    { name: 'anghami', color: '#A40C45', url: 'https://www.anghami.com' },
    { name: 'resso', color: '#FC3C44', url: 'https://www.resso.com' },
    { name: 'AWA', color: '#00D9FF', url: 'https://awa.fm' },
    { name: 'QQ音乐', color: '#31C27C', url: 'https://y.qq.com' },
    { name: 'KUGOU', color: '#2196F3', url: 'https://www.kugou.com' },
    { name: 'KUWO', color: '#FF6600', url: 'https://www.kuwo.cn' },
    { name: '爱听卓乐', color: '#FF6B6B', url: 'https://www.aitingzhuo.com' },
    { name: 'Wesing', color: '#00C8BE', url: 'https://www.wesing.com' },
    { name: 'NetEase Music', color: '#D32F2F', url: 'https://music.163.com' },
    { name: 'MyMusic', color: '#FF5722', url: 'https://www.mymusic.net.tw' },
    { name: 'true ID', color: '#FF0099', url: 'https://www.trueid.net' },
    { name: 'Zing mp3', color: '#7B1FA2', url: 'https://zingmp3.vn' },
    { name: 'MOOV', color: '#673AB7', url: 'https://moov.hk' },
    // Social
    { name: 'TikTok', color: '#000000', url: 'https://www.tiktok.com' },
    { name: 'Instagram', color: '#E4405F', url: 'https://www.instagram.com' },
    { name: 'Facebook', color: '#1877F2', url: 'https://www.facebook.com' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-20 overflow-x-hidden">
        <div className="relative h-[30vh] md:h-[35vh] lg:h-[40vh] mb-12 md:mb-16">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2MjcwNjg3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Music Artist Performance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <p className="max-w-2xl mx-auto text-xl md:text-2xl lg:text-4xl font-bold">
                팬과 아티스트가 함께 성장하며,<br />
                지속가능한 음악 생태계를 만들어갑니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 md:px-12 lg:px-16 pt-12 md:pt-16 lg:pt-20 pb-20 md:pb-24 lg:pb-32 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-8">
            <SectionTitle 
              title="Our Services" 
              subtitle="전문적이고 신뢰할 수 있는 음악 유통 서비스"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl tracking-tight">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Platform Partners */}
      <section className="px-4 md:px-12 lg:px-16 py-20 md:py-24 lg:py-32 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <SectionTitle title="Music Platforms" />
          </div>
        </div>

        {/* Infinite Scrolling Platforms */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @keyframes scroll-right {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 30s linear infinite;
          }
          .animate-scroll-left:hover,
          .animate-scroll-right:hover {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="relative space-y-8 overflow-x-hidden">
          {/* First Row - Left to Right */}
          <div className="flex gap-6 md:gap-12 animate-scroll-left">
            {/* First set */}
            {allPlatforms.slice(0, Math.ceil(allPlatforms.length / 2)).map((platform, index) => (
              <a
                key={`row1-set1-${index}`}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 aspect-[4/1] w-40 md:w-56 flex items-center justify-center px-4 md:px-8 py-4 hover:scale-105 transition-transform cursor-pointer"
              >
                {platform.logo ? (
                  <ImageWithFallback
                    src={platform.logo}
                    alt={platform.name}
                    className="h-10 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span 
                    className="text-lg tracking-tight whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity" 
                    style={{ color: platform.color }}
                  >
                    {platform.name}
                  </span>
                )}
              </a>
            ))}
            {/* Second set for seamless loop */}
            {allPlatforms.slice(0, Math.ceil(allPlatforms.length / 2)).map((platform, index) => (
              <a
                key={`row1-set2-${index}`}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 aspect-[4/1] w-40 md:w-56 flex items-center justify-center px-4 md:px-8 py-4 hover:scale-105 transition-transform cursor-pointer"
              >
                {platform.logo ? (
                  <ImageWithFallback
                    src={platform.logo}
                    alt={platform.name}
                    className="h-10 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span 
                    className="text-lg tracking-tight whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity" 
                    style={{ color: platform.color }}
                  >
                    {platform.name}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Second Row - Right to Left */}
          <div className="flex gap-6 md:gap-12 animate-scroll-right">
            {/* First set */}
            {allPlatforms.slice(Math.ceil(allPlatforms.length / 2)).map((platform, index) => (
              <a
                key={`row2-set1-${index}`}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 aspect-[4/1] w-40 md:w-56 flex items-center justify-center px-4 md:px-8 py-4 hover:scale-105 transition-transform cursor-pointer"
              >
                {platform.logo ? (
                  <ImageWithFallback
                    src={platform.logo}
                    alt={platform.name}
                    className="h-10 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span 
                    className="text-lg tracking-tight whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity" 
                    style={{ color: platform.color }}
                  >
                    {platform.name}
                  </span>
                )}
              </a>
            ))}
            {/* Second set for seamless loop */}
            {allPlatforms.slice(Math.ceil(allPlatforms.length / 2)).map((platform, index) => (
              <a
                key={`row2-set2-${index}`}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 aspect-[4/1] w-40 md:w-56 flex items-center justify-center px-4 md:px-8 py-4 hover:scale-105 transition-transform cursor-pointer"
              >
                {platform.logo ? (
                  <ImageWithFallback
                    src={platform.logo}
                    alt={platform.name}
                    className="h-10 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span 
                    className="text-lg tracking-tight whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity" 
                    style={{ color: platform.color }}
                  >
                    {platform.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={faqSectionRef} className="px-4 md:px-12 lg:px-16 py-20 md:py-24 lg:py-32 bg-white scroll-mt-20 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-8 md:mb-12">
            <SectionTitle 
              title="FAQ" 
              subtitle="궁금하신 내용을 빠르게 찾아보세요"
            />
          </div>

          {/* FAQ Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile: Category Dropdown */}
            <div className="lg:hidden">
              <Select
                value={selectedCategory.toString()}
                onValueChange={(value) => {
                  setSelectedCategory(parseInt(value));
                  setSelectedFaq(null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {faqCategories.map((category, catIndex) => (
                    <SelectItem key={catIndex} value={catIndex.toString()}>
                      {category.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop: Left Side - Category Menu */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                  {faqCategories.map((category, catIndex) => (
                    <button
                      key={catIndex}
                      onClick={() => {
                        setSelectedCategory(catIndex);
                        setSelectedFaq(null);
                      }}
                      className={`flex-shrink-0 lg:flex-shrink px-6 py-3 transition-all whitespace-nowrap text-left border-b-2 lg:border-b-0 lg:border-l-2 ${
                        selectedCategory === catIndex
                          ? 'border-black'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      ref={catIndex === 0 ? firstCategoryButtonRef : undefined}
                    >
                      <span className={selectedCategory === catIndex ? 'font-medium' : 'text-gray-600'}>
                        {category.category}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile: Accordion FAQ Items */}
            <div className="lg:hidden flex-1 min-w-0">
              <Accordion type="single" collapsible className="w-full">
                {faqCategories[selectedCategory].items.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${faqIndex}`}>
                    <AccordionTrigger className="text-left py-6 hover:no-underline">
                      <span className="font-medium text-gray-900">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line pt-2">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Desktop: Right Side - FAQ Items */}
            <div className="hidden lg:block flex-1 min-w-0">
              {selectedFaq === null ? (
                // FAQ List View
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-0 divide-y divide-gray-200"
                >
                  {faqCategories[selectedCategory].items.map((faq, faqIndex) => (
                    <motion.button
                      key={faqIndex}
                      onClick={() => setSelectedFaq(faqIndex)}
                      className="w-full py-6 text-left group hover:bg-gray-50 transition-colors px-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="group-hover:text-black transition-colors">
                            {faq.question}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                // FAQ Detail View
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedFaq(null)}
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>목록으로 돌아가기</span>
                  </button>

                  {/* Question & Answer */}
                  <div className="space-y-4">
                    {/* Question Header */}
                    <div className="py-5">
                      <h3 className="text-xl font-medium text-gray-900">
                        {faqCategories[selectedCategory].items[selectedFaq].question}
                      </h3>
                    </div>

                    {/* Answer Content */}
                    <div className="py-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faqCategories[selectedCategory].items[selectedFaq].answer}
                      </p>
                    </div>
                  </div>

                  {/* Related Questions */}
                  <div className="pt-4">
                    <h4 className="text-sm text-gray-500 mb-3">같은 카테고리의 다른 질문</h4>
                    <div className="space-y-2">
                      {faqCategories[selectedCategory].items
                        .filter((_, index) => index !== selectedFaq)
                        .slice(0, 3)
                        .map((faq, index) => {
                          const actualIndex = faqCategories[selectedCategory].items.findIndex(
                            (item) => item.question === faq.question
                          );
                          return (
                            <button
                              key={index}
                              onClick={() => setSelectedFaq(actualIndex)}
                              className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-black hover:text-white transition-colors text-sm group border border-gray-200"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span>{faq.question}</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 bg-black text-white overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase">
            Ready to Share Your Music?
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            지금 바로 시작여 전 세계 리스너와 당신의 음악을 공유하세요
          </p>
          <button className="px-10 py-5 bg-white text-black hover:bg-gray-100 transition-colors text-lg uppercase">
            Get Started
          </button>
        </motion.div>
      </section>
    </div>
  );
}