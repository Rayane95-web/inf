
import { LevelType, Branch } from './types';

/**
 * Official Moroccan Coefficients 
 * Source: Ministry of National Education (Moutamadris / Bulletin Officiel)
 * notesCount: 1 for exams, 3-4 for continuous assessment
 */

const PRIMARY_SUBJECTS_1_4 = [
  { id: 'arabic', name: 'اللغة العربية', coefficient: 1, notesCount: 5  },
  { id: 'french', name: 'اللغة الفرنسية', coefficient: 1, notesCount: 5 },
  { id: 'math', name: 'الرياضيات', coefficient: 1, notesCount: 5 },
  { id: 'islamic', name: 'التربية الإسلامية', coefficient: 1, notesCount: 5 },
  { id: 'science', name: 'النشاط العلمي', coefficient: 1, notesCount: 5 },
  { id: 'art', name: 'التربية الفنية', coefficient: 1, notesCount: 5 },
  { id: 'sport', name: 'التربية البدنية', coefficient: 1, notesCount: 5 },
];

const PRIMARY_SUBJECTS_5_6_CA = [
  { id: 'arabic', name: 'اللغة العربية', coefficient: 1, notesCount: 5 },
  { id: 'french', name: 'اللغة الفرنسية', coefficient: 1, notesCount: 5 },
  { id: 'math', name: 'الرياضيات', coefficient: 1, notesCount: 5 },
  { id: 'islamic', name: 'التربية الإسلامية', coefficient: 1, notesCount: 5 },
  { id: 'social', name: 'الاجتماعيات', coefficient: 1, notesCount: 5 },
  { id: 'science', name: 'النشاط العلمي', coefficient: 1, notesCount: 5 },
  { id: 'art', name: 'التربية الفنية', coefficient: 1, notesCount: 5 },
  { id: 'sport', name: 'التربية البدنية', coefficient: 1, notesCount: 5 },
];

const MIDDLE_SCHOOL_CA = [
  { id: 'math', name: 'الرياضيات', coefficient: 5, notesCount: 5 },
  { id: 'french', name: 'اللغة الفرنسية', coefficient: 5, notesCount: 5 },
  { id: 'arabic', name: 'اللغة العربية', coefficient: 5, notesCount: 5 },
  { id: 'phys', name: 'الفيزياء والكيمياء', coefficient: 2, notesCount: 5 },
  { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 3, notesCount: 5 },
  { id: 'social', name: 'الاجتماعيات', coefficient: 3, notesCount: 5 },
  { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2, notesCount: 5 },
  { id: 'sport', name: 'التربية البدنية', coefficient: 2, notesCount: 5 },
  { id: 'info', name: 'المعلوميات', coefficient: 2, notesCount: 5 },
  { id: 'art', name: 'التربية التشكيلية', coefficient: 2, notesCount: 5 },
];

