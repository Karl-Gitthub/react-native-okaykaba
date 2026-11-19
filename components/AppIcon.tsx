import React from 'react';
import { View } from 'react-native';
// Direct icon imports keep Metro from loading the whole Phosphor catalogue.
import { HouseSimpleIcon } from 'phosphor-react-native/src/icons/HouseSimple';
import { ChartLineUpIcon } from 'phosphor-react-native/src/icons/ChartLineUp';
import { CalendarBlankIcon } from 'phosphor-react-native/src/icons/CalendarBlank';
import { UserCircleIcon } from 'phosphor-react-native/src/icons/UserCircle';
import { BookOpenTextIcon } from 'phosphor-react-native/src/icons/BookOpenText';
import { HeartIcon } from 'phosphor-react-native/src/icons/Heart';
import { CheckSquareIcon } from 'phosphor-react-native/src/icons/CheckSquare';
import { SquareIcon } from 'phosphor-react-native/src/icons/Square';
import { SunIcon } from 'phosphor-react-native/src/icons/Sun';
import { BellIcon } from 'phosphor-react-native/src/icons/Bell';
import { ChatCircleIcon } from 'phosphor-react-native/src/icons/ChatCircle';
import { BookmarkSimpleIcon } from 'phosphor-react-native/src/icons/BookmarkSimple';
import { ArrowLeftIcon } from 'phosphor-react-native/src/icons/ArrowLeft';
import { ArrowRightIcon } from 'phosphor-react-native/src/icons/ArrowRight';
import { CaretLeftIcon } from 'phosphor-react-native/src/icons/CaretLeft';
import { CaretRightIcon } from 'phosphor-react-native/src/icons/CaretRight';
import { CaretUpIcon } from 'phosphor-react-native/src/icons/CaretUp';
import { CaretDownIcon } from 'phosphor-react-native/src/icons/CaretDown';
import { ExportIcon } from 'phosphor-react-native/src/icons/Export';
import { PaperPlaneTiltIcon } from 'phosphor-react-native/src/icons/PaperPlaneTilt';
import { PauseIcon } from 'phosphor-react-native/src/icons/Pause';
import { LeafIcon } from 'phosphor-react-native/src/icons/Leaf';
import { PaletteIcon } from 'phosphor-react-native/src/icons/Palette';
import { LockKeyIcon } from 'phosphor-react-native/src/icons/LockKey';
import { QuestionIcon } from 'phosphor-react-native/src/icons/Question';
import { PencilSimpleIcon } from 'phosphor-react-native/src/icons/PencilSimple';
import { TrashIcon } from 'phosphor-react-native/src/icons/Trash';
import { PlusIcon } from 'phosphor-react-native/src/icons/Plus';
import { HandSwipeLeftIcon } from 'phosphor-react-native/src/icons/HandSwipeLeft';
import { CheckIcon } from 'phosphor-react-native/src/icons/Check';
import { palette as c } from '@/lib/theme';

const icons = {
  home: HouseSimpleIcon, insights: ChartLineUpIcon, calendar: CalendarBlankIcon, account: UserCircleIcon,
  journal: BookOpenTextIcon, selfCare: HeartIcon, tasks: CheckSquareIcon, square: SquareIcon, dailyWords: SunIcon,
  bell: BellIcon, chat: ChatCircleIcon, bookmark: BookmarkSimpleIcon, arrowLeft: ArrowLeftIcon, arrowRight: ArrowRightIcon,
  caretLeft: CaretLeftIcon, caretRight: CaretRightIcon, caretUp: CaretUpIcon, caretDown: CaretDownIcon,
  share: ExportIcon, send: PaperPlaneTiltIcon, pause: PauseIcon, leaf: LeafIcon, appearance: PaletteIcon,
  privacy: LockKeyIcon, help: QuestionIcon, edit: PencilSimpleIcon, delete: TrashIcon, add: PlusIcon,
  swipe: HandSwipeLeftIcon, check: CheckIcon,
};

export type AppIconName = keyof typeof icons;
type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export function AppIcon({ name, size = 22, color = c.ink, weight = 'regular' }: {
  name: AppIconName; size?: number; color?: string; weight?: IconWeight;
}) {
  const Icon = icons[name];
  // Buttons/rows own their labels; decorative SVGs must not be separate focus targets.
  return <View pointerEvents="none" accessible={false} importantForAccessibility="no-hide-descendants" aria-hidden style={{ width: size, height: size }}>
    <Icon size={size} color={color} weight={weight}/>
  </View>;
}
