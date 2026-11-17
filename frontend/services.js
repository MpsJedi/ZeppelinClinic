// Service detail content. Order matches I18N[lang].services. Titles come from I18N.
const SERVICES = [
  { id: "therapy", img: "services-web/therapy.jpg", ka: {
      p: ["თერაპიული სტომატოლოგია მოიცავს კბილის დაზიანებების მკურნალობას და შენარჩუნებას ქირურგიული ჩარევის გარეშე. ადრეულ ეტაპზე დიაგნოსტიკა საშუალებას გვაძლევს კბილი შევინარჩუნოთ მაქსიმალურად.",
          "ჩვენ ვიყენებთ თანამედროვე მაღალხარისხიან საბჟენ მასალებს, ანესთეზიას და ოპტიკურ გადიდებას, რათა მკურნალობა იყოს უმტკივნეულო და ზუსტი ხოლო შედეგი ბუნებრივი და საიმედო."],
      l: ["კარიესის მკურნალობა და ესთეტიკური ბჟენი", "არხების მკურნალობა მიკროსკოპული სიზუსტით", "პროფესიული ჰიგიენა და გაწმენდა", "კბილების გათეთრება"] },
    en: {
      p: ["Therapeutic dentistry covers the treatment and preservation of damaged teeth without surgery. Early diagnosis lets us save as much of the natural tooth as possible.",
          "We use modern high quality restorative materials, anesthesia and magnifying optics so that treatment is painless, long-lasting and natural looking."],
      l: ["Cavity treatment and aesthetic fillings", "Root canal treatment with high precision", "Professional hygiene and cleaning", "Teeth whitening"] },
    ru: {
      p: ["Терапевтическая стоматология — это лечение и сохранение повреждённых зубов без хирургического вмешательства. Ранняя диагностика позволяет сохранить максимум природного зуба.",
          "Мы используем современные высококачественные реставрационные материалы, анестезию и увеличительную оптику, чтобы лечение было безболезненным, долговечным и выглядело естественно."],
      l: ["Лечение кариеса и эстетические пломбы", "Лечение каналов с высокой точностью", "Профессиональная гигиена и чистка", "Отбеливание зубов"] } },
  { id: "implantology", img: "services-web/implantology.jpg", ka: {
      p: ["იმპლანტაცია დაკარგული კბილის ადღდგენის ყველაზე საიმედო და ეფექტური მეთოდია."],
      l: ["დენტალური იმპლანტის ჩანერგვა ", "სრული უკბილო ყვების მკურნალობა დენტალური იმპლანტაციით", "ძვლის ატროფიის შემთხვევაში - ძვლის პლასტიკა", "პროთეზირება იმპლანტებზე"] },
    en: {
      p: ["Dental implants are the most reliable and long-lasting way to replace missing teeth. An implant replaces the tooth root and preserves the jaw bone."],
      l: ["Placement of dental implant", "Full-arch restoration on implants", "In case of bone atrophy - bone augmentation", "Suprastructures on implants"] },
    ru: {
      p: ["Имплантация — самый надёжный и долговечный способ восстановить утраченные зубы. Имплант заменяет корень зуба и сохраняет костную ткань челюсти."],
      l: ["Установка зубного импланта", "Полное восстановление на имплантах", "При атрофии кости - костная пластика", "Супраструктуры на имплантах"] } },
  { id: "orthodontics", img: "services-web/orthodontics.jpg", ka: {
      p: ["ორთოდონტია ასწორებს კბილების მდგომარეობას და თანკბილვას, რაც მნიშვნელოვანია როგორც ესთეტიკისთვის, ისე ჯანმრთელობისთვის.",
          "გვაქვს როგორც ტრადიციული ბრეკეტ-სისტემები, ისე გამჭვირვალე კაპები. გეგმას ვადგენთ ციფრული მოდელირების საფუძველზე."],
      l: ["ბრეკეტ-სისტემები", "გამჭვირვალე კაპები", "ორთოდონტია ბავშვებისა და მოზრდილებისთვის", "რეტენციის პერიოდის კონტროლი"] },
    en: {
      p: ["Orthodontics corrects the position of teeth and the bite, which matters both for aesthetics and for overall oral health.",
          "We offer traditional braces as well as clear aligners, with treatment planned on the basis of digital modelling."],
      l: ["Braces", "Clear aligners", "Orthodontics for children and adults", "Retention-period follow-up"] },
    ru: {
      p: ["Ортодонтия исправляет положение зубов и прикус, что важно как для эстетики, так и для здоровья полости рта.",
          "Мы предлагаем как классические брекет-системы, так и прозрачные элайнеры. План лечения составляется на основе цифрового моделирования."],
      l: ["Брекет-системы", "Прозрачные элайнеры", "Ортодонтия для детей и взрослых", "Контроль в период ретенции"] } },
  { id: "cosmetic", img: "services-web/cosmetic.jpg", ka: {
      p: ["ესთეტიკური სტომატოლოგია გიქმნით ახალ  ღიმილს, რომელიც ბუნებრივად გამოიყურება და ინდივიდუალურად მზადდება მხოლოდ თქვენთვის.",
          "ყველა დეტალს წინასწარ ვგეგმავთ, რათა შედეგი იყოს ინდივიდუალური, პაციენტზე ორიენტირებული და ბუნებრივი."],
      l: ["ცირკონიუმის კერამიკული გვირგვინები", "ვინირები", "პროთეზირება იმპლანტებზე", "სრული ციფრული პროტოკოლი"] },
    en: {
      p: ["Cosmetic dentistry gives you a smile that looks natural and suits your face.",
          "We plan every detail in advance so that the result is individual, patient oriented and natural."],
      l: ["Zirconia crowns", "Veneers", "Prosthetics on implants", "Full digital protocol"] },
    ru: {
      p: ["Эстетическая стоматология дарит улыбку, которая выглядит естественно и подходит вашему лицу.",
          "Мы заранее планируем каждую деталь, чтобы результат был индивидуальным, ориентированным на пациента и естественным."],
      l: ["Циркониевые коронки", "Виниры", "Протезирование на имплантах", "Полный цифровой протокол"] } },
  { id: "periodontology", img: "services-web/periodontology.jpg", ka: {
      p: ["პაროდონტოლოგია სტომატოლოგიის მიმართულებაა, რომელიც მოიცავს ღრძილებისა და კბილის საყრდენი ქსოვილების დაავადებების პროფილაქტიკას, დიაგნოსტიკას და მკურნალობას.",
          "დროული მკურნალობა იცავს კბილებს მოძრაობისა და დაკარგვისგან."],
      l: ["ღრძილის ქსოვილის დიაგნოსტიკა", "პაროდონტის დაავადებების მკურნალობა", "პაციენტის მონიტორინგი", "ღრძილის პლასტიკა"] },
    en: {
      p: ["Periodontology treats diseases of the gums and the tissues supporting the teeth. Bleeding and swollen gums are the first warning signs.",
          "Timely treatment protects your teeth from loosening and loss."],
      l: ["Gum tissue diagnostics", "Periodontal diseases treatment", "Patient monitoring", "Gum plastic surgery"] },
    ru: {
      p: ["Пародонтология лечит заболевания дёсен и тканей, удерживающих зубы. Кровоточивость и отёчность дёсен — первые тревожные признаки.",
          "Своевременное лечение защищает зубы от подвижности и потери."],
      l: ["Диагностика тканей дёсен", "Лечение заболеваний пародонта", "Наблюдение за пациентом", "Пластика десны"] } },
  { id: "surgery", img: "services-web/surgery.jpg", ka: {
      p: ["ქირურგია მოიცავს როგორც კბილების უმტკინვეულო ამოღებას, ასევე პირის ღრუს სხვადასხვა დაავადებების ქირურგიულ მკურნალობას."],
      l: ["კბილის ამოღება, მათ შორის სიბრძნის კბილის", "ცისტების მოცილება", "ძვლის პლასტიკა", "ფრენულექტომია"] },
    en: {
      p: ["Oral surgery covers surgical treatment of teeth and the oral cavity in a safe and comfortable environment.",
          "Procedures are performed under local anesthesia with minimal trauma and fast recovery."],
      l: ["Tooth extraction, including wisdom teeth", "Cyst removal", "Bone augmentation", "Frenectomy"] },
    ru: {
      p: ["Хирургическая стоматология — это хирургическое лечение зубов и полости рта в безопасной и комфортной обстановке.",
          "Операции проводятся под местной анестезией с минимальной травматичностью и быстрым восстановлением."],
      l: ["Удаление зубов, включая зубы мудрости", "Удаление кист", "Костная пластика", "Френэктомия"] } },
  { id: "scanning", img: "services-web/scanning.jpg", ka: {
      p: ["ინტრაორალური სკანერი არის უახლესი ციფრული ტექნოლოგია, რომელიც გვაძლევს სიზუსტეს, დიაგნოსტირებისა და მკურნალობის საუკეთესო შედეგის მისაღებად.",
          "მარტივად რომ ვთქვათ: ეს არის კბილების ციფრული ანაბეჭდის მიღების სწრაფი, კომფორტული და თანამედროვე გზა!"],
      l: ["უმტკივნეულო: ნემსებისა და დისკომფორტის გარეშე", "სწრაფი: ჩვეულებრივ მხოლოდ რამდენიმე წუთი", "ტრადიციული ანაბეჭდების გარეშე: არანაირი მასა და კოვზი", "ზუსტი: ქმნის კბილების დეტალურ 3D მოდელს", "უსაფრთხო: სკანირებისთვის გამოიყენება სინათლე, რენტგენის გარეშე"] },
    en: {
      p: ["An oral scanner is a small handheld device that takes digital 3D images of your teeth and gums.",
          "Why do we use it? To help plan crowns, bridges, veneers, orthodontic treatment, and other dental procedures.",
          "Simply put: it is a quick, comfortable, and modern way to create a digital impression of your teeth!"],
      l: ["Painless: no needles or discomfort", "Fast: usually takes just a few minutes", "No traditional impressions: no messy impression materials or trays", "Accurate: creates a detailed 3D model of your teeth", "Safe: uses light to scan your mouth, without X-rays"] },
    ru: {
      p: ["Оральный сканер — это небольшое портативное устройство, которое делает цифровые 3D-снимки ваших зубов и дёсен.",
          "Зачем он нужен? Он помогает спланировать коронки, мосты, виниры, ортодонтическое лечение и другие стоматологические процедуры.",
          "Проще говоря: это быстрый, комфортный и современный способ получить цифровой оттиск зубов!"],
      l: ["Безболезненно: без игл и дискомфорта", "Быстро: обычно занимает всего несколько минут", "Без традиционных оттисков: никаких слепочных масс и ложек", "Точно: создаёт детальную 3D-модель зубов", "Безопасно: сканирование светом, без рентгена"] } },
  { id: "tomography", img: "services-web/tomography.jpg", ka: {
      p: ["სტომატოლოგიური 3D ტომოგრაფია (CBCT) თანამედროვე, მაღალტექნოლოგიური კვლევის მეთოდია, რომელიც საშუალებას გვაძლევს მივიღოთ კბილების, ყბებისა და მიმდებარე ანატომიური სტრუქტურების სამგანზომილებიანი გამოსახულება.",
          "კვლევა ეხმარება ექიმს ზუსტად შეაფასოს კბილებისა და ძვლოვანი ქსოვილის მდგომარეობა, აღმოაჩინოს ისეთი ცვლილებები, რომლებიც ჩვეულებრივ რენტგენზე შესაძლოა არ ჩანდეს, და დაგეგმოს მკურნალობა მაქსიმალური სიზუსტით.",
          "მარტივად რომ ვთქვათ: CBCT ეხმარება ექიმს, 3D-ში დაინახოს რა ხდება თქვენს ყბაში, უფრო ზუსტი დიაგნოსტიკისა და მკურნალობის დაგეგმვისთვის."],
      l: ["სწრაფი: სკანირება ჩვეულებრივ მხოლოდ რამდენიმე წამს გრძელდება", "არაინვაზიური: ტკივილისა და დისკომფორტის გარეშე", "დეტალური 3D გამოსახულებები: კბილებისა და ყბის ნათელი სურათი", "დაბალი გამოსხივება: კონტროლირებადი დოზა, როგორც წესი, ჩვეულებრივ სამედიცინო CT-ზე დაბალი"] },
    en: {
      p: ["A Dental CBCT (Cone Beam Computed Tomography) scanner is an advanced imaging device that creates detailed 3D images of your teeth, jawbones, nerves, and surrounding structures.",
          "Why do we use it? To help diagnose dental problems and plan dental implants, wisdom tooth removal, root canal treatment, and other procedures.",
          "Simply put: CBCT helps your dentist see what is happening inside your jaw in 3D for more accurate diagnosis and treatment planning."],
      l: ["Quick: the scan usually takes just a few seconds", "Non-invasive: no pain or discomfort", "Detailed 3D images: a clear view of your teeth and jaw", "Low radiation: a controlled amount, generally lower than conventional medical CT scans", "Safe: performed by trained dental professionals when clinically necessary"] },
    ru: {
      p: ["Стоматологический КЛКТ-сканер (конусно-лучевая компьютерная томография) — это современное диагностическое устройство, создающее детальные 3D-изображения зубов, костей челюсти, нервов и окружающих структур.",
          "Зачем он нужен? Он помогает диагностировать проблемы и планировать дентальную имплантацию, удаление зубов мудрости, лечение корневых каналов и другие процедуры.",
          "Проще говоря: КЛКТ помогает врачу увидеть в 3D, что происходит внутри челюсти, для более точной диагностики и планирования лечения."],
      l: ["Быстро: сканирование обычно занимает всего несколько секунд", "Неинвазивно: без боли и дискомфорта", "Детальные 3D-изображения: чёткая картина зубов и челюсти", "Низкая доза облучения: контролируемая, как правило ниже, чем при обычной медицинской КТ", "Безопасно: проводится обученными специалистами при клинической необходимости"] } }
];

