import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const businessTypes = [
  { id: 'ecommerce', name: 'Онлайн-торговля', icon: 'ShoppingCart', color: 'bg-blue-500' },
  { id: 'services', name: 'Услуги', icon: 'Scissors', color: 'bg-purple-500' },
  { id: 'it', name: 'IT и интернет', icon: 'Code', color: 'bg-indigo-500' },
  { id: 'education', name: 'Образование', icon: 'GraduationCap', color: 'bg-green-500' },
  { id: 'food', name: 'Общепит', icon: 'Coffee', color: 'bg-orange-500' },
  { id: 'production', name: 'Производство', icon: 'Factory', color: 'bg-gray-600' },
  { id: 'farming', name: 'Фермерство', icon: 'Leaf', color: 'bg-green-600' },
  { id: 'entertainment', name: 'Развлечения', icon: 'Camera', color: 'bg-pink-500' },
  { id: 'retail', name: 'Торговля', icon: 'Store', color: 'bg-cyan-500' },
  { id: 'fitness', name: 'Спорт и фитнес', icon: 'Dumbbell', color: 'bg-red-500' }
];

const loyaltyPrograms: Record<string, Array<{
  title: string;
  description: string;
  benefit: string;
  benefitType: 'discount' | 'cashback' | 'free' | 'bonus';
  logo: string;
  color: string;
}>> = {
  ecommerce: [
    { title: 'Яндекс.Директ', description: 'Мастер рекламных кампаний', benefit: '50%', benefitType: 'cashback', logo: '🎯', color: 'bg-yellow-100' },
    { title: 'Яндекс Бизнес', description: 'Рекламная подписка, которая привлекает клиентов', benefit: '50%', benefitType: 'cashback', logo: '🔍', color: 'bg-yellow-100' },
    { title: 'МойСклад', description: 'Программа для торговли на маркетплейсах', benefit: '3 месяца', benefitType: 'free', logo: '📦', color: 'bg-blue-100' },
    { title: 'Мегаgroup.ru', description: 'Разработка и продвижение сайтов', benefit: 'до 85%', benefitType: 'discount', logo: '🌐', color: 'bg-green-100' },
    { title: 'Контур.Эльба', description: 'Онлайн-бухгалтерия бесплатно', benefit: 'до 1 года', benefitType: 'free', logo: '📊', color: 'bg-blue-100' }
  ],
  services: [
    { title: 'Островок!', description: 'Сервис онлайн-бронирования отелей и квартир', benefit: '5%', benefitType: 'cashback', logo: '🏖️', color: 'bg-blue-100' },
    { title: 'Яндекс 360 для бизнеса', description: 'Онлайн-офис для вашей компании', benefit: '20% и 30%', benefitType: 'discount', logo: '💼', color: 'bg-purple-100' },
    { title: 'Авито Услуги', description: 'Сервис для поиска заказчиков', benefit: '7000 бонусов', benefitType: 'bonus', logo: '🛠️', color: 'bg-green-100' },
    { title: 'Мое дело', description: 'Бухгалтерское обслуживание для бизнеса', benefit: '3 месяца', benefitType: 'free', logo: '📋', color: 'bg-orange-100' }
  ],
  it: [
    { title: 'Яндекс.Директ', description: 'Мастер рекламных кампаний', benefit: '50%', benefitType: 'cashback', logo: '🎯', color: 'bg-yellow-100' },
    { title: 'Яндекс Командировки', description: 'Организация командировок без комиссий', benefit: '30%', benefitType: 'discount', logo: '✈️', color: 'bg-blue-100' },
    { title: 'Мое дело', description: 'Онлайн-бухгалтерия для ИП и ООО', benefit: '6 месяцев', benefitType: 'free', logo: '💻', color: 'bg-orange-100' },
    { title: '1C:БизнесСтарт', description: 'Онлайн-бухгалтерия', benefit: '10%', benefitType: 'discount', logo: '📊', color: 'bg-yellow-100' },
    { title: 'Битрикс24', description: 'Автоматизация бизнеса — быстро и просто', benefit: '2 месяца', benefitType: 'free', logo: '⚡', color: 'bg-blue-100' }
  ],
  education: [
    { title: 'Яндекс 360 для бизнеса', description: 'Онлайн-офис для вашей компании', benefit: '20% и 30%', benefitType: 'discount', logo: '💼', color: 'bg-purple-100' },
    { title: 'Контур.Школа', description: 'Онлайн-обучение под задачи бизнеса', benefit: '15%', benefitType: 'cashback', logo: '🎓', color: 'bg-red-100' },
    { title: 'Мое дело', description: 'Бухгалтерское обслуживание', benefit: '3 месяца', benefitType: 'free', logo: '📚', color: 'bg-orange-100' },
    { title: 'Ai Mono', description: 'Увеличьте скорость работы сотрудников с курсом по ИИ', benefit: 'до 10%', benefitType: 'discount', logo: '🤖', color: 'bg-indigo-100' }
  ],
  food: [
    { title: 'нетмонет', description: 'Чаевые, оплата счёта и меню по QR-коду', benefit: 'от 0,7%', benefitType: 'discount', logo: '💳', color: 'bg-gray-100' },
    { title: 'Restik', description: 'Облачная автоматизация ресторанного бизнеса', benefit: '2 месяца подписки', benefitType: 'free', logo: '🍽️', color: 'bg-orange-100' },
    { title: 'Saby Presto', description: 'Система автоматизации ресторанного бизнеса', benefit: '20%', benefitType: 'discount', logo: '☕', color: 'bg-blue-100' },
    { title: 'Мое дело', description: 'Бухгалтерия для ИП', benefit: '458₽ в месяц', benefitType: 'bonus', logo: '📋', color: 'bg-orange-100' }
  ],
  production: [
    { title: 'МойСклад', description: 'Программа для торговли на маркетплейсах', benefit: '3 месяца', benefitType: 'free', logo: '📦', color: 'bg-blue-100' },
    { title: 'Айтиком', description: 'Электронная подпись для любых целей бизнеса', benefit: '15%', benefitType: 'discount', logo: '📝', color: 'bg-green-100' },
    { title: 'Контур.Диадок', description: 'Система электронного документооборота', benefit: '10%', benefitType: 'discount', logo: '📄', color: 'bg-blue-100' },
    { title: 'Мое дело Финансы', description: 'Управленческий учёт от аудиторской компании', benefit: '30% или 3 месяца', benefitType: 'discount', logo: '💰', color: 'bg-orange-100' }
  ],
  farming: [
    { title: 'Амулекс', description: 'Альфа Юрист — корпоративный юрист на аутсорсе', benefit: '35%', benefitType: 'discount', logo: '⚖️', color: 'bg-teal-100' },
    { title: 'нетмонет', description: 'Чаевые, оплата счёта и меню по QR-коду', benefit: 'от 0,7%', benefitType: 'discount', logo: '🌾', color: 'bg-gray-100' },
    { title: 'Мое дело', description: 'Бухгалтерия для ИП', benefit: '458₽ в месяц', benefitType: 'bonus', logo: '🚜', color: 'bg-orange-100' },
    { title: 'Финтабло', description: 'Автоматизация управленческого учёта', benefit: 'Бесплатно', benefitType: 'free', logo: '📊', color: 'bg-blue-100' }
  ],
  entertainment: [
    { title: 'Островок!', description: 'Сервис онлайн-бронирования отелей и квартир', benefit: '5%', benefitType: 'cashback', logo: '🎪', color: 'bg-blue-100' },
    { title: 'Яндекс.Директ', description: 'Мастер рекламных кампаний', benefit: '50%', benefitType: 'cashback', logo: '🎯', color: 'bg-yellow-100' },
    { title: 'PayPeople', description: 'Найм и удержание станет проще', benefit: '50% на первый месяц', benefitType: 'discount', logo: '👥', color: 'bg-blue-100' },
    { title: 'МегаФон Таргет', description: 'Рекламная платформа мобильного оператора МегаФон', benefit: '3000 смс', benefitType: 'bonus', logo: '📱', color: 'bg-green-100' }
  ],
  retail: [
    { title: 'МойСклад', description: 'Программа для торговли на маркетплейсах', benefit: '3 месяца', benefitType: 'free', logo: '🏪', color: 'bg-blue-100' },
    { title: 'Bestplace', description: 'Платформа геоаналитики и ML-технологий', benefit: '10%', benefitType: 'discount', logo: '📍', color: 'bg-purple-100' },
    { title: 'Мегаgroup.ru', description: 'Разработка и продвижение сайтов', benefit: 'до 85%', benefitType: 'discount', logo: '🌐', color: 'bg-green-100' },
    { title: 'Контур.Эльба', description: 'Онлайн-бухгалтерия бесплатно', benefit: 'до 1 года', benefitType: 'free', logo: '📊', color: 'bg-blue-100' }
  ],
  fitness: [
    { title: 'Фабрика Учёта', description: 'Аутсорсинг бухгалтерии', benefit: '50%', benefitType: 'discount', logo: '💪', color: 'bg-purple-100' },
    { title: 'Кнопка', description: 'Бухгалтерия для малого бизнеса', benefit: '50%', benefitType: 'discount', logo: '🔘', color: 'bg-teal-100' },
    { title: 'PayPeople', description: 'Найм и удержание станет проще', benefit: '50% на первый месяц', benefitType: 'discount', logo: '👥', color: 'bg-blue-100' },
    { title: 'Яндекс.Директ', description: 'Мастер рекламных кампаний', benefit: '50%', benefitType: 'cashback', logo: '🎯', color: 'bg-yellow-100' }
  ]
};

