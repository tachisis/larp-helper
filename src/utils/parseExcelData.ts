// Types for Excel
export interface ExcelRow {
  [key: string]: any;
}

export interface ProcessedRow {
  name?: string;
  link?: string;
  status?: string;
  rejectionReason?: string;
  updatedAt?: any;
  createdAt?: any;
  totalContribution?: number;
  remainingAmount?: number;
  paidAmount?: number;
  lastModifiedBy?: string;
  responsible?: string;
  player?: string;
  playerSurname?: string;
  playerFatherName?: string;
  playerBornName?: string;
  playerEmail?: string;
  playerVk?: string;
  playerSkype?: string;
  playerTelegram?: string;
  playerLivejournal?: string;
  playerPhoneNumber?: string;
  characterName?: string;
  characterDescription?: string;
  confirmations?: any;
  fullNameConfirmed?: any;
  ageConfirmed?: any;
  healthConfirmed?: any;
  contactsConfirmed?: any;
  roleContactsConfirmed?: any;
  preferredCharacterGender?: string;
  anthropomorphism?: string;
  preferredCharacterRace?: string;
  preferredCharacterClass?: string;
  playPreferences?: string;
  preferredPlotTypes?: string;
  triggers?: string;
  readyToLead?: any;
  plotIdeas?: string;
  bus?: string;
  accommodation?: string;
  accommodationDetails?: string;
}

/**
 * Parse Excel data to structured format
 */
export function parseExcelData(headers: string[], rows: ExcelRow[]): ProcessedRow[] {
  const dataRows = rows.slice(1); // Skip headers

  return dataRows.map((row) => {
    const processedRow: ProcessedRow = {};

    // Process each column
    headers.forEach((header: string | null, index: number) => {
      const value = row[index];

      // Map columns to properties
      switch (header) {
        case 'Имя':
          processedRow.name = value;
          break;
        case 'Ссылка':
          processedRow.link = value;
          break;
        case 'Статус':
          processedRow.status = value;
          break;
        case 'Причина отказа':
          processedRow.rejectionReason = value;
          break;
        case 'Обновлена':
          processedRow.updatedAt = value;
          break;
        case 'Создана':
          processedRow.createdAt = value;
          break;
        case 'Итого взнос':
          processedRow.totalContribution = value;
          break;
        case 'Осталось':
          processedRow.remainingAmount = value;
          break;
        case 'Уплачено':
          processedRow.paidAmount = value;
          break;
        case 'LastModifiedBy':
          processedRow.lastModifiedBy = value;
          break;
        case 'Ответственный':
          processedRow.responsible = value;
          break;
        case 'Игрок':
          processedRow.player = value;
          break;
        case 'Игрок.SurName':
          processedRow.playerSurname = value;
          break;
        case 'Игрок.FatherName':
          processedRow.playerFatherName = value;
          break;
        case 'Игрок.BornName':
          processedRow.playerBornName = value;
          break;
        case 'Игрок.Email':
          processedRow.playerEmail = value;
          break;
        case 'Игрок.Extra.Vk':
          processedRow.playerVk = value;
          break;
        case 'Игрок.Extra.Skype':
          processedRow.playerSkype = value;
          break;
        case 'Игрок.Extra.Telegram':
          processedRow.playerTelegram = value;
          break;
        case 'Игрок.Extra.Livejournal':
          processedRow.playerLivejournal = value;
          break;
        case 'Игрок.Extra.PhoneNumber':
          processedRow.playerPhoneNumber = value;
          break;
        case 'Имя персонажа':
          processedRow.characterName = value;
          break;
        case 'Описание персонажа':
          processedRow.characterDescription = value;
          break;
        case 'Я подтверждаю что...':
          processedRow.confirmations = value;
          break;
        case 'Фамилия, имя и отчество':
          processedRow.fullNameConfirmed = value;
          break;
        case 'Я совершеннолетний или я еду с родителями / у меня есть письменное разрешение от родителей':
          processedRow.ageConfirmed = value;
          break;
        case 'Я осознаю свои медицинские ограничения и сам забочусь о сохранении своего здоровья во время игры':
          processedRow.healthConfirmed = value;
          break;
        case 'Актуальный контакт в telegram и профиль ВКонтакте для мастеров':
          processedRow.contactsConfirmed = value;
          break;
        case 'Контакты для связи со мной в описании роли':
          processedRow.roleContactsConfirmed = value;
          break;
        case 'Предпочтительный пол персонажа':
          processedRow.preferredCharacterGender = value;
          break;
        case 'Антропоморфность':
          processedRow.anthropomorphism = value;
          break;
        case 'Предпочтительная раса персонажа':
          processedRow.preferredCharacterRace = value;
          break;
        case 'Предпочтительный класс персонажа':
          processedRow.preferredCharacterClass = value;
          break;
        case 'Я хочу играть':
          processedRow.playPreferences = value;
          break;
        case 'Предпочитаемые типы завязок':
          processedRow.preferredPlotTypes = value;
          break;
        case 'С чем я не хочу сталкиваться (триггеры)':
          processedRow.triggers = value;
          break;
        case 'Я готов быть лидером':
          processedRow.readyToLead = value;
          break;
        case 'У меня есть идеи сюжета/пожелания/мы о чем-то уже договаривались':
          processedRow.plotIdeas = value;
          break;
        case 'Автобус':
          processedRow.bus = value;
          break;
        case 'Место проживания':
          processedRow.accommodation = value;
          break;
        case 'Кто живет':
          processedRow.accommodationDetails = value;
          break;
      }
    });

    return processedRow;
  });
}