const UI = {
  ka: { more: "დეტალურად", includes: "რა შედის სერვისში", other: "სხვა სერვისები", home: "მთავარი", notfound: "სერვისი ვერ მოიძებნა",
        about_h: "კლინიკა Zeppelin", about_p: "2014 წელს დაარსებული Zeppelin Dental Clinic თანამედროვე, მულტიდისციპლინური სტომატოლოგიური ცენტრია, რომელიც თბილისის გულში მდებარეობს.\n\nსტომატოლოგიის სფეროში ათწლეულზე მეტი გამოცდილებით, კლინიკა ადგილობრივ და საერთაშორისო პაციენტებს სთავაზობს მაღალი ხარისხის, სრულყოფილ სტომატოლოგიურ მომსახურებას.\n\nჩვენთან ხელმისაწვდომია სტომატოლოგიური სერვისების სრული სპექტრი — პროფილაქტიკური და ესთეტიკური სტომატოლოგიიდან დაწყებული, თანამედროვე იმპლანტოლოგიით, პირის ღრუს ქირურგიით, ორთოდონტიითა და ორთოპედიული სტომატოლოგიით დასრულებული.\n\nZeppelin Dental Clinic-ში ერთმანეთს ვუხამებთ თანამედროვე ტექნოლოგიებს, ინოვაციურ აღჭურვილობასა და მაღალკვალიფიციური სპეციალისტების გამოცდილებას, რათა თითოეულ პაციენტს შევთავაზოთ ზუსტი, საიმედო და მის საჭიროებებზე მორგებული მკურნალობა.", values_t: "ჩვენი პრინციპები" },
  en: { more: "Learn more", includes: "What is included", other: "Other services", home: "Home", notfound: "Service not found",
        about_h: "Zeppelin Clinic", about_p: "Founded in 2014, Zeppelin Dental Clinic is a modern, multidisciplinary dental center located in the heart of Tbilisi.\n\nWith over a decade of experience in dentistry, the clinic offers local and international patients high-quality, comprehensive dental care.\n\nWe provide a full range of dental services, from preventive and aesthetic dentistry to advanced implantology, oral surgery, orthodontics and prosthodontics.\n\nAt Zeppelin Dental Clinic we combine modern technology, innovative equipment and the experience of highly qualified specialists to offer every patient precise, reliable and personalized treatment.", values_t: "Our principles" },
  ru: { more: "Подробнее", includes: "Что входит", other: "Другие услуги", home: "Главная", notfound: "Услуга не найдена",
        about_h: "Клиника Zeppelin", about_p: "Основанная в 2014 году, Zeppelin Dental Clinic — современный многопрофильный стоматологический центр в самом сердце Тбилиси.\n\nОбладая более чем десятилетним опытом в стоматологии, клиника предлагает местным и иностранным пациентам качественную и комплексную стоматологическую помощь.\n\nУ нас доступен полный спектр стоматологических услуг: от профилактической и эстетической стоматологии до современной имплантологии, хирургии полости рта, ортодонтии и ортопедической стоматологии.\n\nВ Zeppelin Dental Clinic мы сочетаем современные технологии, инновационное оборудование и опыт высококвалифицированных специалистов, чтобы предложить каждому пациенту точное, надёжное и индивидуальное лечение.", values_t: "Наши принципы" }
};
