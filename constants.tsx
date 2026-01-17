
import { LevelType, Branch, Subject } from './types';

/**
 * Moroccan Education Database - Comprehensive Version
 */

const PRIMARY_CA = [
  { id: 'ar', name: '📖 اللغة العربية', coefficient: 1, notesCount: 5 },
  { id: 'fr', name: '🇫🇷 اللغة الفرنسية', coefficient: 1, notesCount: 5 },
  { id: 'ma', name: '🔢 الرياضيات', coefficient: 1, notesCount: 5 },
  { id: 'is', name: '🕌 التربية الإسلامية', coefficient: 1, notesCount: 5 },
  { id: 'sc', name: '🧪 النشاط العلمي', coefficient: 1, notesCount: 5 },
  { id: 'hi', name: '🌍 الاجتماعيات', coefficient: 1, notesCount: 5 },
  { id: 'ar_art', name: '🎨 التربية الفنية', coefficient: 1, notesCount: 5 },
  { id: 'pe', name: '🏃 التربية البدنية', coefficient: 1, notesCount: 5 },
];

const MIDDLE_CA = [
  { id: 'ma', name: '🔢 الرياضيات', coefficient: 5, notesCount: 5 },
  { id: 'fr', name: '🇫🇷 اللغة الفرنسية', coefficient: 5, notesCount: 5 },
  { id: 'ar', name: '📖 اللغة العربية', coefficient: 5, notesCount: 5 },
  { id: 'en', name: '🇬🇧 الإنجليزية', coefficient: 1, notesCount: 5 },
  { id: 'ph', name: '⚡ الفيزياء والكيمياء', coefficient: 2, notesCount: 5 },
  { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 3, notesCount: 5 },
  { id: 'so', name: '🌍 الاجتماعيات', coefficient: 3, notesCount: 5 },
  { id: 'is', name: '🕌 الإسلامية', coefficient: 2, notesCount: 5 },
  { id: 'pe', name: '🏃 البدنية', coefficient: 2, notesCount: 5 },
  { id: 'it', name: '💻 المعلوميات', coefficient: 1, notesCount: 5 },
  { id: 'te', name: '🛠️ التكنولوجيا', coefficient: 1, notesCount: 5 },
  { id: 'mu', name: '🎵 التربية الموسيقية', coefficient: 1, notesCount: 5 },
];

const MIDDLE_2_CA = [
  ...MIDDLE_CA,
  { id: 'fa', name: '🏠 التربية الأسرية', coefficient: 2, notesCount: 5 },
];

// For 3rd year Middle School CA, all coefficients are 1
const MIDDLE_3_CA_ONLY_1 = MIDDLE_CA.map(subject => ({
  ...subject,
  coefficient: 1
}));

