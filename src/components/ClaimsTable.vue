<script setup lang="ts">
import type { ProcessedRow } from '@/utils/parseExcelData';
import { computed, ref } from 'vue';
import { DataTable } from '@/components/ui/data-table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface Props {
  headers: string[];
  data: ProcessedRow[];
}

const props = defineProps<Props>();

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
});

// State of collapsible column panel
const isColumnPanelOpen = ref(false);

// Create columns dynamically based on headers
const columns = computed(() =>
  props.headers
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
          case 'Предпочтительный пол персонажа':
            return row.preferredCharacterGender || '';
          case 'Антропоморфность':
            return row.anthropomorphism || '';
          case 'Предпочтительная раса персонажа':
            return row.preferredCharacterRace || '';
          case 'Предпочтительный класс персонажа':
            return row.preferredCharacterClass || '';
          case 'Я хочу играть':
            return row.playPreferences || '';
          case 'Предпочитаемые типы завязок':
            return row.preferredPlotTypes || '';
          case 'С чем я не хочу сталкиваться (триггеры)':
            return row.triggers || '';
          case 'Я готов быть лидером':
            return row.readyToLead || '';
          case 'У меня есть идеи сюжета/пожелания/мы о чем-то уже договаривались':
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
            return 'w-32'; // 128px
          case 'Ссылка':
            return 'w-48'; // 192px
          case 'Статус':
            return 'w-24'; // 96px
          case 'Игрок':
            return 'w-40'; // 160px
          case 'Игрок.Email':
            return 'w-56'; // 224px
          case 'Имя персонажа':
            return 'w-36'; // 144px
          case 'Описание персонажа':
            return 'w-64 max-w-64'; // 256px
          case 'Я хочу играть':
            return 'w-48'; // 192px
          case 'Предпочитаемые типы завязок':
            return 'w-52'; // 208px
          case 'С чем я не хочу сталкиваться (триггеры)':
            return 'w-60 max-w-60 truncate'; // 240px
          case 'У меня есть идеи сюжета/пожелания/мы о чем-то уже договаривались':
            return 'w-64 max-w-64 truncate'; // 256px
          default:
            return 'w-32'; // 128px
        }
      };

      return {
        id: header,
        header: header,
        accessorFn: (row: ProcessedRow) => getValueFromRow(row, header),
        meta: {
          headerClassName: `whitespace-nowrap ${getColumnWidth(header)}`,
          cellClassName: getColumnWidth(header),
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
            v-for="header in props.headers"
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
      <DataTable :columns="columns" :data="props.data" />
    </div>
  </div>
</template>
