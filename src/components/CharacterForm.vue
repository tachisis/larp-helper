<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import Input from '@/components/ui/input/Input.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { createOptions } from '@/lib/utils';
import {
  CHARACTER_PLAY_PREFERENCES,
  CHARACTER_TRIGGERS,
  CHARACTER_RACES,
  CHARACTER_CLASSES,
  CHARACTER_PLOT_TYPES,
  CHARACTER_GENDERS,
  CHARACTER_AGES,
} from '@/constants/characterFormOptions';

interface CharacterFormData {
  age: string;
  characterName: string;
  characterDescription: string;
  preferredCharacterGender: string;
  anthropomorphism: string;
  preferredCharacterRace: string;
  preferredCharacterClass: string;
  playPreferences: string[];
  preferredPlotTypes: string[];
  triggers: string[];
  readyToLead: boolean;
  plotIdeas: string;
  appearance: string;
}

const props = defineProps<{
  modelValue: CharacterFormData;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: CharacterFormData];
  submit: [value: CharacterFormData];
}>();

// Create options for selects
const genderOptions = createOptions(CHARACTER_GENDERS);
const raceOptions = createOptions(CHARACTER_RACES);
const classOptions = createOptions(CHARACTER_CLASSES);
const playPreferencesOptions = createOptions(CHARACTER_PLAY_PREFERENCES);
const plotTypesOptions = createOptions(CHARACTER_PLOT_TYPES);
const triggersOptions = createOptions(CHARACTER_TRIGGERS);
const agesOptions = createOptions(CHARACTER_AGES);

// Local form state
const formData = ref<CharacterFormData>({ ...props.modelValue });

// Sync with props changes
watch(
  () => props.modelValue,
  newValue => {
    formData.value = { ...newValue };
  },
  { deep: true }
);

// Update parent when form changes
const updateField = <K extends keyof CharacterFormData>(field: K, value: CharacterFormData[K]) => {
  formData.value[field] = value;
  emit('update:modelValue', { ...formData.value });
};

// Handle checkbox arrays
const getCheckboxValue = (
  field: 'playPreferences' | 'preferredPlotTypes' | 'triggers',
  value: string
) => {
  return (formData.value[field] || []).includes(value);
};

const setCheckboxValue = (
  field: 'playPreferences' | 'preferredPlotTypes' | 'triggers',
  value: string,
  checked: boolean
) => {
  const currentArray = formData.value[field] || [];
  if (checked) {
    if (!currentArray.includes(value)) {
      updateField(field, [...currentArray, value]);
    }
  } else {
    updateField(
      field,
      currentArray.filter(item => item !== value)
    );
  }
};

const handleSubmit = () => {
  emit('submit', { ...formData.value });
};

// Generated description
const generatedDescription = ref<string>('');
const descriptionTextareaRef = ref<HTMLTextAreaElement | null>(null);
const isCopied = ref<boolean>(false);

// Copy to clipboard function
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedDescription.value);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text:', err);
    // Fallback for older browsers
    if (descriptionTextareaRef.value) {
      descriptionTextareaRef.value.select();
      document.execCommand('copy');
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    }
  }
};

// Helper function to get label by value
const getLabelByValue = (
  options: Array<{ value: string; label: string }>,
  value: string
): string => {
  const option = options.find(opt => opt.value === value);
  return option ? option.label : value;
};

