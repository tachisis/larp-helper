import type { ColumnFilterConfig } from '@/components/ui/column-filter/types';

// Helper function to create filter options
const createOptions = (values: string[]) =>
  values.map(value => ({
    value: value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

// Play preferences filter options
const playPreferencesOptions = createOptions([
  'политика',
  'служба',
  'диаспора, национальные меньшинства',
  'семья, клан',
  'дружба',
  'сила',
  'эксперименты',
  'горе, утрата, вина',
  'убийство',
  'месть',
  'фанатизм, слепая преданность',
  'верность, готовность к самопожертвованию',
  'борьба с несправедливостью',
  'предательство, заговор',
  'исследования/детектив',
  'тайны/ошибки прошлого',
  'сюрпризы от мастеров',
  'двойное дно',
  'отрицательный персонаж',
  'персонаж с серой моралью',
  'криминальная среда',
  'колониальные проблемы',
  'проблемы работорговли',
  'пиратство, наемничество, контрабанда',
  'сложный моральный выбор',
  'долг',
  'особое предназначение',
  'жертвенность',
  'потеря идеалов, разочарование',
  'утрата памяти',
  'бедность, социальное неблагополучие',
  'драма/трагедия',
  'следование традициям',
  'бунтарство и вызов традициям',
  'радикализм',
  'другое (указать)',
  'готов сыграть что угодно'
]);

// Triggers filter options
const triggersOptions = createOptions([
  'насилие сексуального характера',
  'инцест',
  'домашнее насилие',
  'насилие над детьми',
  'пытки',
  'смерть близких',
  'потеря ребенка',
  'беременность',
  'прерывание беременности',
  'телесные модификации',
  'попытка суицида',
  'суицид у близких',
  'абьюзивные отношения',
  'унижение',
  'потеря контроля',
  'изоляция',
  'рабство',
  'принудительный брак',
  'культурное унижение (колониализм)',
  'зависимости от веществ',
  'бедность',
  'инвалидность',
  'психические заболевания',
  'секс',
  'развод',
  'измена',
  'похищение',
  'тяжелая болезнь',
  'триггеров нет, готов на все!'
]);

const preferredCharacterGenderOptions = createOptions([
  'мужской',
  'женский',
  'мне все равно, могу сыграть кого угодно',
]);

const preferredCharacterRaceOptions = createOptions([
  'люди',
  'вуки',
  'тви’леки',
  'мандалорцы',
  'забраки',
  'каминоанцы',
  'авторская раса (придумано мастерами)',
  'другое (указать в поле для идей)',
  'все равно',
]);

const preferredCharacterClassOptions = createOptions([
  'торговец',
  'гвардеец/стражник',
  'наемник',
  'чувствительный к Силе',
  'пользующийся Силой',
  'сенатор',
  'служащий (сенат)',
  'член криминальной банды',
  'маргинал (житель нижних уровней, но не обязательно преступник)',
  'дипломат, посол',
  'аристократ',
  'студент',
  'преподаватель, наставник',
  'контрабандист',
  'ученый, исследователь',
  'медик',
  'художник, творческие занятия',
  'пилот',
  'корпоративный магнат',
  'член делегации с другой планеты',
  'все равно',
  'другое (указать)',
]);

const anthropomorphismOptions = createOptions([
  'мне все равно, могу сделать любой образ',
  'я хочу играть человека или максимально похожую на людей расу',
]);

const preferredPlotTypesOptions = createOptions([
  'были врагами, стали друзьями',
  'были друзьями, стали врагами',
  'были врагами, стали любовниками',
  'были любовниками, стали врагами',
  'вынужденные союзники',
  'соперничество',
  'принимающая семья или клан',
  'семья или клан со строгими требованиями',
  'любовное треугольник',
  'потерянная любовь',
  'запретная любовь',
  'бывшие, плохо закончились отношения',
  'ничего личного, только бизнес',
  'брак по расчету',
  'семья не по крови, служебное братство',
  'братья и сестры',
  'родители и дети / родитель',
  'родители и дети / ребенок',
  'развод',
  'коллеги',
  'долг жизни',
  'шантаж / шантажист',
  'шантаж / жертва',
  'предательство / предатель',
  'предательство / преданный',
  'насилие, абьюз / жертва',
  'насилие, абьюз / виновник',
  'измена / изменивший',
  'измена / кому изменили',
  'измена / с кем изменили',
  'одержимость / одержимый',
  'одержимость / тот, кем одержимы',
  'служебная / командир или начальник',
  'служебная / подчиненный',
  'наставничество / учитель, наставник',
  'наставничество / ученик, студент',
  'куртуазные отношения / «рыцарь»',
  'куртуазные отношения / «дама»',
  'рабство / раб',
  'рабство / господин или работорговец',
  'взаимная зависимость',
  'другое (указать)',
  'готов сыграть что угодно'
]);

const readyToLeadOptions = createOptions(['да', 'нет']);

// Column filter configurations (AND logic by default, with option to switch to OR)
export const columnFilters: ColumnFilterConfig[] = [
  {
    columnId: 'preferredCharacterGender',
    label: 'Пол',
    placeholder: 'Выберите пол...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    allowAndOrToggle: true,
    defaultAndMode: false, // Default to OR mode
    options: preferredCharacterGenderOptions,
  },
  {
    columnId: 'anthropomorphism',
    label: 'Антропоморфность',
    placeholder: 'Выберите антропоморфность...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    allowAndOrToggle: true,
    defaultAndMode: false, // Default to OR mode
    options: anthropomorphismOptions,
  },
  {
    columnId: 'preferredCharacterRace',
    label: 'Раса',
    placeholder: 'Выберите расу...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    allowAndOrToggle: true,
    defaultAndMode: false, // Default to OR mode
    options: preferredCharacterRaceOptions,
  },
  {
    columnId: 'preferredCharacterClass',
    label: 'Класс',
    placeholder: 'Выберите класс...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    allowAndOrToggle: true,
    defaultAndMode: false, // Default to OR mode
    options: preferredCharacterClassOptions,
  },
  {
    columnId: 'playPreferences',
    label: 'Хочу играть',
    placeholder: 'Выберите предпочтения...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    allowAndOrToggle: true,
    defaultAndMode: false, // Default to OR mode
    options: playPreferencesOptions,
  },
  {
    columnId: 'preferredPlotTypes',
    label: 'Завязки',
    placeholder: 'Выберите завязки...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    allowAndOrToggle: true,
    defaultAndMode: false, // Default to OR mode
    options: preferredPlotTypesOptions,
  },
  {
    columnId: 'triggers',
    label: 'Триггеры',
    placeholder: 'Выберите триггеры...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    defaultNotEqual: true,
    allowAndOrToggle: true,
    defaultAndMode: false, // Default to OR mode
    options: triggersOptions,
  },
  {
    columnId: 'readyToLead',
    label: 'Лидер',
    placeholder: 'Выберите лидера...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    allowAndOrToggle: true,
    defaultAndMode: false, // Default to OR mode
    options: readyToLeadOptions,
  },
];
