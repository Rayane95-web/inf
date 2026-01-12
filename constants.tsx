
import { LevelType, Branch } from './types';

/**
 * Official Moroccan Education Coefficients & Subjects Database
 * Accurate for all divisions based on Ministry of Education standards.
 */

const PRIMARY_SUBJECTS_1_4 = [
  { id: 'arabic', name: '📖 اللغة العربية', coefficient: 1, notesCount: 5 },
  { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 1, notesCount: 5 },
  { id: 'math', name: '🔢 الرياضيات', coefficient: 1, notesCount: 5 },
  { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 1, notesCount: 5 },
  { id: 'science', name: '🧪 النشاط العلمي', coefficient: 1, notesCount: 5 },
  { id: 'art', name: '🎨 التربية الفنية', coefficient: 1, notesCount: 5 },
  { id: 'music', name: '🎵 التربية الموسيقية', coefficient: 1, notesCount: 5 },
  { id: 'sport', name: '🏃 التربية البدنية', coefficient: 1, notesCount: 5 },
];

const PRIMARY_SUBJECTS_5_6_CA = [
  { id: 'arabic', name: '📖 اللغة العربية', coefficient: 1, notesCount: 5 },
  { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 1, notesCount: 5 },
  { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 1, notesCount: 5 },
  { id: 'math', name: '🔢 الرياضيات', coefficient: 1, notesCount: 5 },
  { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 1, notesCount: 5 },
  { id: 'social', name: '🌍 الاجتماعيات', coefficient: 1, notesCount: 5 },
  { id: 'science', name: '🧪 النشاط العلمي', coefficient: 1, notesCount: 5 },
  { id: 'art', name: '🎨 التربية الفنية', coefficient: 1, notesCount: 5 },
  { id: 'music', name: '🎵 التربية الموسيقية', coefficient: 1, notesCount: 5 },
  { id: 'sport', name: '🏃 التربية البدنية', coefficient: 1, notesCount: 5 },
];

