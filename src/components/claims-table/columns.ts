import type { ProcessedRow } from '@/utils/parseExcelData';

export interface ColumnConfig {
  property: keyof ProcessedRow;
  header: string;
  width: string;
}

// Default column visibility settings
export const defaultColumnVisibility: Partial<Record<keyof ProcessedRow, boolean>> = {
  name: false,
  link: false,
  status: false,
  rejectionReason: false,
  updatedAt: false,
  createdAt: false,
  totalContribution: false,
  remainingAmount: false,
  paidAmount: false,
  lastModifiedBy: false,
  responsible: false,
  playerSurname: false,
  playerFatherName: false,
  playerBornName: false,
  playerEmail: false,
  playerVk: false,
  playerSkype: false,
  playerTelegram: false,
  playerLivejournal: false,
  playerPhoneNumber: false,
  characterName: false,
  characterDescription: false,
  confirmations: false,
  fullNameConfirmed: false,
  ageConfirmed: false,
  healthConfirmed: false,
  contactsConfirmed: false,
  roleContactsConfirmed: false,
  bus: false,
  accommodation: false,
  accommodationDetails: false,
};

export const columnConfigs: ColumnConfig[] = [
  { property: 'name', header: 'Имя', width: 'w-32' },
  { property: 'link', header: 'Ссылка', width: 'w-48' },
  { property: 'status', header: 'Статус', width: 'w-24' },
  { property: 'rejectionReason', header: 'Причина отказа', width: 'w-32' },
  { property: 'updatedAt', header: 'Обновлена', width: 'w-32' },
  { property: 'createdAt', header: 'Создана', width: 'w-32' },
  { property: 'totalContribution', header: 'Итого взнос', width: 'w-32' },
  { property: 'remainingAmount', header: 'Осталось', width: 'w-32' },
  { property: 'paidAmount', header: 'Уплачено', width: 'w-32' },
  { property: 'lastModifiedBy', header: 'LastModifiedBy', width: 'w-32' },
  { property: 'responsible', header: 'Ответственный', width: 'w-32' },
  { property: 'player', header: 'Игрок', width: 'w-24' },
  { property: 'playerSurname', header: 'Игрок.SurName', width: 'w-32' },
  { property: 'playerFatherName', header: 'Игрок.FatherName', width: 'w-32' },
  { property: 'playerBornName', header: 'Игрок.BornName', width: 'w-32' },
  { property: 'playerEmail', header: 'Игрок.Email', width: 'w-56' },
  { property: 'playerVk', header: 'Игрок.Extra.Vk', width: 'w-32' },
  { property: 'playerSkype', header: 'Игрок.Extra.Skype', width: 'w-32' },
  { property: 'playerTelegram', header: 'Игрок.Extra.Telegram', width: 'w-32' },
  { property: 'playerLivejournal', header: 'Игрок.Extra.Livejournal', width: 'w-32' },
  { property: 'playerPhoneNumber', header: 'Игрок.Extra.PhoneNumber', width: 'w-32' },
  { property: 'characterName', header: 'Имя персонажа', width: 'w-36' },
  { property: 'characterDescription', header: 'Описание персонажа', width: 'w-64 max-w-64' },
  { property: 'confirmations', header: 'Я подтверждаю что...', width: 'w-32' },
  { property: 'fullNameConfirmed', header: 'Фамилия, имя и отчество', width: 'w-32' },
  {
    property: 'ageConfirmed',
    header:
      'Я совершеннолетний или я еду с родителями / у меня есть письменное разрешение от родителей',
    width: 'w-32',
  },
  {
    property: 'healthConfirmed',
    header:
      'Я осознаю свои медицинские ограничения и сам забочусь о сохранении своего здоровья во время игры',
    width: 'w-32',
  },
  {
    property: 'contactsConfirmed',
    header: 'Актуальный контакт в telegram и профиль ВКонтакте для мастеров',
    width: 'w-32',
  },
  {
    property: 'roleContactsConfirmed',
    header: 'Контакты для связи со мной в описании роли',
    width: 'w-32',
  },
  { property: 'preferredCharacterGender', header: 'Пол', width: 'w-32' },
  { property: 'anthropomorphism', header: 'Антропоморфность', width: 'w-32' },
  { property: 'preferredCharacterRace', header: 'Раса', width: 'w-32' },
  { property: 'preferredCharacterClass', header: 'Класс', width: 'w-32' },
  { property: 'playPreferences', header: 'Я хочу играть', width: 'w-64' },
  { property: 'preferredPlotTypes', header: 'Завязки', width: 'w-64' },
  { property: 'triggers', header: 'Триггеры', width: 'w-60 max-w-60' },
  { property: 'readyToLead', header: 'Лидер', width: 'w-32' },
  { property: 'plotIdeas', header: 'Идеи', width: 'w-[400px]' },
  { property: 'bus', header: 'Автобус', width: 'w-32' },
  { property: 'accommodation', header: 'Место проживания', width: 'w-32' },
  { property: 'accommodationDetails', header: 'Кто живет', width: 'w-32' },
];
