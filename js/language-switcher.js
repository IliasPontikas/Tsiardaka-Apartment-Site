// ============================================================================
// COMPLETE LANGUAGE SWITCHER FOR TSIARDAKA APARTMENT - REDESIGN
// ============================================================================

const translations = {
    el: {
        "nav.home": "Αρχική",
        "nav.about": "Σχετικά",
        "nav.gallery": "Φωτογραφίες",
        "nav.offers": "Προσφορές",
        "nav.booking": "Κράτηση",
        "nav.attractions": "Αξιοθέατα",
        "nav.contact": "Επικοινωνία",
        "hero.title": "Το κέντρο στα πόδια σου!",
        "hero.subtitle": "Κάντε κράτηση απευθείας από εμάς για καλύτερες τιμές και εξατομικευμένη εξυπηρέτηση.",
        "hero.button": "Κάντε Κράτηση",
        "about.label": "Το Σπίτι Μας",
        "about.title": "Σχετικά με το Σπίτι",
        "about.text1": "Καλωσορίσατε στο άνετο και προσεγμένο διαμέρισμά μας στο κέντρο των Τρικάλων Θεσσαλίας, δίπλα στον μαγευτικό Μύλο των Ξωτικών – έναν από τους πιο δημοφιλείς χριστουγεννιάτικους προορισμούς στην Ελλάδα!",
        "about.text2": "Ανακαλύψτε την ομορφιά των Τρικάλων, εξερευνήστε τα Μετέωρα και τα χωριά της Πίνδου καθώς και άλλα κοντινά αξιοθέατα και απολαύστε την παραμονή σας σε έναν χώρο που θα σας κάνει να νιώσετε σαν στο σπίτι σας.",
        "about.text3": "Γλώσσες επικοινωνίας: Ελληνικά, Αγγλικά",
        "about.stat1": "Βήματα από τον Μύλο",
        "about.stat2": "Booking.com · 15 κριτικές",
        "about.stat3": "Εμβαδόν",
        "about.stat4": "Μέγιστοι επισκέπτες",
        "about.room.living": "Σαλόνι",
        "about.room.kitchen": "Κουζίνα",
        "about.room.bedroom1": "Κύριο Υπνοδωμάτιο",
        "about.room.bedroom2": "Δεύτερο Υπνοδωμάτιο",
        "about.room.dining": "Τραπεζαρία",
        "about.room.bathroom": "Μπάνιο",
        "about.room.balcony": "Μπαλκόνι",
        "gallery.label": "Εξερευνήστε",
        "gallery.title": "Φωτογραφίες",
        "experience.label": "Εμπειρία",
        "experience.title": "Ζήστε τη Μαγεία των Τρικάλων",
        "experience.text": "Βίντεο παρουσίαση σύντομα διαθέσιμη",
        "amenities.label": "Παροχές",
        "amenities.title": "Τι Προσφέρουμε",
        "amenities.wifi.title": "WiFi 100Mbps",
        "amenities.wifi.desc": "Υψηλής ταχύτητας internet σε όλο το σπίτι",
        "amenities.parking.title": "Ιδιωτικό Πάρκινγκ",
        "amenities.parking.desc": "Κλειστός χώρος στάθμευσης",
        "amenities.kitchen.title": "Πλήρης Κουζίνα",
        "amenities.kitchen.desc": "Πλήρως εξοπλισμένη κουζίνα",
        "amenities.tv.title": "Smart TV",
        "amenities.tv.desc": "55\" TV με OTE TV, Nova & Netflix",
        "amenities.heating.title": "Θέρμανση και AC",
        "amenities.heating.desc": "Αυτόνομη θέρμανση φυσικού αερίου και κλιματισμός",
        "amenities.washer.title": "Πλυντήριο",
        "amenities.washer.desc": "Πλυντήριο ρούχων",
        "amenities.linens.title": "Premium Σεντόνια",
        "amenities.linens.desc": "Ποιοτικά σεντόνια και πετσέτες",
        "amenities.iron.title": "Σίδερο",
        "amenities.iron.desc": "Σίδερο και σιδερώστρα",
        "amenities.coffee.title": "Καφετιέρα",
        "amenities.coffee.desc": "Μηχανή espresso και φίλτρου",
        "attractions.label": "Εξερευνήστε",
        "attractions.title": "Κοντινά Αξιοθέατα",
        "attractions.scrollHint": "Σύρετε για περισσότερα",
        "attractions.mylos.title": "Μύλος των Ξωτικών",
        "attractions.mylos.desc": "Μόλις 9 λεπτά με τα πόδια βρίσκεται ένα μαγευτικό χριστουγεννιάτικο χωριό που μαγεύει μικρούς και μεγάλους.",
        "attractions.mylos.distance": "9 λεπτά",
        "attractions.square.title": "Κεντρική Πλατεία και Ποτάμι",
        "attractions.square.desc": "Το κέντρο στα πόδια σου. Το ποτάμι διασχίζει την χριστουγεννιάτικη πόλη δίπλα στο σπίτι.",
        "attractions.square.distance": "9 λεπτά",
        "attractions.oldtown.title": "Παλιά Πόλη και Φρούρειο",
        "attractions.oldtown.desc": "Παραδοσιακά αρχοντικά και γραφικά σοκάκια. Ιδανική για βόλτες και φωτογραφίες.",
        "attractions.oldtown.distance": "17 λεπτά",
        "attractions.manavika.title": "Μαναβικά",
        "attractions.manavika.desc": "Ταβέρνες κοντά στην παλιά πόλη με απίστευτες γεύσεις.",
        "attractions.manavika.distance": "13 λεπτά",
        "attractions.pertouli.title": "Πετρούλι",
        "attractions.pertouli.desc": "Ορεινό θέρετρο με πυκνά δάση και χιονοδρομικό κέντρο.",
        "attractions.pertouli.distance": "50 λεπτά",
        "attractions.meteora.title": "Μετέωρα",
        "attractions.meteora.desc": "Μοναδική μοναστική πολιτεία στην κορυφή βράχων. Μνημείο UNESCO.",
        "attractions.meteora.distance": "29 λεπτά",
        "attractions.plastira.title": "Λίμνη Πλαστήρα",
        "attractions.plastira.desc": "Πανέμορφη τεχνητή λίμνη με κρυστάλλινα νερά.",
        "attractions.plastira.distance": "1 ώρα",
        "attractions.openMap": "Άνοιγμα στο χάρτη",
        "location.label": "Βρείτε μας",
        "location.title": "Τοποθεσία",
        "location.address": "Διεύθυνση",
        "location.nearby": "Κοντινά Σημεία Ενδιαφέροντος",
        "weather.title": "Καιρός στα Τρίκαλα",
        "weather.loading": "Φόρτωση...",
        "weather.feelsLike": "Αίσθηση",
        "weather.humidity": "Υγρασία",
        "weather.wind": "Άνεμος",
        "reviews.label": "Κριτικές",
        "reviews.title": "Τι Λένε οι Επισκέπτες μας",
        "pricing.label": "Τιμές",
        "offers.title": "Ειδικές Προσφορές",
        "offers.offer1.title": "Σαββατοκύριακα Νοεμβρίου έως 20/11",
        "offers.offer1.old_price": "€120/νύχτα",
        "offers.offer1.new_price": "€100/νύχτα",
        "offers.offer1.subtitle": "Για διαμονές 2+ νυχτών",
        "offers.offer1.feature1": "✅ Δωρεάν welcome basket",
        "offers.offer1.feature2": "✅ Ιδανικό για φθινοπωρινή απόδραση",
        "offers.offer1.feature3": "✅ Έκπτωση 27%",
        "offers.offer1.badge": "Πιο Δημοφιλής",
        "offers.offer2.title": "Καθημερινές Νοεμβρίου έως 20/11",
        "offers.offer2.old_price": "€110/νύχτα",
        "offers.offer2.new_price": "€90/νύχτα",
        "offers.offer2.subtitle": "Δευτέρα-Παρασκευή",
        "offers.offer2.feature1": "✅ Ησυχία εκτός σαββατοκύριακου",
        "offers.offer2.feature2": "✅ Ιδανικό για ημέρες εργασίας",
        "offers.offer2.feature3": "✅ Έκπτωση 50%",
        "offers.offer3.title": "Για διαμονές 7+ ημερών",
        "offers.offer3.old_price": "€100/νύχτα",
        "offers.offer3.new_price": "€80/νύχτα",
        "offers.offer3.subtitle": "Έως 20/11",
        "offers.offer3.feature1": "✅ Πλήρης εξοπλισμός",
        "offers.offer3.feature2": "✅ Συμπεριλαμβάνεται η οποιαδήποτε υποστήριξη χρειαστείτε",
        "offers.offer3.feature3": "✅ Έκπτωση 55%",
        "offers.button": "Δείτε Διαθεσιμότητα",
        "calendar.available": "Διαθέσιμο",
        "calendar.booked": "Κλεισμένο",
        "calendar.selected": "Επιλεγμένο",
        "calendar.checkTitle": "Ελέγξτε Διαθεσιμότητα",
        "calendar.checkin": "Άφιξη",
        "calendar.checkout": "Αναχώρηση",
        "calendar.checkBtn": "Έλεγχος Διαθεσιμότητας",
        "booking.label": "Επικοινωνία",
        "booking.title": "Κάντε Κράτηση",
        "booking.contact_title": "Επικοινωνήστε Μαζί Μας",
        "booking.contact_subtitle": "Επιλέξτε τον τρόπο επικοινωνίας",
        "booking.call": "Καλέστε μας",
        "booking.viber": "Viber",
        "booking.whatsapp": "WhatsApp",
        "booking.email": "Email",
        "booking.availability": "Διαθέσιμοι καθημερινά 09:00 - 22:00",
        "booking.find_us": "Θα μας βρείτε επίσης:",
        "booking.contact_info": "Μην διστάσετε να επικοινωνήσετε για κρατήσεις ή πληροφορίες",
        "floatingBtn.text": "Κράτηση",
        "footer.title": "800 βήματα από το Μύλο των Ξωτικών",
        "footer.description": "Το τέλειο σπίτι διακοπών στην καρδιά των Τρικάλων.",
        "footer.links_title": "Γρήγοροι Σύνδεσμοι",
        "footer.contact_title": "Επικοινωνία",
        "footer.copyright": "© 2026 Tsiardaka Apartment. Με επιφύλαξη παντός δικαιώματος.",
        "contact.address": "Αθηνάς Εργάνης 8, Τρίκαλα, Θεσσαλία",
        "footer.credit": "Designed and developed by Ilias Pontikas",
        "attractions.palaiokarya.title": "Καταρράκτες Παλαιοκαρυάς",
        "attractions.palaiokarya.distance": "35 λεπτά",
        "attractions.palaiokarya.desc": "Το πέτρινο τοξωτό γεφύρι της Παλαιοκαρυάς, με δύο μικρούς καταρράκτες δίπλα του. Για πολλούς, το ομορφότερο της περιοχής.",
        "band.text": "Δίπλα στο σπίτι μας",
        "about.facts": "2 υπνοδωμάτια · 2ος όροφος · μεγάλο ασανσέρ",
        "gallery.viewAll": "Όλες οι φωτογραφίες",
        "gallery.bedrooms": "Υπνοδωμάτια",
        "calendar.note": "Το ημερολόγιο ενημερώνεται αυτόματα από το Airbnb. Για επιβεβαίωση ημερομηνιών, επικοινωνήστε μαζί μας.",
        "xmas.text2": "Μετά τη βόλτα στα φώτα, επιστρέφετε σε ένα ζεστό σπίτι δίπλα στη γιορτή.",
        "faq.q11": "Πόσα άτομα φιλοξενεί το διαμέρισμα;",
        "faq.a11": "Έως 5 επισκέπτες. Το διαμέρισμα είναι 78 τ.μ., βρίσκεται στον 2ο όροφο και διαθέτει 2 υπνοδωμάτια.",
        "info.label": "Καλό να ξέρετε",
        "info.title": "Πληροφορίες διαμονής",
        "info.c1.title": "Check-in / Check-out",
        "info.c1.text": "Check-in: 15:00 - 20:00. Παρακαλούμε ενημερώστε μας εκ των προτέρων για την ώρα άφιξής σας. Check-out: έως τις 12:00, αλλά εάν υπάρχει η δυνατότητα επιλέγετε εσείς την ώρα.",
        "info.c2.title": "Παιδιά και βρεφικές κούνιες",
        "info.c2.text": "Γίνονται δεκτά παιδιά όλων των ηλικιών. Βρεφική κούνια (0 - 3 ετών) διατίθεται κατόπιν αιτήματος.",
        "info.c3.title": "Κανόνες σπιτιού",
        "info.c3.i1": "Δεν επιτρέπεται το κάπνισμα",
        "info.c3.i2": "Δεν επιτρέπονται πάρτι ή εκδηλώσεις (ούτε μπάτσελορ πάρτι)",
        "info.c3.i3": "Δεν επιτρέπονται κατοικίδια ζώα",
        "info.c4.title": "Ακύρωση και προπληρωμή",
        "info.c4.text": "Οι όροι ακύρωσης και προπληρωμής διαφέρουν ανάλογα με την επιλογή κράτησης. Επικοινωνήστε μαζί μας για να σας ενημερώσουμε για τους όρους των ημερομηνιών που σας ενδιαφέρουν.",
        "faq.q8": "Τι ώρα είναι το check-in και το check-out;",
        "faq.a8": "Το check-in γίνεται από τις 15:00 έως τις 20:00 - παρακαλούμε ενημερώστε μας εκ των προτέρων για την ώρα άφιξής σας. Για το check-out υπάρχει 24ωρη διαθεσιμότητα.",
        "faq.q9": "Επιτρέπονται κατοικίδια ή κάπνισμα;",
        "faq.a9": "Όχι, τα κατοικίδια ζώα και το κάπνισμα δεν επιτρέπονται. Δεν επιτρέπονται επίσης πάρτι και εκδηλώσεις.",
        "faq.q10": "Δέχεστε παιδιά; Υπάρχει βρεφική κούνια;",
        "faq.a10": "Γίνονται δεκτά παιδιά όλων των ηλικιών. Βρεφική κούνια για παιδιά 0 - 3 ετών διατίθεται κατόπιν αιτήματος και βάσει διαθεσιμότητας, με €15 ανά παιδί, ανά βράδυ.",
        "xmas.label": "Μύλος των Ξωτικών",
        "xmas.title": "Χριστούγεννα στα Τρίκαλα",
        "xmas.text": "Ο Μύλος των Ξωτικών είναι ένας από τους πιο δημοφιλείς χριστουγεννιάτικους προορισμούς στην Ελλάδα και βρίσκεται μόλις 9 λεπτά με τα πόδια από το σπίτι μας - 800 βήματα.",
        "xmas.b1": "9 λεπτά με τα πόδια από τον Μύλο και 9 από την κεντρική πλατεία",
        "xmas.b2": "Ιδιωτικό πάρκινγκ για το αυτοκίνητό σας",
        "xmas.b3": "Κεντρική θέρμανση: ζεστό σπίτι μετά τη βόλτα στο κρύο",
        "xmas.b4": "Πρωτοχρονιάτικη προσφορά με welcome basket και χριστουγεννιάτικη διακόσμηση",
        "xmas.tip": "Για τις γιορτινές ημέρες σας συνιστούμε να ζητήσετε διαθεσιμότητα έγκαιρα.",
        "xmas.cta": "Ζητήστε διαθεσιμότητα",
        "xmas.map": "Ο Μύλος στο χάρτη",
        "footer.host": "Οικοδεσπότης: Τσιαρδάκα Ζωή",
        "footer.ama": "ΑΜΑ: 00003570750",
        "contact.host": "Οικοδεσπότης: Τσιαρδάκα Ζωή",
        "direct.label": "Απευθείας Κράτηση",
        "direct.title": "Γιατί να κλείσετε απευθείας;",
        "direct.b1.title": "Καλύτερες τιμές",
        "direct.b1.desc": "Κάντε κράτηση απευθείας από εμάς και εξασφαλίστε καλύτερες τιμές από τις πλατφόρμες.",
        "direct.b2.title": "Προσωπική εξυπηρέτηση",
        "direct.b2.desc": "Μιλάτε κατευθείαν με τον οικοδεσπότη, που γνωρίζει την πόλη και θα σας δώσει τις καλύτερες συμβουλές.",
        "direct.b3.title": "Όπως σας βολεύει",
        "direct.b3.desc": "Μιλήστε μαζί μας όπως σας βολεύει: WhatsApp, Viber, τηλέφωνο ή email.",
        "request.title": "Ζητήστε την κράτησή σας",
        "request.hint": "Επιλέξτε ημερομηνίες στο ημερολόγιο και στείλτε μας μήνυμα με ένα κλικ.",
        "request.guests": "Επισκέπτες",
        "request.whatsapp": "WhatsApp",
        "request.email": "Email",
        "request.call": "Κλήση",
        "request.msg.dates": "Γεια σας! Θα ήθελα να κλείσω το Tsiardaka Apartment από {ci} έως {co} για {n} άτομα. Είναι διαθέσιμο;",
        "request.msg.nodates": "Γεια σας! Ενδιαφέρομαι για το Tsiardaka Apartment για {n} άτομα. Μπορείτε να μου δώσετε πληροφορίες;",
        "request.subject": "Αίτημα κράτησης - Tsiardaka Apartment",
        "faq.label": "Συχνές Ερωτήσεις",
        "faq.title": "Έχετε ερωτήσεις;",
        "faq.q1": "Πόσο μακριά είναι ο Μύλος των Ξωτικών;",
        "faq.a1": "Περίπου 9 λεπτά με τα πόδια (800 βήματα). Η κεντρική πλατεία απέχει επίσης 9 λεπτά και η παλιά πόλη 17 λεπτά με τα πόδια.",
        "faq.q2": "Υπάρχει πάρκινγκ;",
        "faq.a2": "Ναι, διαθέτουμε ιδιωτικό, κλειστό χώρο στάθμευσης για τους επισκέπτες μας.",
        "faq.q3": "Υπάρχει θέρμανση και κλιματισμός;",
        "faq.a3": "Ναι, το διαμέρισμα διαθέτει κεντρική θέρμανση και κλιματισμό.",
        "faq.q4": "Υπάρχει WiFi και τηλεόραση;",
        "faq.a4": "Ναι, internet υψηλής ταχύτητας 100Mbps σε όλο το σπίτι και Smart TV 55\" με OTE TV, Nova και Netflix.",
        "faq.q5": "Πώς μπορώ να κάνω κράτηση;",
        "faq.a5": "Απευθείας από εμάς με τηλέφωνο, Viber, WhatsApp ή email, καθημερινά 09:00 - 22:00, για καλύτερες τιμές. Μπορείτε επίσης να μας βρείτε στο Airbnb και στο Booking.com.",
        "faq.q6": "Ποιες γλώσσες μιλάτε;",
        "faq.a6": "Ελληνικά και Αγγλικά.",
        "faq.q7": "Τι αξίζει να δω γύρω από τα Τρίκαλα;",
        "faq.a7": "Με το αυτοκίνητο: τα Μετέωρα (περίπου 29 λεπτά), το Πετρούλι (περίπου 50 λεπτά) και η Λίμνη Πλαστήρα (περίπου 1 ώρα).",
        "footer.privacy": "Πολιτική Απορρήτου"
    },

    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.gallery": "Gallery",
        "nav.offers": "Offers",
        "nav.booking": "Book Now",
        "nav.attractions": "Attractions",
        "nav.contact": "Contact",
        "hero.title": "The Center at Your Feet!",
        "hero.subtitle": "Book directly with us for better prices and personalized service.",
        "hero.button": "Book Your Stay",
        "about.label": "Our Home",
        "about.title": "About the Apartment",
        "about.text1": "Welcome to our comfortable and well-maintained apartment in the center of Trikala, Thessaly, next to the magical Elf Mill – one of the most popular Christmas destinations in Greece!",
        "about.text2": "Discover the beauty of Trikala, explore Meteora and the villages of Pindos as well as other nearby attractions and enjoy your stay in a space that will make you feel at home.",
        "about.text3": "Communication languages: Greek, English",
        "about.stat1": "Steps to Elf Mill",
        "about.stat2": "Booking.com · 15 reviews",
        "about.stat3": "Area",
        "about.stat4": "Max guests",
        "about.room.living": "Living Room",
        "about.room.kitchen": "Kitchen",
        "about.room.bedroom1": "Master Bedroom",
        "about.room.bedroom2": "Second Bedroom",
        "about.room.dining": "Dining Area",
        "about.room.bathroom": "Bathroom",
        "about.room.balcony": "Balcony",
        "gallery.label": "Explore",
        "gallery.title": "Photos",
        "experience.label": "Experience",
        "experience.title": "Live the Magic of Trikala",
        "experience.text": "Video presentation coming soon",
        "amenities.label": "Amenities",
        "amenities.title": "What We Offer",
        "amenities.wifi.title": "WiFi 100Mbps",
        "amenities.wifi.desc": "High-speed internet throughout the house",
        "amenities.parking.title": "Private Parking",
        "amenities.parking.desc": "Enclosed parking space",
        "amenities.kitchen.title": "Full Kitchen",
        "amenities.kitchen.desc": "Fully equipped kitchen",
        "amenities.tv.title": "Smart TV",
        "amenities.tv.desc": "55\" TV with OTE TV, Nova & Netflix",
        "amenities.heating.title": "Heating and AC",
        "amenities.heating.desc": "Autonomous natural gas heating and air conditioning",
        "amenities.washer.title": "Washing Machine",
        "amenities.washer.desc": "Clothes washing machine",
        "amenities.linens.title": "Premium Linens",
        "amenities.linens.desc": "Quality sheets and towels",
        "amenities.iron.title": "Iron",
        "amenities.iron.desc": "Iron and ironing board",
        "amenities.coffee.title": "Coffee Machine",
        "amenities.coffee.desc": "Espresso and filter coffee maker",
        "attractions.label": "Explore",
        "attractions.title": "Nearby Attractions",
        "attractions.scrollHint": "Swipe to explore",
        "attractions.mylos.title": "Elf Mill",
        "attractions.mylos.desc": "Just 9 minutes walk away is a magical Christmas village that enchants young and old.",
        "attractions.mylos.distance": "9 minutes",
        "attractions.square.title": "Central Square and River",
        "attractions.square.desc": "The center at your feet. The river crosses the Christmas town next to the house.",
        "attractions.square.distance": "9 minutes",
        "attractions.oldtown.title": "Old Town and Fortress",
        "attractions.oldtown.desc": "Traditional mansions and picturesque alleys. Ideal for walks and photos.",
        "attractions.oldtown.distance": "17 minutes",
        "attractions.manavika.title": "Manavika",
        "attractions.manavika.desc": "Taverns near the old town with incredible flavors.",
        "attractions.manavika.distance": "13 minutes",
        "attractions.pertouli.title": "Pertouli",
        "attractions.pertouli.desc": "Mountain resort with dense forests and ski center.",
        "attractions.pertouli.distance": "50 minutes",
        "attractions.meteora.title": "Meteora",
        "attractions.meteora.desc": "Unique monastic city on top of rocks. UNESCO World Heritage Site.",
        "attractions.meteora.distance": "29 minutes",
        "attractions.plastira.title": "Plastira Lake",
        "attractions.plastira.desc": "Beautiful artificial lake with crystal clear waters.",
        "attractions.plastira.distance": "1 hour",
        "attractions.openMap": "Open in Maps",
        "location.label": "Find Us",
        "location.title": "Location",
        "location.address": "Address",
        "location.nearby": "Nearby Points of Interest",
        "weather.title": "Weather in Trikala",
        "weather.loading": "Loading...",
        "weather.feelsLike": "Feels like",
        "weather.humidity": "Humidity",
        "weather.wind": "Wind",
        "reviews.label": "Reviews",
        "reviews.title": "What Our Guests Say",
        "pricing.label": "Pricing",
        "offers.title": "Special Offers",
        "offers.offer1.title": "November Weekends until 20/11",
        "offers.offer1.old_price": "€120/night",
        "offers.offer1.new_price": "€100/night",
        "offers.offer1.subtitle": "For stays of 2+ nights",
        "offers.offer1.feature1": "✅ Free welcome basket",
        "offers.offer1.feature2": "✅ Ideal for autumn getaway",
        "offers.offer1.feature3": "✅ 27% discount",
        "offers.offer1.badge": "Most Popular",
        "offers.offer2.title": "November Weekdays until 20/11",
        "offers.offer2.old_price": "€110/night",
        "offers.offer2.new_price": "€90/night",
        "offers.offer2.subtitle": "Monday-Friday",
        "offers.offer2.feature1": "✅ Peace outside the weekend",
        "offers.offer2.feature2": "✅ Ideal for working days",
        "offers.offer2.feature3": "✅ 50% discount",
        "offers.offer3.title": "For stays of 7+ days",
        "offers.offer3.old_price": "€100/night",
        "offers.offer3.new_price": "€80/night",
        "offers.offer3.subtitle": "Until 20/11",
        "offers.offer3.feature1": "✅ Full equipment",
        "offers.offer3.feature2": "✅ Utilities included",
        "offers.offer3.feature3": "✅ 55% discount",
        "offers.button": "Check Availability",
        "calendar.available": "Available",
        "calendar.booked": "Booked",
        "calendar.selected": "Selected",
        "calendar.checkTitle": "Check Availability",
        "calendar.checkin": "Check-in",
        "calendar.checkout": "Check-out",
        "calendar.checkBtn": "Check Availability",
        "booking.label": "Contact",
        "booking.title": "Make a Reservation",
        "booking.contact_title": "Contact Us",
        "booking.contact_subtitle": "Choose your preferred contact method",
        "booking.call": "Call us",
        "booking.viber": "Viber",
        "booking.whatsapp": "WhatsApp",
        "booking.email": "Email",
        "booking.availability": "Available daily 09:00 - 22:00",
        "booking.find_us": "You can also find us:",
        "booking.contact_info": "Don't hesitate to contact us for reservations or information",
        "floatingBtn.text": "Book Now",
        "footer.title": "800 steps from Elf Mill",
        "footer.description": "The perfect vacation home in the heart of Trikala.",
        "footer.links_title": "Quick Links",
        "footer.contact_title": "Contact",
        "footer.copyright": "© 2026 Tsiardaka Apartment. All rights reserved.",
        "contact.address": "Athinas Erganis 8, Trikala, Thessaly",
        "footer.credit": "Designed and developed by Ilias Pontikas",
        "attractions.palaiokarya.title": "Palaiokarya Waterfalls",
        "attractions.palaiokarya.distance": "35 min",
        "attractions.palaiokarya.desc": "The stone arched bridge of Palaiokarya, with two small waterfalls beside it. For many, the most beautiful one in the area.",
        "band.text": "Next to our home",
        "about.facts": "2 bedrooms · 2nd floor · large lift",
        "gallery.viewAll": "View all photos",
        "gallery.bedrooms": "Bedrooms",
        "calendar.note": "The calendar updates automatically from Airbnb. Please contact us to confirm your dates.",
        "xmas.text2": "After a stroll under the lights, you return to a warm home right next to the festivities.",
        "faq.q11": "How many guests can the apartment sleep?",
        "faq.a11": "Up to 5 guests. The apartment is 78 m², on the 2nd floor, with 2 bedrooms.",
        "info.label": "Good to know",
        "info.title": "Stay information",
        "info.c1.title": "Check-in / Check-out",
        "info.c1.text": "Check-in: 3:00 pm - 8:00 pm. Please let us know your arrival time in advance. Check-out: Until 12:00, but if possible, you can choose your check-out time.",
        "info.c2.title": "Children and cots",
        "info.c2.text": "Children of all ages are welcome. A baby cot (ages 0 - 3) is available on request.",
        "info.c3.title": "House rules",
        "info.c3.i1": "No smoking",
        "info.c3.i2": "No parties or events (including bachelor parties)",
        "info.c3.i3": "No pets allowed",
        "info.c4.title": "Cancellation and prepayment",
        "info.c4.text": "Cancellation and prepayment terms vary depending on the booking option. Contact us and we will tell you the terms for the dates you are interested in.",
        "faq.q8": "What are the check-in and check-out times?",
        "faq.a8": "Check-in is from 3:00 pm to 8:00 pm - please let us know your arrival time in advance. Check-out has 24-hour availability.",
        "faq.q9": "Are pets or smoking allowed?",
        "faq.a9": "No, pets and smoking are not allowed. Parties and events are not allowed either.",
        "faq.q10": "Do you accept children? Is there a baby cot?",
        "faq.a10": "Children of all ages are welcome. A baby cot for children aged 0 - 3 is available on request, subject to availability, at €15 per child, per night.",
        "xmas.label": "Elf Mill",
        "xmas.title": "Christmas in Trikala",
        "xmas.text": "The Elf Mill is one of the most popular Christmas destinations in Greece, just a 9-minute walk from our apartment - 800 steps.",
        "xmas.b1": "9 minutes on foot to the Elf Mill and 9 to the central square",
        "xmas.b2": "Private parking for your car",
        "xmas.b3": "Central heating: a warm home after a stroll in the cold",
        "xmas.b4": "New Year offer with welcome basket and Christmas decoration",
        "xmas.tip": "For the festive season we recommend asking about availability early.",
        "xmas.cta": "Check availability",
        "xmas.map": "Elf Mill on the map",
        "footer.host": "Host: Zoi Tsiardaka",
        "footer.ama": "Registration No. (ΑΜΑ): 00003570750",
        "contact.host": "Host: Zoi Tsiardaka",
        "direct.label": "Book Direct",
        "direct.title": "Why book direct?",
        "direct.b1.title": "Better prices",
        "direct.b1.desc": "Book directly with us and get better prices than on the booking platforms.",
        "direct.b2.title": "Personal service",
        "direct.b2.desc": "You talk directly to your host, who knows the city and will share the best local tips.",
        "direct.b3.title": "Your way",
        "direct.b3.desc": "Talk to us the way you prefer: WhatsApp, Viber, phone or email.",
        "request.title": "Request your stay",
        "request.hint": "Pick your dates in the calendar and message us in one click.",
        "request.guests": "Guests",
        "request.whatsapp": "WhatsApp",
        "request.email": "Email",
        "request.call": "Call",
        "request.msg.dates": "Hello! I would like to book Tsiardaka Apartment from {ci} to {co} for {n} guests. Is it available?",
        "request.msg.nodates": "Hello! I am interested in Tsiardaka Apartment for {n} guests. Could you give me some information?",
        "request.subject": "Booking request - Tsiardaka Apartment",
        "faq.label": "FAQ",
        "faq.title": "Any questions?",
        "faq.q1": "How far is the Elf Mill?",
        "faq.a1": "About a 9-minute walk (800 steps). The central square is also 9 minutes away and the old town 17 minutes on foot.",
        "faq.q2": "Is there parking?",
        "faq.a2": "Yes, we have a private, enclosed parking space for our guests.",
        "faq.q3": "Is there heating and air conditioning?",
        "faq.a3": "Yes, the apartment has central heating and air conditioning.",
        "faq.q4": "Is there WiFi and TV?",
        "faq.a4": "Yes, 100Mbps high-speed internet throughout the apartment and a 55\" Smart TV with OTE TV, Nova and Netflix.",
        "faq.q5": "How can I book?",
        "faq.a5": "Directly with us by phone, Viber, WhatsApp or email, every day 09:00 - 22:00, for better prices. You can also find us on Airbnb and Booking.com.",
        "faq.q6": "Which languages do you speak?",
        "faq.a6": "Greek and English.",
        "faq.q7": "What should I see around Trikala?",
        "faq.a7": "By car: Meteora (about 29 minutes), Pertouli (about 50 minutes) and Lake Plastira (about 1 hour).",
        "footer.privacy": "Privacy Policy"
    }
};