export const LEVEL_BRANCHES: Record<LevelType, Branch[]> = {
  [LevelType.PRIMARY_1]: [{ id: 'p1', name: 'المستوى الأول', subjects: PRIMARY_SUBJECTS_1_4 }],
  [LevelType.PRIMARY_2]: [{ id: 'p2', name: 'المستوى الثاني', subjects: PRIMARY_SUBJECTS_1_4 }],
  [LevelType.PRIMARY_3]: [{ id: 'p3', name: 'المستوى الثالث', subjects: PRIMARY_SUBJECTS_1_4 }],
  [LevelType.PRIMARY_4]: [{ id: 'p4', name: 'لمستوى الرابع', subjects: PRIMARY_SUBJECTS_1_4 }],
  [LevelType.PRIMARY_5]: [{ id: 'p5', name: 'لمستوى الخامس', subjects: PRIMARY_SUBJECTS_5_6_CA }],
  [LevelType.PRIMARY_6]: [{ id: 'p6', name:  'لمستوى السادس', subjects: PRIMARY_SUBJECTS_5_6_CA }],
    {
      id: 'p6-regional',
      name: 'الامتحان الإقليمي (الشهادة)',
      subjects: [
        { id: 'arabic_islamic', name: 'التربية الإسلامية', coefficient: 1, notesCount: 1 },
        { id: 'math', name: 'الرياضيات', coefficient: 1, notesCount: 1 },
        { id: 'french', name: 'اللغة الفرنسية', coefficient: 1, notesCount: 1 },
        { id: 'arabic', name: 'للغة العربية', coefficient: 1, notesCount:1 },
      ]
    },
    { id: 'p6-ca', name: 'المراقبة المستمرة', subjects: PRIMARY_SUBJECTS_5_6_CA }
  ],
  [LevelType.MIDDLE_1]: [{ id: 'mid1', name: 'الأولى إعدادي', subjects: MIDDLE_SCHOOL_CA }],
  [LevelType.MIDDLE_2]: [{ id: 'mid2', name: 'الثانية إعدادي', subjects: MIDDLE_SCHOOL_CA }],
  [LevelType.MIDDLE_3]: [
    {
      id: 'mid3-regional',
      name: 'الامتحان الجهوي الموحد',
      subjects: [
        { id: 'arabic', name: 'اللغة العربية', coefficient: 3, notesCount: 1 },
        { id: 'math', name: 'الرياضيات', coefficient: 3, notesCount: 1 },
        { id: 'french', name: 'اللغة الفرنسية', coefficient: 3, notesCount: 1 },
        { id: 'islamic', name: 'التربية الإسلامية', coefficient: 1, notesCount: 1 },
        { id: 'social', name: 'الاجتماعيات', coefficient: 1, notesCount: 1 },
        { id: 'phys', name: 'الفيزياء والكيمياء', coefficient: 1, notesCount: 1 },
        { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 1, notesCount: 1 },
      ]
    },
    { id: 'mid3-ca', name: 'المراقبة المستمرة', subjects: MIDDLE_SCHOOL_CA }
  ],
  [LevelType.COMMON_CORE]: [
    {
      id: 'cc-sc',
      name: 'جذع مشترك علمي',
      subjects: [
        { id: 'math', name: 'الرياضيات', coefficient: 4, notesCount: 4 },
        { id: 'physic', name: 'الفيزياء والكيمياء', coefficient: 4, notesCount: 3 },
        { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 4, notesCount: 3 },
        { id: 'french', name: 'اللغة الفرنسية', coefficient: 3, notesCount: 4 },
        { id: 'arabic', name: 'اللغة العربية', coefficient: 2, notesCount: 3 },
        { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2, notesCount: 2 },
        { id: 'history_geo', name: 'التاريخ والجغرافيا', coefficient: 2, notesCount: 3 },
        { id: 'philo', name: 'الفلسفة', coefficient: 2, notesCount: 2 },
        { id: 'sport', name: 'التربية البدنية', coefficient: 2, notesCount: 1 },
        { id: 'info', name: 'المعلوميات', coefficient: 2, notesCount: 2 },
      ]
    },
    {
      id: 'cc-let',
      name: 'جذع مشترك آداب',
      subjects: [
        { id: 'arabic', name: 'اللغة العربية', coefficient: 5, notesCount: 4 },
        { id: 'history_geo', name: 'التاريخ والجغرافيا', coefficient: 4, notesCount: 3 },
        { id: 'french', name: 'اللغة الفرنسية', coefficient: 4, notesCount: 4 },
        { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2, notesCount: 2 },
        { id: 'philo', name: 'الفلسفة', coefficient: 2, notesCount: 2 },
        { id: 'english', name: 'اللغة الأجنبية الثانية', coefficient: 3, notesCount: 3 },
        { id: 'math', name: 'الرياضيات', coefficient: 2, notesCount: 3 },
        { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 2, notesCount: 2 },
        { id: 'sport', name: 'التربية البدنية', coefficient: 2, notesCount: 1 },
      ]
    }
  ],
  [LevelType.FIRST_BAC]: [
    {
      id: '1bac-regional-sc',
      name: 'الجهوي (العلوم والتقنيات)',
      subjects: [
        { id: 'french', name: 'اللغة الفرنسية', coefficient: 4, notesCount: 1 },
        { id: 'arabic', name: 'اللغة العربية', coefficient: 2, notesCount: 1 },
        { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2, notesCount: 1 },
        { id: 'history_geo', name: 'التاريخ والجغرافيا', coefficient: 2, notesCount: 1 },
      ]
    },
    {
      id: '1bac-regional-let',
      name: 'الجهوي (الآداب والعلوم الإنسانية)',
      subjects: [
        { id: 'french', name: 'اللغة الفرنسية', coefficient: 4, notesCount: 1 },
        { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2, notesCount: 1 },
        { id: 'math', name: 'الرياضيات', coefficient: 1, notesCount: 1 },
        { id: 'lang2', name: 'اللغة الأجنبية الثانية', coefficient: 4, notesCount: 1 },
      ]
    }
  ],
  [LevelType.SECOND_BAC]: [
    {
      id: '2bac-pc',
      name: 'مسلك العلوم الفيزيائية (الوطني)',
      subjects: [
        { id: 'physic', name: 'الفيزياء والكيمياء', coefficient: 7, notesCount: 1 },
        { id: 'math', name: 'الرياضيات', coefficient: 7, notesCount: 1 },
        { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 5, notesCount: 1 },
        { id: 'english', name: 'اللغة الأجنبية الثانية', coefficient: 2, notesCount: 1 },
        { id: 'philo', name: 'الفلسفة', coefficient: 2, notesCount: 1 },
      ]
    },
    {
      id: '2bac-svt',
      name: 'مسلك علوم الحياة والأرض (الوطني)',
      subjects: [
        { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 7, notesCount: 1 },
        { id: 'math', name: 'الرياضيات', coefficient: 7, notesCount: 1 },
        { id: 'physic', name: 'الفيزياء والكيمياء', coefficient: 5, notesCount: 1 },
        { id: 'english', name: 'اللغة الأجنبية الثانية', coefficient: 2, notesCount: 1 },
        { id: 'philo', name: 'الفلسفة', coefficient: 2, notesCount: 1 },
      ]
    }
  ],
  [LevelType.AUTHENTIC]: [
    {
      id: 'auth-mid-3',
      name: 'الثالثة إعدادي أصيل',
      subjects: [
        { id: 'arabic', name: 'اللغة العربية', coefficient: 5, notesCount: 4 },
        { id: 'sharia', name: 'العلوم الشرعية', coefficient: 5, notesCount: 4 },
        { id: 'french', name: 'اللغة الفرنسية', coefficient: 4, notesCount: 4 },
        { id: 'math', name: 'الرياضيات', coefficient: 4, notesCount: 4 },
      ]
    }
  ],
  [LevelType.GENERAL]: [
    {
      id: 'bac-final',
      name: 'المعدل العام للبكالوريا',
      subjects: [
        { id: 'nat', name: 'الامتحان الوطني (50%)', coefficient: 2, notesCount: 1 },
        { id: 'reg', name: 'الامتحان الجهوي (25%)', coefficient: 1, notesCount: 1 },
        { id: 'ca', name: 'المراقبة المستمرة (25%)', coefficient: 1, notesCount: 1 },
      ]
    }
  ],
  [LevelType.CUSTOM]: [
    {
      id: 'custom-free',
      name: 'حساب حر للمعدل',
      subjects: [
        { id: 's1', name: 'المادة 1', coefficient: 1, notesCount: 5 },
        { id: 's2', name: 'المادة 2', coefficient: 1, notesCount: 5 },
      ]
    }
  ],
  [LevelType.SPECIAL]: [],
  [LevelType.CUSTOM_ENTRY]: [
    {
      id: 'manual-entry',
      name: 'إدخال يدوي حر',
      subjects: Array.from({ length: 8 }, (_, i) => ({
        id: `manual_${i + 1}`,
        name: `المادة ${i + 1}`,
        coefficient: 1,
        notesCount: 5
      }))
    }
  ]
};
