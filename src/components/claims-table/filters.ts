import type { ColumnFilterConfig } from '@/components/ui/column-filter/types';
import {
  PLAY_PREFERENCES,
  TRIGGERS,
  PREFERRED_CHARACTER_GENDER,
  PREFERRED_CHARACTER_RACE,
  PREFERRED_CHARACTER_CLASS,
  ANTHROPOMORPHISM,
  PREFERRED_PLOT_TYPES,
  READY_TO_LEAD,
} from '@/constants/filterOptions';

import { createOptions } from '@/lib/utils';

// Create filter options from constants
const playPreferencesOptions = createOptions(PLAY_PREFERENCES);
const triggersOptions = createOptions(TRIGGERS);
const preferredCharacterGenderOptions = createOptions(PREFERRED_CHARACTER_GENDER);
const preferredCharacterRaceOptions = createOptions(PREFERRED_CHARACTER_RACE);
const preferredCharacterClassOptions = createOptions(PREFERRED_CHARACTER_CLASS);
const anthropomorphismOptions = createOptions(ANTHROPOMORPHISM);
const preferredPlotTypesOptions = createOptions(PREFERRED_PLOT_TYPES);
const readyToLeadOptions = createOptions(READY_TO_LEAD);

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
