// Ways of Seeing — catalog data. One record per object; the page renders the catalog,
// the Readings bibliography, and the masthead counts from this file.
//
// Fields: id (permanent, never reuse), title, creator, year, type
// (film | collective | platform | text | framework | festival | library | audio),
// paths (culture | nature | youth | archives | method), region (filter chip),
// coverage (precise place), language, format, subjects, access
// (open | request | institutional | purchase), url, urlLabel, thumb, description,
// note (curatorial), citation (*asterisks* = italics), strand (texts only), curator (true = my own work).

window.WOS_STRANDS = [
  "Seeing and representation",
  "Indigenous media and visual sovereignty",
  "Community archives",
  "Protocols, openness, and data governance",
  "Refusal, listening, and sound",
  "Community media in India",
  "Adivasi politics and place",
  "Adivasi writing",
  "Critical media literacy"
];

window.WOS_RECORDS = [

  /* ---------- Curator's own work ---------- */
  {
    id: "WOS-001", curator: true, type: "film", title: "Ayangraji", creator: "Arpit Gaind (director, editor)",
    year: "2021", region: "Jharkhand", coverage: "Radidih, Gumla district, Jharkhand", format: "Documentary, 5 min 43 sec",
    paths: ["nature"], subjects: ["alternative agriculture", "rice cultivation", "community-supported markets"],
    access: "open", url: "https://player.mediadelivery.net/play/766686/819a2f23-8325-4ee3-bc69-351f7dbc8e4f", urlLabel: "Watch", bunny: "766686/819a2f23-8325-4ee3-bc69-351f7dbc8e4f",
    thumb: "assets/img/ayangraji-field.jpg",
    description: "An alternative agriculture and rice cultivation initiative in Radidih, following efforts to build community-supported markets and entrepreneurship opportunities for Adivasi people in the region."
  },
  {
    id: "WOS-002", curator: true, type: "film", title: "Envisioning Development Practice", creator: "Arpit Gaind (director, producer, editor)",
    year: "2019", region: "India", coverage: "Odisha, Chhattisgarh, and Jharkhand", format: "Documentary, 6 min 58 sec",
    paths: ["culture", "nature"], subjects: ["development practice", "single women's association", "youth collectives", "organic agriculture"],
    access: "open", url: "https://player.mediadelivery.net/play/766686/1fb7c392-cc66-426f-853d-31f6e8ac0d51", urlLabel: "Watch", bunny: "766686/1fb7c392-cc66-426f-853d-31f6e8ac0d51",
    thumb: "assets/img/film/envisioning-still.jpg",
    description: "Three practices across the Adivasi belt, each built by practitioners who arrived as students and stayed: Eka Nari Sangathan, Chinhari, and organic agriculture at Ayangraji. There is no narration; the speaking belongs to the people in the situation.",
    note: "Made at the Centre for Development Practice, Ambedkar University Delhi, and archived there. The film declines to substitute a result for practices that do not produce one."
  },
  {
    id: "WOS-003", curator: true, type: "film", title: "Chinhari: The Young India", creator: "Arpit Gaind (director, producer)",
    year: "2019", region: "Chhattisgarh", coverage: "Dhamtari, Chhattisgarh", format: "Documentary",
    paths: ["youth"], subjects: ["youth collectives", "care groups", "agriculture"],
    access: "open", url: "https://player.mediadelivery.net/play/766686/48f133bf-c957-4e01-9ac8-a74906084c47", urlLabel: "Watch", bunny: "766686/48f133bf-c957-4e01-9ac8-a74906084c47",
    thumb: "assets/img/film/chinhari-still.jpg",
    description: "Follows Chinhari, a collective of Adivasi youth in Dhamtari, centering on young women practicing agriculture and forming care groups within the collective."
  },
  {
    id: "WOS-004", curator: true, type: "film", title: "Inoculating Lac", creator: "Arpit Gaind (cinematographer, editor); produced by the Centre for Development Practice, Ambedkar University Delhi",
    year: "2019", region: "Chhattisgarh", coverage: "Bhanupratappur, Chhattisgarh", format: "Documentary",
    paths: ["nature"], subjects: ["lac cultivation", "forest livelihoods"],
    access: "open", url: "https://www.youtube.com/watch?v=niLY3TEyXpY", urlLabel: "Watch on YouTube",
    thumb: "assets/img/film/inoculating-lac-still.jpg",
    description: "Lac cultivation and livelihoods in Bhanupratappur, following the inoculation process at the center of the region's lac economy."
  },
  {
    id: "WOS-005", curator: true, type: "audio", title: "Community Archive and Digital Archive Practices", creator: "Arpit Gaind and Michelle Caswell",
    year: "2022", region: "Global", format: "Podcast conversation / media essay",
    paths: ["archives"], subjects: ["community archives", "digital archives"],
    description: "A recorded conversation on community archives and digital archival practice."
  },
  {
    id: "WOS-006", curator: true, type: "text", title: "Becoming through Film (Making): Politics of Contingency and Re-Presentation", creator: "Arpit Gaind",
    year: "2020", region: "India", format: "Peer-reviewed article",
    paths: ["culture", "method"], subjects: ["filmmaking", "representation"],
    access: "open", url: "http://practicalphilosophy.co.in/vol-1-no-1/", urlLabel: "Read",
    citation: "Gaind, Arpit. 2020. “Becoming through Film (Making): Politics of Contingency and Re-Presentation.” *Journal of Practical Philosophy* 1 (1): 106–118.",
    description: "Peer-reviewed article on filmmaking, contingency, and re-presentation."
  },
  {
    id: "WOS-007", curator: true, type: "text", title: "Politics of Other(ing): ‘Remembering’ and ‘Forgetting’ the Indigenous", creator: "Arpit Gaind",
    year: "2022", region: "Global", format: "Blog essay",
    paths: ["archives"], subjects: ["memory", "indigeneity", "othering"],
    access: "open", url: "https://criticaltheoryis.blogspot.com/2022/02/politics-of-othering-remembering-and.html", urlLabel: "Read",
    citation: "Gaind, Arpit. 2022. “Politics of Other(ing): ‘Remembering’ and ‘Forgetting’ the Indigenous.” *Critical Theory and Information Studies*, February 7, 2022.",
    description: "Essay on remembering, forgetting, and the othering of Indigenous peoples, published on the Critical Theory and Information Studies blog."
  },
  {
    id: "WOS-008", curator: true, type: "text", title: "On Becoming Ho: Remembering, Repeating and Working Through", creator: "Arpit Gaind",
    year: "2018", region: "Jharkhand", format: "Article",
    paths: ["culture"], subjects: ["Ho community", "memory"],
    access: "open", url: "https://www.pradan.net/wp-content/uploads/2017/02/Newsreach-January-February2018-.pdf", urlLabel: "Read (PDF)",
    citation: "Gaind, Arpit. 2018. “On Becoming Ho: Remembering, Repeating and Working Through.” *NEWSREACH* 18 (1): 23–28.",
    description: "Article published in PRADAN's NEWSREACH."
  },

  /* ---------- Collectives and organizations ---------- */
  {
    id: "WOS-010", type: "collective", title: "AKHRA", creator: "Biju Toppo and Meghnath (founders)",
    year: "1996", region: "Jharkhand", coverage: "Ranchi, Jharkhand", paths: ["culture"],
    subjects: ["Adivasi film collective", "human rights", "documentary"],
    access: "open", url: "https://akhrasite.wordpress.com/", urlLabel: "Visit",
    thumb: "assets/img/wos/akhra-edit-suite.jpg",
    description: "A Ranchi-based group describing itself as committed persons, mostly Indigenous youth, working in culture, communication, and the human rights of Indigenous (tribal) peoples. It has made more than thirty documentaries, several of them National Film Award winners.",
    note: "The archive's longest-running point of reference for Adivasi filmmaking in Jharkhand. Its team includes the filmmaker and editor Rupesh Kr Sahu (WOS-106), and ten of its films are held by UCLA Library (WOS-105)."
  },
  {
    id: "WOS-011", type: "collective", title: "Jharkhandi Bhasha Sahitya Sanskriti Akhra", creator: "Vandna Tete (founder)",
    year: "2008", region: "Jharkhand", coverage: "Ranchi, Jharkhand", language: "Santali, Mundari, Kurukh, Kharia, Hindi, and others",
    paths: ["culture", "archives"], subjects: ["Indigenous languages", "publishing", "literature"],
    access: "open", url: "https://jharkhandiakhra.in/index.php/about-us/", urlLabel: "Visit",
    description: "A community institution for Indigenous culture, language, and literature that publishes and distributes books and magazines in Adivasi languages. Distinct from the film collective AKHRA."
  },
  {
    id: "WOS-012", type: "collective", title: "Chinhari", creator: "Chinhari collective",
    year: "2018", region: "Chhattisgarh", coverage: "Dhamtari, Chhattisgarh", paths: ["youth"],
    subjects: ["young women's collective", "gender", "bodily health", "organic farming"],
    access: "open", url: "https://www.travellersuniversity.org/post/chinhari-listening-to-the-rhythm-of-the-feminine-earth", urlLabel: "Read profile",
    description: "A collective formed in 2018, largely of young women aged 10–28, working on gender relations, bodily health, and organic farming. Chinhari is Chhattisgarhi for “to leave a mark.”",
    note: "Also the subject of the film Chinhari: The Young India (WOS-003)."
  },
  {
    id: "WOS-013", type: "collective", title: "Ektara Collective", creator: "Ektara Collective",
    region: "Madhya Pradesh", coverage: "Bhopal, Madhya Pradesh", language: "Hindi", paths: ["culture"],
    subjects: ["collective filmmaking", "fiction", "working-class settlements"],
    access: "open", url: "https://ektaracollective.in/", urlLabel: "Visit",
    description: "A filmmaking collective whose films are made by people with diverse talents, training, and backgrounds, with and within working-class settlements in Bhopal and elsewhere.",
    note: "Not an Adivasi collective. Here for its method: fiction made collaboratively with trained and untrained people, located in their own realities."
  },
  {
    id: "WOS-014", type: "collective", title: "Video Volunteers", creator: "Jessica Mayberry (founding director) and Stalin K.",
    region: "India", paths: ["culture"], subjects: ["community video", "community correspondents"],
    access: "open", url: "https://www.videovolunteers.org/", urlLabel: "Visit",
    description: "A community media network that trains people from marginalized communities to report their own stories. Its IndiaUnheard news agency draws on community correspondents in “media-dark” districts."
  },
  {
    id: "WOS-015", type: "collective", title: "adivaani", creator: "Ruby Hembrom (founder)",
    year: "2012", region: "West Bengal", coverage: "Kolkata, West Bengal", paths: ["archives", "culture"],
    subjects: ["Adivasi publishing", "archive"],
    access: "open", url: "https://adivaani.org/", urlLabel: "Visit",
    description: "An independent, Adivasi-run publishing house and archive documenting and disseminating Indigenous and Adivasi voices."
  },
  {
    id: "WOS-016", type: "collective", title: "Vídeo nas Aldeias (Video in the Villages)", creator: "Vincent Carelli (founder)",
    year: "1986", region: "Global", coverage: "Brazil", paths: ["culture"],
    subjects: ["Indigenous filmmaking training", "Brazil"],
    access: "open", url: "https://www.youtube.com/@VideoNasAldeias", urlLabel: "Watch on YouTube",
    description: "A Brazilian organization that trains Indigenous people in filmmaking and supports their struggles to strengthen their cultures and identities through audiovisual work."
  },
  {
    id: "WOS-017", type: "collective", title: "Wapikoni", creator: "Manon Barbeau, with the Atikamekw Nation Council and the First Nations Youth Council",
    year: "2004", region: "Global", coverage: "Quebec, Canada", paths: ["youth", "culture"],
    subjects: ["First Nations youth", "mobile filmmaking studio"],
    access: "open", url: "https://wapikoni.ca/en/", urlLabel: "Visit",
    description: "Through audiovisual creation, contributes to the personal, creative, and professional development of First Nations members and the affirmation of their communities."
  },

  /* ---------- Films ---------- */
  {
    id: "WOS-020", type: "film", title: "Jaha Chhiti Ladi Hathi Se", creator: "AKHRA",
    year: "1996", region: "Jharkhand", format: "Documentary, c. 55 min", paths: ["nature"],
    subjects: ["bauxite mining", "Indigenous resistance"],
    access: "open", url: "https://www.youtube.com/watch?v=19EEEfYeiHI", urlLabel: "Watch on YouTube",
    thumb: "https://img.youtube.com/vi/19EEEfYeiHI/hqdefault.jpg",
    description: "About Indigenous peoples' struggle against bauxite mining. Full film on AKHRA's official channel."
  },
  {
    id: "WOS-021", type: "film", title: "Ek Hadsa Aur Bhi (Yet Another Accident)", creator: "AKHRA; credited to Biju Toppo and Sunil Minj",
    year: "1996", region: "Jharkhand", coverage: "Palamu district, Jharkhand", format: "Documentary, c. 58 min", paths: ["nature"],
    subjects: ["dams", "displacement", "Kutku-Mandal Dam"],
    access: "open", url: "https://www.youtube.com/watch?v=YQhEWWDfTaw", urlLabel: "Watch on YouTube",
    thumb: "https://img.youtube.com/vi/YQhEWWDfTaw/hqdefault.jpg",
    description: "On the Kutku-Mandal Dam incident in Palamu, when a closed sluice gate flooded some thirty-two villages. Full film on AKHRA's official channel."
  },
  {
    id: "WOS-022", type: "film", title: "Development Flows from the Barrel of the Gun (Vikas Bandook Ki Nal Se)", creator: "Biju Toppo and Meghnath (AKHRA)",
    year: "2003", region: "India", coverage: "Jharkhand and central and western India", language: "Hindi, with English subtitles", format: "Documentary, 58 min", paths: ["nature"],
    subjects: ["development-induced displacement", "police violence", "human rights"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/fulldisplay?docid=alma9997174355606533&vid=01UCS_LAL:UCLA", urlLabel: "UCLA Library record",
    description: "About the violation of Indigenous people's human rights through development projects, following resistance at Kashipur, Koel Karo, Nagarnar, and elsewhere. Awarded at Film South Asia 2004 and Vatavaran 2005. A German version was also made. No public stream; available to researchers through UCLA Library, or on request from AKHRA.",
    note: "Held by UCLA Library (54 min). Read alongside the contemporary review (WOS-072) and Meghnath's 2012 interview (WOS-071)."
  },
  {
    id: "WOS-023", type: "film", title: "Accumulated Injustice", creator: "AKHRA, with Adivasi-Koordination in Germany",
    year: "2015", region: "Odisha", coverage: "Rourkela, Odisha", format: "Documentary, c. 27 min", paths: ["nature"],
    subjects: ["industrialization", "steel plant", "displacement"],
    access: "open", url: "https://www.youtube.com/watch?v=CpbIsrjDZuM", urlLabel: "Watch on YouTube",
    thumb: "https://img.youtube.com/vi/CpbIsrjDZuM/hqdefault.jpg",
    description: "Adivasi people's living conditions on the dark side of the Rourkela Steel Plant. Full film on AKHRA's official channel.",
    note: "UCLA Library also holds this film, catalogued there as 2012."
  },
  {
    id: "WOS-024", type: "film", title: "Naachi Se Baanchi", creator: "Biju Toppo and Meghnath (AKHRA); produced by Films Division",
    year: "2017", region: "Jharkhand", format: "Documentary", paths: ["culture"],
    subjects: ["Ramdayal Munda", "Jharkhand movement", "Adivasi intellectual history"],
    access: "request", url: "https://www.youtube.com/watch?v=gApeIh0UZho", urlLabel: "Watch an excerpt",
    thumb: "https://img.youtube.com/vi/gApeIh0UZho/hqdefault.jpg",
    description: "On the life and work of Dr. Ramdayal Munda, a leading Adivasi intellectual of the Jharkhand movement. Rajat Kamal, 65th National Film Awards. Only an excerpt is public.",
    note: "The full film (71 min) is held by UCLA Library. Its title, “those who dance will survive,” names the archive's wager: that cultural practice is itself a form of persistence."
  },
  {
    id: "WOS-025", type: "film", title: "We Do Not Need Dust of Development", creator: "Biju Toppo and Meghnath (AKHRA)",
    year: "2021", region: "Jharkhand", format: "Documentary, c. 28 min", paths: ["nature"],
    subjects: ["mining", "development", "environment"],
    access: "open", url: "https://www.youtube.com/watch?v=e__ekkbD05E", urlLabel: "Watch on YouTube",
    thumb: "https://img.youtube.com/vi/e__ekkbD05E/hqdefault.jpg",
    description: "A debate on how environmental and public development might reach “the last person of the village” after mineral exploitation. Full film on AKHRA's official channel."
  },
  {
    id: "WOS-026", type: "film", title: "Jaadui Machchi", creator: "Ektara Collective",
    year: "2013", region: "Madhya Pradesh", language: "Hindi", format: "Short film, 38 min", paths: ["culture"],
    subjects: ["collective filmmaking", "fiction"],
    access: "open", url: "https://www.youtube.com/watch?v=npqA_R0CWL8", urlLabel: "Watch on YouTube",
    thumb: "https://img.youtube.com/vi/npqA_R0CWL8/hqdefault.jpg",
    description: "A Hindi short by Ektara Collective. Full film on Ektara's official channel."
  },
  {
    id: "WOS-027", type: "film", title: "Turup (Checkmate)", creator: "Ektara Collective",
    year: "2017", region: "Madhya Pradesh", coverage: "Bhopal, Madhya Pradesh", language: "Hindi", format: "Feature, 72 min", paths: ["culture"],
    subjects: ["caste", "class", "gender", "religion"],
    access: "open", url: "https://www.youtube.com/watch?v=DrodWC2pkBo", urlLabel: "Watch on YouTube",
    thumb: "https://img.youtube.com/vi/DrodWC2pkBo/hqdefault.jpg",
    description: "A neighbourhood chess game becomes a way into caste, class, religion, and gender through three women's lives, against rising fundamentalism. Premiered at the 19th Jio MAMI Mumbai Film Festival."
  },

  /* ---------- Platforms, archives, and community audio ---------- */
  {
    id: "WOS-030", type: "platform", title: "CGNet Swara", creator: "Shubhranshu Choudhary (founder)",
    year: "2010", region: "Chhattisgarh", coverage: "Central Gondwana region", paths: ["culture"],
    subjects: ["voice-based citizen journalism", "mobile phones"],
    access: "open", url: "https://cgnetswara.org/", urlLabel: "Visit",
    description: "A voice-based portal, freely accessible by mobile phone, where anyone can report and listen to stories of local interest. Trained journalists review and verify reports before publication.",
    note: "A reminder that community media in central India is often audio, not video: built for the phone in hand, not the screen."
  },
  {
    id: "WOS-031", type: "audio", title: "Asur Adivasi Mobile Radio", creator: "Asur Adivasi Wisdom Akhra, with Jharkhandi Bhasha Sahitya Sanskriti Akhra",
    region: "Jharkhand", coverage: "Netarhat, Jharkhand", language: "Asur", paths: ["culture", "nature"],
    subjects: ["endangered languages", "forest and land rights", "community radio"],
    access: "open", url: "https://www.asurnation.in/aamr/index.html", urlLabel: "Listen",
    description: "A community “mobile radio” broadcasting in weekly markets around Netarhat and online, to protect the endangered Asur language and culture and ancestral forest and land rights."
  },
  {
    id: "WOS-032", type: "audio", title: "Chala Ho Gaon Mein", creator: "Alternative for India Development (AID)",
    region: "Jharkhand", coverage: "Palamu, Jharkhand", language: "Magahi; later Oraon, Mundari, Ho, Santhali", paths: ["culture"],
    subjects: ["community radio"],
    access: "open", url: "https://www.aidindia.com/community_radio.html", urlLabel: "Visit",
    description: "AID's first community radio programme (“Come, let's go to the village”), made in the local Magahi dialect with community participation and planning. A case study in Pavarala and Malik (2007)."
  },
  {
    id: "WOS-033", type: "platform", title: "People's Archive of Rural India (PARI)", creator: "P. Sainath (founder-editor)",
    year: "2014", region: "India", language: "Many Indian languages", paths: ["archives"],
    subjects: ["rural journalism", "living archive"],
    access: "open", url: "https://ruralindiaonline.org/en/stories/categories/adivasis/", urlLabel: "Explore the Adivasis section",
    description: "A multimedia digital journalism platform and living archive on rural India. Its Adivasis category gathers stories on Adivasi communities in many languages."
  },
  {
    id: "WOS-034", type: "platform", title: "Adivasi Lives Matter", creator: "Ashish Birulee, Ankush Vengurlekar, Isha Chitnis (founders)",
    year: "2016", region: "India", paths: ["youth", "culture"],
    subjects: ["digital storytelling", "Adivasi youth"],
    access: "open", url: "https://www.adivasilivesmatter.com/", urlLabel: "Visit",
    description: "A platform amplifying Adivasi and tribal voices of India, training Adivasi youth as digital storytellers."
  },
  {
    id: "WOS-035", type: "platform", title: "Sahapedia", creator: "Sahapedia",
    year: "2011", region: "India", paths: ["archives"], subjects: ["arts and heritage", "open resource"],
    access: "open", url: "https://www.sahapedia.org/", urlLabel: "Visit",
    description: "An open online resource on the arts, cultures, and heritage of India."
  },
  {
    id: "WOS-036", type: "platform", title: "Pad.ma — Public Access Digital Media Archive", creator: "CAMP, 0x2620, and Alternative Law Forum",
    year: "2007", region: "India", paths: ["archives"], subjects: ["annotated video", "footage archive", "non-state archive"],
    access: "open", url: "https://pad.ma/", urlLabel: "Explore",
    description: "An online archive of densely text-annotated video material, primarily footage rather than finished films, which describes itself as a non-state archive.",
    note: "A model for what this archive might become: footage kept whole and annotated in place, rather than cut into finished claims."
  },
  {
    id: "WOS-037", type: "platform", title: "Indiancine.ma", creator: "Initiated by Pad.ma",
    year: "2013", region: "India", paths: ["archives"], subjects: ["Indian cinema", "annotated film archive"],
    access: "open", url: "https://indiancine.ma/", urlLabel: "Explore",
    description: "An annotated online archive of Indian film, built on Rajadhyaksha and Willemen's Encyclopaedia of Indian Cinema. Only out-of-copyright films are publicly viewable."
  },
  {
    id: "WOS-038", type: "platform", title: "IsumaTV", creator: "Isuma",
    region: "Global", coverage: "Igloolik, Nunavut, Canada", language: "70 languages", paths: ["archives", "culture"],
    subjects: ["Inuit media", "Indigenous community video"],
    access: "open", url: "https://www.isuma.tv/", urlLabel: "Explore",
    description: "Hosts thousands of Indigenous community videos in some seventy languages, run by Isuma, the Inuit-owned collective founded in 1990 in Igloolik."
  },
  {
    id: "WOS-039", type: "platform", title: "South Asian American Digital Archive (SAADA)", creator: "Samip Mallick and Michelle Caswell (co-founders)",
    year: "2008", region: "Global", coverage: "United States", paths: ["archives"], subjects: ["community archive", "post-custodial archive"],
    access: "open", url: "https://www.saada.org/", urlLabel: "Explore",
    description: "An independent, post-custodial digital archive documenting South Asian American history, and the subject of Caswell, Cifor, and Ramirez (2016)."
  },
  {
    id: "WOS-040", type: "platform", title: "Narrating Ideas of Indigeneity in Jharkhand, India", creator: "Sangeeta Dasgupta and Vinita Damodaran; UCLA Library Modern Endangered Archives Program",
    year: "2020", region: "Jharkhand", language: "English, Hindi, Bengali, Kurukh, Nagri, Mundari", paths: ["archives"],
    subjects: ["endangered archives", "Bishop Nirmal Minz collection", "indigeneity"],
    access: "open", url: "https://meap.library.ucla.edu/projects/ideas-of-indigeneity-jharkhand/", urlLabel: "View project",
    description: "A planning-grant project inventorying notes, letters, diaries, posters, and pamphlets on indigeneity in Jharkhand from 1900 to 2019, centred on the collection of Bishop Dr. Nirmal Minz."
  },

  /* ---------- Libraries and repositories ---------- */
  {
    id: "WOS-041", type: "library", title: "Dr. Ramdayal Munda Tribal Welfare Research Institute (TRI Jharkhand)", creator: "Department of Welfare, Government of Jharkhand",
    year: "1953", region: "Jharkhand", coverage: "Ranchi, Jharkhand", paths: ["archives"],
    subjects: ["research institute", "tribal museum", "library"],
    access: "open", url: "https://www.trijharkhand.in/en/", urlLabel: "Visit",
    description: "An institute of research, training, evaluation, and publication on issues affecting Scheduled Tribes, with a tribal museum and library.",
    note: "A state archive, catalogued here alongside community archives so the difference between them stays visible."
  },
  {
    id: "WOS-042", type: "library", title: "Digital South Asia Library", creator: "University of Chicago, with the Center for Research Libraries and partners",
    region: "Global", paths: ["archives"], subjects: ["digitised reference works", "dictionaries", "maps"],
    access: "open", url: "https://dsal.uchicago.edu/", urlLabel: "Browse",
    description: "A collaborative effort to make rare South Asian resources available internationally: digitised reference works, dictionaries, images, maps, statistics, and books."
  },
  {
    id: "WOS-043", type: "library", title: "Endangered Archives Programme", creator: "British Library",
    region: "Global", paths: ["archives"], subjects: ["digitisation", "at-risk archives"],
    access: "open", url: "https://eap.bl.uk/", urlLabel: "Browse",
    description: "A grant programme and digital archive funding the digitisation, where they are held, of culturally important archives at risk around the world."
  },

  /* ---------- Festivals ---------- */
  {
    id: "WOS-044", type: "festival", title: "Dharti Aaba Tribal Film Festival", creator: "TRI Jharkhand",
    year: "2025", region: "Jharkhand", coverage: "Ranchi, Jharkhand", paths: ["culture"],
    subjects: ["tribal cinema", "film festival"],
    access: "open", url: "https://www.trijharkhand.in/en/datff", urlLabel: "Visit",
    description: "A festival celebrating tribal cultures through cinema, with screenings, premieres, and seminars on Indigenous cinema. First edition 2025."
  },
  {
    id: "WOS-045", type: "festival", title: "imagineNATIVE Film + Media Arts Festival", creator: "imagineNATIVE",
    year: "2000", region: "Global", coverage: "Toronto, Canada", paths: ["culture"],
    subjects: ["Indigenous screen content"],
    access: "open", url: "https://imaginenative.org/", urlLabel: "Visit",
    description: "A festival and organization celebrating Indigenous storytelling in film, video, audio, and digital and interactive art."
  },

  /* ---------- Protocols, frameworks, and tools ---------- */
  {
    id: "WOS-046", type: "framework", title: "Mukurtu CMS", creator: "Kimberly Christen, Craig Dietrich, and Warumungu community members",
    year: "2007", region: "Global", paths: ["method"], subjects: ["open-source archive platform", "cultural protocols"],
    access: "open", url: "https://mukurtu.org/", urlLabel: "Visit",
    description: "A free, open-source platform for communities to manage, share, narrate, and exchange their digital heritage in culturally relevant and ethically minded ways. Mukurtu is a Warumungu word for a safe keeping place."
  },
  {
    id: "WOS-047", type: "framework", title: "Local Contexts — Traditional Knowledge and Biocultural Labels", creator: "Jane Anderson and Kim Christen (founders)",
    year: "2010", region: "Global", paths: ["method"], subjects: ["TK Labels", "BC Labels", "Indigenous data sovereignty"],
    access: "open", url: "https://localcontexts.org/", urlLabel: "Visit",
    description: "Provides Traditional Knowledge and Biocultural Labels that let communities attach their own conditions of access and use to cultural heritage and data. Labels are applied by communities, not institutions."
  },
  {
    id: "WOS-048", type: "framework", title: "CARE Principles for Indigenous Data Governance", creator: "Global Indigenous Data Alliance",
    year: "2018", region: "Global", paths: ["method"], subjects: ["data governance", "FAIR and CARE"],
    access: "open", url: "https://www.gida-global.org/careprinciples", urlLabel: "Visit",
    description: "Collective Benefit, Authority to Control, Responsibility, and Ethics: principles that complement the FAIR data principles with attention to people, purpose, and Indigenous rights. Published formally in Carroll et al. (2020)."
  },
  {
    id: "WOS-049", type: "framework", title: "Protocols for Native American Archival Materials", creator: "First Archivists Circle",
    year: "2007", region: "Global", coverage: "United States", paths: ["method"], subjects: ["archival ethics", "tribal archives"],
    access: "open", url: "https://www2.nau.edu/libnap-p/protocols.html", urlLabel: "Read",
    description: "Best practices for the culturally responsive care and use of American Indian archival material held by non-tribal organizations, drafted by Native and non-Native archivists, librarians, curators, historians, and anthropologists."
  },

  /* ---------- Texts ---------- */
  {
    id: "WOS-050", type: "text", strand: "Seeing and representation", title: "Ways of Seeing", creator: "John Berger",
    year: "1972", region: "Global", format: "Book", paths: ["culture"], subjects: ["visual culture", "images and knowledge"],
    access: "purchase", url: "https://archive.org/details/waysofseeing00berg", urlLabel: "Internet Archive",
    citation: "Berger, John. 1972. *Ways of Seeing*. London: British Broadcasting Corporation; Harmondsworth: Penguin.",
    description: "Seven essays, three of them in pictures only, based on the 1972 BBC series, on how images are seen and on the relationship between what we see and what we know. The archive's namesake."
  },
  {
    id: "WOS-051", type: "text", strand: "Indigenous media and visual sovereignty", title: "Indigenous Media: Faustian Contract or Global Village?", creator: "Faye Ginsburg",
    year: "1991", region: "Global", format: "Article", paths: ["culture"], subjects: ["Indigenous media", "Aboriginal media"],
    access: "institutional", url: "https://doi.org/10.1525/can.1991.6.1.02a00040", urlLabel: "DOI",
    citation: "Ginsburg, Faye. 1991. “Indigenous Media: Faustian Contract or Global Village?” *Cultural Anthropology* 6 (1): 92–112.",
    description: "Asks whether media technologies threaten or strengthen Indigenous cultures, drawing on Aboriginal media groups in Central Australia."
  },
  {
    id: "WOS-052", type: "text", strand: "Indigenous media and visual sovereignty", title: "Embedded Aesthetics: Creating a Discursive Space for Indigenous Media", creator: "Faye Ginsburg",
    year: "1994", region: "Global", format: "Article", paths: ["culture"], subjects: ["Indigenous media", "aesthetics"],
    access: "institutional", url: "https://doi.org/10.1525/can.1994.9.3.02a00080", urlLabel: "DOI",
    citation: "Ginsburg, Faye. 1994. “Embedded Aesthetics: Creating a Discursive Space for Indigenous Media.” *Cultural Anthropology* 9 (3): 365–382.",
    description: "Argues that Indigenous media, especially Aboriginal Australian work, is valued by its embeddedness in community relations rather than by textual aesthetics alone."
  },
  {
    id: "WOS-053", type: "text", strand: "Indigenous media and visual sovereignty", title: "Sovereignty: A Line in the Sand", creator: "Jolene Rickard",
    year: "1995", region: "Global", coverage: "Native North America", format: "Essay", paths: ["culture"], subjects: ["visual sovereignty", "Native photography"],
    access: "open", url: "https://archive.aperture.org/article/1995/2/2/sovereignty-a-line-in-the-sand", urlLabel: "Aperture archive",
    citation: "Rickard, Jolene. 1995. “Sovereignty: A Line in the Sand.” In “Strong Hearts: Native American Visions and Voices,” *Aperture* 139: 50–59.",
    description: "Argues that Native photography records political and spiritual sovereignty, shifting the frame from victimization to resistance and self-determination. Foundational to the idea of visual sovereignty."
  },
  {
    id: "WOS-054", type: "text", strand: "Indigenous media and visual sovereignty", title: "Media Worlds: Anthropology on New Terrain", creator: "Faye D. Ginsburg, Lila Abu-Lughod, and Brian Larkin, eds.",
    year: "2002", region: "Global", format: "Edited volume", paths: ["culture"], subjects: ["anthropology of media"],
    access: "purchase", url: "https://doi.org/10.1525/9780520928169", urlLabel: "DOI",
    citation: "Ginsburg, Faye D., Lila Abu-Lughod, and Brian Larkin, eds. 2002. *Media Worlds: Anthropology on New Terrain*. Berkeley: University of California Press.",
    description: "An ethnography of media worldwide, including Indigenous media projects, state control of media, and the transnational travel of film and television."
  },
  {
    id: "WOS-055", type: "text", strand: "Indigenous media and visual sovereignty", title: "Reading Nanook's Smile: Visual Sovereignty, Indigenous Revisions of Ethnography, and Atanarjuat (The Fast Runner)", creator: "Michelle H. Raheja",
    year: "2007", region: "Global", format: "Article", paths: ["culture"], subjects: ["visual sovereignty", "ethnographic film", "Inuit cinema"],
    access: "institutional", url: "https://doi.org/10.1353/aq.2007.0083", urlLabel: "DOI",
    citation: "Raheja, Michelle H. 2007. “Reading Nanook's Smile: Visual Sovereignty, Indigenous Revisions of Ethnography, and *Atanarjuat (The Fast Runner)*.” *American Quarterly* 59 (4): 1159–1185.",
    description: "Develops visual sovereignty to describe how Indigenous filmmakers such as Zacharias Kunuk engage and revise ethnographic film conventions to assert self-representation."
  },
  {
    id: "WOS-056", type: "text", strand: "Community media in India", title: "Other Voices: The Struggle for Community Radio in India", creator: "Vinod Pavarala and Kanchan K. Malik",
    year: "2007", region: "India", format: "Book", paths: ["culture"], subjects: ["community radio"],
    access: "purchase", url: "https://books.google.com/books?id=Kb-GAwAAQBAJ", urlLabel: "Google Books",
    citation: "Pavarala, Vinod, and Kanchan K. Malik. 2007. *Other Voices: The Struggle for Community Radio in India*. New Delhi: SAGE.",
    description: "The first systematic study of community radio in India, built around four initiatives, including the Alternative for India Development project in Daltonganj, Jharkhand."
  },
  {
    id: "WOS-057", type: "text", strand: "Community archives", title: "Whose Memories, Whose Archives? Independent Community Archives, Autonomy and the Mainstream", creator: "Andrew Flinn, Mary Stevens, and Elizabeth Shepherd",
    year: "2009", region: "Global", coverage: "United Kingdom", format: "Article", paths: ["archives"], subjects: ["community archives", "autonomy"],
    access: "institutional", url: "https://doi.org/10.1007/s10502-009-9105-2", urlLabel: "DOI",
    citation: "Flinn, Andrew, Mary Stevens, and Elizabeth Shepherd. 2009. “Whose Memories, Whose Archives? Independent Community Archives, Autonomy and the Mainstream.” *Archival Science* 9 (1–2): 71–86.",
    description: "Examines grassroots archives documenting communities under-represented in mainstream heritage, and their autonomy from and relations with professional institutions."
  },
  {
    id: "WOS-058", type: "text", strand: "Adivasi politics and place", title: "In the Shadows of the State: Indigenous Politics, Environmentalism, and Insurgency in Jharkhand, India", creator: "Alpa Shah",
    year: "2010", region: "Jharkhand", format: "Book", paths: ["nature"], subjects: ["indigenous politics", "environmentalism", "ethnography"],
    access: "purchase", url: "https://www.dukeupress.edu/in-the-shadows-of-the-state", urlLabel: "Publisher",
    citation: "Shah, Alpa. 2010. *In the Shadows of the State: Indigenous Politics, Environmentalism, and Insurgency in Jharkhand, India*. Durham, NC: Duke University Press.",
    description: "An ethnography arguing that indigenous-rights activism and environmental conservation, though well-intentioned, can reproduce class divisions that marginalize the poorest people they claim to represent."
  },
  {
    id: "WOS-059", type: "text", strand: "Protocols, openness, and data governance", title: "Does Information Really Want to be Free? Indigenous Knowledge Systems and the Question of Openness", creator: "Kimberly Christen",
    year: "2012", region: "Global", format: "Article", paths: ["method"], subjects: ["open access", "Indigenous knowledge"],
    access: "open", url: "https://ijoc.org/index.php/ijoc/article/view/1618", urlLabel: "Read",
    citation: "Christen, Kimberly. 2012. “Does Information Really Want to be Free? Indigenous Knowledge Systems and the Question of Openness.” *International Journal of Communication* 6: 2870–2893.",
    description: "Critiques the “information wants to be free” ethos by bringing histories of collecting and the politics of circulating Indigenous knowledge into debates on open access and intellectual property."
  },
  {
    id: "WOS-060", type: "text", strand: "Protocols, openness, and data governance", title: "Tribal Archives, Traditional Knowledge, and Local Contexts: Why the “s” Matters", creator: "Kimberly Christen",
    year: "2015", region: "Global", format: "Article", paths: ["method"], subjects: ["tribal archives", "TK Labels"],
    access: "open", url: "https://doi.org/10.26077/78d5-47cf", urlLabel: "Read",
    citation: "Christen, Kimberly. 2015. “Tribal Archives, Traditional Knowledge, and Local Contexts: Why the ‘s’ Matters.” *Journal of Western Archives* 6 (1): article 3.",
    description: "Argues that copyright and Creative Commons licences do not meet Indigenous needs for digital heritage, and presents Traditional Knowledge licences and labels as complementary tools."
  },
  {
    id: "WOS-061", type: "text", strand: "Community archives", title: "“To Suddenly Discover Yourself Existing”: Uncovering the Impact of Community Archives", creator: "Michelle Caswell, Marika Cifor, and Mario H. Ramirez",
    year: "2016", region: "Global", coverage: "United States", format: "Article", paths: ["archives"], subjects: ["symbolic annihilation", "representational belonging"],
    access: "open", url: "https://escholarship.org/uc/item/0dw9s6gc", urlLabel: "Read (open access)",
    citation: "Caswell, Michelle, Marika Cifor, and Mario H. Ramirez. 2016. “‘To Suddenly Discover Yourself Existing’: Uncovering the Impact of Community Archives.” *The American Archivist* 79 (1): 56–81.",
    description: "Drawing on interviews about the South Asian American Digital Archive, argues that community archives counter the symbolic annihilation of marginalized communities and produce what the authors call representational belonging."
  },
  {
    id: "WOS-062", type: "text", strand: "Community archives", title: "“The Archive” Is Not an Archives: On Acknowledging the Intellectual Contributions of Archival Studies", creator: "Michelle Caswell",
    year: "2016", region: "Global", format: "Article", paths: ["archives"], subjects: ["archival studies", "the archival turn"],
    access: "open", url: "https://escholarship.org/uc/item/7bn4v1fk", urlLabel: "Read (open access)",
    citation: "Caswell, Michelle. 2016. “‘The Archive’ Is Not an Archives: On Acknowledging the Intellectual Contributions of Archival Studies.” *Reconstruction: Studies in Contemporary Culture* 16 (1).",
    description: "Argues that humanities scholars theorizing “the archive” should engage with archival studies as a field and with its practitioners' intellectual contributions."
  },
  {
    id: "WOS-063", type: "text", strand: "Protocols, openness, and data governance", title: "A Digital Bundle: Protecting and Promoting Indigenous Knowledge Online", creator: "Jennifer Wemigwans",
    year: "2018", region: "Global", coverage: "Canada", format: "Book", paths: ["method"], subjects: ["Indigenous knowledge online", "cultural protocol"],
    access: "purchase", url: "https://uofrpress.ca/Books/A/A-Digital-Bundle", urlLabel: "Publisher",
    citation: "Wemigwans, Jennifer. 2018. *A Digital Bundle: Protecting and Promoting Indigenous Knowledge Online*. Regina: University of Regina Press.",
    description: "Frames Indigenous knowledge online as “digital bundles” grounded in cultural protocol and responsibility, and presents digital technology as a tool for self-determination."
  },
  {
    id: "WOS-064", type: "text", strand: "Critical media literacy", title: "The Critical Media Literacy Guide: Engaging Media and Transforming Education", creator: "Douglas Kellner and Jeff Share",
    year: "2019", region: "Global", format: "Book", paths: ["method"], subjects: ["critical media literacy", "critical pedagogy"],
    access: "purchase", url: "https://doi.org/10.1163/9789004404533", urlLabel: "DOI",
    citation: "Kellner, Douglas, and Jeff Share. 2019. *The Critical Media Literacy Guide: Engaging Media and Transforming Education*. Leiden: Brill | Sense.",
    description: "A framework and classroom applications for critical media literacy from kindergarten to university, linking the politics of representation with critical pedagogy."
  },
  {
    id: "WOS-065", type: "text", strand: "Protocols, openness, and data governance", title: "The CARE Principles for Indigenous Data Governance", creator: "Stephanie Russo Carroll et al.",
    year: "2020", region: "Global", format: "Article", paths: ["method"], subjects: ["data governance", "FAIR and CARE"],
    access: "open", url: "https://doi.org/10.5334/dsj-2020-043", urlLabel: "Read (open access)",
    citation: "Carroll, Stephanie Russo, Ibrahim Garba, Oscar L. Figueroa-Rodríguez, Jarita Holbrook, Raymond Lovett, Simeon Materechera, Mark Parsons, et al. 2020. “The CARE Principles for Indigenous Data Governance.” *Data Science Journal* 19 (1): 43.",
    description: "Sets out Collective Benefit, Authority to Control, Responsibility, and Ethics as complements to the FAIR principles: “Be FAIR and CARE.”"
  },
  {
    id: "WOS-066", type: "text", strand: "Community media in India", title: "Community Radio in South Asia: Reclaiming the Airwaves", creator: "Kanchan K. Malik and Vinod Pavarala, eds.",
    year: "2020", region: "India", coverage: "South Asia", format: "Edited volume", paths: ["culture"], subjects: ["community radio", "South Asia"],
    access: "purchase", url: "https://www.routledge.com/Community-Radio-in-South-Asia-Reclaiming-the-Airwaves/Malik-Pavarala/p/book/9780367520588", urlLabel: "Publisher",
    citation: "Malik, Kanchan K., and Vinod Pavarala, eds. 2020. *Community Radio in South Asia: Reclaiming the Airwaves*. London: Routledge India.",
    description: "Community radio across South Asia: policy, NGO-isation, spectrum, disasters, gender, sustainability, and conflict."
  },
  {
    id: "WOS-067", type: "text", strand: "Community media in India", title: "A Resurgent Adivasi Media Is Setting Its Own Terms", creator: "Akash Poyam",
    year: "2021", region: "India", format: "Magazine article", paths: ["culture"], subjects: ["Adivasi journalism", "independent media"],
    access: "open", url: "https://caravanmagazine.in/media/resurgent-adivasi-media-setting-own-terms", urlLabel: "Read",
    citation: "Poyam, Akash. 2021. “A Resurgent Adivasi Media Is Setting Its Own Terms.” *The Caravan*, December 1, 2021.",
    description: "Argues that the Indian media's exclusion of Adivasi and marginalized voices is being challenged by independent platforms created and run by Adivasi journalists."
  },
  /* ---------- Additions from the curator's research archive ---------- */
  {
    id: "WOS-068", type: "film", title: "Gram Sabha ki Kahani: A Local Democracy Narrative Exercise", creator: "Akhra Ranchi, for Gram Swashasan Abhiyan; Centre for Local Democracy, Azim Premji University",
    region: "Jharkhand", coverage: "Gumla, West Singhbhum, and other districts of Jharkhand", language: "Hindi", format: "Series: 7 short films and podcasts",
    paths: ["culture", "nature"], subjects: ["Gram Sabha", "local democracy", "Community Forest Rights", "Forest Rights Act 2006", "women's participation", "youth leadership"],
    access: "open", url: "https://azimpremjiuniversity.edu.in/gram-sabha-ki-kahani", urlLabel: "Watch and listen",
    description: "Short films and podcasts from villages in Jharkhand on how Gram Sabhas work in practice: forest rights at Baranga Munda Tola, women's participation, youth leadership, drinking water and the COVID response.",
    note: "Media made about self-government, by a Jharkhand media collective, for a university's local-democracy programme: a useful case for asking where participation begins and ends."
  },
  {
    id: "WOS-069", type: "film", title: "Ek Ropa Dhaan", creator: "Meghnath Bhattacharya and Biju Toppo, for PRADAN",
    year: "2009", region: "India", language: "Hindi; English version", format: "Documentary, 26 min (Hindi and English versions)",
    paths: ["nature"], subjects: ["System of Rice Intensification", "paddy cultivation", "development communication"],
    access: "open", url: "https://www.youtube.com/watch?v=INLFfCqz6NQ", urlLabel: "Watch on YouTube (Hindi)",
    thumb: "https://img.youtube.com/vi/INLFfCqz6NQ/hqdefault.jpg",
    description: "A film on the System of Rice Intensification (SRI) for paddy cultivation, made for PRADAN with support from the Aga Khan Foundation and the European Union. The English version is also on PRADAN's channel.",
    note: "AKHRA's protest films and its development-communication films were made by the same hands. Meghnath calls the latter “constructive” films (WOS-071). Reviewed in India Together (WOS-070)."
  },
  {
    id: "WOS-070", type: "text", title: "Popularising SRI", creator: "Shoma A. Chatterji",
    year: "2011", region: "India", format: "Film review", paths: ["nature"], subjects: ["film review", "SRI"],
    access: "open", url: "https://indiatogether.org/sri-reviews/", urlLabel: "Read",
    citation: "Chatterji, Shoma A. 2011. “Popularising SRI.” *India Together*, June 29, 2011.",
    description: "A review of Ek Ropa Dhaan (WOS-069) and its account of the System of Rice Intensification."
  },
  {
    id: "WOS-071", type: "text", strand: "Community media in India", title: "Representing the Voices of the Voiceless", creator: "Meghnath, in conversation with Nicola Beißner, Katja Thekla Meyer, and Edda Wilde",
    year: "2012", region: "Jharkhand", format: "Interview in an exhibition catalogue", paths: ["culture", "method"],
    subjects: ["AKHRA", "documentary as social work", "censorship", "people's forums"],
    access: "open", url: "https://www.hgb-leipzig.de/f/e/PDF/TheSubjectiveObject_book.pdf", urlLabel: "Read (catalogue PDF, pp. 26–28)",
    citation: "Meghnath. 2012. “Representing the Voices of the Voiceless.” Interview by Nicola Beißner, Katja Thekla Meyer, and Edda Wilde. In *The Subjective Object*, edited by Anna-Sophie Springer, 26–28. Leipzig: K. Verlag.",
    description: "Meghnath describes AKHRA's filmmaking as an extension of social work, sets its protest films beside its “constructive” films, and discusses the obstacles to broadcast that sent the films to people's forums instead. Published with an exhibition at the GRASSI Museum für Völkerkunde zu Leipzig, 2012.",
    note: "One of the few places where an AKHRA founder speaks at length, in print, about method."
  },
  {
    id: "WOS-072", type: "text", title: "Infochangeindia Review: Development Flows from the Barrel of a Gun", creator: "Infochange India (reviewer not named); posted by Frederick Noronha",
    year: "2005", region: "India", format: "Film review (blog repost)", paths: ["nature"], subjects: ["film review", "displacement"],
    access: "open", url: "https://indiadocu.blogspot.com/2005/12/infochangeindia-review-development.html", urlLabel: "Read",
    citation: "“Infochangeindia Review: Development Flows from the Barrel of a Gun.” Posted by Frederick Noronha. *Documentary Films in India* (blog), December 24, 2005.",
    description: "A review of Development Flows from the Barrel of the Gun (WOS-022) that sets its record of police violence against a locally run mini-hydel project as the counter-example."
  },
  {
    id: "WOS-073", type: "film", title: "In Search of Ajantrik", creator: "Meghnath",
    year: "2023", region: "Jharkhand", language: "Hindi, Bangla, English (English subtitles)", format: "Documentary, 46 min",
    paths: ["culture"], subjects: ["Ritwik Ghatak", "Ajantrik", "cinema and Adivasi representation"],
    access: "request", url: "https://www.ourcinema.in/festival/film/in-search-of-ajantrik/", urlLabel: "Festival listing",
    description: "A filmmaker returns to the Jharkhand locations of Ritwik Ghatak's Ajantrik to ask why Ghatak chose the region and how the film pictured Adivasi life. International premiere at the Kolkata People's Film Festival.",
    note: "A film about a film: an Adivasi media practitioner reading a canonical outsider's image of Jharkhand."
  },
  {
    id: "WOS-074", type: "film", title: "Lac Ke Hazar Rang", creator: "PRADAN",
    year: "2008", region: "India", language: "Hindi; English version, Lacquered Dreams", format: "Documentary",
    paths: ["nature"], subjects: ["lac", "non-timber forest produce", "livelihoods"],
    access: "open", url: "https://www.youtube.com/watch?v=yJR5JqgCJwE", urlLabel: "Watch on YouTube",
    thumb: "https://img.youtube.com/vi/yJR5JqgCJwE/hqdefault.jpg",
    description: "A film on promoting lac cultivation and developing lac as a sector. The English version is titled Lacquered Dreams.",
    note: "Pairs with Inoculating Lac (WOS-004): the same forest economy, seen from an NGO's programme and from the field."
  },
  {
    id: "WOS-075", type: "platform", title: "PRADAN Knowledge Repository", creator: "PRADAN",
    region: "India", coverage: "Jharkhand, Odisha, Chhattisgarh, and other states of central and eastern India", language: "Hindi, English, Odia",
    paths: ["archives", "nature"], subjects: ["training films", "development communication", "NewsReach"],
    access: "open", url: "https://www.youtube.com/@pradanknowledgerepository3403", urlLabel: "YouTube channel",
    description: "PRADAN's public archive of training and documentary films on agriculture, livestock, forest produce, and women's collectives. Its journal NewsReach is archived separately at pradan.net.",
    note: "Development media rather than Indigenous media. It is here because much of the region's filmed record of Adivasi agriculture was made in this idiom."
  },
  {
    id: "WOS-076", type: "collective", title: "Lahanti Club", creator: "Lahanti Club",
    region: "India", coverage: "Chakai", paths: ["youth", "nature"], subjects: ["tribal youth group", "forest food"],
    access: "open", url: "https://www.youtube.com/@lahanticlub3491", urlLabel: "YouTube channel",
    description: "A tribal youth group in Chakai that makes short videos, among them Sacred Fruit – Soso, on a forest food.",
    note: "Surfaced through PRADAN's repository, but published on the group's own channel."
  },
  {
    id: "WOS-077", type: "text", strand: "Adivasi politics and place", title: "A Land of Their Own: Samuel Richard Tickell and the Formation of the Autonomous Ho Country in Jharkhand, 1818–1842", creator: "Paul Streumer",
    year: "2024", region: "Jharkhand", coverage: "Kolhan, Jharkhand", format: "Book", paths: ["culture"],
    subjects: ["Ho", "Kolhan Government Estate", "colonial history"],
    access: "purchase", url: "https://wakkaman.com/", urlLabel: "Publisher",
    citation: "Streumer, Paul. 2024. *A Land of Their Own: Samuel Richard Tickell and the Formation of the Autonomous Ho Country in Jharkhand, 1818–1842*. Indian edition. New Delhi: BlueRose Publishers. Also published by Wakkaman (Houten).",
    description: "A history of the Kolhan Government Estate, established in 1837, and of Samuel Richard Tickell, who organized it and wrote a grammar of the Ho language. It traces how the Ho kept a large measure of autonomy and their land."
  },

  /* ---------- The state's ethnographic record: TRI publications ---------- */
  {
    id: "WOS-078", type: "document", title: "The Chero: A Study in Acculturation", creator: "Hari Mohan",
    year: "1973", region: "Jharkhand", coverage: "Palamau", language: "English", format: "Monograph, 109 pp.",
    paths: ["archives"], subjects: ["Chero", "state ethnography"],
    access: "open", url: "https://www.trijharkhand.in/en/publications", urlLabel: "TRI publications",
    citation: "Mohan, Hari. 1973. *The Chero: A Study in Acculturation*. Ranchi: Bihar Tribal Welfare Research Institute.",
    description: "A monograph on the Chero of Palamau, based on fieldwork in 1962–63, covering livelihood, kinship, politics, and religion.",
    note: "Framed by the period's model of “acculturation,” in which movement toward caste-Hindu norms is read as change along a tribe–caste continuum. Catalogued as evidence of how the state described communities, not as a neutral account of them."
  },
  {
    id: "WOS-079", type: "document", title: "The Asur: Ethno-Biological Profile", creator: "Satya Prakash Gupta",
    year: "1976", region: "Jharkhand", language: "English", format: "Monograph (Monograph Series No. 4), 173 pp.",
    paths: ["archives"], subjects: ["Asur", "physical anthropology", "state ethnography"],
    access: "open", url: "https://www.trijharkhand.in/en/publications", urlLabel: "TRI publications",
    citation: "Gupta, Satya Prakash. 1976. *The Asur: Ethno-Biological Profile*. Monograph Series 4. Ranchi: Bihar Tribal Welfare Research Institute.",
    description: "A physical-anthropology and nutrition study of the Asur, revised from the author's doctoral thesis.",
    note: "Uses racial classification, anthropometric measurement of named individuals, and the language of the “primitive.” It contains photographs of identifiable people. It is listed here to make that history visible; the Asur speak for themselves through Asur Adivasi Mobile Radio (WOS-031)."
  },
  {
    id: "WOS-080", type: "document", title: "Sauria Paharia of Rajmahal Hills", creator: "S. P. Sinha, ed.",
    year: "1991", region: "Jharkhand", coverage: "Rajmahal Hills", language: "English, with some Hindi", format: "Edited volume, 256 pp. (Bulletin Vol. XXXI)",
    paths: ["archives"], subjects: ["Sauria Paharia", "shifting cultivation", "state ethnography"],
    access: "open", url: "https://www.trijharkhand.in/en/publications", urlLabel: "TRI publications",
    citation: "Sinha, S. P., ed. 1991. *Sauria Paharia of Rajmahal Hills*. Bulletin of the Bihar Tribal Welfare Research Institute 31 (1–2). Ranchi: Bihar Tribal Welfare Research Institute.",
    description: "An edited volume on the history, shifting cultivation, forest economy, health, and development of the Sauria Paharia, with contributions from L. P. Vidyarthi and others.",
    note: "Its full subtitle calls its subject a “struggling primitive tribe,” a category the state still administers as PVTG."
  },
  {
    id: "WOS-081", type: "document", title: "The Parhaiyas of Palamau: An Ethnographic Study", creator: "P. Dash Sharma",
    year: "1996", region: "Jharkhand", coverage: "Palamau", language: "English", format: "Monograph, 82 pp.",
    paths: ["archives"], subjects: ["Parhaiya", "state ethnography"],
    access: "open", url: "https://www.trijharkhand.in/en/publications", urlLabel: "TRI publications",
    citation: "Dash Sharma, P. [1996]. *The Parhaiyas of Palamau: An Ethnographic Study*. Ranchi: Bihar Tribal Welfare Research Institute.",
    description: "A short ethnographic monograph on the Parhaiya of Palamau, covering demography, economy, life-cycle rites, religion, and welfare programmes. No date is printed; the preface is dated 1996."
  },
  {
    id: "WOS-082", type: "document", title: "The Customary Laws of the Munda and the Oraon", creator: "Jai Prakash Gupta",
    year: "2002", region: "Jharkhand", language: "English", format: "Book, 270 pp.",
    paths: ["archives", "culture"], subjects: ["customary law", "land tenure", "Munda", "Oraon", "Wilkinson's Rules"],
    access: "open", url: "https://www.trijharkhand.in/en/publications", urlLabel: "TRI publications",
    citation: "Gupta, Jai Prakash. [2002]. *The Customary Laws of the Munda and the Oraon*. Ranchi: Jharkhand Tribal Welfare Research Institute.",
    description: "A legal study of Munda and Oraon customary law as courts and statutes recognize it, focused on land, inheritance, and family law, with colonial regulations reproduced as annexures. No date is printed; the front matter is dated 2002."
  },
  {
    id: "WOS-083", type: "document", title: "The Journal of Jharkhand Tribal Welfare Research Institute, Vol. 43", creator: "Prakash Chandra Oraon, chief ed.",
    year: "2008", region: "Jharkhand", language: "Hindi and English", format: "Journal issue, 152 pp.",
    paths: ["archives", "culture"], subjects: ["folk literature", "Nagpuri", "Jharkhand movement", "documentation"],
    access: "open", url: "https://www.trijharkhand.in/en/tribal-bulletins", urlLabel: "TRI bulletins",
    citation: "Oraon, Prakash Chandra, ed. 2008. *The Journal of Jharkhand Tribal Welfare Research Institute* 43 (June). Ranchi.",
    description: "Mostly Hindi essays on tribal history, language, and culture, the making of Jharkhand state, and development, including an essay on the Institute's own role in documenting folk art and literature."
  },
  {
    id: "WOS-084", type: "document", title: "The Journal of Jharkhand Tribal Welfare Research Institute, Vol. 44", creator: "H. S. Gupta, chief ed.",
    year: "2015", region: "Jharkhand", language: "English and Hindi", format: "Journal issue, 132 pp.",
    paths: ["archives"], subjects: ["health", "education", "welfare schemes", "migration"],
    access: "open", url: "https://www.trijharkhand.in/en/tribal-bulletins", urlLabel: "TRI bulletins",
    citation: "Gupta, H. S., ed. 2015. *The Journal of Jharkhand Tribal Welfare Research Institute* 44 (December). Ranchi.",
    description: "Applied studies of health, nutrition, education, migration, and government schemes, with essays on tribal fine arts and the Ho of Singhbhum."
  },
  {
    id: "WOS-085", type: "document", title: "The Journal of Dr. Ramdayal Munda Tribal Welfare Research Institute, Vol. 45", creator: "Bhujendra Baski, chief ed.",
    year: "2018", region: "Jharkhand", language: "English and Hindi", format: "Journal issue, 96 pp.",
    paths: ["archives", "nature"], subjects: ["livelihoods", "PVTGs", "tea-garden migration"],
    access: "open", url: "https://www.trijharkhand.in/en/tribal-bulletins", urlLabel: "TRI bulletins",
    citation: "Baski, Bhujendra, ed. 2018. *The Journal of Dr. Ramdayal Munda Tribal Welfare Research Institute* 45 (May). Ranchi.",
    description: "Short articles on the livelihoods, health, and education of Jharkhand's tribal communities, including the Asur, Sabar, and Birhor, and on tea-garden migrants from Chotanagpur. The first issue under the Institute's new name."
  },
  {
    id: "WOS-086", type: "film", title: "Guftagoo with Ranendra", creator: "Sansad TV (Guftagoo series)",
    region: "Jharkhand", language: "Hindi", format: "Television interview, c. 31 min",
    paths: ["culture", "archives"], subjects: ["Ranendra", "Hindi literature", "Tribal Welfare Research Institute"],
    access: "open", url: "https://www.youtube.com/watch?v=FNxv1Pq-Ah0", urlLabel: "Watch on YouTube",
    thumb: "https://img.youtube.com/vi/FNxv1Pq-Ah0/hqdefault.jpg",
    description: "An episode of the interview series Guftagoo with Ranendra, novelist and former director of the Tribal Welfare Research Institute in Ranchi, published on Sansad TV's channel.",
    note: "A writer who ran the state's tribal research institute: a bridge between the TRI documents below and Adivasi literary work."
  },
  /* ---------- Adivasi writing, testimony, and media criticism ---------- */
  {
    id: "WOS-087", type: "text", strand: "Adivasi politics and place", title: "Adivasis and Their Forest", creator: "Gladson Dungdung",
    year: "2019", region: "Jharkhand", language: "English", format: "Book, 330 pp.", paths: ["nature"],
    subjects: ["forest rights", "Forest Rights Act", "Adivasi land"],
    access: "open", url: "https://www.iwgia.org/en/publications/adivasis-and-their-forest", urlLabel: "IWGIA",
    citation: "Dungdung, Gladson. 2019. *Adivasis and Their Forest*. Ranchi: Adivasi Publications, with IWGIA.",
    description: "A study of Adivasi communities' relationship with forests, the Forest Rights Act, and the state, by a Kharia human-rights activist and writer from Simdega."
  },
  {
    id: "WOS-088", type: "text", strand: "Adivasi politics and place", title: "Crossfire (क्रॉसफायर)", creator: "Gladson Dungdung and Sanjay Krishna",
    year: "2014", region: "Jharkhand", coverage: "Saranda forest, West Singhbhum", language: "Hindi", format: "Book", paths: ["nature"],
    subjects: ["red corridor", "counter-insurgency", "human rights"],
    access: "purchase", url: "https://adivaani.org/2014/06/16/crossfire-gladson-dungdungs-new-book-in-hindi-is-out/", urlLabel: "Publisher's note",
    citation: "Dungdung, Gladson, and Sanjay Krishna. 2014. *Crossfire*. Kolkata: adivaani.",
    description: "Accounts of Adivasi civilians caught between anti-Maoist operations and armed groups, centred on the Saranda forest. Published by adivaani (WOS-015)."
  },
  {
    id: "WOS-089", type: "text", strand: "Adivasi politics and place", title: "Vikas ke Kabragah (विकास के कब्रगाह)", creator: "Sunil Minj and Gladson Dungdung",
    year: "2018", region: "Jharkhand", language: "Hindi", format: "Book, 155 pp.", paths: ["nature"],
    subjects: ["mining", "industrialization", "displacement"],
    access: "purchase", url: "https://books.google.com/books?id=K-z2zwEACAAJ", urlLabel: "Google Books",
    citation: "Minj, Sunil, and Gladson Dungdung. 2018. *Vikas ke Kabragah*. Deshaj Prakashan.",
    description: "A Hindi study of the effects of industrial and mining development on Adivasi communities in Jharkhand. Its title translates as “graveyards of development.”"
  },
  {
    id: "WOS-090", type: "text", title: "Bhumi Adhigrahan, Punarvas evam Punarvyavasthapan Kanoon mein Sanshodhan Kyon?", creator: "Gladson Dungdung and Sunil Minj",
    year: "2019", region: "Jharkhand", language: "Hindi", format: "Booklet, 40 pp.", paths: ["nature"],
    subjects: ["land acquisition law", "rehabilitation and resettlement"],
    access: "purchase", url: "https://books.google.com/books?id=uN76zwEACAAJ", urlLabel: "Google Books",
    citation: "Dungdung, Gladson, and Sunil Minj. 2019. *Bhumi Adhigrahan, Punarvas evam Punarvyavasthapan Kanoon mein Sanshodhan Kyon?* Ranchi: Adivasi Publications.",
    description: "A booklet asking why Jharkhand amended the land acquisition, rehabilitation, and resettlement law."
  },
  {
    id: "WOS-091", type: "platform", title: "Adivasi Hunkar", creator: "Gladson Dungdung",
    region: "Jharkhand", language: "English and Hindi", paths: ["nature", "culture"], subjects: ["Adivasi rights", "independent media", "essays"],
    access: "open", url: "https://adivasihunkar.wordpress.com/", urlLabel: "Read",
    description: "Gladson Dungdung's platform for essays and reporting on Adivasi land, forest, and human-rights issues, where many of his books are first argued and cited.",
    note: "An example of the independent Adivasi media Poyam describes (WOS-067)."
  },
  {
    id: "WOS-092", type: "text", strand: "Adivasi writing", title: "Ishwar aur Bazar (ईश्वर और बाज़ार)", creator: "Jacinta Kerketta",
    year: "2022", region: "Jharkhand", language: "Hindi", format: "Poetry collection", paths: ["culture"],
    subjects: ["poetry", "religion", "market", "Adivasi life"],
    access: "purchase", url: "https://www.rajkamalprakashan.com/products/ishwar-aur-bazar", urlLabel: "Publisher",
    citation: "Kerketta, Jacinta. 2022. *Ishwar aur Bazar*. New Delhi: Rajkamal Prakashan.",
    description: "The third poetry collection by the Oraon poet and journalist from West Singhbhum, on how religion and market-led development press on Adivasi life, land, and culture."
  },
  {
    id: "WOS-093", type: "text", strand: "Adivasi writing", title: "Gayab Hota Desh (गायब होता देश)", creator: "Ranendra",
    year: "2014", region: "Jharkhand", coverage: "Ranchi", language: "Hindi", format: "Novel", paths: ["nature", "culture"],
    subjects: ["novel", "land dispossession", "urbanization"],
    access: "purchase", url: "https://www.rajkamalprakashan.com/products/gayab-hota-desh", urlLabel: "Publisher (2025 edition)",
    citation: "Ranendra. 2014. *Gayab Hota Desh*. New Delhi: Penguin Books India. New edition, Rajkamal Prakashan, 2025.",
    description: "A novel set around Ranchi in which a journalist's disappearance opens onto the history of Adivasi land taken for urban growth and real estate. Ranendra later directed the Tribal Welfare Research Institute; see his Guftagoo interview (WOS-086)."
  },
  {
    id: "WOS-094", type: "text", strand: "Community media in India", title: "Adivasi Patrakarita (\u0906\u0926\u093f\u0935\u093e\u0938\u0940 \u092a\u0924\u094d\u0930\u0915\u093e\u0930\u093f\u0924\u093e)", creator: "Roopchand Gautam",
    year: "2021", region: "India", language: "Hindi", format: "Book, 251 pp.", paths: ["culture"],
    subjects: ["Adivasi journalism", "tribal languages", "displacement", "jal-jangal-zameen movements"],
    access: "purchase", url: "https://academicpublication.in/books/index/9789383931040", urlLabel: "Publisher",
    citation: "Gautam, Roopchand. 2021. *Adivasi Patrakarita*. Academic Publication. ISBN 9789383931040.",
    description: "A Hindi study of the challenges facing Adivasi journalism: reporting on water, forest, and land movements, the historical study of tribal homelands, language loss through displacement to cities, and the pressure of market forces on Adivasi communities and their heritage."
  },

  /* ---------- Samuday Ke Saath ---------- */
  {
    id: "WOS-095", type: "festival", title: "Samuday Ke Saath", creator: "Tata Steel Foundation, as part of Samvaad",
    year: "2015", region: "Jharkhand", coverage: "Jamshedpur and Ranchi", paths: ["culture", "youth"],
    subjects: ["film screenings", "Indigenous film festival", "short film competition", "corporate programme"],
    access: "open", url: "https://www.tatasteel.com/initiatives/samvaad/samvaad-2015.html", urlLabel: "Tata Steel (Samvaad 2015)",
    description: "A film programme begun in 2015 within Samvaad, Tata Steel Foundation's tribal conclave, screening films on tribal life at colleges, community centres, and schools, with festivals in Jamshedpur and, in 2023, at IIM Ranchi, where the programme included Naachi Se Baanchi (WOS-024).",
    note: "A corporate foundation's programme, not a community archive: catalogued so that the institutions now circulating Adivasi cinema are visible alongside the collectives that make it. Coverage in WOS-096 and WOS-097."
  },
  {
    id: "WOS-096", type: "text", title: "Indigenous Film Festival to Explore Heart and Soul of Jharkhand", creator: "The Indian Tribal",
    year: "2023", region: "Jharkhand", format: "News report", paths: ["culture"], subjects: ["Samuday Ke Saath", "IIM Ranchi"],
    access: "open", url: "https://theindiantribal.com/2023/08/21/news-ranchi-india-indigenous-film-festival-to-explore-heart-and-soul-of-jharkhand/", urlLabel: "Read",
    citation: "“Indigenous Film Festival to Explore Heart and Soul of Jharkhand.” *The Indian Tribal*, August 21, 2023.",
    description: "A preview of the Samuday Ke Saath festival at IIM Ranchi, organized with Samvaad and Tata Steel Foundation, with sessions on cinema and Adivasiyat and the participation of Biju Toppo and Meghnath."
  },
  {
    id: "WOS-097", type: "text", title: "Samuday Ke Saath: Curtain Falls on Three-Day Short Film Festival in Jamshedpur", creator: "Pinaki Majumdar",
    year: "2022", region: "Jharkhand", coverage: "Jamshedpur", format: "News report", paths: ["culture"], subjects: ["Samuday Ke Saath", "short film festival"],
    access: "open", url: "https://lagatar24.com/samuday-ke-saath-curtain-falls-on-three-day-short-film-festival-in-jamshedpur/", urlLabel: "Read",
    citation: "Majumdar, Pinaki. 2022. “Samuday Ke Saath: Curtain Falls on Three-Day Short Film Festival in Jamshedpur.” *Lagatar24*, August 10, 2022.",
    description: "A report on the close of the 2022 Samuday Ke Saath festival in Jamshedpur."
  },
  /* ---------- Sources of the First Principles ---------- */
  {
    id: "WOS-098", type: "text", strand: "Community archives", title: "Seeing Yourself in History: Community Archives and the Fight Against Symbolic Annihilation", creator: "Michelle Caswell",
    year: "2014", region: "Global", coverage: "United States", format: "Article", paths: ["archives", "method"], subjects: ["community archives", "symbolic annihilation"],
    access: "open", url: "https://escholarship.org/uc/item/9gc14537", urlLabel: "Read (open access)",
    citation: "Caswell, Michelle. 2014. “Seeing Yourself in History: Community Archives and the Fight Against Symbolic Annihilation.” *The Public Historian* 36 (4): 26–37.",
    description: "Drawing on the South Asian American Digital Archive, argues that independent community archives counter the absence and misrepresentation of marginalized groups in mainstream records."
  },
  {
    id: "WOS-099", type: "text", strand: "Refusal, listening, and sound", title: "Acoustemology", creator: "Steven Feld",
    year: "2015", region: "Global", format: "Book chapter", paths: ["method"], subjects: ["acoustemology", "sound studies", "listening"],
    access: "institutional", url: "https://doi.org/10.1215/9780822375494-002", urlLabel: "DOI",
    citation: "Feld, Steven. 2015. “Acoustemology.” In *Keywords in Sound*, edited by David Novak and Matt Sakakeeny, 12–21. Durham, NC: Duke University Press.",
    description: "Traces the term Feld coined by joining acoustics and epistemology, treating sounding and listening as a situated way of knowing. First developed in his 1996 essay on the Kaluli of Bosavi, “Waterfalls of Song.”"
  },
  {
    id: "WOS-100", type: "framework", title: "The First Nations Principles of OCAP®", creator: "First Nations Information Governance Centre",
    region: "Global", coverage: "Canada", paths: ["method"], subjects: ["ownership", "control", "access", "possession", "data sovereignty"],
    access: "open", url: "https://fnigc.ca/ocap-training/", urlLabel: "FNIGC",
    description: "Ownership, Control, Access, and Possession: standards for how First Nations data and information should be collected, protected, used, and shared."
  },
  {
    id: "WOS-101", type: "text", strand: "Community archives", title: "Community-Driven Archives: Conocimiento, Healing, and Justice", creator: "Nancy Liliana Godoy",
    year: "2021", region: "Global", coverage: "United States", format: "Article", paths: ["archives", "method"], subjects: ["community-driven archives", "conocimiento", "Anzaldúa"],
    access: "open", url: "https://doi.org/10.24242/jclis.v3i2.136", urlLabel: "Read (open access)",
    citation: "Godoy, Nancy Liliana. 2021. “Community-Driven Archives: Conocimiento, Healing, and Justice.” *Journal of Critical Library and Information Studies* 3 (2).",
    description: "Uses Gloria Anzaldúa's path of conocimiento to frame a community-driven archives initiative, arguing that decolonizing archives means moving power and resources to communities rather than adding them to existing institutions."
  },
  {
    id: "WOS-102", type: "text", strand: "Refusal, listening, and sound", title: "Hungry Listening: Resonant Theory for Indigenous Sound Studies", creator: "Dylan Robinson",
    year: "2020", region: "Global", coverage: "Canada", format: "Book", paths: ["method", "culture"], subjects: ["listening", "Indigenous sound studies", "settler colonialism"],
    access: "purchase", url: "https://www.upress.umn.edu/9781517907693/hungry-listening/", urlLabel: "Publisher",
    citation: "Robinson, Dylan. 2020. *Hungry Listening: Resonant Theory for Indigenous Sound Studies*. Minneapolis: University of Minnesota Press.",
    description: "Critiques settler “hungry listening,” which treats Indigenous song as a resource to consume, and proposes listening practices aware of the listener's position."
  },
  {
    id: "WOS-103", type: "text", strand: "Refusal, listening, and sound", title: "On Ethnographic Refusal: Indigeneity, ‘Voice’ and Colonial Citizenship", creator: "Audra Simpson",
    year: "2007", region: "Global", format: "Article", paths: ["method"], subjects: ["refusal", "ethnography", "Indigenous sovereignty"],
    access: "open", url: "https://junctures.org/index.php/junctures/article/view/66", urlLabel: "Read (open access)",
    citation: "Simpson, Audra. 2007. “On Ethnographic Refusal: Indigeneity, ‘Voice’ and Colonial Citizenship.” *Junctures* 9: 67–80.",
    description: "Argues that Indigenous communities, and ethnographers working with them, may refuse to make some knowledge available, and treats refusal as a political and analytical stance."
  },
  {
    id: "WOS-104", type: "text", strand: "Refusal, listening, and sound", title: "Mohawk Interruptus: Political Life Across the Borders of Settler States", creator: "Audra Simpson",
    year: "2014", region: "Global", coverage: "Kahnawà:ke", format: "Book", paths: ["method"], subjects: ["refusal", "nested sovereignty", "Mohawk"],
    access: "purchase", url: "https://doi.org/10.1215/9780822376781", urlLabel: "DOI",
    citation: "Simpson, Audra. 2014. *Mohawk Interruptus: Political Life Across the Borders of Settler States*. Durham, NC: Duke University Press.",
    description: "An ethnography of Kahnawà:ke Mohawk political life that develops refusal and nested sovereignty as alternatives to seeking recognition from settler states."
  },
  /* ---------- AKHRA films at UCLA Library ---------- */
  {
    id: "WOS-105", type: "library", title: "AKHRA films at UCLA Library", creator: "UCLA Library",
    region: "Global", coverage: "Los Angeles", paths: ["archives"], subjects: ["AKHRA", "film collection", "library holdings"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/search?query=any,contains,Akhra%20Ranchi&vid=01UCS_LAL:UCLA", urlLabel: "Search UCLA Library",
    description: "UCLA Library catalogues ten films by the AKHRA collective, from Development Flows from the Barrel of the Gun (2003) and Kora Rajee (2005) to Rat Trap and Sohrai (2022), available to the university's students and researchers.",
    note: "A collective's work described under a university library's standards. What that means for custody is one of the questions the First Principles take up."
  },
  {
    id: "WOS-106", type: "film", title: "Rat Trap", creator: "Rupesh Kr Sahu (script, editing, direction); produced by Meghnath and Biju Toppo, AKHRA",
    year: "2022", region: "Jharkhand", language: "Santali, English", format: "Documentary, 35 min",
    paths: ["nature"], subjects: ["rat-hole coal mining", "coal miners", "livelihoods"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/fulldisplay?docid=alma9997220068906533&vid=01UCS_LAL:UCLA", urlLabel: "UCLA Library record",
    description: "The daily lives of rat-hole coal miners in Jharkhand, who risk their lives for a livelihood, whose accidents often go unreported, and who, when a mine collapses, cannot openly claim the bodies of those they lose."
  },
  {
    id: "WOS-107", type: "film", title: "Kora Rajee", creator: "Biju Toppo (director); Meghnath (producer), AKHRA",
    year: "2005", region: "India", coverage: "Jharkhand, North Bengal, and Assam", language: "Hindi, English, Kurukh", format: "Documentary, c. 52 min",
    paths: ["culture", "nature"], subjects: ["migration", "tea-garden labour", "Jharkhandi diaspora"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/fulldisplay?docid=alma9997174355306533&vid=01UCS_LAL:UCLA", urlLabel: "UCLA Library record",
    description: "A documentary on the struggles of migrants from Jharkhand working in the tea gardens of North Bengal and Assam."
  },
  {
    id: "WOS-108", type: "film", title: "Loha Garam Hai (Iron Is Hot)", creator: "Biju Toppo and Meghnath, AKHRA",
    year: "2007", region: "Jharkhand", language: "Hindi", format: "Documentary, c. 45 min",
    paths: ["nature"], subjects: ["sponge iron industry", "pollution", "health"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/fulldisplay?docid=alma9997174355806533&vid=01UCS_LAL:UCLA", urlLabel: "UCLA Library record",
    description: "The lives of people surviving alongside the sponge iron industry in Jharkhand, and its effects on air, health, and land."
  },
  {
    id: "WOS-109", type: "film", title: "Gadi Lohardaga Mail", creator: "Biju Toppo and Meghnath, AKHRA",
    year: "2005", region: "Jharkhand", coverage: "Lohardaga district", language: "Nagpuri (Sadani), Hindi", format: "Music film, c. 29 min",
    paths: ["culture"], subjects: ["Nagpuri songs", "Sadani folk songs", "railways", "memory"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/fulldisplay?docid=alma9997174355706533&vid=01UCS_LAL:UCLA", urlLabel: "UCLA Library record",
    description: "Nostalgic Nagpuri folk songs performed on the narrow-gauge Lohardaga passenger train, sketching the social life of the district it ran through. Catalogued at UCLA under the title Gari Lohardaga Mela."
  },
  {
    id: "WOS-110", type: "film", title: "Sohrai", creator: "Biju Toppo and Meghnath, AKHRA; produced for the Dr. Ramdayal Munda Tribal Welfare Research Institute",
    year: "2022", region: "Jharkhand", language: "Hindi", format: "Documentary, 20 min",
    paths: ["culture", "nature"], subjects: ["Sohrai", "Santhal", "harvest festival", "cattle"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/fulldisplay?docid=alma9997220058806533&vid=01UCS_LAL:UCLA", urlLabel: "UCLA Library record",
    description: "The Santhal festival of Sohrai, celebrated in Kartik, and the place of cattle in the shift from foraging to agriculture.",
    note: "Made by an Adivasi collective for the state's tribal research institute: the two archives this page sets against each other, in one production."
  },
  {
    id: "WOS-111", type: "film", title: "Karama", creator: "Biju Toppo (director), AKHRA",
    region: "Jharkhand", language: "Hindi", format: "Documentary, 16 min",
    paths: ["culture", "nature"], subjects: ["Karam festival", "harvest festivals", "Munda"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/fulldisplay?docid=alma9997220077906533&vid=01UCS_LAL:UCLA", urlLabel: "UCLA Library record",
    description: "Karam, one of Jharkhand's major festivals, in which nature is worshipped for a good harvest and for the wellbeing of people and animals."
  },
  {
    id: "WOS-112", type: "film", title: "Srishtikatha: Stories of Creation", creator: "AKHRA; stories told by Ramdayal Munda; animation and direction by Tuhin Paul; produced by Meghnath",
    region: "Jharkhand", language: "Hindi", format: "Animated film, 8 min",
    paths: ["culture", "youth"], subjects: ["Munda creation stories", "Singbonga", "animation", "folklore"],
    access: "institutional", url: "https://search.library.ucla.edu/discovery/fulldisplay?docid=alma9997220082106533&vid=01UCS_LAL:UCLA", urlLabel: "UCLA Library record",
    description: "Animated Munda creation stories, the creation of the earth and of day and night by Singbonga, as told by Ramdayal Munda, made so that children can hear the stories their elders once told."
  },
  {
    id: "WOS-113", type: "text", strand: "Indigenous media and visual sovereignty", title: "To Walk Is to Dance, to Speak Is to Sing: Akhra Ranchi’s Filmic Representations of Adivasi Dance in Jharkhand", creator: "Biju Toppo and Aparna Sharma",
    year: "2025", region: "Jharkhand", format: "Book chapter", paths: ["culture"], subjects: ["AKHRA", "Adivasi dance", "documentary"],
    access: "institutional", url: "https://doi.org/10.1093/oxfordhb/9780197526224.013.28", urlLabel: "DOI",
    citation: "Toppo, Biju, and Aparna Sharma. 2025. “To Walk Is to Dance, to Speak Is to Sing: Akhra Ranchi’s Filmic Representations of Adivasi Dance in Jharkhand.” In *The Oxford Handbook of Indian Dance*, edited by Anurima Banerji and Prarthana Purkayastha. New York: Oxford University Press.",
    description: "A chapter co-written by an AKHRA founder on how the collective's films represent Adivasi dance, where walking, speaking, dancing, and singing are continuous."
  },
  {
    id: "WOS-114", curator: true, type: "film", title: "Eka Nari Sangathan", creator: "Arpit Gaind (editor, producer), with Bhavya Chitranshi, Ashutosh Kumar, and Eka Nari Sangathan",
    year: "2019", region: "Odisha", coverage: "Emaliguda village, Rayagada district, Odisha", language: "Kui", format: "Documentary, 6 min 30 sec",
    paths: ["culture"], subjects: ["single women's association", "women's collectives", "labour", "solidarity"],
    access: "open", url: "https://player.mediadelivery.net/play/766686/13eb8fc7-2a8b-4351-9136-fd841becc3f2", urlLabel: "Watch", bunny: "766686/13eb8fc7-2a8b-4351-9136-fd841becc3f2",
    thumb: "assets/img/film/eka-nari-sangathan-still.jpg",
    description: "On Eka Nari Sangathan, a single women's association begun by Bhavya Chitranshi and the women of the sangathan. More than an economic self-help group, it is a space where women named \u201csingle\u201d for one reason or another share work, labour, and belonging, and shape identities and futures of their own: their aspirations, anxieties, community, and solidarity with one another.",
    note: "Made in collaboration with Bhavya Chitranshi, Ashutosh Kumar, and Eka Nari Sangathan, with footage by all of us. Special thanks to Anup Dhar. The sangathan is also one of the three practices in Envisioning Development Practice (WOS-002)."
  },
  /* ---------- Shriprakash and Kritika, Ranchi ---------- */
  {
    id: "WOS-115", type: "collective", title: "Kritika", creator: "Shriprakash (chief coordinator)",
    year: "1990", region: "Jharkhand", coverage: "Ranchi, Jharkhand", paths: ["culture", "nature"],
    subjects: ["documentary", "uranium mining", "Adivasi rights", "culture and communication"],
    access: "open", url: "https://www.youtube.com/@kritika_productions", urlLabel: "YouTube channel",
    description: "A culture and communication group working in Jharkhand since 1990, coordinated by the documentary filmmaker Shriprakash, whose films on uranium mining at Jadugoda, dams, and Adivasi history are gathered on the group's channel, Kritika productions.",
    note: "Shriprakash was a founding member of the Jharkhandi Organization Against Radiation (JOAR), Jadugoda. He credits himself with a single name as a protest against caste."
  },
  {
    id: "WOS-116", type: "film", title: "Addo Miyad Ulgulan (Another Revolt / Ek aur Ulgulan)", creator: "Shriprakash, Kritika",
    year: "1995", region: "Jharkhand", language: "Hindi, with English subtitles", format: "Documentary, 40 min",
    paths: ["nature"], subjects: ["Koel Karo hydroelectric project", "dams", "Adivasi resistance"],
    access: "open", url: "https://www.youtube.com/watch?v=x9eE1dBitmM", thumb: "https://img.youtube.com/vi/x9eE1dBitmM/hqdefault.jpg", urlLabel: "Watch on YouTube",
    description: "On Adivasi opposition to the Koel Karo hydroelectric project in Jharkhand. The uploaded version adds four minutes of footage of the 2001 killings."
  },
  {
    id: "WOS-117", type: "film", title: "Buddha Weeps in Jadugoda (Ragi: Kana: Ko Bonga Buru)", creator: "Shriprakash, Kritika",
    year: "1999", region: "Jharkhand", coverage: "Jadugoda, East Singhbhum", language: "Hindi and English", format: "Documentary, c. 55 min",
    paths: ["nature"], subjects: ["uranium mining", "radiation", "health", "UCIL"],
    access: "open", url: "https://www.youtube.com/watch?v=FxO_LlHaYvs", thumb: "https://img.youtube.com/vi/FxO_LlHaYvs/hqdefault.jpg", urlLabel: "Watch on YouTube",
    description: "On the harm to Adivasi health and land from uranium mining and tailings by the Uranium Corporation of India at Jadugoda. It won the Grand Prize at the Earth Vision Tokyo Global Environmental Film Festival.",
    note: "Sources give different runtimes (52 to 76 min); the full upload runs about 55 minutes."
  },
  {
    id: "WOS-118", type: "film", title: "Buru Sengal (The Fire Within)", creator: "Shriprakash, Kritika",
    year: "2002", region: "Jharkhand", language: "Hindi and Santhali", format: "Documentary, 57 min",
    paths: ["nature", "culture"], subjects: ["Adivasi resistance", "land"],
    access: "request", url: "https://www.youtube.com/watch?v=ms-kzxoYUyM", thumb: "https://img.youtube.com/vi/ms-kzxoYUyM/hqdefault.jpg", urlLabel: "Watch an excerpt",
    description: "A documentary by Shriprakash; only a five-minute excerpt is public, on the Kritika channel."
  },
  {
    id: "WOS-119", type: "film", title: "Buru Gaara (Pahari Nadi)", creator: "Shriprakash; produced by PSBT with Doordarshan",
    year: "2008", region: "Jharkhand", language: "Hindi", format: "Documentary, 30 min",
    paths: ["culture"], subjects: ["Dayamani Barla", "Nirmala Putul", "Adivasi women writers", "journalism"],
    access: "open", url: "https://www.youtube.com/watch?v=LNS4QNrTSho", thumb: "https://img.youtube.com/vi/LNS4QNrTSho/hqdefault.jpg", urlLabel: "Watch on YouTube",
    description: "Two Adivasi women in Jharkhand, the journalist Dayamani Barla and the poet Nirmala Putul, assert identity through writing. Best Film on Social Issues, non-feature section, 56th National Film Awards.",
    note: "Cinematography by Sanjay Kumar; music by Lalu Shankar and Bisun Munda. Details from PSBT's film page, psbt.org/films/buru-gaara."
  },
  {
    id: "WOS-120", type: "film", title: "Jadugoda: The Black Magic", creator: "Shriprakash, Kritika",
    region: "Jharkhand", coverage: "Jadugoda, East Singhbhum", language: "English", format: "Short documentary, 9 min",
    paths: ["nature"], subjects: ["uranium mining", "radiation"],
    access: "open", url: "https://www.youtube.com/watch?v=eIOmavVcG3M", thumb: "https://img.youtube.com/vi/eIOmavVcG3M/hqdefault.jpg", urlLabel: "Watch on YouTube",
    description: "A short film on uranium mining and radiation at Jadugoda.",
    note: "Sources date it 2007 or 2009."
  },
  {
    id: "WOS-121", type: "film", title: "Eer... Stories in Stone", creator: "Shriprakash; produced by PSBT",
    year: "2011", region: "Jharkhand", format: "Documentary, c. 51 min",
    paths: ["culture", "archives"], subjects: ["stone monuments", "Adivasi history", "memory"],
    access: "open", url: "https://www.youtube.com/watch?v=m21RJwDt2Ec", thumb: "https://img.youtube.com/vi/m21RJwDt2Ec/hqdefault.jpg", urlLabel: "Watch on YouTube",
    description: "Tribal history, erased from mainstream accounts, read in the stone monuments that record it.",
    note: "A counter-archive in stone: a close companion to this archive's questions about who keeps the record."
  },
  {
    id: "WOS-122", type: "film", title: "Hul Sengal Aguwa (Unsung Heroes of Hul)", creator: "Shriprakash; produced by PSBT",
    year: "2012", region: "Jharkhand", format: "Documentary, c. 60 min",
    paths: ["culture", "archives"], subjects: ["Santhal Hul", "memory", "films about movements"],
    access: "open", url: "https://www.youtube.com/watch?v=cSYtlYiqIMM", thumb: "https://img.youtube.com/vi/cSYtlYiqIMM/hqdefault.jpg", urlLabel: "Watch on YouTube",
    description: "Retraces the memory of two Indigenous people's movements, and of the films made about them."
  },
  {
    id: "WOS-123", type: "film", title: "Nabikei (Footprint)", creator: "Shriprakash",
    year: "2017", region: "Global", coverage: "Diné (Navajo), Laguna, and Acoma lands, US Southwest; Jadugoda", language: "English", format: "Documentary, 60 min",
    paths: ["nature"], subjects: ["uranium mining", "Diné", "Indigenous peoples", "Jadugoda"],
    access: "request", url: "https://uraniumfilmfestival.org/en/american-southwest-2018", urlLabel: "Festival listing",
    description: "The legacy of uranium mining for the Diné, Laguna, and Acoma nations, with some five thousand abandoned mines, set in parallel with Jadugoda. Screened at the International Uranium Film Festival, American Southwest, 2018. No public stream."
  },
  {
    id: "WOS-124", type: "film", title: "Congo, The Blood in Our Pocket!", creator: "Shriprakash, Kritika",
    region: "Global", coverage: "Democratic Republic of the Congo", format: "Short documentary, 15 min",
    paths: ["nature"], subjects: ["coltan", "mineral extraction", "global supply chains"],
    access: "open", url: "https://www.youtube.com/watch?v=x8r0l3p9uuw", thumb: "https://img.youtube.com/vi/x8r0l3p9uuw/hqdefault.jpg", urlLabel: "Watch on YouTube",
    description: "On coltan and other mineral extraction in the Congo, and who bears its cost."
  },
  {
    id: "WOS-125", type: "film", title: "Keemat Chukati Zindagi", creator: "Shriprakash",
    region: "Jharkhand", format: "Documentary, 86 min",
    paths: ["culture"], subjects: ["Mahendra Singh", "people's movements", "political violence"],
    access: "request", url: "http://chennaifilmfestival.blogspot.com/2022/01/", urlLabel: "Festival listing",
    description: "On the poet and people's leader Mahendra Singh, killed in 2005, made over thirteen years. Screened in competition at the 10th Chennai International Documentary and Short Film Festival, 2022. No public stream."
  }
];
