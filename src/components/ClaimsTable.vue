<script setup lang="ts">
import type { ProcessedRow } from '@/utils/parseExcelData';
import { computed, ref } from 'vue';
import { DataTable } from '@/components/ui/data-table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import type { ColumnFilterConfig } from '@/components/ui/column-filter';

interface Props {
  data: ProcessedRow[];
}

const props = defineProps<Props>();

// Extract headers from data
const headers = computed(() => {
  if (!props.data.length) return [];

  // Get all possible headers from the first row
  const firstRow = props.data[0];
  const allHeaders: string[] = [];

  // Map ProcessedRow properties to display headers
  const propertyToHeader: Record<string, string> = {
    name: 'Имя',
    link: 'Ссылка',
    status: 'Статус',
    rejectionReason: 'Причина отказа',
    updatedAt: 'Обновлена',
    createdAt: 'Создана',
    totalContribution: 'Итого взнос',
    remainingAmount: 'Осталось',
    paidAmount: 'Уплачено',
    lastModifiedBy: 'LastModifiedBy',
    responsible: 'Ответственный',
    player: 'Игрок',
    playerSurname: 'Игрок.SurName',
    playerFatherName: 'Игрок.FatherName',
    playerBornName: 'Игрок.BornName',
    playerEmail: 'Игрок.Email',
    playerVk: 'Игрок.Extra.Vk',
    playerSkype: 'Игрок.Extra.Skype',
    playerTelegram: 'Игрок.Extra.Telegram',
    playerLivejournal: 'Игрок.Extra.Livejournal',
    playerPhoneNumber: 'Игрок.Extra.PhoneNumber',
    characterName: 'Имя персонажа',
    characterDescription: 'Описание персонажа',
    confirmations: 'Я подтверждаю что...',
    fullNameConfirmed: 'Фамилия, имя и отчество',
    ageConfirmed:
      'Я совершеннолетний или я еду с родителями / у меня есть письменное разрешение от родителей',
    healthConfirmed:
      'Я осознаю свои медицинские ограничения и сам забочусь о сохранении своего здоровья во время игры',
    contactsConfirmed: 'Актуальный контакт в telegram и профиль ВКонтакте для мастеров',
    roleContactsConfirmed: 'Контакты для связи со мной в описании роли',
    preferredCharacterGender: 'Пол',
    anthropomorphism: 'Антропоморфность',
    preferredCharacterRace: 'Раса',
    preferredCharacterClass: 'Класс',
    playPreferences: 'Я хочу играть',
    preferredPlotTypes: 'Завязки',
    triggers: 'Триггеры',
    readyToLead: 'Лидер',
    plotIdeas: 'Идеи',
    bus: 'Автобус',
    accommodation: 'Место проживания',
    accommodationDetails: 'Кто живет',
  };

  // Check which properties exist in the data and add corresponding headers
  Object.entries(propertyToHeader).forEach(([property, header]) => {
    if (firstRow[property as keyof ProcessedRow] !== undefined) {
      allHeaders.push(header);
    }
  });

  return allHeaders;
});

// Column visibility management
const columnVisibility = ref<Record<string, boolean>>({
  Имя: false,
  Ссылка: false,
  Статус: false,
  'Причина отказа': false,
  Обновлена: false,
  Создана: false,
  'Итого взнос': false,
  Осталось: false,
  Уплачено: false,
  LastModifiedBy: false,
  Ответственный: false,
  'Игрок.SurName': false,
  'Игрок.FatherName': false,
  'Игрок.BornName': false,
  'Игрок.Email': false,
  'Игрок.Extra.Vk': false,
  'Игрок.Extra.Skype': false,
  'Игрок.Extra.Telegram': false,
  'Игрок.Extra.Livejournal': false,
  'Игрок.Extra.PhoneNumber': false,
  'Имя персонажа': false,
  'Описание персонажа': false,
  'Я подтверждаю что...': false,
  'Фамилия, имя и отчество': false,
  'Я совершеннолетний или я еду с родителями / у меня есть письменное разрешение от родителей': false,
  'Я осознаю свои медицинские ограничения и сам забочусь о сохранении своего здоровья во время игры': false,
  'Актуальный контакт в telegram и профиль ВКонтакте для мастеров': false,
  'Контакты для связи со мной в описании роли': false,
  Автобус: false,
  'Место проживания': false,
  'Кто живет': false,
});

// State of collapsible column panel
const isColumnPanelOpen = ref(false);

