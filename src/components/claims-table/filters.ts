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
]);

// Column filter configurations (AND logic - all selected options must be present)
export const columnFilters: ColumnFilterConfig[] = [
  {
    columnId: 'playPreferences',
    label: 'Хочу играть',
    placeholder: 'Выберите предпочтения...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    options: playPreferencesOptions,
  },
  {
    columnId: 'triggers',
    label: 'Триггеры',
    placeholder: 'Выберите триггеры...',
    triggerClass: 'w-full',
    allowNotEqual: true,
    defaultNotEqual: true,
    options: triggersOptions,
  },
];