// Generate description from form data
const generateDescription = () => {
  const formatValue = (value?: string) => (value && value.trim().length > 0 ? value : '—');
  const formatSelection = (
    options: Array<{ value: string; label: string }>,
    selectedValue?: string
  ) => {
    if (!selectedValue) return '—';
    const label = getLabelByValue(options, selectedValue);
    return formatValue(label);
  };
  const formatList = (options: Array<{ value: string; label: string }>, values?: string[]) => {
    if (!values || values.length === 0) return '—';
    const labels = values
      .map(value => getLabelByValue(options, value))
      .filter(Boolean)
      .join(', ');
    return formatValue(labels);
  };

  const parts: string[] = [
    `Имя: ${formatValue(formData.value.characterName)}`,
    `Пол: ${formatSelection(genderOptions, formData.value.preferredCharacterGender)}`,
    `Раса: ${formatSelection(raceOptions, formData.value.preferredCharacterRace)}`,
    `Возраст: ${formatSelection(agesOptions, formData.value.age)}`,
    `Класс: ${formatSelection(classOptions, formData.value.preferredCharacterClass)}`,
    `Лидер: ${formData.value.readyToLead ? 'да' : 'нет'}`,
    `Внешний вид: ${formatValue(formData.value.appearance)}`,
    `Во что играть: ${formatList(playPreferencesOptions, formData.value.playPreferences)}`,
    `Завязки: ${formatList(plotTypesOptions, formData.value.preferredPlotTypes)}`,
    `Триггеры: ${formatList(triggersOptions, formData.value.triggers)}`,
    `Идеи: ${formatValue(formData.value.plotIdeas)}`,
    `Общеизвестное описание: ${formatValue(formData.value.characterDescription)}`,
  ];

  generatedDescription.value = parts.join('\n');

  // Scroll to textarea after generation
  nextTick(() => {
    if (descriptionTextareaRef.value) {
      descriptionTextareaRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Character Preferences -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Основная информация</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Имя персонажа</label>
          <Input
            v-model="formData.characterName"
            @update:model-value="val => updateField('characterName', val as string)"
            placeholder="Введите имя персонажа"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Пол</label>
          <Select
            :model-value="formData.preferredCharacterGender"
            @update:model-value="val => updateField('preferredCharacterGender', val as string)"
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите пол" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in genderOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Раса</label>
          <Select
            :model-value="formData.preferredCharacterRace"
            @update:model-value="val => updateField('preferredCharacterRace', val as string)"
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите расу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in raceOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Класс</label>
          <Select
            :model-value="formData.preferredCharacterClass"
            @update:model-value="val => updateField('preferredCharacterClass', val as string)"
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите класс" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in classOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Возраст</label>
          <Select
            :model-value="formData.age"
            @update:model-value="val => updateField('age', val as string)"
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите возраст" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in agesOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Внешний вид</label>
          <Input
            v-model="formData.appearance"
            @update:model-value="val => updateField('appearance', val as string)"
            placeholder="Введите внешний вид"
          />
        </div>

        <div class="flex items-center space-x-2">
          <Checkbox
            id="readyToLead"
            :model-value="formData.readyToLead"
            @update:model-value="val => updateField('readyToLead', val as boolean)"
          />
          <label for="readyToLead" class="text-sm font-medium cursor-pointer">Лидер</label>
        </div>
      </div>
    </div>

    <!-- Play Preferences -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Во что играть</h2>
      <div class="max-h-[240px] overflow-y-auto">
        <label
          v-for="option in playPreferencesOptions"
          :key="option.value"
          class="flex items-center space-x-2 cursor-pointer py-1"
        >
          <Checkbox
            :model-value="getCheckboxValue('playPreferences', option.value)"
            @update:model-value="
              checked => setCheckboxValue('playPreferences', option.value, checked as boolean)
            "
          />
          <span class="text-sm">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <!-- Plot Types -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Завязки</h2>
      <div class="max-h-[240px] overflow-y-auto">
        <label
          v-for="option in plotTypesOptions"
          :key="option.value"
          class="flex items-center space-x-2 cursor-pointer py-1"
        >
          <Checkbox
            :model-value="getCheckboxValue('preferredPlotTypes', option.value)"
            @update:model-value="
              checked => setCheckboxValue('preferredPlotTypes', option.value, checked as boolean)
            "
          />
          <span class="text-sm">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <!-- Triggers -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Триггеры</h2>
      <div class="max-h-[240px] overflow-y-auto">
        <label
          v-for="option in triggersOptions"
          :key="option.value"
          class="flex items-center space-x-2 cursor-pointer py-1"
        >
          <Checkbox
            :model-value="getCheckboxValue('triggers', option.value)"
            @update:model-value="
              checked => setCheckboxValue('triggers', option.value, checked as boolean)
            "
          />
          <span class="text-sm">{{ option.label }}</span>
        </label>
      </div>
    </div>
  </form>

  <!-- Generate Description Button -->
  <div class="text-center pb-4">
    <Button type="button" @click="generateDescription">Сгенерировать описание</Button>
  </div>

  <!-- Generated Description Textarea -->
  <div v-if="generatedDescription" class="space-y-2">
    <div class="flex items-center justify-between">
      <label class="block text-lg font-medium">Сгенерированное описание</label>
      <Button type="button" variant="outline" size="sm" @click="copyToClipboard">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </div>
    <textarea
      ref="descriptionTextareaRef"
      :value="generatedDescription"
      readonly
      class="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Нажмите кнопку 'Сгенерировать описание' для создания текста..."
    />
  </div>
</template>

<style scoped></style>
