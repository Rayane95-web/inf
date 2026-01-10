
export enum EducationStage {
  PRIMARY = 'التعليم الابتدائي',
  MIDDLE = 'التعليم الإعدادي',
  HIGH = 'التعليم الثانوي التأهيلي',
  TOOLS = 'أدوات إضافية'
}

export enum LevelType {
  PRIMARY_1 = 'الأول ابتدائي',
  PRIMARY_2 = 'الثاني ابتدائي',
  PRIMARY_3 = 'الثالث ابتدائي',
  PRIMARY_4 = 'الرابع ابتدائي',
  PRIMARY_5 = 'الخامس ابتدائي',
  PRIMARY_6 = 'السادس ابتدائي',
  MIDDLE_1 = 'الأولى إعدادي',
  MIDDLE_2 = 'الثانية إعدادي',
  MIDDLE_3 = 'الثالثة إعدادي',
  COMMON_CORE = 'جذع مشترك',
  FIRST_BAC = 'الأولى باك',
  SECOND_BAC = 'الثانية باك',
  AUTHENTIC = 'التعليم الأصيل',
  GENERAL = 'معدل عام',
  CUSTOM = 'حساب مخصص',
  SPECIAL = 'برامج خاصة',
  CUSTOM_ENTRY = 'إدخال مخصص'
}

export interface Subject {
  id: string;
  name: string;
  coefficient: number;
  notesCount?: number; // Added to define how many grade inputs to show
}

export interface Branch {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface GradesState {
  [subjectId: string]: string[];
}

export interface AppState {
  stage: EducationStage | null;
  level: LevelType | null;
  branchId: string | null;
  grades: GradesState;
  customSubjects: { [branchId: string]: Subject[] };
  isDarkMode: boolean;
}