// Column filter configurations (AND logic - all selected options must be present)
const columnFilters = computed<ColumnFilterConfig[]>(() => [
  {
    columnId: 'Я хочу играть',
    label: 'Play preferences',
    placeholder: 'Select preferences...',
    triggerClass: 'w-[300px]',
    options: [
      { value: 'политика', label: 'Политика' },
      { value: 'служба', label: 'Служба' },
      { value: 'диаспора, национальные меньшинства', label: 'Диаспора, национальные меньшинства' },
      { value: 'семья, клан', label: 'Семья, клан' },
      { value: 'дружба', label: 'Дружба' },
      { value: 'сила', label: 'Сила' },
      { value: 'эксперименты', label: 'Эксперименты' },
      { value: 'горе, утрата, вина', label: 'Горе, утрата, вина' },
      { value: 'убийство', label: 'Убийство' },
      { value: 'месть', label: 'Месть' },
      { value: 'фанатизм, слепая преданность', label: 'Фанатизм, слепая преданность' },
      {
        value: 'верность, готовность к самопожертвованию',
        label: 'Верность, готовность к самопожертвованию',
      },
      { value: 'борьба с несправедливостью', label: 'Борьба с несправедливостью' },
      { value: 'предательство, заговор', label: 'Предательство, заговор' },
      { value: 'исследования/детектив', label: 'Исследования/детектив' },
      { value: 'тайны/ошибки прошлого', label: 'Тайны/ошибки прошлого' },
      { value: 'сюрпризы от мастеров', label: 'Сюрпризы от мастеров' },
      { value: 'двойное дно', label: 'Двойное дно' },
      { value: 'отрицательный персонаж', label: 'Отрицательный персонаж' },
      { value: 'персонаж с серой моралью', label: 'Персонаж с серой моралью' },
      { value: 'криминальная среда', label: 'Криминальная среда' },
      { value: 'колониальные проблемы', label: 'Колониальные проблемы' },
      { value: 'проблемы работорговли', label: 'Проблемы работорговли' },
      {
        value: 'пиратство, наемничество, контрабанда',
        label: 'Пиратство, наемничество, контрабанда',
      },
      { value: 'сложный моральный выбор', label: 'Сложный моральный выбор' },
      { value: 'долг', label: 'Долг' },
      { value: 'особое предназначение', label: 'Особое предназначение' },
      { value: 'жертвенность', label: 'Жертвенность' },
      { value: 'потеря идеалов, разочарование', label: 'Потеря идеалов, разочарование' },
      { value: 'утрата памяти', label: 'Утрата памяти' },
      {
        value: 'бедность, социальное неблагополучие',
        label: 'Бедность, социальное неблагополучие',
      },
      { value: 'драма/трагедия', label: 'Драма/трагедия' },
      { value: 'следование традициям', label: 'Следование традициям' },
      { value: 'бунтарство и вызов традициям', label: 'Бунтарство и вызов традициям' },
      { value: 'радикализм', label: 'Радикализм' },
      { value: 'другое (указать)', label: 'Другое (указать)' },
    ],
  },
  {
    columnId: 'Триггеры',
    label: 'Triggers',
    placeholder: 'Select triggers...',
    triggerClass: 'w-[300px]',
    allowNotEqual: true,
    options: [
      { value: 'насилие сексуального характера', label: 'Насилие сексуального характера' },
      { value: 'инцест', label: 'Инцест' },
      { value: 'домашнее насилие', label: 'Домашнее насилие' },
      { value: 'насилие над детьми', label: 'Насилие над детьми' },
      { value: 'пытки', label: 'Пытки' },
      { value: 'смерть близких', label: 'Смерть близких' },
      { value: 'потеря ребенка', label: 'Потеря ребенка' },
      { value: 'беременность', label: 'Беременность' },
      { value: 'прерывание беременности', label: 'Прерывание беременности' },
      { value: 'телесные модификации', label: 'Телесные модификации' },
      { value: 'попытка суицида', label: 'Попытка суицида' },
      { value: 'суицид у близких', label: 'Суицид у близких' },
      { value: 'абьюзивные отношения', label: 'Абьюзивные отношения' },
      { value: 'унижение', label: 'Унижение' },
      { value: 'потеря контроля', label: 'Потеря контроля' },
      { value: 'изоляция', label: 'Изоляция' },
      { value: 'рабство', label: 'Рабство' },
      { value: 'принудительный брак', label: 'Принудительный брак' },
      { value: 'культурное унижение (колониализм)', label: 'Культурное унижение (колониализм)' },
      { value: 'зависимости от веществ', label: 'Зависимости от веществ' },
      { value: 'бедность', label: 'Бедность' },
      { value: 'инвалидность', label: 'Инвалидность' },
      { value: 'психические заболевания', label: 'Психические заболевания' },
      { value: 'секс', label: 'Секс' },
      { value: 'развод', label: 'Развод' },
      { value: 'измена', label: 'Измена' },
      { value: 'похищение', label: 'Похищение' },
      { value: 'тяжелая болезнь', label: 'Тяжелая болезнь' },
    ],
  },
]);

