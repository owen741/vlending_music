import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  logo: string;
  url: string;
}

interface AdminPageProps {
  onBack: () => void;
}

export function AdminPage({ onBack }: AdminPageProps) {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // 플랫폼 데이터 로드
  useEffect(() => {
    const stored = localStorage.getItem('musicPlatforms');
    if (stored) {
      setPlatforms(JSON.parse(stored));
    } else {
      // 기본 플랫폼 목록
      const defaultPlatforms = [
        { id: 'melon', name: 'Melon', logo: '🎵', url: 'https://www.melon.com' },
        { id: 'genie', name: 'Genie', logo: '🧞', url: 'https://www.genie.co.kr' },
        { id: 'bugs', name: 'Bugs', logo: '🐛', url: 'https://www.bugs.co.kr' },
        { id: 'flo', name: 'FLO', logo: '🎶', url: 'https://www.music-flo.com' },
        { id: 'vibe', name: 'Vibe', logo: '📻', url: 'https://vibe.naver.com' },
        { id: 'youtube', name: 'YouTube Music', logo: '▶️', url: 'https://music.youtube.com' },
      ];
      setPlatforms(defaultPlatforms);
      localStorage.setItem('musicPlatforms', JSON.stringify(defaultPlatforms));
    }
  }, []);

  // 플랫폼 추가
  const handleAddPlatform = () => {
    const newPlatform: Platform = {
      id: `platform-${Date.now()}`,
      name: '새 플랫폼',
      logo: '🎧',
      url: 'https://example.com'
    };
    setPlatforms([...platforms, newPlatform]);
    setIsEditing(true);
  };

  // 플랫폼 삭제
  const handleDeletePlatform = (id: string) => {
    setPlatforms(platforms.filter(p => p.id !== id));
  };

  // 플랫폼 정보 수정
  const handleUpdatePlatform = (id: string, field: keyof Platform, value: string) => {
    setPlatforms(platforms.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  // 저장
  const handleSave = () => {
    localStorage.setItem('musicPlatforms', JSON.stringify(platforms));
    setIsEditing(false);
    alert('플랫폼 정보가 저장되었습니다.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="px-4 md:px-12 lg:px-16 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 border border-black hover:bg-gray-100 transition-colors rounded-full"
              >
                {isEditing ? '편집 취소' : '편집 모드'}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-full flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  저장
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 md:px-12 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto py-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl tracking-tight mb-4">
              음악 플랫폼 관리
            </h1>
            <p className="text-lg text-gray-600">
              Listen Now 버튼 클릭 시 표시될 음악 플랫폼 목록을 관리합니다.
            </p>
          </div>

          {/* 플랫폼 목록 */}
          <div className="space-y-4">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-500 mb-2">플랫폼 이름</label>
                        <input
                          type="text"
                          value={platform.name}
                          onChange={(e) => handleUpdatePlatform(platform.id, 'name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div className="w-24">
                        <label className="block text-sm text-gray-500 mb-2">이모지</label>
                        <input
                          type="text"
                          value={platform.logo}
                          onChange={(e) => handleUpdatePlatform(platform.id, 'logo', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">URL</label>
                      <input
                        type="url"
                        value={platform.url}
                        onChange={(e) => handleUpdatePlatform(platform.id, 'url', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDeletePlatform(platform.id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        삭제
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{platform.logo}</span>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{platform.name}</h3>
                      <p className="text-sm text-gray-500">{platform.url}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* 플랫폼 추가 버튼 */}
            {isEditing && (
              <button
                onClick={handleAddPlatform}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-600"
              >
                <Plus className="w-5 h-5" />
                새 플랫폼 추가
              </button>
            )}
          </div>

          {/* 안내 메시지 */}
          {!isEditing && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                💡 <strong>Tip:</strong> 편집 모드를 활성화하여 플랫폼을 추가, 수정, 삭제할 수 있습니다.
                변경사항은 로컬 스토리지에 저장되며, AlbumDetail 페이지의 Listen Now 버튼에 즉시 반영됩니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}