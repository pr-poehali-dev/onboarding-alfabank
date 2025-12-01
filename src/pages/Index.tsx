import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const businessTypes = [
  { id: 'ecommerce', name: 'Онлайн-торговля и маркетплейсы', icon: 'ShoppingCart' },
  { id: 'services', name: 'Услуги', icon: 'Scissors' },
  { id: 'it', name: 'IT и интернет-услуги', icon: 'Code' },
  { id: 'education', name: 'Онлайн-образование и консультации', icon: 'GraduationCap' },
  { id: 'food', name: 'Общепит', icon: 'Coffee' },
  { id: 'production', name: 'Производство', icon: 'Factory' },
  { id: 'farming', name: 'Фермерство', icon: 'Leaf' },
  { id: 'entertainment', name: 'Развлечения и мероприятия', icon: 'Camera' },
  { id: 'retail', name: 'Торговля', icon: 'Store' },
  { id: 'fitness', name: 'Спорт и фитнес', icon: 'Dumbbell' }
];

const loyaltyPrograms = {
  ecommerce: [
    { title: 'Кэшбэк на платежи', description: 'До 3% кэшбэка на онлайн-платежи', image: '💳' },
    { title: 'Скидки на аналитику', description: 'Партнёрские скидки на Яндекс.Метрику и Google Analytics', image: '📊' },
    { title: 'Программа лояльности', description: 'Инструменты для создания программ лояльности клиентов', image: '🎁' }
  ],
  services: [
    { title: 'Эквайринг 0.8%', description: 'Сниженная комиссия на приём платежей', image: '💳' },
    { title: 'Реклама в соцсетях', description: 'Бонусы на продвижение до 5000₽', image: '📱' }
  ],
  it: [
    { title: 'Кэшбэк на рекламу', description: 'До 10% на Яндекс.Директ и VK Реклама', image: '🎯' },
    { title: 'Скидки на облако', description: 'Партнёрские условия на Yandex Cloud и AWS', image: '☁️' }
  ],
  education: [
    { title: 'Видеоконференции', description: 'Скидки на Zoom и Microsoft Teams', image: '🎥' },
    { title: 'Онлайн-школы', description: 'Инструменты для запуска курсов со скидкой', image: '📚' }
  ],
  food: [
    { title: 'Терминалы под 0%', description: 'Бесплатная аренда терминалов на 6 месяцев', image: '💳' },
    { title: 'Доставка без комиссий', description: 'Сниженные тарифы с Яндекс.Еда', image: '🛵' }
  ],
  production: [
    { title: 'Факторинг', description: 'Отсрочка платежей до 120 дней', image: '📦' },
    { title: 'Логистика со скидкой', description: 'Партнёрские условия с СДЭК и ПЭК', image: '🚚' }
  ],
  farming: [
    { title: 'Кредит под 5%', description: 'Льготное кредитование на оборудование', image: '🌾' },
    { title: 'Страхование урожая', description: 'Партнёрские условия по агрострахованию', image: '🛡️' }
  ],
  entertainment: [
    { title: 'Эквайринг 0.9%', description: 'Специальные условия приёма платежей', image: '🎪' },
    { title: 'Реклама Вконтакте', description: 'Бонусы на продвижение мероприятий', image: '🎉' }
  ],
  retail: [
    { title: 'Терминалы бесплатно', description: '3 месяца без абонентской платы', image: '💳' },
    { title: 'Склад-логистика', description: 'Скидки на складские услуги', image: '📦' }
  ],
  fitness: [
    { title: 'Эквайринг 0.7%', description: 'Минимальная комиссия на абонементы', image: '💪' },
    { title: 'CRM со скидкой', description: 'Партнёрские условия на фитнес-CRM', image: '📋' }
  ]
};

type Step = 'welcome' | 'business' | 'loading' | 'programs' | 'details' | 'success';

function Index() {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });

  const progress = {
    welcome: 0,
    business: 25,
    loading: 50,
    programs: 75,
    details: 90,
    success: 100
  }[step];

  const toggleBusiness = (id: string) => {
    setSelectedBusinesses(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleBusinessNext = () => {
    setStep('loading');
    setTimeout(() => setStep('programs'), 2000);
  };

  const selectedPrograms = selectedBusinesses.flatMap(id => 
    loyaltyPrograms[id as keyof typeof loyaltyPrograms] || []
  );

  const handleSubmit = () => {
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">А</span>
            </div>
            <span className="font-semibold text-lg text-foreground">Альфабанк Бизнес</span>
          </div>
          {step !== 'welcome' && step !== 'success' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>~2 минуты</span>
            </div>
          )}
        </div>
      </header>

      {step !== 'welcome' && step !== 'success' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>
      )}

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl animate-fade-in">
          {step === 'welcome' && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Найдём программы<br />для вашего бизнеса
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Ответьте на несколько вопросов, и мы подберём лучшие условия и скидки
                </p>
              </div>
              <Button 
                size="lg" 
                className="text-lg px-12 h-14 rounded-xl animate-pulse-scale"
                onClick={() => setStep('business')}
              >
                Начать
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Это займёт всего 2 минуты
              </p>
            </div>
          )}

          {step === 'business' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Какой у вас бизнес?</h2>
                <p className="text-muted-foreground">Выберите один или несколько вариантов</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {businessTypes.map(type => (
                  <Card
                    key={type.id}
                    className={`p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                      selectedBusinesses.includes(type.id)
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => toggleBusiness(type.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedBusinesses.includes(type.id)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-foreground'
                      }`}>
                        <Icon name={type.icon as any} size={24} />
                      </div>
                      <span className="font-medium text-foreground flex-1">{type.name}</span>
                      {selectedBusinesses.includes(type.id) && (
                        <Icon name="Check" size={20} className="text-primary" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={handleBusinessNext}
                  disabled={selectedBusinesses.length === 0}
                  className="px-8"
                >
                  Продолжить
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div className="text-center space-y-8 py-20">
              <div className="inline-block">
                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Подбираем программы
                </h2>
                <p className="text-muted-foreground">
                  Анализируем лучшие предложения для вашего бизнеса...
                </p>
              </div>
            </div>
          )}

          {step === 'programs' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Мы подобрали {selectedPrograms.length} {selectedPrograms.length === 1 ? 'программу' : selectedPrograms.length < 5 ? 'программы' : 'программ'}
                </h2>
                <p className="text-muted-foreground">Специально для вашего бизнеса</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPrograms.map((program, idx) => (
                  <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-3">
                      <div className="text-4xl">{program.image}</div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{program.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={() => setStep('details')}
                  className="px-8"
                >
                  Получить программы
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-foreground">Почти готово!</h2>
                <p className="text-muted-foreground">
                  Куда отправить ваши персональные предложения?
                </p>
              </div>

              <Card className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder="Иван"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (900) 123-45-67"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@company.ru"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-12"
                    onClick={handleSubmit}
                    disabled={!userData.name || !userData.phone || !userData.email}
                  >
                    Отправить
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </div>
              </Card>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-8 py-20">
              <div className="inline-block">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={40} className="text-green-600" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground">
                  Отлично, {userData.name}!
                </h2>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                  Мы отправили ваши персональные предложения на {userData.email}
                </p>
                <p className="text-muted-foreground">
                  Наш менеджер свяжется с вами в ближайшее время
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 px-4 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 АО «Альфа-Банк». Генеральная лицензия Банка России № 1326 от 16.01.2015</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
