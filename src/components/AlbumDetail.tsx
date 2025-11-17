import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VlendingSymbol } from './VlendingSymbol';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { FloatingButtons } from './FloatingButtons';
import melonLogo from 'figma:asset/5d21c33d521df6750f1f0f6f37eb4d4d4fae8567.png';
import genieLogo from 'figma:asset/5a0a7495d9267dfd7b6a9685a5d4d5e2fdb7e180.png';
import bugsLogo from 'figma:asset/5f42d67e62fa7db7bf638517ea80153730216a73.png';
import vibeLogo from 'figma:asset/2ad3921d833025d653938e1a7ef2510edd23103a.png';
import youtubeMusicLogo from 'figma:asset/86541cecdcdc8d8afe04beb54183b1487e179887.png';
import floLogo from 'figma:asset/cf320bfbbebca72033488fd4ef9e0deb4709b537.png';

interface YoutubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

interface AlbumDetailProps {
  album: {
    id: string;
    title: string;
    subtitle: string;
    artist: string;
    image?: string;
    description: string;
    youtubeUrl?: string;
    youtubeVideos?: YoutubeVideo[];
    releaseDate?: string;
    label?: string;
    tracks?: Array<{
      number: number;
      title: string;
      duration?: string;
    }>;
    credits?: Array<{
      role: string;
      name: string;
    }>;
    detailedDescription?: string;
  };
  onBack: () => void;
  previousPageName?: string;
}

// 음악 플랫폼 데이터 (관리자 페이지에서 수정 가능)
const getMusicPlatforms = () => {
  // 실제로는 백엔드 또는 로컬 스토리지에서 가져옴
  const stored = localStorage.getItem('musicPlatforms');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // 기본 플랫폼 목록
  return [
    { id: 'melon', name: 'Melon', logo: melonLogo, url: 'https://www.melon.com' },
    { id: 'genie', name: 'Genie', logo: genieLogo, url: 'https://www.genie.co.kr' },
    { id: 'bugs', name: 'Bugs', logo: bugsLogo, url: 'https://www.bugs.co.kr' },
    { id: 'flo', name: 'FLO', logo: floLogo, url: 'https://www.music-flo.com' },
    { id: 'vibe', name: 'Vibe', logo: vibeLogo, url: 'https://vibe.naver.com' },
    { id: 'youtube', name: 'YouTube Music', logo: youtubeMusicLogo, url: 'https://music.youtube.com' },
  ];
};

