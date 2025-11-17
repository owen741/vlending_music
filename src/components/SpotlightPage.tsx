import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VlendingSymbol } from './VlendingSymbol';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

interface SpotlightItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  content: {
    sections: {
      heading?: string;
      text: string;
      image?: string;
    }[];
  };
  date?: string;
  author?: string;
}

export const spotlightData: SpotlightItem[] = [
  {
    id: 'artist-spotlight-1',
    title: 'Rising Star: 루나의 새로운 도전',
    category: 'ARTIST SPOTLIGHT',
    image: 'https://images.unsplash.com/photo-1675859427928-fe41277572b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG11c2ljaWFufGVufDF8fHx8MTc2MTczOTcyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '독보적인 음악 세계를 구축하며 주목받는 아티스트 루나의 이야기',
    date: '2025.10.28',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '새로운 시대의 뮤지션',
          text: '루나는 2025년 가장 주목받는 신예 아티스트 중 한 명입니다. 그녀의 음악은 전통적인 K-POP의 틀을 벗어나 독창적인 사운드를 추구하며, 글로벌 시장에서 높은 평가를 받고 있습니다. 특히 최근 발표한 EP "Midnight Dreams"는 발매 첫 주 만에 주요 스트리밍 플랫폼 차트 상위권에 진입하며 그녀의 잠재력을 증명했습니다.',
          image: 'https://images.unsplash.com/photo-1665701104977-0f79d7501f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBzdHVkaW8lMjByZWNvcmRpbmd8ZW58MXx8fHwxNzYxODE4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          heading: '음악적 철학',
          text: '"저는 음악으로 진정한 감정을 전달하고 싶어요. 완벽한 것보다 진실한 것이 더 아름답다고 믿습니다." 루나는 자신의 음악 철학에 대해 이렇게 말합니다. 그녀의 곡들은 개인적인 경험과 감정을 솔직하게 풀어내며, 리스너들과 깊은 공감대를 형성합니다.'
        },
        {
          heading: '앞으로의 계획',
          text: '루나는 올해 말 첫 정규 앨범 발매를 앞두고 있습니다. 이번 앨범에서는 더욱 실험적인 사운드와 다양한 장르의 융합을 시도할 예정이라고 밝혔습니다. 또한 내년 초 아시아 투어를 계획 중이며, 팬들과 더 가까이에서 만날 기회를 만들어갈 것이라고 전했습니다.'
        }
      ]
    }
  },
  {
    id: 'performance-spotlight-1',
    title: '역대급 라이브 퍼포먼스',
    category: 'PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1558457583-dfd9dabca6ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nZXIlMjBwZXJmb3JtaW5nJTIwc3RhZ2V8ZW58MXx8fHwxNzYxODE4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '무대를 찢은 열정적인 퍼포먼스의 현장을 만나보세요',
    date: '2025.10.25',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '잊을 수 없는 순간',
          text: '지난 주말, 서울 올림픽공원에서 열린 City Lights의 콘서트는 그야말로 전설이 되었습니다. 3만 명의 관객이 운집한 가운데 펼쳐진 3시간의 공연은 단순한 음악 공연을 넘어선 예술적 경험이었습니다.',
          image: 'https://images.unsplash.com/photo-1541107105007-78dc46003215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5kJTIwbGl2ZSUyMHNob3d8ZW58MXx8fHwxNzYxODE4MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          heading: '완벽한 세트리스트',
          text: '히트곡은 물론 미공개 신곡까지 아낌없이 선보인 City Lights는 관객들을 열광의 도가니로 몰아넣었습니다. 특히 앵콜 무대에서 선보인 어쿠스틱 버전의 "Urban Dreams"는 수많은 관객들의 눈물을 자아냈습니다.'
        }
      ]
    }
  },
  {
    id: 'festival-spotlight-1',
    title: '2025 뮤직 페스티벌 하이라이트',
    category: 'FESTIVAL',
    image: 'https://images.unsplash.com/photo-1584521347191-dcdebb7fbac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwYXJ0aXN0fGVufDF8fHx8MTc2MTgxODAyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '올 여름 가장 뜨거웠던 페스티벌의 순간들',
    date: '2025.10.20',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '역대 최고의 라인업',
          text: '2025 Summer Sonic Festival은 국내외 정상급 아티스트들이 총출동한 화제의 페스티벌이었습니다. 3일간 진행된 이번 페스티벌에는 총 15만 명의 관객이 참석하며 역대 최대 규모를 기록했습니다.',
          image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2R8ZW58MXx8fHwxNzYxNzM3OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          heading: '글로벌 음악의 향연',
          text: '힙합, 록, 일렉트로닉, 인디 등 다양한 장르의 음악이 한데 어우러진 이번 페스티벌은 음악의 경계를 허물고 새로운 경험을 선사했습니다. 특히 헤드라이너로 나선 글로벌 아티스트들의 무대는 관객들에게 잊지 못할 추억을 남겼습니다.'
        }
      ]
    }
  },
  {
    id: 'artist-spotlight-2',
    title: '인디 신의 숨은 보석',
    category: 'ARTIST SPOTLIGHT',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljJTIwYXJ0aXN0fGVufDF8fHx8MTc2MTgxNzc5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '독창적인 음악으로 주목받는 신예 아티스트',
    date: '2025.10.15',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '숨겨진 재능의 발견',
          text: '홍대 인디 씬에서 활동 중인 밴드 "Echo Chamber"가 최근 음악 팬들 사이에서 뜨거운 화제를 모으고 있습니다. 독특한 사운드와 깊이 있는 가사로 무장한 이들의 음악은 인디 신에 새로운 바람을 불어넣고 있습니다.'
        }
      ]
    }
  },
  {
    id: 'collaboration-spotlight-1',
    title: '꿈의 콜라보레이션 성사',
    category: 'COLLABORATION',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYxODE3Nzk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '장르를 넘나드는 아티스트들의 화학작용',
    date: '2025.10.10',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '장르의 벽을 넘어',
          text: 'K-POP 아티스트와 재즈 뮤지션의 만남이 새로운 음악적 가능성을 열었습니다. 두 아티스트의 콜라보레이션 싱글은 발매 직후 음원 차트를 석권하며 대중과 평단의 찬사를 동시에 받고 있습니다.'
        }
      ]
    }
  },
  {
    id: 'trend-spotlight-1',
    title: '2025 음악 트렌드 분석',
    category: 'TREND',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRyZW5kfGVufDF8fHx8MTc2MTgxNzc5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '올해를 주도할 음악 트렌드를 미리 만나보세요',
    date: '2025.10.05',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: 'AI와 음악의 만남',
          text: '2025년 음악 산업의 가장 큰 화두는 단연 AI입니다. 하지만 AI는 인간 창작자를 대체하는 것이 아니라, 새로운 창작 도구로 자리잡고 있습니다. 많은 아티스트들이 AI를 활용해 더욱 독창적인 사운드를 실험하고 있습니다.'
        }
      ]
    }
  },
  {
    id: 'artist-spotlight-3',
    title: 'DJ NOVA: 일렉트로닉의 미래',
    category: 'ARTIST SPOTLIGHT',
    image: 'https://images.unsplash.com/photo-1712530930151-9483e1b489b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMHByb2R1Y2VyJTIwc3R1ZGlvfGVufDF8fHx8MTc2MjgyNjcxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '테크노와 하우스의 경계를 넘나드는 프로듀서',
    date: '2025.09.30',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '일렉트로닉 신의 떠오르는 별',
          text: 'DJ NOVA는 최근 유럽 클럽 씬에서 가장 주목받는 한국인 DJ입니다. 그의 독특한 사운드 디자인과 에너지 넘치는 라이브 세트는 전 세계 팬들을 열광시키고 있습니다. 특히 베를린과 암스테르담에서의 공연은 매진 기록을 세우며 그의 글로벌 위상을 입증했습니다.'
        },
        {
          heading: '독창적 사운드의 비밀',
          text: '\"저는 전통 악기 소리를 샘플링하여 일렉트로닉 비트와 결합하는 것을 좋아합니다. 한국의 전통음악과 현대 테크노의 만남이 제 음악의 정체성입니다.\" NOVA의 트랙은 전통과 현대의 완벽한 조화를 보여줍니다.'
        }
      ]
    }
  },
  {
    id: 'performance-spotlight-2',
    title: '싱어송라이터의 감성 무대',
    category: 'PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1684117736387-69935a4ed00d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGd1aXRhciUyMG11c2ljaWFufGVufDF8fHx8MTc2MjgyNjcxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '어쿠스틱 기타 한 대로 관객을 사로잡은 밤',
    date: '2025.09.25',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '진정성 있는 음악',
          text: '홍대 작은 라이브 카페에서 열린 김민서의 공연은 단순했지만 강렬했습니다. 어쿠스틱 기타 하나로 관객 100명의 마음을 완전히 사로잡았습니다. 그의 진솔한 가사와 따뜻한 음색은 많은 이들에게 위로가 되었습니다.'
        }
      ]
    }
  },
  {
    id: 'artist-spotlight-4',
    title: '힙합 신예 YONGSUNG의 질주',
    category: 'ARTIST SPOTLIGHT',
    image: 'https://images.unsplash.com/photo-1558372083-304baf92bad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXBwZXIlMjBwZXJmb3JtaW5nJTIwbWljcm9waG9uZXxlbnwxfHx8fDE3NjI4MjY3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '한국 힙합의 새로운 흐름을 만드는 래퍼',
    date: '2025.09.20',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '스토리텔링의 장인',
          text: 'YONGSUNG은 자신의 삶을 가사에 담아내는 것으로 유명합니다. 그의 데뷔 앨범 "Street Poet"은 서울의 뒷골목에서 시작된 그의 여정을 솔직하게 그려냅니다. 현실적인 가사와 독창적인 플로우로 힙합 팬들의 뜨거운 반응을 얻고 있습니다.'
        }
      ]
    }
  },
  {
    id: 'performance-spotlight-3',
    title: '여성 보컬의 폭발적 카리스마',
    category: 'PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1563681543778-002ee8f3cd8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB2b2NhbGlzdCUyMGNvbmNlcnR8ZW58MXx8fHwxNzYyODI2NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '파워풀한 보컬로 무대를 압도한 공연',
    date: '2025.09.15',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '강렬한 무대 장악력',
          text: '서지우의 단독 콘서트는 그야말로 압도적이었습니다. 3옥타브를 넘나드는 음역대와 완벽한 라이브 실력으로 관객들을 사로잡았습니다. 특히 발라드부터 록까지 다양한 장르를 소화하는 그녀의 가창력은 국내 최정상급임을 다시 한번 입증했습니다.'
        }
      ]
    }
  },
  {
    id: 'trend-spotlight-2',
    title: '프로듀서 시대의 도래',
    category: 'TREND',
    image: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NjI3OTgzODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '침실 프로듀서에서 차트 정복까지',
    date: '2025.09.10',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '홈 스튜디오의 혁명',
          text: '더 이상 비싼 녹음실이 필요하지 않습니다. 노트북과 헤드폰만 있으면 세계적인 히트곡을 만들 수 있는 시대가 왔습니다. 많은 신예 프로듀서들이 자신의 방에서 만든 트랙으로 글로벌 차트를 장악하고 있습니다. 기술의 발전은 음악 산업의 민주화를 가져왔습니다.'
        }
      ]
    }
  },
  {
    id: 'collaboration-spotlight-2',
    title: '밴드의 재발견',
    category: 'COLLABORATION',
    image: 'https://images.unsplash.com/photo-1758336717046-c475fc6f45ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5kJTIwcmVoZWFyc2FsJTIwc3R1ZGlvfGVufDF8fHx8MTc2MjgyNjcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '4인조 밴드가 만들어낸 완벽한 하모니',
    date: '2025.09.05',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '밴드 음악의 부활',
          text: '\"The Echoes\"는 오랜 시간 함께 연습하며 쌓아온 팀워크로 완벽한 라이브 사운드를 구현합니다. 각 멤버의 개성이 조화를 이루어 만들어내는 그들의 음악은 밴드 음악의 진정한 가치를 보여줍니다. 최근 발매한 앨범은 인디 차트 1위를 기록하며 밴드 음악의 부활을 예고하고 있습니다.'
        }
      ]
    }
  },
  {
    id: 'trend-spotlight-3',
    title: '바이닐의 재조명',
    category: 'TREND',
    image: 'https://images.unsplash.com/photo-1701374929875-37125c54cb29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMHR1cm50YWJsZXxlbnwxfHx8fDE3NjI3NTc5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '디지털 시대의 아날로그 감성',
    date: '2025.08.30',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '바이닐 레코드의 귀환',
          text: '스트리밍이 지배하는 시대에 바이닐 레코드 판매가 다시 증가하고 있습니다. 특히 젊은 세대 사이에서 바이닐은 단순한 음악 매체를 넘어 하나의 문화이자 수집 대상이 되었습니다. 아날로그 사운드의 따뜻함과 물리적 소유의 가치가 재조명받고 있습니다.'
        }
      ]
    }
  },
  {
    id: 'artist-spotlight-5',
    title: '재즈의 새로운 해석',
    category: 'ARTIST SPOTLIGHT',
    image: 'https://images.unsplash.com/photo-1613412140788-9ed674d57c41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWNpYW4lMjBzYXhvcGhvbmV8ZW58MXx8fHwxNzYyNzEwMzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '젊은 재즈 뮤지션의 실험적 도전',
    date: '2025.08.25',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '전통 현대의 융합',
          text: '색소포니스트 이준호는 클래식 재즈에 한국 전통 음악의 요소를 더해 독특한 사운드를 창조합니다. 그의 음악은 빌 에반스의 서정성과 국악의 섬세함이 만나 새로운 장르를 탄생시킵니다. 최근 발매한 앨범 \"Seoul Jazz\"는 비평가들로부터 극찬을 받았습니다.'
        }
      ]
    }
  },
  {
    id: 'performance-spotlight-4',
    title: '일렉트로닉 페스티벌의 열기',
    category: 'PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1624703307604-744ec383cbf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjI4MjY3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '전자음악의 향연, 밤을 수놓은 레이저 쇼',
    date: '2025.08.20',
    author: 'VLENDING Editorial',
    content: {
      sections: [
        {
          heading: '몰입의 순간',
          text: 'Ultra Korea 2025는 역대 최고의 일렉트로닉 뮤직 페스티벌이었습니다. 세계적인 DJ들의 퍼포먼스와 최첨단 무대 연출이 어우러져 관객들에게 잊지 못할 경험을 선사했습니다. 특히 메인 스테이지의 레이저 쇼와 불꽃놀이는 음악과 완벽한 싱크를 이루며 장관을 연출했습니다.'
        }
      ]
    }
  },
];