type Step = 'welcome' | 'business' | 'loading' | 'programs' | 'details' | 'success';

function Index() {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [visiblePrograms, setVisiblePrograms] = useState<number>(0);

  const progress = {
    welcome: 0,
    business: 25,
    loading: 50,
    programs: 75,
    details: 90,
    success: 100
  }[step];

  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'programs') {
      setVisiblePrograms(0);
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setVisiblePrograms(prev => {
            if (prev >= selectedPrograms.length) {
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
        }, 150);
        return () => clearInterval(interval);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  const toggleBusiness = (id: string) => {
    setSelectedBusinesses(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleBusinessNext = () => {
    setStep('loading');
    setLoadingProgress(0);
    setTimeout(() => setStep('programs'), 2000);
  };

  const selectedPrograms = selectedBusinesses.flatMap(id => 
    loyaltyPrograms[id as keyof typeof loyaltyPrograms] || []
  ).slice(0, 8);

  const handleSubmit = () => {
    setStep('success');
  };

  const getBenefitColor = (type: string) => {
    switch(type) {
      case 'cashback': return 'text-primary';
      case 'discount': return 'text-blue-600';
      case 'free': return 'text-green-600';
      case 'bonus': return 'text-purple-600';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3 md:py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">А</span>
            </div>
            <span className="font-semibold text-sm md:text-lg text-foreground">Альфабанк Бизнес</span>
          </div>
          {step !== 'welcome' && step !== 'success' && (
            <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
              <Icon name="Clock" size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">~2 минуты</span>
            </div>
          )}
        </div>
      </header>

      {step !== 'welcome' && step !== 'success' && (
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-2 md:py-3">
            <Progress value={progress} className="h-1 md:h-1.5" />
          </div>
        </div>
      )}

      <main className="flex-1 flex items-center justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-5xl">
          {step === 'welcome' && (
            <div className="text-center space-y-6 md:space-y-8 animate-fade-in">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight px-4">
                  Найдём программы<br />для вашего бизнеса
                </h1>
                <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                  Ответьте на несколько вопросов, и мы подберём лучшие условия и скидки
                </p>
              </div>
              <Button 
                size="lg" 
                className="text-base md:text-lg px-8 md:px-12 h-12 md:h-14 rounded-xl animate-pulse-scale"
                onClick={() => setStep('business')}
              >
                Начать
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <p className="text-xs md:text-sm text-muted-foreground">
                Это займёт всего 2 минуты ⏱️
              </p>
            </div>
          )}

          {step === 'business' && (
            <div className="space-y-4 md:space-y-6 animate-fade-in">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Какой у вас бизнес?</h2>
                <p className="text-sm md:text-base text-muted-foreground">Выберите один или несколько вариантов</p>
              </div>

              {selectedBusinesses.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap animate-fade-in">
                  <span className="text-sm text-muted-foreground">Выбрано:</span>
                  <Badge variant="secondary" className="animate-scale-in">
                    {selectedBusinesses.length} {selectedBusinesses.length === 1 ? 'категория' : 'категории'}
                  </Badge>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {businessTypes.map((type, idx) => (
                  <Card
                    key={type.id}
                    style={{ animationDelay: `${idx * 50}ms` }}
                    className={`p-3 md:p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in ${
                      selectedBusinesses.includes(type.id)
                        ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => toggleBusiness(type.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all ${
                        selectedBusinesses.includes(type.id)
                          ? 'bg-primary text-white scale-110'
                          : 'bg-gray-100 text-foreground'
                      }`}>
                        <Icon name={type.icon as any} size={20} className="md:w-6 md:h-6" />
                      </div>
                      <span className="font-medium text-sm md:text-base text-foreground flex-1">{type.name}</span>
                      {selectedBusinesses.includes(type.id) && (
                        <div className="animate-scale-in">
                          <Icon name="CheckCircle2" size={20} className="text-primary" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  size="lg"
                  onClick={handleBusinessNext}
                  disabled={selectedBusinesses.length === 0}
                  className="px-6 md:px-8 text-sm md:text-base"
                >
                  Продолжить
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div className="text-center space-y-6 md:space-y-8 py-12 md:py-20 animate-fade-in">
              <div className="relative inline-block">
                <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-primary/20 rounded-full" />
                <div 
                  className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-xs md:text-sm font-bold text-primary">{loadingProgress}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Подбираем программы
                </h2>
                <p className="text-sm md:text-base text-muted-foreground px-4">
                  Анализируем лучшие предложения для вашего бизнеса...
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {['🎯', '💰', '📊', '🚀'].map((emoji, i) => (
                  <div 
                    key={i}
                    className="text-2xl animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'programs' && (
            <div className="space-y-4 md:space-y-6 animate-fade-in">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Мы подобрали {selectedPrograms.length} {selectedPrograms.length === 1 ? 'программу' : selectedPrograms.length < 5 ? 'программы' : 'программ'} 🎉
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">Специально для вашего бизнеса</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {selectedPrograms.slice(0, visiblePrograms).map((program, idx) => (
                  <Card 
                    key={idx} 
                    className={`p-4 md:p-5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 ${program.color} animate-fade-in`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-3xl md:text-4xl">{program.logo}</div>
                        <Badge variant="secondary" className={`${getBenefitColor(program.benefitType)} text-xs md:text-sm font-semibold`}>
                          {program.benefitType === 'cashback' && 'Кэшбэк'}
                          {program.benefitType === 'discount' && 'Скидка'}
                          {program.benefitType === 'free' && 'Бесплатно'}
                          {program.benefitType === 'bonus' && 'Бонус'}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg text-foreground">{program.title}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">{program.description}</p>
                      </div>
                      <div className={`text-xl md:text-2xl font-bold ${getBenefitColor(program.benefitType)}`}>
                        {program.benefit}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  size="lg"
                  onClick={() => setStep('details')}
                  className="px-6 md:px-8 text-sm md:text-base animate-pulse-scale"
                >
                  Получить программы
                  <Icon name="Sparkles" size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="max-w-md mx-auto space-y-4 md:space-y-6 animate-fade-in">
              <div className="space-y-2 text-center">
                <div className="text-4xl md:text-5xl mb-3">🎁</div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Почти готово!</h2>
                <p className="text-sm md:text-base text-muted-foreground px-4">
                  Куда отправить ваши персональные предложения?
                </p>
              </div>

              <Card className="p-5 md:p-6 shadow-xl">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm md:text-base">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder="Иван"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="h-11 md:h-12 text-sm md:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm md:text-base">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (900) 123-45-67"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="h-11 md:h-12 text-sm md:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@company.ru"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="h-11 md:h-12 text-sm md:text-base"
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-11 md:h-12 text-sm md:text-base"
                    onClick={handleSubmit}
                    disabled={!userData.name || !userData.phone || !userData.email}
                  >
                    Отправить
                    <Icon name="Send" size={16} className="ml-2" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </div>
              </Card>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6 md:space-y-8 py-12 md:py-20 animate-fade-in">
              <div className="inline-block animate-scale-in">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={32} className="md:w-10 md:h-10 text-green-600" />
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Отлично, {userData.name}! 🎉
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
                  Мы отправили ваши персональные предложения на <span className="font-semibold text-foreground">{userData.email}</span>
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  Наш менеджер свяжется с вами в ближайшее время
                </p>
              </div>
              <div className="flex justify-center gap-2">
                {['🎊', '💼', '🚀', '💰'].map((emoji, i) => (
                  <span 
                    key={i}
                    className="text-2xl md:text-3xl animate-bounce"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 px-4 py-4 md:py-6">
        <div className="max-w-5xl mx-auto text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2024 АО «Альфа-Банк». Генеральная лицензия Банка России № 1326 от 16.01.2015</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