const MIDDLE_SCHOOL_CA = [
  { id: 'math', name: '🔢 الرياضيات', coefficient: 5, notesCount: 5 },
  { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 5, notesCount: 5 },
  { id: 'arabic', name: '📖 اللغة العربية', coefficient: 5, notesCount: 5 },
  { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
  { id: 'phys', name: '⚡ الفيزياء والكيمياء', coefficient: 2, notesCount: 5 },
  { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 3, notesCount: 5 },
  { id: 'social', name: '🌍 الاجتماعيات', coefficient: 3, notesCount: 5 },
  { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 2, notesCount: 5 },
  { id: 'sport', name: '🏃 التربية البدنية', coefficient: 2, notesCount: 5 },
  { id: 'info', name: '💻 المعلوميات', coefficient: 2, notesCount: 5 },
  { id: 'art', name: '🎨 التربية التشكيلية', coefficient: 2, notesCount: 5 },
  { id: 'music', name: '🎵 التربية الموسيقية', coefficient: 2, notesCount: 5 },
];

export const LEVEL_BRANCHES: Record<LevelType, Branch[]> = {
  [LevelType.PRIMARY_1]: [{ id: 'p1', name: '👶 المستوى الأول', subjects: PRIMARY_SUBJECTS_1_4 }],
  [LevelType.PRIMARY_2]: [{ id: 'p2', name: '👦 المستوى الثاني', subjects: PRIMARY_SUBJECTS_1_4 }],
  [LevelType.PRIMARY_3]: [{ id: 'p3', name: '👧 المستوى الثالث', subjects: PRIMARY_SUBJECTS_1_4 }],
  [LevelType.PRIMARY_4]: [{ id: 'p4', name: '📚 المستوى الرابع', subjects: PRIMARY_SUBJECTS_1_4 }],
  [LevelType.PRIMARY_5]: [{ id: 'p5', name: '🏫 المستوى الخامس', subjects: PRIMARY_SUBJECTS_5_6_CA }],
  [LevelType.PRIMARY_6]: [
    {
      id: 'p6-regional',
      name: '📝 الامتحان الإقليمي',
      subjects: [
        { id: 'arabic_islamic', name: '📜 العربية والإسلامية', coefficient: 3, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 2, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 2, notesCount: 5 },
      ]
    },
    { id: 'p6-ca', name: '📅 المراقبة المستمرة', subjects: PRIMARY_SUBJECTS_5_6_CA }
  ],
  [LevelType.MIDDLE_1]: [{ id: 'mid1', name: '🎒 الأولى إعدادي', subjects: MIDDLE_SCHOOL_CA }],
  [LevelType.MIDDLE_2]: [{ id: 'mid2', name: '📐 الثانية إعدادي', subjects: MIDDLE_SCHOOL_CA }],
  [LevelType.MIDDLE_3]: [
    {
      id: 'mid3-regional',
      name: '🏛️ الامتحان الجهوي',
      subjects: [
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 3, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 3, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 3, notesCount: 5 },
        { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 1, notesCount: 5 },
        { id: 'social', name: '🌍 الاجتماعيات', coefficient: 1, notesCount: 5 },
        { id: 'phys', name: '⚡ الفيزياء والكيمياء', coefficient: 1, notesCount: 5 },
        { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 1, notesCount: 5 },
      ]
    },
    { id: 'mid3-ca', name: '📅 المراقبة المستمرة', subjects: MIDDLE_SCHOOL_CA }
  ],
  [LevelType.COMMON_CORE]: [
    {
      id: 'cc-sc',
      name: '🧪 جذع مشترك علمي',
      subjects: [
        { id: 'math', name: '🔢 الرياضيات', coefficient: 4, notesCount: 5 },
        { id: 'phys', name: '⚡ الفيزياء والكيمياء', coefficient: 4, notesCount: 5 },
        { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 4, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 3, notesCount: 5 },
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 2, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
        { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 2, notesCount: 5 },
        { id: 'history_geo', name: '🌍 التاريخ والجغرافيا', coefficient: 2, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
        { id: 'info', name: '💻 المعلوميات', coefficient: 2, notesCount: 5 },
        { id: 'sport', name: '🏃 التربية البدنية', coefficient: 2, notesCount: 5 },
      ]
    },
    {
      id: 'cc-let',
      name: '✒️ جذع مشترك آداب',
      subjects: [
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 5, notesCount: 5 },
        { id: 'history_geo', name: '🌍 التاريخ والجغرافيا', coefficient: 4, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 4, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 3, notesCount: 5 },
        { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 2, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 2, notesCount: 5 },
        { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 2, notesCount: 5 },
        { id: 'sport', name: '🏃 التربية البدنية', coefficient: 2, notesCount: 5 },
      ]
    },
    {
      id: 'cc-tech',
      name: '⚙️ جذع مشترك تكنولوجي',
      subjects: [
        { id: 'math', name: '🔢 الرياضيات', coefficient: 4, notesCount: 5 },
        { id: 'phys', name: '⚡ الفيزياء والكيمياء', coefficient: 4, notesCount: 5 },
        { id: 'tech', name: '🛠️ علوم المهندس', coefficient: 4, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 3, notesCount: 5 },
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 2, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
        { id: 'info', name: '💻 المعلوميات', coefficient: 2, notesCount: 5 },
      ]
    }
  ],
  [LevelType.FIRST_BAC]: [
    {
      id: '1bac-sc-ex-ca',
      name: '🧪 علوم تجريبية ورياضية (مراقبة)',
      subjects: [
        { id: 'math', name: '🔢 الرياضيات', coefficient: 7, notesCount: 5 },
        { id: 'phys', name: '⚡ الفيزياء والكيمياء', coefficient: 7, notesCount: 5 },
        { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 5, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 4, notesCount: 5 },
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 2, notesCount: 5 },
        { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 2, notesCount: 5 },
        { id: 'history_geo', name: '🌍 التاريخ والجغرافيا', coefficient: 2, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
        { id: 'sport', name: '🏃 التربية البدنية', coefficient: 2, notesCount: 5 },
        { id: 'info', name: '💻 المعلوميات', coefficient: 2, notesCount: 5 },
      ]
    },
    {
      id: '1bac-sc-reg',
      name: '🏛️ علوم (الامتحان الجهوي)',
      subjects: [
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 4, notesCount: 5 },
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 2, notesCount: 5 },
        { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 2, notesCount: 5 },
        { id: 'history_geo', name: '🌍 التاريخ والجغرافيا', coefficient: 2, notesCount: 5 },
      ]
    },
    {
      id: '1bac-let-ca',
      name: '✒️ آداب وعلوم إنسانية (مراقبة)',
      subjects: [
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 5, notesCount: 5 },
        { id: 'social', name: '🌍 الاجتماعيات', coefficient: 4, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 4, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 4, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
        { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 2, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 2, notesCount: 5 },
        { id: 'science', name: '🧪 العلوم', coefficient: 2, notesCount: 5 },
        { id: 'sport', name: '🏃 التربية البدنية', coefficient: 2, notesCount: 5 },
      ]
    },
    {
      id: '1bac-eco-ca',
      name: '📊 علوم اقتصادية وتدبير (مراقبة)',
      subjects: [
        { id: 'eco', name: '📊 الاقتصاد', coefficient: 6, notesCount: 5 },
        { id: 'accounting', name: '📑 المحاسبة', coefficient: 4, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 4, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 4, notesCount: 5 },
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 2, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
        { id: 'islamic', name: '🕌 التربية الإسلامية', coefficient: 2, notesCount: 5 },
        { id: 'sport', name: '🏃 التربية البدنية', coefficient: 2, notesCount: 5 },
      ]
    }
  ],
  [LevelType.SECOND_BAC]: [
    {
      id: '2bac-pc',
      name: '⚡ مسلك العلوم الفيزيائية',
      subjects: [
        { id: 'phys', name: '⚡ الفيزياء والكيمياء', coefficient: 7, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 7, notesCount: 5 },
        { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 5, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
        { id: 'arabic', name: '📖 العربية (مراقبة)', coefficient: 2, notesCount: 5 },
        { id: 'french', name: '🇫🇷 الفرنسية (مراقبة)', coefficient: 4, notesCount: 5 },
        { id: 'islamic', name: '🕌 الإسلامية (مراقبة)', coefficient: 2, notesCount: 5 },
        { id: 'history_geo', name: '🌍 الاجتماعيات (مراقبة)', coefficient: 2, notesCount: 5 },
        { id: 'sport', name: '🏃 البدنية', coefficient: 2, notesCount: 5 },
      ]
    },
    {
      id: '2bac-svt',
      name: '🌱 مسلك علوم حياة وأرض',
      subjects: [
        { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 7, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 7, notesCount: 5 },
        { id: 'phys', name: '⚡ الفيزياء والكيمياء', coefficient: 5, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
        { id: 'arabic', name: '📖 العربية (مراقبة)', coefficient: 2, notesCount: 5 },
        { id: 'sport', name: '🏃 البدنية', coefficient: 2, notesCount: 5 },
      ]
    },
    {
      id: '2bac-sm-a',
      name: '📐 مسلك العلوم الرياضية (أ)',
      subjects: [
        { id: 'math', name: '🔢 الرياضيات', coefficient: 9, notesCount: 5 },
        { id: 'phys', name: '⚡ الفيزياء والكيمياء', coefficient: 7, notesCount: 5 },
        { id: 'svt', name: '🌱 علوم الحياة والأرض', coefficient: 3, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
        { id: 'arabic', name: '📖 العربية (مراقبة)', coefficient: 2, notesCount: 5 },
        { id: 'sport', name: '🏃 البدنية', coefficient: 2, notesCount: 5 },
      ]
    },
    {
      id: '2bac-eco',
      name: '💰 مسلك العلوم الاقتصادية',
      subjects: [
        { id: 'eco_gen', name: '📊 الاقتصاد العام', coefficient: 6, notesCount: 5 },
        { id: 'eco_org', name: '📈 تنظيم المقاولات', coefficient: 3, notesCount: 5 },
        { id: 'accounting', name: '📑 المحاسبة', coefficient: 4, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 4, notesCount: 5 },
        { id: 'english', name: '🇬🇧 الإنجليزية', coefficient: 2, notesCount: 5 },
        { id: 'philo', name: '🧠 الفلسفة', coefficient: 2, notesCount: 5 },
      ]
    }
  ],
  [LevelType.AUTHENTIC]: [
    {
      id: 'auth-mid-3',
      name: '🕌 الثالثة إعدادي أصيل',
      subjects: [
        { id: 'arabic', name: '📖 اللغة العربية', coefficient: 5, notesCount: 5 },
        { id: 'sharia', name: '📜 العلوم الشرعية', coefficient: 5, notesCount: 5 },
        { id: 'french', name: '🇫🇷 اللغة الفرنسية', coefficient: 4, notesCount: 5 },
        { id: 'math', name: '🔢 الرياضيات', coefficient: 4, notesCount: 5 },
        { id: 'english', name: '🇬🇧 اللغة الإنجليزية', coefficient: 2, notesCount: 5 },
      ]
    }
  ],
  [LevelType.GENERAL]: [
    {
      id: 'bac-final',
      name: '🎓 المعدل العام للباك',
      subjects: [
        { id: 'nat', name: '🏆 الامتحان الوطني', coefficient: 2, notesCount: 5 },
        { id: 'reg', name: '🏛️ الامتحان الجهوي', coefficient: 1, notesCount: 5 },
        { id: 'ca', name: '📅 المراقبة المستمرة', coefficient: 1, notesCount: 5 },
      ]
    }
  ],
  [LevelType.CUSTOM]: [
    {
      id: 'custom-free',
      name: '🧮 حساب مخصص',
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
      name: '✍️ إدخال يدوي',
      subjects: Array.from({ length: 8 }, (_, i) => ({
        id: `manual_${i + 1}`,
        name: `المادة ${i + 1}`,
        coefficient: 1,
        notesCount: 5
      }))
    }
  ]
};
