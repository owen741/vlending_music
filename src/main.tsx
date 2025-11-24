import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Navigation } from './components/Navigation';
import { MagazineGrid } from './components/MagazineGrid';
import { GridGallery } from './components/GridGallery';
import { SpotlightGrid } from './components/SpotlightGrid';
import { ProcessSection } from './components/ProcessSection';
import { Footer } from './components/Footer';
import { AlbumDetail } from './components/AlbumDetail';
import { ReleasedPage } from './components/ReleasedPage';
import { AboutPage } from './components/AboutPage';
import { OurStoryPage } from './components/OurStoryPage';
import { ArticleDetail } from './components/ArticleDetail';
import { AdminPage } from './components/AdminPage';
import { ContactPage } from './components/ContactPage';
import { FloatingButtons } from './components/FloatingButtons';
import { enrichAlbumData } from './components/AlbumData';
import { SpotlightDetail } from './components/SpotlightDetail';
import { spotlightData } from './components/SpotlightPage';
import "./index.css";

type ViewType = { 
  type: 'home' | 'about' | 'released' | 'story' | 'contact' | 'album' | 'article' | 'admin' | 'spotlight', 
  albumId?: string, 
  articleId?: string, 
  spotlightId?: string,
  releasedTab?: 'album' | 'spotlight',
  scrollToFaq?: boolean,
  fromPage?: 'home' | 'released' | 'story'
};

