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
    entitle: 'How to Win Friends and Influence People',
    artitle: 'كيف تكسب الأصدقاء وتؤثر في الناس',
    enauthor: 'Dale Carnegie',
    arauthor: 'ديل كارنيجي',
    enauthdesc: "Dale Carnegie (1888–1955) was a pioneering American author and lecturer born into poverty on a farm in Maryville, Missouri. He rose to international fame by creating the foundation for the modern self-help genre, most notably through his 1936 masterpiece, How to Win Friends and Influence People, which remains one of the best-selling books of all time. His primary achievement was the development of a global corporate training program that revolutionized how people approach public speaking, emotional intelligence, and interpersonal relations. By shifting the focus of success from technical skill to the \"human element\" Carnegie built an enduring educational legacy that continues to influence millions of professionals and world leaders today.",
    arauthdesc: "ديل كارنيجي (1888–1955) كان مؤلفاً ومحضراً أمريكيًا رائدًا وُلد في الفقر على مزرعة في ماريفيل، ميسوري. ارتفع إلى الشهرة الدولية من خلال إنشاء الأساس للنوع الحديث من الكتب الذاتية، خاصة من خلال إنجازه عام 1936، \"كيف تكسب الأصدقاء وتؤثر في الناس\"، والذي يبقى أحد أكثر الكتب مبيعًا في التاريخ. إنجازه الرئيسي كان تطوير برنامج تدريب شركي عالمي قام بتحويل كيفية نهج الناس في الخطاب العام، والذكاء العاطلي، والعلاقات الشخصية. من خلال تحويل التركيز على النجاح من المهارات التقنية إلى \"العنصر البشري\"، أنشأ كارنيجي تراثًا تعليميًا مستدامًا يُؤثر حتى اليوم على ملايين المحترفين والقادة العالميين.",
    pdfpreview: "https://drive.google.com/file/d/1vr8d22QONEivsTSFMs7ilEX_SyOY9iQ_/preview",
    pdfdownload: "https://drive.google.com/uc?export=download&id=1vr8d22QONEivsTSFMs7ilEX_SyOY9iQ_",
    cover: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1775743960/71nUfOLyB2L._SY342__em5qnn.jpg"
  }
]