// Create columns dynamically based on headers
const columns = computed(() =>
  headers.value
    .filter(header => columnVisibility.value[header] !== false) // Filter hidden columns
    .map(header => {
      // Map headers to ProcessedRow properties
      const getValueFromRow = (row: ProcessedRow, header: string) => {
        switch (header) {
          case 'Имя':
            return row.name || '';
          case 'Ссылка':
            return row.link || '';
          case 'Статус':
            return row.status || '';
          case 'Причина отказа':
            return row.rejectionReason || '';
          case 'Обновлена':
            return row.updatedAt || '';
          case 'Создана':
            return row.createdAt || '';
          case 'Итого взнос':
            return row.totalContribution || '';
          case 'Осталось':
            return row.remainingAmount || '';
          case 'Уплачено':
            return row.paidAmount || '';
          case 'LastModifiedBy':
            return row.lastModifiedBy || '';
          case 'Ответственный':
            return row.responsible || '';
          case 'Игрок':
            return row.player || '';
          case 'Игрок.SurName':
            return row.playerSurname || '';
          case 'Игрок.FatherName':
            return row.playerFatherName || '';
          case 'Игрок.BornName':
            return row.playerBornName || '';
          case 'Игрок.Email':
            return row.playerEmail || '';
          case 'Игрок.Extra.Vk':
            return row.playerVk || '';
          case 'Игрок.Extra.Skype':
            return row.playerSkype || '';
          case 'Игрок.Extra.Telegram':
            return row.playerTelegram || '';
          case 'Игрок.Extra.Livejournal':
            return row.playerLivejournal || '';
          case 'Игрок.Extra.PhoneNumber':
            return row.playerPhoneNumber || '';
          case 'Имя персонажа':
            return row.characterName || '';
          case 'Описание персонажа':
            return row.characterDescription || '';
          case 'Я подтверждаю что...':
            return row.confirmations || '';
          case 'Фамилия, имя и отчество':
            return row.fullNameConfirmed || '';
          case 'Я совершеннолетний или я еду с родителями / у меня есть письменное разрешение от родителей':
            return row.ageConfirmed || '';
          case 'Я осознаю свои медицинские ограничения и сам забочусь о сохранении своего здоровья во время игры':
            return row.healthConfirmed || '';
          case 'Актуальный контакт в telegram и профиль ВКонтакте для мастеров':
            return row.contactsConfirmed || '';
          case 'Контакты для связи со мной в описании роли':
            return row.roleContactsConfirmed || '';
          case 'Пол':
            return row.preferredCharacterGender || '';
          case 'Антропоморфность':
            return row.anthropomorphism || '';
          case 'Раса':
            return row.preferredCharacterRace || '';
          case 'Класс':
            return row.preferredCharacterClass || '';
          case 'Я хочу играть':
            return row.playPreferences || '';
          case 'Завязки':
            return row.preferredPlotTypes || '';
          case 'Триггеры':
            return row.triggers || '';
          case 'Лидер':
            return row.readyToLead || '';
          case 'Идеи':
            return row.plotIdeas || '';
          case 'Автобус':
            return row.bus || '';
          case 'Место проживания':
            return row.accommodation || '';
          case 'Кто живет':
            return row.accommodationDetails || '';
          default:
            return '';
        }
      };

      // Set column width based on header
      const getColumnWidth = (header: string) => {
        switch (header) {
          case 'Имя':
            return 'w-32';
          case 'Ссылка':
            return 'w-48';
          case 'Статус':
            return 'w-24';
          case 'Игрок':
            return 'w-24';
          case 'Игрок.Email':
            return 'w-56';
          case 'Имя персонажа':
            return 'w-36';
          case 'Описание персонажа':
            return 'w-64 max-w-64';
          case 'Я хочу играть':
            return 'w-64';
          case 'Завязки':
            return 'w-52';
          case 'Триггеры':
            return 'w-60 max-w-60';
          case 'Идеи':
            return 'w-[400px]';
          default:
            return 'w-32';
        }
      };

      return {
        id: header,
        header: header,
        accessorFn: (row: ProcessedRow) => getValueFromRow(row, header),
        filterFn:
          header === 'Я хочу играть'
            ? ('multiSelect' as any)
            : header === 'Триггеры'
              ? ('triggers' as any)
              : undefined,
        meta: {
          headerClassName: `whitespace-nowrap truncate ${getColumnWidth(header)}`,
          cellClassName: `align-top ${getColumnWidth(header)}`,
        },
      };
    })
);
</script>

<template>
  <div class="flex flex-col h-screen space-y-4">
    <Collapsible
      v-model:open="isColumnPanelOpen"
      class="border rounded-lg bg-muted/50 flex-shrink-0"
    >
      <CollapsibleTrigger as-child>
        <Button variant="ghost" class="w-full justify-between p-4 h-auto">
          <span class="text-sm font-medium">Настройка колонок</span>
          <svg
            :class="['h-4 w-4 transition-transform', isColumnPanelOpen ? 'rotate-180' : '']"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent class="px-4 pb-4">
        <div class="flex flex-wrap gap-2">
          <label
            v-for="header in headers"
            :key="header"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              :checked="columnVisibility[header] !== false"
              @change="columnVisibility[header] = ($event.target as HTMLInputElement).checked"
              class="rounded border-gray-300"
            />
            <span class="text-sm">{{ header }}</span>
          </label>
        </div>
      </CollapsibleContent>
    </Collapsible>

    <div class="flex-1 min-h-0">
      <DataTable :columns="columns" :data="props.data" :column-filters="columnFilters" />
    </div>
  </div>
</template>