function MainPage() {
  const [currentView, setCurrentView] = useState<ViewType>({ type: 'home' });
  const [viewHistory, setViewHistory] = useState<ViewType[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const albumItems = [
    { 
      id: 'rise-and-rock', 
      title: '"RISE and ROCK"', 
      subtitle: 'GUILTY GEAR -STRIVE-',
      artist: 'SELECTION ALBUM',
      image: undefined, // 임시 플레이스홀더: 피그마에서 이미지 파일을 내보내서 추가 필요
      description: 'GUILTY GEAR -STRIVE-의 공식 선정 앨범 "RISE and ROCK"은 게임의 강렬한 록 사운드를 완벽하게 담아낸 컬렉션입니다. 격투 게임의 역동성과 록 음악의 에너지가 만나 탄생한 이 앨범은 플레이어들에게 몰입감 넘치는 사운드 경험을 선사합니다. 각 트랙은 캐릭터의 개성과 스토리를 음악으로 표현하며, 게임의 흥분을 그대로 전달합니다.',
      youtubeUrl: 'https://www.youtube.com/embed/6QiYJPQuBh8'
    },
    { 
      id: 'midnight-echo', 
      title: 'Midnight Echo', 
      subtitle: 'INDIE POP',
      artist: 'Luna Park',
      description: '감성적인 멜로디와 몽환적인 사운드가 어우러진 인디 팝 앨범입니다. Luna Park의 섬세한 보컬과 독창적인 사운드 메이킹이 돋보이는 작품으로, 밤의 고요함 속에서 울려 퍼지는 메아리 같은 음악을 선사합니다. 각 트랙은 도시의 야경처럼 반짝이며, 듣는 이의 마음을 따뜻하게 어루만집니다.',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      id: 'urban-dreams', 
      title: 'Urban Dreams', 
      subtitle: 'HIP HOP',
      artist: 'City Lights',
      image: 'https://images.unsplash.com/photo-1601643157091-ce5c665179ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBtdXNpY3xlbnwxfHx8fDE3NjE2NDU0NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '도시의 밤을 배경으로 펼쳐지는 힙합 사운드의 향연입니다. City Lights는 이 앨범을 통해 현대 도시인의 꿈과 현실, 그리고 그 사이의 갈등을 솔직하게 그려냅니다. 강렬한 비트와 깊이 있는 가사가 조화를 이루며, 도시의 활력과 에너지를 음악으로 표현합니다.',
      youtubeUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0'
    },
    { 
      id: 'silent-storm', 
      title: 'Silent Storm', 
      subtitle: 'ELECTRONIC',
      artist: 'Echo Valley',
      description: '일렉트로닉 음악의 새로운 지평을 여는 앰비언트 앨범입니다. Echo Valley는 고요함 속에 숨어있는 폭풍 같은 감정을 섬세한 전자음으로 표현했습니다. 미니멀한 구성과 깊이 있는 사운드 레이어링이 특징이며, 청자를 명상적인 사운드 여행으로 안내합니다.',
      youtubeUrl: 'https://www.youtube.com/embed/M4sEcIHG0Yc'
    },
    { 
      id: 'neon-nights', 
      title: 'Neon Nights', 
      subtitle: 'SYNTHWAVE',
      artist: 'Retro Future',
      image: 'https://images.unsplash.com/photo-1608347539243-b592b14332d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aHdhdmUlMjBuZW9ufGVufDF8fHx8MTc2MTcyNTM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: '80년대 신스팝의 향수와 현대적 프로덕션이 만나 탄생한 신스웨이브 걸작입니다. 네온 불빛이 가득한 도시의 밤을 음악으로 그려낸 이 앨범은 과거와 미래를 아우르는 독특한 사운드를 선보입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      id: 'acoustic-journey', 
      title: 'Acoustic Journey', 
      subtitle: 'FOLK',
      artist: 'Mountain Trail',
      image: 'https://images.unsplash.com/photo-1598090854937-9fc55eaebdf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGd1aXRhciUyMGZvbGt8ZW58MXx8fHwxNzYxNzI1Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '어쿠스틱 기타의 따스한 선율이 마음을 어루만지는 포크 앨범입니다. 자연의 소리와 어우러진 순수한 음악으로 일상의 피로를 녹여줍니다. 각 트랙은 여행자의 이야기를 담고 있으며, 듣는 이를 평화로운 산책길로 초대합니다.',
      youtubeUrl: 'https://www.youtube.com/embed/M4sEcIHG0Yc'
    },
    { 
      id: 'bass-culture', 
      title: 'Bass Culture', 
      subtitle: 'DUBSTEP',
      artist: 'Sub Zero',
      image: 'https://images.unsplash.com/photo-1606874854197-570136ca68ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNzJTIwZHVic3RlcCUyMGNsdWJ8ZW58MXx8fHwxNzYxNzI1Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '강렬한 베이스라인과 복잡한 리듬이 특징인 덥스텝 앨범입니다. 클럽 문화의 정수를 담아낸 이 작품은 EDM 씬에 새로운 바람을 일으킵니다. 각 트랙은 청자를 깊은 베이스의 세계로 끌어들입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0'
    },
    { 
      id: 'jazz-lounge', 
      title: 'Jazz Lounge', 
      subtitle: 'JAZZ',
      artist: 'Midnight Quartet',
      image: 'https://images.unsplash.com/photo-1687589891886-a8578a54ef76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwc2F4b3Bob25lJTIwbXVzaWN8ZW58MXx8fHwxNzYxNzI1Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '재즈 라운지의 우아한 분위기를 완벽하게 재현한 앨범입니다. 섬세한 피아노 연주와 색소폰의 감미로운 선율이 어우러져 고급스러운 음악 경험을 선사합니다. 늦은 밤 와인 한 잔과 함께 듣기 좋은 음악입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      id: 'rock-revolution', 
      title: 'Rock Revolution', 
      subtitle: 'ROCK',
      artist: 'Thunder Strike',
      image: 'https://images.unsplash.com/photo-1734556803558-2635adcc320b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwY29uY2VydCUyMGd1aXRhcnxlbnwxfHx8fDE3NjE3MjUzODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '클래식 록의 정신을 계승한 파워풀한 록 앨범입니다. 강렬한 기타 리프와 폭발적인 드럼 사운드가 특징이며, 록 음악의 본질을 담아냅니다. 에너지 넘치는 퍼포먼스로 청자를 사로잡습니다.',
      youtubeUrl: 'https://www.youtube.com/embed/M4sEcIHG0Yc'
    },
    { 
      id: 'tropical-vibes', 
      title: 'Tropical Vibes', 
      subtitle: 'TROPICAL HOUSE',
      artist: 'Island Breeze',
      image: 'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHwxNzYxNjQwNDg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '열대 섬의 여유로운 분위기를 담은 트로피컬 하우스 앨범입니다. 햇살 가득한 해변과 시원한 바다를 연상시키는 경쾌한 멜로디가 일상에 활력을 더해줍니다. 여름 파티에 완벽한 사운드트랙입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0'
    },
    { 
      id: 'classical-modern', 
      title: 'Classical Modern', 
      subtitle: 'CLASSICAL CROSSOVER',
      artist: 'Orchestra Nova',
      image: 'https://images.unsplash.com/photo-1519683384663-c9b34271669a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjBjbGFzc2ljYWwlMjBtdXNpY3xlbnwxfHx8fDE3NjE3MjUzODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '클래식과 현대 음악의 경계를 허무는 크로스오버 앨범입니다. 오케스트라의 웅장함과 전자 음악의 혁신이 조화를 이루며, 새로운 음악적 경험을 제공합니다. 전통과 현대가 만나는 지점을 탐구합니다.',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      id: 'r-and-b-soul', 
      title: 'R&B Soul', 
      subtitle: 'R&B',
      artist: 'Velvet Voice',
      image: 'https://images.unsplash.com/photo-1728310779494-f0cd4a4f085c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxybmIlMjBzb3VsJTIwbWljcm9waG9uZXxlbnwxfHx8fDE3NjE3MjUzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '소울풀한 보컬과 그루비한 리듬이 돋보이는 R&B 앨범입니다. 사랑과 감성을 노래하는 깊이 있는 가사와 부드러운 멜로디가 청자의 마음을 움직입니다. 현대 R&B의 정수를 담은 작품입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/M4sEcIHG0Yc'
    },
    { 
      id: 'future-bass', 
      title: 'Future Bass', 
      subtitle: 'FUTURE BASS',
      artist: 'Neon Dreams',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYxODE3Nzk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '미래지향적 사운드와 감성적인 멜로디가 결합된 퓨처 베이스 앨범입니다. 밝고 경쾌한 신스 사운드와 강렬한 드롭이 특징이며, EDM의 새로운 방향을 제시합니다. 축제 분위기와 감성이 공존하는 독특한 작품입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0'
    },
    { 
      id: 'indie-rock', 
      title: 'Indie Rock Sessions', 
      subtitle: 'INDIE ROCK',
      artist: 'The Wanderers',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljJTIwYXJ0aXN0fGVufDF8fHx8MTc2MTgxNzc5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: '로파이 감성과 록 사운드가 만난 인디 록 앨범입니다. 솔직하고 날것의 감성을 담은 가사와 에너지 넘치는 연주가 조화를 이룹니다. 젊은 세대의 고민과 열정을 음악으로 풀어낸 진정성 있는 작품입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      id: 'lofi-hiphop', 
      title: 'Lo-Fi Study Beats', 
      subtitle: 'LO-FI HIP HOP',
      artist: 'Chill Vibes',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRyZW5kfGVufDF8fHx8MTc2MTgxNzc5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: '집중과 휴식을 위한 완벽한 로파이 힙합 앨범입니다. 따뜻한 재즈 샘플과 부드러운 비트가 편안한 분위기를 조성합니다. 공부, 독서, 작업 시 최적의 배경음악으로 많은 이들에게 사랑받는 장르입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/M4sEcIHG0Yc'
    },
    { 
      id: 'progressive-house', 
      title: 'Progressive Journey', 
      subtitle: 'PROGRESSIVE HOUSE',
      artist: 'Horizon',
      image: 'https://images.unsplash.com/photo-1624703307604-744ec383cbf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjI4MjY3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '서서히 쌓아가는 긴장감과 감동적인 멜로디가 특징인 프로그레시브 하우스 앨범입니다. 각 트랙은 하나의 여정처럼 구성되어 청자를 음악적 모험으로 이끕니다. 페스티벌의 감동을 집에서도 느낄 수 있는 웅장한 사운드입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0'
    },
    { 
      id: 'kpop-revolution', 
      title: 'K-Revolution', 
      subtitle: 'K-POP',
      artist: 'NOVA',
      image: 'https://images.unsplash.com/photo-1675859427928-fe41277572b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG11c2ljaWFufGVufDF8fHx8MTc2MTczOTcyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: '글로벌 시장을 겨냥한 차세대 K-POP 앨범입니다. 중독성 있는 멜로디와 파워풀한 퍼포먼스, 완성도 높은 프로덕션이 어우러져 K-POP의 진수를 보여줍니다. 다국어 가사와 글로벌 트렌드를 반영한 혁신적인 작품입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      id: 'blues-revival', 
      title: 'Blues Revival', 
      subtitle: 'BLUES',
      artist: 'Delta Kings',
      image: 'https://images.unsplash.com/photo-1613412140788-9ed674d57c41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWNpYW4lMjBzYXhvcGhvbmV8ZW58MXx8fHwxNzYyNzEwMzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '전통 블루스의 정통성을 현대적으로 재해석한 앨범입니다. 깊은 감성의 기타 연주와 소울풀한 보컬이 어우러져 블루스의 본질을 전달합니다. 고전적인 사운드와 현대적 프로덕션의 완벽한 조화를 경험하세요.',
      youtubeUrl: 'https://www.youtube.com/embed/M4sEcIHG0Yc'
    },
    { 
      id: 'ambient-meditation', 
      title: 'Ambient Meditation', 
      subtitle: 'AMBIENT',
      artist: 'Zen Gardens',
      image: 'https://images.unsplash.com/photo-1701374929875-37125c54cb29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMHR1cm50YWJsZXxlbnwxfHx8fDE3NjI3NTc5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '명상과 힐링을 위한 앰비언트 사운드스케이프 앨범입니다. 자연의 소리와 미니멀한 전자음이 조화를 이루며 평온한 공간을 창조합니다. 요가, 명상, 수면 유도에 적합한 치유의 음악입니다.',
      youtubeUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0'
    },
  ];

  const spotlightItems = spotlightData.slice(0, 6).map(spotlight => ({
    id: spotlight.id,
    thumbnail: spotlight.image,
    title: spotlight.title,
    description: spotlight.description
  }));

  const processItems = [
    { 
      id: '1', 
      label: '유통 신청 접수 및 계약',
      description: 'VLENDING for artist 회원가입\n음원 유통 신청\n전자계약서 작성'
    },
    { 
      id: '2', 
      label: '음원발매 준비',
      description: '앨범 정보 및 트랙정보 등록\n검수\n발매일 설정\n발매 & 프로모션 요청'
    },
    { 
      id: '3', 
      label: '음원 발매',
      description: '국내외 주요 음원 플랫폼 발매\n스트리밍 서비스 등록\n전 세계 청취자에게 전달'
    },
    { 
      id: '4', 
      label: '정산',
      description: 'VLENDING for artist를 활용하여\n정산 내역 확인\n수익 정산 및 송금'
    },
  ];

  // Articles data
  const articles = [
    {
      id: '1',
      title: '음악 스트리밍의 미래: AI와 큐레이션의 만남',
      category: 'INDUSTRY',
      date: '2025.10.20',
      thumbnail: 'https://images.unsplash.com/photo-1618578353017-74b491b3ece9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGFydGlzdHxlbnwxfHx8fDE3NjE3MjI4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: '인공지능 기술이 음악 산업에 가져올 변화와 개인화된 음악 경험의 미래를 탐구합니다.',
      content: {
        sections: [
          {
            heading: '음악 산업의 디지털 혁명',
            text: '스트리밍 서비스가 대중화되면서 음악 소비 방식이 근본적으로 변화했습니다. 이제는 단순히 음악을 듣는 것을 넘어, AI가 각 사용자의 취향을 분석하여 완벽한 플레이리스트를 제공하는 시대가 되었습니다.\n\n음악 추천 알고리즘은 날이 갈수록 정교해지고 있으며, 사용자의 청취 패턴, 시간대, 날씨, 심지어 기분까지 고려하여 최적의 음악을 제안합니다.',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW98ZW58MXx8fHwxNzYxNjYxNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080'
          },
          {
            heading: 'AI 큐레이션의 힘',
            text: 'AI 기반 큐레이션은 단순한 추천을 넘어 새로운 음악 발견의 도구가 되고 있습니다. 머신러닝 알고리즘은 수백만 곡의 데이터베이스에서 사용자가 좋아할 만한 숨겨진 보석 같은 곡들을 찾아냅니다.\n\n이는 신예 아티스트들에게도 큰 기회가 되고 있습니다. 대형 레이블 없이도 AI 추천 시스템을 통해 전 세계 리스너들에게 다가갈 수 있게 되었습니다.'
          },
          {
            heading: '아티스트와 리스너의 새로운 관계',
            text: '디지털 플랫폼은 아티스트와 팬 사이의 거리를 좁혔습니다. 실시간 데이터를 통해 아티스트는 자신의 음악이 어떻게 소비되는지 즉각적으로 파악할 수 있으며, 이를 바탕으로 더 나은 음악을 만들어갈 수 있습니다.\n\n앞으로의 음악 산업은 기술과 예술이 조화를 이루며, 모든 이들에게 더 풍요로운 음악 경험을 제공할 것입니다.',
            image: 'https://images.unsplash.com/photo-1646500366920-b4c5ce29237d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYxNzIyODMwfDA&ixlib=rb-4.1.0&q=80&w=1080'
          }
        ]
      },
      author: 'VLENDING Team'
    },
    {
      id: '2',
      title: '인디 아티스트를 위한 음원 배급 가이드',
      category: 'GUIDE',
      date: '2025.10.15',
      thumbnail: 'https://images.unsplash.com/photo-1700087209989-5a83d1a7c484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYxNjIyMDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: '독립 아티스트가 전 세계 플랫폼에 음악을 배급하고 수익을 창출하는 방법을 알아봅니다.',
      content: {
        sections: [
          {
            heading: '디지털 배급의 시작',
            text: '과거에는 음반사와의 계약 없이 음악을 유통하는 것이 거의 불가능했습니다. 하지만 이제는 디지털 배급 플랫폼을 통해 누구나 자신의 음악을 전 세계에 공개할 수 있습니다.\n\nVLENDING과 같은 배급 플랫폼은 아티스트와 주요 스트리밍 서비스를 연결하는 다리 역할을 합니다. Spotify, Apple Music, YouTube Music 등 50개 이상의 플랫폼에 동시에 음원을 업로드할 수 있습니다.'
          },
          {
            heading: '음원 등록 프로세스',
            text: '음원 배급은 생각보다 간단합니다. 먼저 완성된 마스터 음원과 앨범 아트워크를 준비합니다. 그 다음 배급 플랫폼에 가입하고 앨범 정보(제목, 아티스트명, 장르, 발매일 등)를 입력합니다.\n\n보통 발매 예정일 2-3주 전에 제출하는 것이 좋으며, 플랫폼 검수를 거쳐 정식 발매가 이루어집니다. 검수 과정에서는 음원의 품질, 메타데이터의 정확성 등이 확인됩니다.',
            image: 'https://images.unsplash.com/photo-1629426958038-a4cb6e3830a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHMlMjBtdXNpY3xlbnwxfHx8fDE3NjE2NjY0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080'
          },
          {
            heading: '수익 모델 이해하기',
            text: '스트리밍 수익은 재생 횟수에 따라 결정됩니다. 플랫폼마다 스트림당 지급하는 금액이 다르지만, 대부분 투명하게 정산 내역을 확인할 수 있습니다.\n\n중요한 것은 꾸준한 홍보와 팬층 구축입니다. SNS를 활용한 마케팅, 플레이리스트 등록 신청, 다른 아티스트와의 협업 등 다양한 방법으로 음악을 알릴 수 있습니다. 성공적인 인디 아티스트들은 음악적 재능뿐만 아니라 마케팅 전략에도 시간을 투자합니다.'
          }
        ]
      },
      author: 'VLENDING Team'
    },
    {
      id: '3',
      title: '2025년 K-POP 글로벌 트렌드 분석',
      category: 'TREND',
      date: '2025.10.10',
      thumbnail: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2R8ZW58MXx8fHwxNzYxNjE3MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: 'K-POP이 전 세계 음악 시장을 어떻게 변화시키고 있는지 데이터로 살펴봅니다.',
      content: {
        sections: [
          {
            heading: '글로벌 시장에서의 K-POP',
            text: 'K-POP은 이제 단순한 음악 장르를 넘어 하나의 문화 현상이 되었습니다. 2025년 현재, K-POP 아티스트들은 빌보드 차트를 비롯한 전 계 주요 음악 차트에서 상위권을 차지하고 있습니다.\n\n특히 소셜 미디어와 스트리밍 플랫폼의 발달은 K-POP의 글로벌 확산에 결정적인 역할을 했습니다. TikTok, YouTube Shorts 등의 숏폼 콘텐츠를 통해 K-POP 음악과 안무가 바이럴되며 새로운 팬층을 지속적으로 형성하고 있습니다.'
          },
          {
            heading: '성공 요인 분석',
            text: 'K-POP의 성공 비결은 여러 가지가 있지만, 가장 큰 요인은 완성도 높은 퍼포먼스와 체계적인 팬덤 관리입니다. 엄격한 트레이닝 시스템을 통해 배출된 아티스트들은 노래, 춤, 비주얼 모든 면에서 높은 수준을 보여줍니다.\n\n또한 다국어 콘텐츠 제작, 글로벌 협업, 현지화된 마케팅 전략 등 세심한 노력들이 K-POP의 국제적 인기를 뒷받침하고 있습니다. 팬덤 문화도 중요한 역할을 하는데, 팬들의 적극적인 홍보와 스트리밍 참여가 차트 성적에 큰 영향을 미칩니다.',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW98ZW58MXx8fHwxNzYxNjYxNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080'
          },
          {
            heading: '미래 전망',
            text: 'K-POP의 미래는 더욱 밝아 보입니다. 메타버스, AI 기술 등 새로운 기술과의 접목을 통해 더욱 혁신적인 콘텐츠가 선보이고 있습니다. 가상 아이돌, 메타버스 콘서트 등 새로운 형태의 음악 경험이 등장하고 있습니다.\n\n또한 K-POP의 성공 모델을 벤치마킹하여 다른 아시아 국가들도 자국의 팝 음악을 글로벌화하는 시도를 하고 있어, 아시아 음악 시장 전체가 성장하는 선순환 구조가 만들어지고 있습니다.'
          }
        ]
      },
      author: 'Music Analyst'
    },
    {
      id: '4',
      title: '음악 프로듀서가 알려주는 믹싱과 마스터링 팁',
      category: 'PRODUCTION',
      date: '2025.10.05',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW98ZW58MXx8fHwxNzYxNjYxNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: '전문 프로듀서가 공개하는 고품질 음악 제작의 비밀을 알아봅니다.',
      content: {
        sections: [
          {
            heading: '믹싱의 기초',
            text: '믹싱은 각 트랙의 볼륨, 팬, EQ 등을 조절하여 조화로운 사운드를 만드는 과정입니다. 좋은 믹싱의 핵심은 각 악기가 자신의 공간을 가지도록 하는 것입니다.'
          }
        ]
      },
      author: 'Studio Pro'
    },
    {
      id: '5',
      title: '비닐 레코드의 부활: 아날로그 음악의 재발견',
      category: 'CULTURE',
      date: '2025.09.28',
      thumbnail: 'https://images.unsplash.com/photo-1603850121303-d4ade9e5ba65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMHBsYXllcnxlbnwxfHx8fDE3NjE2Nzk0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: '디지털 시대에 비닐 레코드가 다시 주목받는 이유와 그 의미를 탐구합니다.',
      content: {
        sections: [
          {
            heading: '아날로그의 따뜻함',
            text: '비닐 레코드는 디지털 음원과는 다른 따뜻하고 풍부한 사운드를 제공합니다. 젊은 세대를 중심으로 비닐 수집 문화가 확산되고 있습니다.'
          }
        ]
      },
      author: 'Vinyl Enthusiast'
    },
    {
      id: '6',
      title: '라이브 스트리밍 콘서트의 새로운 가능성',
      category: 'TECHNOLOGY',
      date: '2025.09.20',
      thumbnail: 'https://images.unsplash.com/photo-1709731191876-899e32264420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzYxNjQ2NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: '팬데믹 이후 진화한 온라인 콘서트의 현재와 미래를 살펴봅니다.',
      content: {
        sections: [
          {
            heading: '온라인 콘서트의 진화',
            text: '코로나 이후 급성장한 온라인 콘서트는 이제 오프라인 공연을 보완하는 새로운 형태의 엔터테인먼트로 자리잡았습니다.'
          }
        ]
      },
      author: 'Tech Music Writer'
    },
    {
      id: '7',
      title: '메타버스 시대의 음악 산업',
      category: 'INDUSTRY',
      date: '2025.09.15',
      thumbnail: 'https://images.unsplash.com/photo-1642171588180-d61117af47ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMHJlY29yZGluZ3xlbnwxfHx8fDE3NjE3MTE5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: '가상 공간에서 펼쳐지는 새로운 음악 경험과 비즈니스 모델을 분석합니다.',
      content: {
        sections: [
          {
            heading: '가상 공연장의 등장',
            text: '메타버스 플랫폼에서 진행되는 가상 콘서트는 물리적 한계를 뛰어넘는 새로운 경험을 제공합니다.'
          }
        ]
      },
      author: 'Future Music Lab'
    },
    {
      id: '8',
      title: '음악 저작권의 이해: 아티스트가 꼭 알아야 할 것들',
      category: 'GUIDE',
      date: '2025.09.10',
      thumbnail: 'https://images.unsplash.com/photo-1629426958038-a4cb6e3830a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHMlMjBtdXNpY3xlbnwxfHx8fDE3NjE2NjY0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: '음악 창작자를 위한 저작권 기초 지식과 실전 팁을 제공합니다.',
      content: {
        sections: [
          {
            heading: '저작권의 기본 개념',
            text: '음악 저작권은 작곡가와 작사가의 권리를 보호하며, 적절한 이해와 관리가 필수적입니다.'
          }
        ]
      },
      author: 'Legal Expert'
    },
    {
      id: '9',
      title: '플레이리스트 큐레이션의 예술',
      category: 'CULTURE',
      date: '2025.09.05',
      thumbnail: 'https://images.unsplash.com/photo-1607270636108-52e65b5878b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwbXVzaWMlMjBsaXN0ZW5pbmd8ZW58MXx8fHwxNzYxNzA5MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      excerpt: '감성을 자극하는 완벽한 플레이리스트를 만드는 방법을 알아봅니다.',
      content: {
        sections: [
          {
            heading: '좋은 플레이리스트의 조건',
            text: '플레이리스트는 단순한 곡 모음이 아니라 스토리를 전달하는 하나의 작품입니다.'
          }
        ]
      },
      author: 'Playlist Curator'
    }
  ];

  // Helper function to get page display name
  const getPageName = (view: ViewType): string => {
    switch (view.type) {
      case 'home': return 'Home';
      case 'about': return 'About Us';
      case 'released': return 'Released';
      case 'story': return 'Our Story';
      case 'contact': return 'Contact';
      case 'admin': return 'Admin';
      default: return 'Home';
    }
  };

  // Navigate to a new view and save current view to history
  const navigateTo = (newView: ViewType) => {
    setViewHistory((prev: ViewType[]) => [...prev, currentView]);
    setCurrentView(newView);
    window.scrollTo(0, 0);
  };

  // Go back to previous view
  const goBack = () => {
    if (viewHistory.length > 0) {
      const previousView = viewHistory[viewHistory.length - 1];
      setViewHistory((prev: ViewType[]) => prev.slice(0, -1));
      setCurrentView(previousView);
      window.scrollTo(0, 0);
    } else {
      // Fallback to home if no history
      setCurrentView({ type: 'home' });
      window.scrollTo(0, 0);
    }
  };

  // Get previous page name for back button display
  const getPreviousPageName = (): string => {
    if (viewHistory.length > 0) {
      return getPageName(viewHistory[viewHistory.length - 1]);
    }
    return 'Home';
  };

  // Handle navigation
  const handleAboutClick = (scrollToFaq?: boolean) => {
    navigateTo({ type: 'about', scrollToFaq });
  };

  const handleReleasedClick = (tab?: 'album' | 'spotlight') => {
    navigateTo({ type: 'released', releasedTab: tab });
  };

  const handleStoryClick = () => {
    navigateTo({ type: 'story' });
  };

  const handleContactClick = () => {
    navigateTo({ type: 'contact' });
  };

  const handleAlbumClick = (albumId: string, fromPage?: 'home' | 'released') => {
    navigateTo({ type: 'album', albumId, fromPage });
  };

  const handleArticleClick = (articleId: string, fromPage?: 'story' | 'home') => {
    navigateTo({ type: 'article', articleId, fromPage });
  };

  const handleSpotlightClick = (spotlightId: string) => {
    navigateTo({ type: 'spotlight', spotlightId });
  };

  const handleBackToHome = () => {
    setViewHistory([]);
    setCurrentView({ type: 'home' });
    window.scrollTo(0, 0);
  };

  const handleAdminClick = () => {
    navigateTo({ type: 'admin' });
  };

  const handleNavigateToAboutFaq = () => {
    navigateTo({ type: 'about', scrollToFaq: true });
  };

  // Show admin page
  if (currentView.type === 'admin') {
    return <AdminPage onBack={handleBackToHome} />;
  }

  // Show album detail page
  if (currentView.type === 'album' && currentView.albumId) {
    const selectedAlbum = albumItems.find(album => album.id === currentView.albumId);
    if (selectedAlbum) {
      const enrichedAlbum = enrichAlbumData(selectedAlbum);
      return <AlbumDetail album={enrichedAlbum} onBack={goBack} previousPageName={getPreviousPageName()} />;
    }
  }

  // Show article detail page
  if (currentView.type === 'article' && currentView.articleId) {
    const selectedArticle = articles.find(article => article.id === currentView.articleId);
    if (selectedArticle) {
      return <ArticleDetail article={selectedArticle} onBack={goBack} previousPageName={getPreviousPageName()} />;
    }
  }

  // Show about page
  if (currentView.type === 'about') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="about" onAboutClick={handleAboutClick} onStoryClick={handleStoryClick} onReleasedClick={handleReleasedClick} onHomeClick={handleBackToHome} onContactClick={handleContactClick} onMenuOpenChange={setIsMenuOpen} />
        <AboutPage scrollToFaq={currentView.scrollToFaq} />
        <Footer onAdminClick={handleAdminClick} />
        <FloatingButtons isMenuOpen={isMenuOpen} />
      </div>
    );
  }

  // Show spotlight detail page
  if (currentView.type === 'spotlight' && currentView.spotlightId) {
    const selectedSpotlight = spotlightData.find(spotlight => spotlight.id === currentView.spotlightId);
    if (selectedSpotlight) {
      return <SpotlightDetail spotlight={selectedSpotlight} onBack={goBack} previousPageName={getPreviousPageName()} />;
    }
  }

  // Show released page
  if (currentView.type === 'released') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="released" onAboutClick={handleAboutClick} onStoryClick={handleStoryClick} onReleasedClick={handleReleasedClick} onHomeClick={handleBackToHome} onContactClick={handleContactClick} onMenuOpenChange={setIsMenuOpen} />
        <ReleasedPage 
          albums={albumItems} 
          onAlbumClick={(id) => handleAlbumClick(id, 'released')} 
          onSpotlightClick={handleSpotlightClick} 
          initialTab={currentView.releasedTab}
        />
        <Footer onAdminClick={handleAdminClick} />
        <FloatingButtons isMenuOpen={isMenuOpen} />
      </div>
    );
  }

  // Show story page
  if (currentView.type === 'story') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="story" onAboutClick={handleAboutClick} onStoryClick={handleStoryClick} onReleasedClick={handleReleasedClick} onHomeClick={handleBackToHome} onContactClick={handleContactClick} onMenuOpenChange={setIsMenuOpen} />
        <OurStoryPage articles={articles} onArticleClick={(id) => handleArticleClick(id, 'story')} />
        <Footer onAdminClick={handleAdminClick} />
        <FloatingButtons isMenuOpen={isMenuOpen} />
      </div>
    );
  }

  // Show contact page
  if (currentView.type === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="contact" onAboutClick={handleAboutClick} onStoryClick={handleStoryClick} onReleasedClick={handleReleasedClick} onHomeClick={handleBackToHome} onContactClick={handleContactClick} onMenuOpenChange={setIsMenuOpen} />
        <ContactPage onNavigateToAboutFaq={handleNavigateToAboutFaq} />
        <Footer onAdminClick={handleAdminClick} />
        <FloatingButtons isMenuOpen={isMenuOpen} />
      </div>
    );
  }

  // Show home page
  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="home" onAboutClick={handleAboutClick} onStoryClick={handleStoryClick} onReleasedClick={handleReleasedClick} onHomeClick={handleBackToHome} onContactClick={handleContactClick} onMenuOpenChange={setIsMenuOpen} />
      
      <main>
        <MagazineGrid articles={articles} onArticleClick={(id) => handleArticleClick(id, 'home')} onSpotlightClick={handleSpotlightClick} />
        
        <SpotlightGrid items={spotlightItems} onSpotlightClick={handleSpotlightClick} maxItems={5} />
        <GridGallery title="Released" items={albumItems.slice(0, 12)} onAlbumClick={(id) => handleAlbumClick(id, 'home')} />
        <ProcessSection items={processItems} />
      </main>
      
      <Footer onAdminClick={handleAdminClick} />
      <FloatingButtons isMenuOpen={isMenuOpen} />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<MainPage />);