const ITEMS_PER_PAGE = 6;
const MAX_ITEMS = 20;

interface SpotlightPageProps {
  onSpotlightClick: (spotlightId: string) => void;
}

export function SpotlightPage({ onSpotlightClick }: SpotlightPageProps) {
  // 최대 20개로 제한
  const limitedSpotlightData = spotlightData.slice(0, MAX_ITEMS);
  
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일: 무한스크롤
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < limitedSpotlightData.length && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, limitedSpotlightData.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [displayCount, isLoading, isMobile]);

  // PC: 페이지 변경 시 스크롤 최상단 이동
  useEffect(() => {
    if (!isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, isMobile]);

  const totalPages = Math.ceil(limitedSpotlightData.length / ITEMS_PER_PAGE);
  
  // PC: 페이지네이션, 모바일: 무한스크롤
  const displayedItems = isMobile 
    ? limitedSpotlightData.slice(0, displayCount)
    : limitedSpotlightData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="px-4 md:px-12 lg:px-16 pt-12 md:pt-16 lg:pt-20 pb-8">
        <SectionTitle 
          title="Spotlight" 
          subtitle="주목할 만한 아티스트와 음악 이야기"
        />
      </div>

      {/* Spotlight Grid */}
      <div className="px-4 md:px-12 lg:px-16 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {displayedItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % ITEMS_PER_PAGE) * 0.1 }}
              className="group cursor-pointer mb-8 md:mb-10"
              onClick={() => onSpotlightClick(item.id)}
            >
              <div className="space-y-3">
                {/* Image - 3:4 Portrait Ratio */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h4 className="tracking-tight group-hover:text-gray-600 transition-colors">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-gray-600">
                      <small>{item.description}</small>
                    </p>
                  )}
                  {item.date && (
                    <p className="text-gray-400 text-xs tracking-wider">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Loading Indicator & Observer Target - 모바일만 */}
        {isMobile && displayCount < limitedSpotlightData.length && (
          <div ref={observerTarget} className="flex justify-center py-12">
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                <span>Loading more...</span>
              </div>
            )}
          </div>
        )}

        {/* End Message - 모바일만 */}
        {isMobile && displayCount >= limitedSpotlightData.length && limitedSpotlightData.length > ITEMS_PER_PAGE && (
          <div className="text-center py-12 text-gray-500">
            모든 스포트라이트를 확인하셨습니다
          </div>
        )}

        {/* Pagination - PC만 */}
        {!isMobile && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`min-w-[40px] px-3 py-2 rounded transition-colors ${
                      page === currentPage 
                        ? 'bg-black text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>
            
            <button
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}