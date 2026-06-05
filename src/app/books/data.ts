export interface Book {
  id: string
  entitle: string
  artitle: string
  enauthor: string
  arauthor: string
  cover: string      
  pdfpreview: string
  pdfdownload: string
  enauthdesc: string
  arauthdesc: string  
  enwarning?: string
  arwarning?: string
}

export const books: Book[] = [
  {
    id: '1',
    entitle: 'Atomic Habits',
    artitle: 'العادات الذرية',
    enauthor: 'James Clear',
    arauthor: 'جيمس كلير',
    enauthdesc: "James Clear is an American author and entrepreneur, best known for his book 'Atomic Habits'. He is the founder of the website JamesClear.com, where he shares insights on habit formation and personal development.",
    arauthdesc: "جيمس كلير هو مؤلف ورجل أعمال أمريكي، اشتهر بكتابه 'العادات الذرية'. وهو مؤسس الموقع الإلكتروني JamesClear.com، حيث يشارك رؤى حول تكوين العادات والتطوير الشخصي.",
    pdfpreview: "https://drive.google.com/file/d/1bSfoY8iH80GpULQkSFpUdCyPMPXeK6Yc/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1bSfoY8iH80GpULQkSFpUdCyPMPXeK6Yc",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1778254074/613TwtwS5FL._AC_SY550__wdej6r.jpg"
  },
  {
    id: '2',
    entitle: 'The Seven Habits of Highly Effective People',
    artitle: 'العادات السبع للكبار فعالية',
    enauthor: 'Stephen Covey',
    arauthor: 'ستيفن كوفاي',
    enauthdesc: "Stephen R. Covey is an American educator and author, best known for his book 'The Seven Habits of Highly Effective People'. He is the founder of the Covey Leadership Center, where he provides training and development in leadership and personal effectiveness.",
    arauthdesc: "ستيفن ر. كوفاي هو معلم ومؤلف أمريكي، اشتهر بكتابه 'العادات السبع للناس الأكثر فعالية'. وهو مؤسس مركز قيادة كوفاي، حيث يقدم تدريبًا وتطويرًا في القيادة والفعالية الشخصية.",
    pdfpreview: "https://drive.google.com/file/d/18kuK8KFjenjCtoJ6tzRTWJAk9bjkEtAR/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=18kuK8KFjenjCtoJ6tzRTWJAk9bjkEtAR",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1778341316/s-l960_2_wyxawt.webp"
  },
  {
    id: '3',
    entitle: 'The Quadrant Model Of Cash Flow',
    artitle: 'النموذج الرباعي للتدفقات النقدية',
    enauthor: 'Robert Kiyosaki',
    arauthor: 'روبرت كيوساكي',
    enauthdesc: "Robert Kiyosaki is an American businessman and author, best known for his 'Rich Dad Poor Dad' series of personal finance books. He is the founder of Rich Global LLC and the Rich Dad Company, providing personal financial and business education to people through books and videos.",
    arauthdesc: "روبرت كيوساكي هو رجل أعمال ومؤلف أمريكي، اشتهر بسلسلة كتبه 'الأب الغني والأب الفقير' في مجال التمويل الشخصي. هو مؤسس شركة Rich Dad Company التي تقدم تعليمًا ماليًا وتجاريًا للأفراد من خلال الكتب ومقاطع الفيديو.",
    pdfpreview: "https://drive.google.com/file/d/1lvuvfMmbGC12O2K8zLbVL8mf7eJRThg3/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1lvuvfMmbGC12O2K8zLbVL8mf7eJRThg3",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1778165366/Rich-Dads-Cashflow-Quadrant-Guide-to-Financial-Freedom-392x588_mddxqi.jpg"
  },
  {
    id: '4',
    entitle: 'Rich Dad, Poor Dad',
    artitle: 'الأب الغني والأب الفقير',
    enauthor: 'Robert Kiyosaki',
    arauthor: 'روبرت كيوساكي',
    enauthdesc: "Robert Kiyosaki is an American businessman and author, best known for his 'Rich Dad Poor Dad' series of personal finance books. He is the founder of Rich Global LLC and the Rich Dad Company, providing personal financial and business education to people through books and videos.",
    arauthdesc: "روبرت كيوساكي هو رجل أعمال ومؤلف أمريكي، اشتهر بسلسلة كتبه 'الأب الغني والأب الفقير' في مجال التمويل الشخصي. هو مؤسس شركة Rich Dad Company التي تقدم تعليمًا ماليًا وتجاريًا للأفراد من خلال الكتب ومقاطع الفيديو.",
    pdfpreview: "https://drive.google.com/file/d/1SIM4iF1OtHpn0epSWbPSDRez9AfOad8M/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1SIM4iF1OtHpn0epSWbPSDRez9AfOad8M",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1777555014/s-l960_q7nel1.webp"
  },
  {
    id: '5',
    entitle: 'The Art of Indifference',
    artitle: 'فن اللامبالاة',
    enauthor: 'Mark Manson',
    arauthor: 'مارك مانسون',
    enauthdesc: "Mark Manson is an American self-help author and blogger. He is best known for his blog and the international bestseller 'The Subtle Art of Not Giving a F*ck', which challenges traditional self-help advice with a more realistic, evidence-based approach to personal growth and happiness.",
    arauthdesc: "مارك مانسون هو مؤلف ومدون أمريكي في مجال المساعدة الذاتية. اشتهر بمدونته وبالكتاب الأكثر مبيعاً عالمياً 'فن اللامبالاة'، الذي يتحدى نصائح المساعدة الذاتية التقليدية بنهج أكثر واقعية وقائم على الأدلة لتحقيق النمو الشخصي والسعادة.",
    pdfpreview: "https://drive.google.com/file/d/1cbM7zb47O2curIoxFv2cUkWV2YcZIS2Q/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1cbM7zb47O2curIoxFv2cUkWV2YcZIS2Q",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1777555442/0003_wnnsqi.jpg"
  },
  {
    id: '6',
    entitle: 'How to Win Friends and Influence People',
    artitle: 'كيف تكسب الأصدقاء وتؤثر في الناس',
    enauthor: 'Dale Carnegie',
    arauthor: 'ديل كارنيجي',
    enauthdesc: "Dale Carnegie (1888–1955) was a pioneering American author and lecturer born into poverty on a farm in Maryville, Missouri. He rose to international fame by creating the foundation for the modern self-help genre, most notably through his 1936 masterpiece, How to Win Friends and Influence People, which remains one of the best-selling books of all time. His primary achievement was the development of a global corporate training program that revolutionized how people approach public speaking, emotional intelligence, and interpersonal relations. By shifting the focus of success from technical skill to the \"human element\" Carnegie built an enduring educational legacy that continues to influence millions of professionals and world leaders today.",
    arauthdesc: "ديل كارنيجي (1888–1955) كان مؤلفاً ومحضراً أمريكيًا رائدًا وُلد في الفقر على مزرعة في ماريفيل، ميسوري. ارتفع إلى الشهرة الدولية من خلال إنشاء الأساس للنوع الحديث من الكتب الذاتية، خاصة من خلال إنجازه عام 1936، \"كيف تكسب الأصدقاء وتؤثر في الناس\"، والذي يبقى أحد أكثر الكتب مبيعًا في التاريخ. إنجازه الرئيسي كان تطوير برنامج تدريب شركي عالمي قام بتحويل كيفية نهج الناس في الخطاب العام، والذكاء العاطلي، والعلاقات الشخصية. من خلال تحويل التركيز على النجاح من المهارات التقنية إلى \"العنصر البشري\"، أنشأ كارنيجي تراثًا تعليميًا مستدامًا يُؤثر حتى اليوم على ملايين المحترفين والقادة العالميين.",
    pdfpreview: "https://drive.google.com/file/d/1vr8d22QONEivsTSFMs7ilEX_SyOY9iQ_/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1vr8d22QONEivsTSFMs7ilEX_SyOY9iQ_",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1775743960/71nUfOLyB2L._SY342__em5qnn.jpg"
  },
  {
    id: '7',
    entitle: 'Blue Ocean Strategy',
    artitle: ' استراتيجية المحيط الأزرق',
    enauthor: 'W. Chan Kim',
    arauthor: 'و. تشان كيم',
    enauthdesc: "W. Chan Kim (born 1957) is a renowned American strategist and author, best known for his innovative approach to business strategy. His groundbreaking work on the 'Blue Ocean Strategy' has revolutionized how companies think about market creation and competitive advantage. Kim's research and writings have influenced countless organizations worldwide, helping them to identify and capture new market opportunities.",
    arauthdesc: "و. تشان كيم (مواليد 1957) مخطط ومؤلف أمريكي بارز، يشتهر بنهجه الابتكاري في الاستراتيجية التجارية. إن عمله الرائد حول \" استراتيجية المحيط الأزرق\" قد أحدث ثورة في كيفية تفكير الشركات حول خلق السوق والمنافسة. لقد أثرت أبحاث كيم وكتاباته على العديد من المؤسسات حول العالم، مما ساعدهم على تحديد وتوظيف فرص السوق الجديدة.",
    pdfpreview: "https://drive.google.com/file/d/1wP-oFvp23Sthds1Bxp2FFylb2KQqDFg6/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1wP-oFvp23Sthds1Bxp2FFylb2KQqDFg6",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1778254020/51-HhCCG6CL._SY445_SX342_ML2__ez5hix.jpg"
  },
  {
    id: '8',
    entitle: 'Code: The Hidden Language of Computer Hardware and Software',
    artitle: 'كود: اللغة الخفية لأجهزة وبرمجيات الكمبيوتر',
    enauthor: 'Charles Petzold',
    arauthor: 'تشارلز بيتزولد',
    enauthdesc: "Charles Petzold (born 1953) is a celebrated American author and programmer, best known for his ability to bridge the gap between complex hardware and high-level software. A pioneer in Windows programming education, his 1999 masterpiece 'Code' revolutionized technical literature by making low-level computer architecture accessible to everyone. He was honored with the Windows Pioneer Award by Microsoft for his lifelong commitment to educating the global developer community.",
    arauthdesc: "تشارلز بيتزولد (مواليد 1953) مبرمج ومؤلف أمريكي بارز، يشتهر بقدرته الفائقة على سد الفجوة بين الأجهزة المعقدة والبرمجيات عالية المستوى. يُعد رائدًا في تعليم برمجة ويندوز، وقد أحدث كتابه 'كود' (1999) ثورة في الأدبيات التقنية بجعل هندسة الكمبيوتر العميقة مفهومة للجميع. نال جائزة 'Windows Pioneer' من شركة مايكروسوفت تقديرًا لجهوده المستمرة في تعليم مجتمع المطورين عالميًا.",
    pdfpreview: "https://drive.google.com/file/d/1NUHQmTCCV4UN_8F1YuUxLBu2VHfdUmLg/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1NUHQmTCCV4UN_8F1YuUxLBu2VHfdUmLg",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1776869783/Code-The-Hidden-Language-of-Computer-Hardware-and-Software-Paperback_2db0a862-c932-48a6-b916-7cb5e6277a53.a3e1763ac60b5d63cda09a147a66497f_z4ljoi.jpg"
  },
  {
    id: '9',
    entitle: 'Think And Grow Rich',
    artitle: 'فكر ازداد ثراءا',
    arwarning: "تنبيه هام: هذا المحتوى هو مجرد ملخص للنقاط العملية في الكتاب. وجب التنويه أن الكتاب الأصلي يحتوي على أفكار وفلسفات قد تؤدي إلى الشرك بالله (مثل فكرة مخاطبة الكون أو الذكاء اللامتناهي)، وهي أفكار غريبة لا أؤمن بها كلياً ولا أتبناها، ولا علاقة لي بتوجهات المؤلف الفكرية أو العقدية. بناءً عليه، أنا لا أنصح بقراءة الكتاب وأكتفي بتقديم هذا الملخص لتجنب تلك الشبهات.",
    enwarning: "Important Notice: This content is strictly a summary of the practical points in the book. Please be aware that the original book contains ideas and philosophies that may involve Associating partners with Allah (such as communicating with the universe or 'Infinite Intelligence'). These are strange ideas that I do not subscribe to or believe in at all, and I have no connection to the author's intellectual or theological views. Consequently, I do not recommend reading the full book and offer this summary instead to avoid those misguided concepts.",
    enauthor: 'Napoleon Hill',
    arauthor: 'نابوليون هيل',
    enauthdesc: "Napoleon Hill (1883-1970) was an American author and speaker, best known for his work on the principles of success. His most famous work, 'Think and Grow Rich' (1937), became a classic in self-help, outlining the steps to achieve personal and financial success.",
    arauthdesc: "نابوليون هيل (1883-1970) كان مؤلفًا أمريكيًا وخطيبًا، يشتهر بعمله على مبادئ النجاح. عمله الأكثر شهرة 'فكر وازداد ثراءا' (1937) أصبح من الكلاسيكيات في المساعدة الذاتية، حيث يوضح الخطوات لتحقيق النجاح الشخصي والمالي.",
    pdfpreview: "https://drive.google.com/file/d/1S-2EcChOl8YDpOdmst6CQwH34eQJ3Z6U/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1S-2EcChOl8YDpOdmst6CQwH34eQJ3Z6U",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1778165603/s-l1600_bxyrqh.webp"
  }
]