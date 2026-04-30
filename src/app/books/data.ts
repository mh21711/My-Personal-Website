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
}

export const books: Book[] = [
  {
    id: '1',
    entitle: 'Rich Dad, Poor Dad',
    artitle: 'الأب الغني والأب الفقير',
    enauthor: 'Robert Kiyosaki',
    arauthor: 'روبرت كيوساكي',
    enauthdesc: "Robert Kiyosaki is an American businessman and author, best known for his 'Rich Dad Poor Dad' series of personal finance books. He is the founder of Rich Global LLC and the Rich Dad Company, providing personal financial and business education to people through books and videos.",
    arauthdesc: "روبرت كيوساكي هو رجل أعمال ومؤلف أمريكي، اشتهر بسلسلة كتبه 'الأب الغني والأب الفقير' في مجال التمويل الشخصي. هو مؤسس شركة Rich Dad Company التي تقدم تعليمًا ماليًا وتجاريًا للأفراد من خلال الكتب ومقاطع الفيديو.",
    pdfpreview: "https://drive.google.com/file/d/12eCBnofvmuWypCRQztZR5E3yNVHr6C8z/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=12eCBnofvmuWypCRQztZR5E3yNVHr6C8z",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1777555014/s-l960_q7nel1.webp"
  },
  {
    id: '2',
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
    id: '3',
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
    id: '4',
    entitle: 'Code: The Hidden Language of Computer Hardware and Software',
    artitle: 'كود: اللغة الخفية لأجهزة وبرمجيات الكمبيوتر',
    enauthor: 'Charles Petzold',
    arauthor: 'تشارلز بيتزولد',
    enauthdesc: "Charles Petzold (born 1953) is a celebrated American author and programmer, best known for his ability to bridge the gap between complex hardware and high-level software. A pioneer in Windows programming education, his 1999 masterpiece 'Code' revolutionized technical literature by making low-level computer architecture accessible to everyone. He was honored with the Windows Pioneer Award by Microsoft for his lifelong commitment to educating the global developer community.",
    arauthdesc: "تشارلز بيتزولد (مواليد 1953) مبرمج ومؤلف أمريكي بارز، يشتهر بقدرته الفائقة على سد الفجوة بين الأجهزة المعقدة والبرمجيات عالية المستوى. يُعد رائدًا في تعليم برمجة ويندوز، وقد أحدث كتابه 'كود' (1999) ثورة في الأدبيات التقنية بجعل هندسة الكمبيوتر العميقة مفهومة للجميع. نال جائزة 'Windows Pioneer' من شركة مايكروسوفت تقديرًا لجهوده المستمرة في تعليم مجتمع المطورين عالميًا.",
    pdfpreview: "https://drive.google.com/file/d/1NUHQmTCCV4UN_8F1YuUxLBu2VHfdUmLg/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1NUHQmTCCV4UN_8F1YuUxLBu2VHfdUmLg",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1776869783/Code-The-Hidden-Language-of-Computer-Hardware-and-Software-Paperback_2db0a862-c932-48a6-b916-7cb5e6277a53.a3e1763ac60b5d63cda09a147a66497f_z4ljoi.jpg"
  }
]