export const LEVEL_BRANCHES: Record<LevelType, Branch[]> = {
  [LevelType.PRIMARY_1]: [{ id: 'p1', name: 'المستوى الأول', subjects: PRIMARY_CA }],
  [LevelType.PRIMARY_2]: [{ id: 'p2', name: 'المستوى الثاني', subjects: PRIMARY_CA }],
  [LevelType.PRIMARY_3]: [{ id: 'p3', name: 'المستوى الثالث', subjects: PRIMARY_CA }],
  [LevelType.PRIMARY_4]: [{ id: 'p4', name: 'المستوى الرابع', subjects: PRIMARY_CA }],
  [LevelType.PRIMARY_5]: [{ id: 'p5', name: 'المستوى الخامس', subjects: PRIMARY_CA }],
  [LevelType.PRIMARY_6]: [
    { id: 'p6_reg', name: '📝 الامتحان الإقليمي', subjects: [
      { id: 'ar_is', name: '📜 العربية والإسلامية', coefficient: 3, notesCount: 5 },
      { id: 'ma', name: '🔢 الرياضيات', coefficient: 2, notesCount: 5 },
      { id: 'fr', name: '🇫🇷 الفرنسية', coefficient: 2, notesCount: 5 },
    ]},
    { id: 'p6_ca', name: '📅 المراقبة المستمرة', subjects: PRIMARY_CA }
  ],
  [LevelType.MIDDLE_1]: [{ id: 'm1', name: 'الأولى إعدادي', subjects: MIDDLE_CA }],
  [LevelType.MIDDLE_2]: [{ id: 'm2', name: 'الثانية إعدادي', subjects: MIDDLE_2_CA }],
  [LevelType.MIDDLE_3]: [
    { id: 'm3_reg', name: '🏛️ الامتحان الجهوي', subjects: [
      { id: 'ar', name: '📖 اللغة العربية', coefficient: 3, notesCount: 5 },
      { id: 'ma', name: '🔢 الرياضيات', coefficient: 3, notesCount: 5 },
      { id: 'fr', name: '🇫🇷 الفرنسية', coefficient: 3, notesCount: 5 },
      { id: 'is', name: '🕌 الإسلامية', coefficient: 1, notesCount: 5 },
      { id: 'so', name: '🌍 الاجتماعيات', coefficient: 1, notesCount: 5 },
      { id: 'ph', name: '⚡ الفيزياء', coefficient: 1, notesCount: 5 },
      { id: 'svt', name: '🌱 علوم الحياة', coefficient: 1, notesCount: 5 },
    ]},
    { id: 'm3_ca', name: '📅 المراقبة المستمرة', subjects: MIDDLE_3_CA_ONLY_1 }
  ],
  [LevelType.COMMON_CORE]: [
    { id: 'cc_sc', name: '🧪 ج.م علمي', subjects: [
      { id: 'ma', name: '🔢 الرياضيات', coefficient: 4 },
      { id: 'ph', name: '⚡ الفيزياء', coefficient: 4 },
      { id: 'svt', name: '🌱 علوم الحياة', coefficient: 4 },
      { id: 'fr', name: '🇫🇷 الفرنسية', coefficient: 3 },
      { id: 'en', name: '🇬🇧 الإنجليزية', coefficient: 2 },
      { id: 'ar', name: '📖 العربية', coefficient: 2 },
      { id: 'is', name: '🕌 الإسلامية', coefficient: 2 },
      { id: 'hi_ge', name: '🌍 الاجتماعيات', coefficient: 2 },
      { id: 'philo', name: '🧠 الفلسفة', coefficient: 2 },
      { id: 'it', name: '💻 المعلوميات', coefficient: 2 },
      { id: 'pe', name: '🏃 البدنية', coefficient: 2 },
      { id: 'beh', name: '🤝 المواظبة والسلوك', coefficient: 1 },
    ]},
    { id: 'cc_let', name: '✒️ ج.م آداب', subjects: [
      { id: 'ar', name: '📖 العربية', coefficient: 5 },
      { id: 'hi_ge', name: '🌍 الاجتماعيات', coefficient: 4 },
      { id: 'fr', name: '🇫🇷 الفرنسية', coefficient: 4 },
      { id: 'en', name: '🇬🇧 الإنجليزية', coefficient: 2 },
      { id: 'is', name: '🕌 الإسلامية', coefficient: 2 },
      { id: 'philo', name: '🧠 الفلسفة', coefficient: 2 },
      { id: 'ma', name: '🔢 الرياضيات', coefficient: 2 },
      { id: 'it', name: '💻 المعلوميات', coefficient: 2 },
      { id: 'pe', name: '🏃 البدنية', coefficient: 2 },
      { id: 'beh', name: '🤝 المواظبة والسلوك', coefficient: 1 },
    ]}
  ],
  [LevelType.FIRST_BAC]: [
    { id: '1bac_sc_ca', name: '🧪 العلوم (مراقبة)', subjects: [
      { id: 'ma', name: '🔢 الرياضيات', coefficient: 7 },
      { id: 'ph', name: '⚡ الفيزياء', coefficient: 7 },
      { id: 'svt', name: '🌱 علوم الحياة', coefficient: 5 },
      { id: 'fr', name: '🇫🇷 الفرنسية', coefficient: 4 },
      { id: 'ar', name: '📖 العربية', coefficient: 2 },
      { id: 'is', name: '🕌 الإسلامية', coefficient: 2 },
      { id: 'en', name: '🇬🇧 الإنجليزية', coefficient: 2 },
      { id: 'philo', name: '🧠 الفلسفة', coefficient: 2 },
      { id: 'it', name: '💻 المعلوميات', coefficient: 2 },
      { id: 'pe', name: '🏃 البدنية', coefficient: 2 },
      { id: 'beh', name: '🤝 المواظبة والسلوك', coefficient: 1 },
    ]},
    { id: '1bac_let_ca', name: '✒️ آداب (مراقبة)', subjects: [
      { id: 'ar', name: '📖 العربية', coefficient: 5 },
      { id: 'hi_ge', name: '🌍 الاجتماعيات', coefficient: 4 },
      { id: 'fr', name: '🇫🇷 الفرنسية', coefficient: 4 },
      { id: 'en', name: '🇬🇧 الإنجليزية', coefficient: 4 },
      { id: 'is', name: '🕌 الإسلامية', coefficient: 2 },
      { id: 'philo', name: '🧠 الفلسفة', coefficient: 2 },
      { id: 'ma', name: '🔢 الرياضيات', coefficient: 2 },
      { id: 'pe', name: '🏃 البدنية', coefficient: 2 },
      { id: 'beh', name: '🤝 المواظبة والسلوك', coefficient: 1 },
    ]}
  ],
  [LevelType.SECOND_BAC]: [
    { id: '2bac_pc', name: '⚡ ع. فيزيائية', subjects: [
      { id: 'ph', name: '⚡ الفيزياء', coefficient: 7 },
      { id: 'ma', name: '🔢 الرياضيات', coefficient: 7 },
      { id: 'svt', name: '🌱 علوم الحياة', coefficient: 5 },
      { id: 'en', name: '🇬🇧 الإنجليزية', coefficient: 2 },
      { id: 'philo', name: '🧠 الفلسفة', coefficient: 2 },
      { id: 'ar_ca', name: '📖 العربية (م)', coefficient: 2 },
      { id: 'fr_ca', name: '🇫🇷 الفرنسية (م)', coefficient: 4 },
      { id: 'pe', name: '🏃 البدنية', coefficient: 2 },
      { id: 'beh', name: '🤝 المواظبة والسلوك', coefficient: 1 },
    ]},
    { id: '2bac_svt', name: '🌱 ع. حياة وأرض', subjects: [
      { id: 'svt', name: '🌱 علوم الحياة', coefficient: 7 },
      { id: 'ma', name: '🔢 الرياضيات', coefficient: 7 },
      { id: 'ph', name: '⚡ الفيزياء', coefficient: 5 },
      { id: 'en', name: '🇬🇧 الإنجليزية', coefficient: 2 },
      { id: 'philo', name: '🧠 الفلسفة', coefficient: 2 },
      { id: 'pe', name: '🏃 البدنية', coefficient: 2 },
      { id: 'beh', name: '🤝 المواظبة والسلوك', coefficient: 1 },
    ]}
  ],
  [LevelType.GENERAL]: [
    { id: 'bac_total', name: '🎓 المعدل العام', subjects: [
      { id: 'nat', name: '🏆 الوطني', coefficient: 2 },
      { id: 'reg', name: '🏛️ الجهوي', coefficient: 1 },
      { id: 'ca', name: '📅 المراقبة', coefficient: 1 },
    ]}
  ],
  [LevelType.CUSTOM]: [
    { id: 'c_free', name: '🧮 حساب مخصص', subjects: Array.from({ length: 5 }, (_, i) => ({ id: `s${i}`, name: `المادة ${i+1}`, coefficient: 1 }))}
  ],
  [LevelType.SPECIAL]: [],
  [LevelType.CUSTOM_ENTRY]: [],
  [LevelType.AUTHENTIC]: []
};