export function AlbumDetail({ album, onBack, previousPageName = 'Released' }: AlbumDetailProps) {
  const [isPlatformDialogOpen, setIsPlatformDialogOpen] = useState(false);
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);
  const [showVideoList, setShowVideoList] = useState(true);
  
  const platforms = getMusicPlatforms();
  
  // youtubeVideos 또는 youtubeUrl 중 하나라도 있으면 버튼 표시
  const hasYoutubeContent = album.youtubeVideos && album.youtubeVideos.length > 0 || album.youtubeUrl;
  const youtubeVideos = album.youtubeVideos || [];
  
  const handleOpenYoutubeDialog = () => {
    // 비디오가 1개일 때는 바로 재생
    if (youtubeVideos.length === 1) {
      setSelectedVideo(youtubeVideos[0]);
      setShowVideoList(false);
    } else if (youtubeVideos.length > 1) {
      // 비디오가 여러개일 때는 목록 표시
      setShowVideoList(true);
      setSelectedVideo(null);
    } else if (album.youtubeUrl) {
      // 기존 youtubeUrl이 있는 경우 (하위 호환성)
      setSelectedVideo({
        id: 'legacy',
        title: album.title,
        url: album.youtubeUrl,
        thumbnail: ''
      });
      setShowVideoList(false);
    }
    setIsYoutubeDialogOpen(true);
  };
  
  const handleVideoSelect = (video: YoutubeVideo) => {
    setSelectedVideo(video);
    setShowVideoList(false);
  };
  
  const handleBackToList = () => {
    setShowVideoList(true);
    setSelectedVideo(null);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="px-4 md:px-12 lg:px-16 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {previousPageName}</span>
          </button>
        </div>
      </header>

      {/* Album detail content */}
      <main className="pt-20 pb-0">
        <div className="w-full">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Album cover */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square w-full lg:sticky lg:top-20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                  {album.image ? (
                    <ImageWithFallback
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <VlendingSymbol />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Album information */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col justify-center space-y-8 px-8 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20"
              >
                <div className="space-y-4">
                  <p className="text-sm tracking-wider text-gray-500 uppercase">
                    {album.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
                    {album.title}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {album.artist}
                  </p>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Album Details */}
                <div className="space-y-3">
                  {album.releaseDate && (
                    <div className="flex gap-2">
                      <span className="text-sm tracking-wider text-gray-500 uppercase min-w-[100px]">발매일</span>
                      <span className="text-sm text-gray-700">{album.releaseDate}</span>
                    </div>
                  )}
                  {album.label && (
                    <div className="flex gap-2">
                      <span className="text-sm tracking-wider text-gray-500 uppercase min-w-[100px]">기획사</span>
                      <span className="text-sm text-gray-700">{album.label}</span>
                    </div>
                  )}
                </div>

                {/* Track List */}
                {album.tracks && album.tracks.length > 0 && (
                  <>
                    <div className="h-px bg-gray-200"></div>
                    <div className="space-y-4">
                      <h2 className="text-sm tracking-wider text-gray-500 uppercase">
                        Track List
                      </h2>
                      <div className="space-y-1">
                        {album.tracks.map((track) => (
                          <div 
                            key={track.number} 
                            className="flex justify-between items-center py-1 hover:bg-gray-50 transition-colors px-3 -mx-3 rounded"
                          >
                            <div className="flex gap-4 items-center flex-1">
                              <span className="text-sm text-gray-400 w-6">{track.number}</span>
                              <span className="text-sm text-gray-700">{track.title}</span>
                            </div>
                            {track.duration && (
                              <span className="text-sm text-gray-400">{track.duration}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Album Description */}
                {album.detailedDescription && (
                  <>
                    <div className="h-px bg-gray-200"></div>
                    <div className="space-y-4">
                      <h2 className="text-sm tracking-wider text-gray-500 uppercase">
                        앨범 소개
                      </h2>
                      <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                        {album.detailedDescription}
                      </p>
                    </div>
                  </>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => setIsPlatformDialogOpen(true)}
                    className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-[100px]"
                  >
                    Listen Now
                  </button>
                  {hasYoutubeContent && (
                    <button 
                      onClick={handleOpenYoutubeDialog}
                      className="px-8 py-4 bg-white text-black border-2 border-black hover:bg-gray-100 transition-colors rounded-[100px]"
                    >
                      Watch on MV
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* 음악 플랫폼 선택 팝업 */}
      <Dialog open={isPlatformDialogOpen} onOpenChange={setIsPlatformDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>음악 플랫폼 선택</DialogTitle>
            <DialogDescription>
              듣고 싶은 음악 플랫폼을 선택해주세요
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {platforms.map((platform: any) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                onClick={() => setIsPlatformDialogOpen(false)}
              >
                {platform.name === 'Melon' ? (
                  <img 
                    src={platform.logo} 
                    alt="Melon" 
                    className="w-8 h-8 object-contain"
                    style={{ borderRadius: '20%' }}
                  />
                ) : platform.name === 'Genie' ? (
                  <img 
                    src={platform.logo} 
                    alt="Genie" 
                    className="w-8 h-8 object-contain"
                    style={{ borderRadius: '20%' }}
                  />
                ) : platform.name === 'Bugs' ? (
                  <img 
                    src={platform.logo} 
                    alt="Bugs" 
                    className="w-8 h-8 object-contain"
                    style={{ borderRadius: '20%' }}
                  />
                ) : platform.name === 'Vibe' ? (
                  <img 
                    src={platform.logo} 
                    alt="Vibe" 
                    className="w-8 h-8 object-contain"
                    style={{ borderRadius: '20%' }}
                  />
                ) : platform.name === 'YouTube Music' ? (
                  <img 
                    src={platform.logo} 
                    alt="YouTube Music" 
                    className="w-8 h-8 object-contain"
                    style={{ borderRadius: '20%' }}
                  />
                ) : platform.name === 'FLO' ? (
                  <img 
                    src={platform.logo} 
                    alt="FLO" 
                    className="w-8 h-8 object-contain"
                    style={{ borderRadius: '20%' }}
                  />
                ) : (
                  <span className="text-2xl">{platform.logo}</span>
                )}
                <span className="font-medium">{platform.name}</span>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* 유튜브 팝업 */}
      {hasYoutubeContent && (
        <Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                {selectedVideo ? selectedVideo.title : `${album.title} - YouTube`}
              </DialogTitle>
              <DialogDescription>
                {album.artist}
              </DialogDescription>
            </DialogHeader>
            
            {/* 비디오 목록 표시 (비디오가 여러개이고 목록 모드일 때) */}
            {showVideoList && youtubeVideos.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {youtubeVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-video w-full relative overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300"
                        onError={(e) => {
                          // 썸네일 로드 실패 시 대체 이미지
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      {/* 재생 버튼 오버레이 */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                          <div className="w-0 h-0 border-l-[16px] border-l-black border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                      <p className="text-sm text-left line-clamp-2">{video.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* 비디오 재생 (비디오가 선택되었거나 1개일 때) */}
            {!showVideoList && selectedVideo && (
              <div className="space-y-4">
                {/* 뒤로가기 버튼 (비디오가 여러개일 때만) */}
                {youtubeVideos.length > 1 && (
                  <button
                    onClick={handleBackToList}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>목록으로 돌아가기</span>
                  </button>
                )}
                
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={selectedVideo.url}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
      
      {/* Floating buttons */}
      <FloatingButtons />
    </div>
  );
}