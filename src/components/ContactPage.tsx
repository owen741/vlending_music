import { motion } from 'motion/react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { AlertCircle, CheckCircle2, Mail, Clock, MapPin, Phone, Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { SectionTitle } from './SectionTitle';

interface ContactPageProps {
  onNavigateToAboutFaq?: () => void;
}

export function ContactPage({ onNavigateToAboutFaq }: ContactPageProps) {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreeToPrivacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    '음원 유통 절차',
    '플랫폼 & 비용',
    '정산 & 수익',
    '저작권 & 법적 사항',
    '기술적 요구사항',
    '기타 문의'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 항목 검증
    if (!formData.name || !formData.email || !formData.phone || !formData.category || !formData.subject || !formData.message) {
      toast.error('모든 항목을 입력해주세요.', {
        icon: <AlertCircle className="w-5 h-5" />,
        className: 'bg-white border border-red-200 text-gray-900',
      });
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('올바른 이메일 형식을 입력해주세요.', {
        icon: <AlertCircle className="w-5 h-5" />,
        className: 'bg-white border border-red-200 text-gray-900',
      });
      return;
    }

    // 연락처 형식 검증 (숫자와 하이픈만 허용)
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('올바른 연락처 형식을 입력해주세요.', {
        icon: <AlertCircle className="w-5 h-5" />,
        className: 'bg-white border border-red-200 text-gray-900',
      });
      return;
    }

    // 개인정보 동의 검증
    if (!formData.agreeToPrivacy) {
      toast.error('개인정보 수집 및 이용에 동의해주세요.', {
        icon: <AlertCircle className="w-5 h-5" />,
        className: 'bg-white border border-red-200 text-gray-900',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 백엔드 API로 전송
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      
      // 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.', {
        icon: <CheckCircle2 className="w-5 h-5" />,
        className: 'bg-white border border-green-200 text-gray-900',
      });
      
      // 폼 초기화
      setFormData({
        category: '',
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreeToPrivacy: false
      });
    } catch (error) {
      toast.error('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.', {
        icon: <AlertCircle className="w-5 h-5" />,
        className: 'bg-white border border-red-200 text-gray-900',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20 pb-20 px-4 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto pt-12 md:pt-16 lg:pt-20">
          {/* Header */}
          <div className="mb-8">
            <SectionTitle 
              title="CONTACT" 
              subtitle="궁금하신 사항이 있으신가요? 문의 사항을 남겨주시면 빠르게 답변드리겠습니다."
              align="left"
              className="mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="tracking-tight mb-2">
                      이메일
                    </h3>
                    <a 
                      href="mailto:support@vlending.co.kr" 
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      support@vlending.co.kr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="tracking-tight mb-2">
                      운영 시간
                    </h3>
                    <p className="text-gray-600">
                      평일 10:00 - 18:00<br />
                      <span className="text-sm">(주말 및 공휴일 제외)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="tracking-tight mb-2">
                      평균 답변 시간
                    </h3>
                    <p className="text-gray-600">
                      영업일 기준 1-2일 이내<br />
                      <span className="text-sm">(긴급 문의 24시간 이내)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-6 border-2 border-black rounded-lg">
                <h3 className="tracking-tight mb-3">
                  FAQ를 먼저 확인해보세요
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  자주 묻는 질문에서 빠른 답변을 찾으실 수 있습니다.
                </p>
                <button 
                  onClick={onNavigateToAboutFaq}
                  className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all"
                >
                  FAQ 바로가기
                  <span>→</span>
                </button>
              </div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 문의 카테고리 - 최상단 */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm uppercase tracking-wider text-gray-700">
                    문의 카테고리 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger className="w-full h-14 text-base border border-gray-200 focus:border-black transition-colors px-3">
                      <SelectValue placeholder="문의 유형을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4} className="will-change-transform">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-base">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 이름 & 이메일 - 2열 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm uppercase tracking-wider text-gray-700">
                      이름 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-14 text-base border border-gray-200 focus:border-black transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm uppercase tracking-wider text-gray-700">
                      이메일 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-14 text-base border border-gray-200 focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* 연락처 */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm uppercase tracking-wider text-gray-700">
                    연락처 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-14 text-base border border-gray-200 focus:border-black transition-colors"
                    required
                  />
                </div>

                {/* 제목 */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm uppercase tracking-wider text-gray-700">
                    제목 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="문의 제목을 입력해주세요"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-14 text-base border border-gray-200 focus:border-black transition-colors"
                    required
                  />
                </div>

                {/* 문의내용 */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm uppercase tracking-wider text-gray-700">
                    문의내용 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="문의하실 내용을 자세히 작성해주세요"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full min-h-[200px] resize-none text-base border border-gray-200 focus:border-black transition-colors"
                    required
                  />
                </div>

                {/* 개인정보 수집 및 이용 동의 */}
                <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-wider text-gray-700">
                      개인정보 수집 및 이용
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
                      <p>• <strong>수집 항목:</strong> 이름, 이메일, 연락처, 문의내용</p>
                      <p>• <strong>수집 목적:</strong> 문의 접수 및 답변</p>
                      <p>• <strong>보유 기간:</strong> 처리 완료 후 1년</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, agreeToPrivacy: checked as boolean })
                      }
                      className="w-6 h-6"
                    />
                    <Label 
                      htmlFor="privacy" 
                      className="text-sm cursor-pointer leading-relaxed"
                    >
                      개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-black text-white hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group rounded-[8px]"
                >
                  {isSubmitting ? (
                    <>제출 중...</>
                  ) : (
                    <>
                      <span className="tracking-wider uppercase">문의 접수하기</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}