const calendarTranslations = {
    el: {
        months: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
                 "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
        days: ["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα"]
    },
    en: {
        months: ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"],
        days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    }
};

class LanguageSwitcher {
    // Each language is its own page: "/" (Greek) and "/en/" (English).
    constructor() {
        this.currentLang = document.documentElement.lang === 'en' ? 'en' : 'el';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateActiveButton(this.currentLang);
        this.applyLanguage(this.currentLang);
    }

    setupEventListeners() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.currentTarget.dataset.lang);
            });
        });
    }

    switchLanguage(lang) {
        if (!translations[lang] || lang === this.currentLang) return;
        this.saveLanguagePreference(lang);
        const inEn = this.currentLang === 'en';
        const target = lang === 'en' ? (inEn ? './' : 'en/') : (inEn ? '../' : './');
        window.location.href = target + window.location.hash;
    }

    applyLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        this.updateDiscounts();
        this.updateCalendar(lang);
        if (typeof WeatherWidget !== 'undefined' && WeatherWidget._data) {
            WeatherWidget.render();
        }
    }

    // The "Έκπτωση X%" line is calculated from the crossed-out and the real price,
    // so only the prices ever need editing. No old price = no discount line and no crossed-out price.
    updateDiscounts() {
        const num = (el) => { const m = el && el.textContent.match(/\d+(?:[.,]\d+)?/); return m ? parseFloat(m[0].replace(',', '.')) : NaN; };
        document.querySelectorAll('.offer-card').forEach(card => {
            const oldEl = card.querySelector('.price-old');
            const newEl = card.querySelector('.price-new');
            const items = card.querySelectorAll('.offer-features li');
            const line  = items[items.length - 1];
            const oldP = num(oldEl), newP = num(newEl);
            const valid = oldP > 0 && newP > 0 && newP < oldP;
            if (oldEl) oldEl.style.display = valid ? '' : 'none';
            if (line) {
                line.style.display = valid ? '' : 'none';
                if (valid) line.textContent = line.textContent.replace(/\d+(?:[.,]\d+)?\s*%/, Math.round((1 - newP / oldP) * 100) + '%');
            }
        });
    }

    updateCalendar(lang) {
        if (window.Calendar && typeof window.Calendar.render === 'function') {
            window.Calendar.render();
        }
    }

    updateActiveButton(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    saveLanguagePreference(lang) {
        try { localStorage.setItem('preferred-language', lang); } catch (e) {}
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
});
