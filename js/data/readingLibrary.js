(function(){
/**
 * Qur'an Reading Library
 * Canonical Reading Journey source — Version 1.0
 *
 * Boundaries are frozen at 294 Reading Units.
 * Every ayah belongs to exactly one Reading Unit.
 */

const READING_LIBRARY_VERSION = '1.0.0';
const READING_UNIT_COUNT = 294;

const READING_UNITS = [
  {
    "id": "P0001",
    "order": 1,
    "surahNumber": 1,
    "surahName": "Al-Fātiḥah",
    "reference": "1:1–7",
    "startAyah": 1,
    "endAyah": 7,
    "title": "The Opening",
    "type": "Supplication"
  },
  {
    "id": "P0002",
    "order": 2,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:1–20",
    "startAyah": 1,
    "endAyah": 20,
    "title": "The Believers, the Disbelievers, and the Hypocrites",
    "type": "Description"
  },
  {
    "id": "P0003",
    "order": 3,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:21–29",
    "startAyah": 21,
    "endAyah": 29,
    "title": "A Call to Worship Allah",
    "type": "Address"
  },
  {
    "id": "P0004",
    "order": 4,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:30–39",
    "startAyah": 30,
    "endAyah": 39,
    "title": "Adam",
    "type": "Narrative"
  },
  {
    "id": "P0005",
    "order": 5,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:40–61",
    "startAyah": 40,
    "endAyah": 61,
    "title": "Allah's Favors Upon the Children of Israel",
    "type": "Address"
  },
  {
    "id": "P0006",
    "order": 6,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:62–74",
    "startAyah": 62,
    "endAyah": 74,
    "title": "The Cow",
    "type": "Narrative"
  },
  {
    "id": "P0007",
    "order": 7,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:75–86",
    "startAyah": 75,
    "endAyah": 86,
    "title": "Breaking the Covenant",
    "type": "Address"
  },
  {
    "id": "P0008",
    "order": 8,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:87–96",
    "startAyah": 87,
    "endAyah": 96,
    "title": "The Messengers and the Book",
    "type": "Address"
  },
  {
    "id": "P0009",
    "order": 9,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:97–103",
    "startAyah": 97,
    "endAyah": 103,
    "title": "Jibrīl, the Covenant, and Hārūt and Mārūt",
    "type": "Address"
  },
  {
    "id": "P0010",
    "order": 10,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:104–123",
    "startAyah": 104,
    "endAyah": 123,
    "title": "Commands and Warnings to the Believers and the People of the Book",
    "type": "Address"
  },
  {
    "id": "P0011",
    "order": 11,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:124–129",
    "startAyah": 124,
    "endAyah": 129,
    "title": "Ibrāhīm and the Kaʿbah",
    "type": "Narrative"
  },
  {
    "id": "P0012",
    "order": 12,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:130–141",
    "startAyah": 130,
    "endAyah": 141,
    "title": "The Religion of Ibrāhīm",
    "type": "Address"
  },
  {
    "id": "P0013",
    "order": 13,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:142–152",
    "startAyah": 142,
    "endAyah": 152,
    "title": "The Change of the Qiblah",
    "type": "Address"
  },
  {
    "id": "P0014",
    "order": 14,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:153–157",
    "startAyah": 153,
    "endAyah": 157,
    "title": "Patience and Prayer",
    "type": "Address"
  },
  {
    "id": "P0015",
    "order": 15,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:158–162",
    "startAyah": 158,
    "endAyah": 162,
    "title": "Ṣafā and Marwah",
    "type": "Legal"
  },
  {
    "id": "P0016",
    "order": 16,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:163–167",
    "startAyah": 163,
    "endAyah": 167,
    "title": "The Oneness of Allah",
    "type": "Description"
  },
  {
    "id": "P0017",
    "order": 17,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:168–177",
    "startAyah": 168,
    "endAyah": 177,
    "title": "Lawful Provision and Righteousness",
    "type": "Address"
  },
  {
    "id": "P0018",
    "order": 18,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:178–182",
    "startAyah": 178,
    "endAyah": 182,
    "title": "Legal Retribution and Wills",
    "type": "Legal"
  },
  {
    "id": "P0019",
    "order": 19,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:183–188",
    "startAyah": 183,
    "endAyah": 188,
    "title": "Fasting",
    "type": "Legal"
  },
  {
    "id": "P0020",
    "order": 20,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:189–203",
    "startAyah": 189,
    "endAyah": 203,
    "title": "Hajj",
    "type": "Legal"
  },
  {
    "id": "P0021",
    "order": 21,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:204–214",
    "startAyah": 204,
    "endAyah": 214,
    "title": "Striving in the Cause of Allah",
    "type": "Address"
  },
  {
    "id": "P0022",
    "order": 22,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:215–220",
    "startAyah": 215,
    "endAyah": 220,
    "title": "Spending and Social Responsibilities",
    "type": "Legal"
  },
  {
    "id": "P0023",
    "order": 23,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:221–242",
    "startAyah": 221,
    "endAyah": 242,
    "title": "Marriage and Family Matters",
    "type": "Legal"
  },
  {
    "id": "P0024",
    "order": 24,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:243–252",
    "startAyah": 243,
    "endAyah": 252,
    "title": "Ṭālūt and Jālūt",
    "type": "Narrative"
  },
  {
    "id": "P0025",
    "order": 25,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:253–257",
    "startAyah": 253,
    "endAyah": 257,
    "title": "Messengers and Āyat al-Kursī",
    "type": "Description"
  },
  {
    "id": "P0026",
    "order": 26,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:258–260",
    "startAyah": 258,
    "endAyah": 260,
    "title": "Ibrāhīm and the Signs of Resurrection",
    "type": "Narrative"
  },
  {
    "id": "P0027",
    "order": 27,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:261–274",
    "startAyah": 261,
    "endAyah": 274,
    "title": "Spending for the Sake of Allah",
    "type": "Address"
  },
  {
    "id": "P0028",
    "order": 28,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:275–281",
    "startAyah": 275,
    "endAyah": 281,
    "title": "Usury",
    "type": "Legal"
  },
  {
    "id": "P0029",
    "order": 29,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:282–283",
    "startAyah": 282,
    "endAyah": 283,
    "title": "Contracts and Debt",
    "type": "Legal"
  },
  {
    "id": "P0030",
    "order": 30,
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "reference": "2:284–286",
    "startAyah": 284,
    "endAyah": 286,
    "title": "The Closing Supplication of Al-Baqarah",
    "type": "Supplication"
  },
  {
    "id": "P0031",
    "order": 31,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:1–9",
    "startAyah": 1,
    "endAyah": 9,
    "title": "The Opening of Āl ʿImrān",
    "type": "Description"
  },
  {
    "id": "P0032",
    "order": 32,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:10–32",
    "startAyah": 10,
    "endAyah": 32,
    "title": "The People of the Book and the Family of ʿImrān",
    "type": "Address"
  },
  {
    "id": "P0033",
    "order": 33,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:33–41",
    "startAyah": 33,
    "endAyah": 41,
    "title": "Zakariyyā and Maryam",
    "type": "Narrative"
  },
  {
    "id": "P0034",
    "order": 34,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:42–63",
    "startAyah": 42,
    "endAyah": 63,
    "title": "The Birth of ʿĪsā",
    "type": "Narrative"
  },
  {
    "id": "P0035",
    "order": 35,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:64–80",
    "startAyah": 64,
    "endAyah": 80,
    "title": "A Common Word",
    "type": "Dialogue"
  },
  {
    "id": "P0036",
    "order": 36,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:81–91",
    "startAyah": 81,
    "endAyah": 91,
    "title": "The Covenant of the Prophets",
    "type": "Address"
  },
  {
    "id": "P0037",
    "order": 37,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:92–101",
    "startAyah": 92,
    "endAyah": 101,
    "title": "Following the Religion of Ibrahim",
    "type": "Address"
  },
  {
    "id": "P0038",
    "order": 38,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:102–120",
    "startAyah": 102,
    "endAyah": 120,
    "title": "Holding Firm to Allah",
    "type": "Address"
  },
  {
    "id": "P0039",
    "order": 39,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:121–129",
    "startAyah": 121,
    "endAyah": 129,
    "title": "The Battle of Uhud Begins",
    "type": "Narrative"
  },
  {
    "id": "P0040",
    "order": 40,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:130–143",
    "startAyah": 130,
    "endAyah": 143,
    "title": "Lessons Before the Battle",
    "type": "Address"
  },
  {
    "id": "P0041",
    "order": 41,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:144–155",
    "startAyah": 144,
    "endAyah": 155,
    "title": "Events During Uhud",
    "type": "Narrative"
  },
  {
    "id": "P0042",
    "order": 42,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:156–175",
    "startAyah": 156,
    "endAyah": 175,
    "title": "After Uhud",
    "type": "Narrative"
  },
  {
    "id": "P0043",
    "order": 43,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:176–189",
    "startAyah": 176,
    "endAyah": 189,
    "title": "The Believers and the Disbelievers",
    "type": "Address"
  },
  {
    "id": "P0044",
    "order": 44,
    "surahNumber": 3,
    "surahName": "Āl ʿImrān",
    "reference": "3:190–200",
    "startAyah": 190,
    "endAyah": 200,
    "title": "The Closing Supplication of Āl ʿImrān",
    "type": "Supplication"
  },
  {
    "id": "P0045",
    "order": 45,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:1–10",
    "startAyah": 1,
    "endAyah": 10,
    "title": "Opening of An-Nisāʾ",
    "type": "Legal"
  },
  {
    "id": "P0046",
    "order": 46,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:11–21",
    "startAyah": 11,
    "endAyah": 21,
    "title": "Inheritance and Family Rights",
    "type": "Legal"
  },
  {
    "id": "P0047",
    "order": 47,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:22–35",
    "startAyah": 22,
    "endAyah": 35,
    "title": "Marriage Regulations",
    "type": "Legal"
  },
  {
    "id": "P0048",
    "order": 48,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:36–57",
    "startAyah": 36,
    "endAyah": 57,
    "title": "Worship, Justice, and the Hypocrites",
    "type": "Address"
  },
  {
    "id": "P0049",
    "order": 49,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:58–70",
    "startAyah": 58,
    "endAyah": 70,
    "title": "Trusts and Obedience",
    "type": "Legal"
  },
  {
    "id": "P0050",
    "order": 50,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:71–87",
    "startAyah": 71,
    "endAyah": 87,
    "title": "Preparation and Obedience",
    "type": "Address"
  },
  {
    "id": "P0051",
    "order": 51,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:88–104",
    "startAyah": 88,
    "endAyah": 104,
    "title": "The Hypocrites and Fighting",
    "type": "Address"
  },
  {
    "id": "P0052",
    "order": 52,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:105–126",
    "startAyah": 105,
    "endAyah": 126,
    "title": "Judgment and Forgiveness",
    "type": "Legal"
  },
  {
    "id": "P0053",
    "order": 53,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:127–134",
    "startAyah": 127,
    "endAyah": 134,
    "title": "Women and Justice",
    "type": "Legal"
  },
  {
    "id": "P0054",
    "order": 54,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:135–152",
    "startAyah": 135,
    "endAyah": 152,
    "title": "Justice, Witnesses, and the Hypocrites",
    "type": "Address"
  },
  {
    "id": "P0055",
    "order": 55,
    "surahNumber": 4,
    "surahName": "An-Nisāʾ",
    "reference": "4:153–176",
    "startAyah": 153,
    "endAyah": 176,
    "title": "The Closing of An-Nisāʾ",
    "type": "Address"
  },
  {
    "id": "P0056",
    "order": 56,
    "surahNumber": 5,
    "surahName": "Al-Mā'idah",
    "reference": "5:1–11",
    "startAyah": 1,
    "endAyah": 11,
    "title": "Covenants and Lawful Things",
    "type": "Legal"
  },
  {
    "id": "P0057",
    "order": 57,
    "surahNumber": 5,
    "surahName": "Al-Mā'idah",
    "reference": "5:12–26",
    "startAyah": 12,
    "endAyah": 26,
    "title": "The Covenant with the Children of Israel",
    "type": "Narrative"
  },
  {
    "id": "P0058",
    "order": 58,
    "surahNumber": 5,
    "surahName": "Al-Mā'idah",
    "reference": "5:27–40",
    "startAyah": 27,
    "endAyah": 40,
    "title": "The Two Sons of Ādam",
    "type": "Narrative"
  },
  {
    "id": "P0059",
    "order": 59,
    "surahNumber": 5,
    "surahName": "Al-Mā'idah",
    "reference": "5:41–50",
    "startAyah": 41,
    "endAyah": 50,
    "title": "Judgment by Allah's Revelation",
    "type": "Legal"
  },
  {
    "id": "P0060",
    "order": 60,
    "surahNumber": 5,
    "surahName": "Al-Mā'idah",
    "reference": "5:51–66",
    "startAyah": 51,
    "endAyah": 66,
    "title": "Loyalty and Alliance",
    "type": "Address"
  },
  {
    "id": "P0061",
    "order": 61,
    "surahNumber": 5,
    "surahName": "Al-Mā'idah",
    "reference": "5:67–86",
    "startAyah": 67,
    "endAyah": 86,
    "title": "The People of the Book",
    "type": "Address"
  },
  {
    "id": "P0062",
    "order": 62,
    "surahNumber": 5,
    "surahName": "Al-Mā'idah",
    "reference": "5:87–108",
    "startAyah": 87,
    "endAyah": 108,
    "title": "Oaths, Hunting, and Testimony",
    "type": "Legal"
  },
  {
    "id": "P0063",
    "order": 63,
    "surahNumber": 5,
    "surahName": "Al-Mā'idah",
    "reference": "5:109–120",
    "startAyah": 109,
    "endAyah": 120,
    "title": "The Table Spread",
    "type": "Dialogue"
  },
  {
    "id": "P0064",
    "order": 64,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:1–18",
    "startAyah": 1,
    "endAyah": 18,
    "title": "The Opening of Al-Anʿām",
    "type": "Description"
  },
  {
    "id": "P0065",
    "order": 65,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:19–39",
    "startAyah": 19,
    "endAyah": 39,
    "title": "Revelation and Signs",
    "type": "Address"
  },
  {
    "id": "P0066",
    "order": 66,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:40–60",
    "startAyah": 40,
    "endAyah": 60,
    "title": "Calling Upon Allah Alone",
    "type": "Address"
  },
  {
    "id": "P0067",
    "order": 67,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:61–73",
    "startAyah": 61,
    "endAyah": 73,
    "title": "Resurrection and the Truth",
    "type": "Description"
  },
  {
    "id": "P0068",
    "order": 68,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:74–90",
    "startAyah": 74,
    "endAyah": 90,
    "title": "Ibrahim and His People",
    "type": "Narrative"
  },
  {
    "id": "P0069",
    "order": 69,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:91–110",
    "startAyah": 91,
    "endAyah": 110,
    "title": "Revelation and the Signs of Allah",
    "type": "Address"
  },
  {
    "id": "P0070",
    "order": 70,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:111–121",
    "startAyah": 111,
    "endAyah": 121,
    "title": "Revelation and Lawful Food",
    "type": "Address"
  },
  {
    "id": "P0071",
    "order": 71,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:122–135",
    "startAyah": 122,
    "endAyah": 135,
    "title": "Guidance and Misguidance",
    "type": "Address"
  },
  {
    "id": "P0072",
    "order": 72,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:136–150",
    "startAyah": 136,
    "endAyah": 150,
    "title": "False Practices Concerning Livestock",
    "type": "Legal"
  },
  {
    "id": "P0073",
    "order": 73,
    "surahNumber": 6,
    "surahName": "Al-Anʿām",
    "reference": "6:151–165",
    "startAyah": 151,
    "endAyah": 165,
    "title": "The Straight Path",
    "type": "Legal"
  },
  {
    "id": "P0074",
    "order": 74,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:1–25",
    "startAyah": 1,
    "endAyah": 25,
    "title": "Adam and Iblīs",
    "type": "Narrative"
  },
  {
    "id": "P0075",
    "order": 75,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:26–36",
    "startAyah": 26,
    "endAyah": 36,
    "title": "Clothing, Taqwa, and Shayṭān",
    "type": "Address"
  },
  {
    "id": "P0076",
    "order": 76,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:37–53",
    "startAyah": 37,
    "endAyah": 53,
    "title": "The People of Paradise and the Fire",
    "type": "Description"
  },
  {
    "id": "P0077",
    "order": 77,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:54–58",
    "startAyah": 54,
    "endAyah": 58,
    "title": "Signs of Allah in Creation",
    "type": "Description"
  },
  {
    "id": "P0078",
    "order": 78,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:59–64",
    "startAyah": 59,
    "endAyah": 64,
    "title": "Nūḥ",
    "type": "Narrative"
  },
  {
    "id": "P0079",
    "order": 79,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:65–72",
    "startAyah": 65,
    "endAyah": 72,
    "title": "Hūd",
    "type": "Narrative"
  },
  {
    "id": "P0080",
    "order": 80,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:73–79",
    "startAyah": 73,
    "endAyah": 79,
    "title": "Ṣāliḥ",
    "type": "Narrative"
  },
  {
    "id": "P0081",
    "order": 81,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:80–84",
    "startAyah": 80,
    "endAyah": 84,
    "title": "Lūṭ",
    "type": "Narrative"
  },
  {
    "id": "P0082",
    "order": 82,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:85–93",
    "startAyah": 85,
    "endAyah": 93,
    "title": "Shuʿayb",
    "type": "Narrative"
  },
  {
    "id": "P0083",
    "order": 83,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:94–102",
    "startAyah": 94,
    "endAyah": 102,
    "title": "Lessons from Earlier Nations",
    "type": "Address"
  },
  {
    "id": "P0084",
    "order": 84,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:103–126",
    "startAyah": 103,
    "endAyah": 126,
    "title": "Mūsā Before Firʿawn",
    "type": "Narrative"
  },
  {
    "id": "P0085",
    "order": 85,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:127–137",
    "startAyah": 127,
    "endAyah": 137,
    "title": "Firʿawn's Oppression and the Deliverance of the Children of Israel",
    "type": "Narrative"
  },
  {
    "id": "P0086",
    "order": 86,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:138–156",
    "startAyah": 138,
    "endAyah": 156,
    "title": "The Worship of the Calf",
    "type": "Narrative"
  },
  {
    "id": "P0087",
    "order": 87,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:157–171",
    "startAyah": 157,
    "endAyah": 171,
    "title": "The Covenant with the Children of Israel",
    "type": "Address"
  },
  {
    "id": "P0088",
    "order": 88,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:172–188",
    "startAyah": 172,
    "endAyah": 188,
    "title": "The Testimony and the Signs",
    "type": "Address"
  },
  {
    "id": "P0089",
    "order": 89,
    "surahNumber": 7,
    "surahName": "Al-Aʿrāf",
    "reference": "7:189–206",
    "startAyah": 189,
    "endAyah": 206,
    "title": "The Closing of Al-Aʿrāf",
    "type": "Description"
  },
  {
    "id": "P0090",
    "order": 90,
    "surahNumber": 8,
    "surahName": "Al-Anfāl",
    "reference": "8:1–19",
    "startAyah": 1,
    "endAyah": 19,
    "title": "The Battle of Badr Begins",
    "type": "Narrative"
  },
  {
    "id": "P0091",
    "order": 91,
    "surahNumber": 8,
    "surahName": "Al-Anfāl",
    "reference": "8:20–40",
    "startAyah": 20,
    "endAyah": 40,
    "title": "Obedience and Steadfastness",
    "type": "Address"
  },
  {
    "id": "P0092",
    "order": 92,
    "surahNumber": 8,
    "surahName": "Al-Anfāl",
    "reference": "8:41–58",
    "startAyah": 41,
    "endAyah": 58,
    "title": "Spoils and Covenants",
    "type": "Legal"
  },
  {
    "id": "P0093",
    "order": 93,
    "surahNumber": 8,
    "surahName": "Al-Anfāl",
    "reference": "8:59–75",
    "startAyah": 59,
    "endAyah": 75,
    "title": "Victory Belongs to Allah",
    "type": "Address"
  },
  {
    "id": "P0094",
    "order": 94,
    "surahNumber": 9,
    "surahName": "At-Tawbah",
    "reference": "9:1–24",
    "startAyah": 1,
    "endAyah": 24,
    "title": "Dissociation from the Polytheists",
    "type": "Address"
  },
  {
    "id": "P0095",
    "order": 95,
    "surahNumber": 9,
    "surahName": "At-Tawbah",
    "reference": "9:25–37",
    "startAyah": 25,
    "endAyah": 37,
    "title": "Ḥunayn and Sacred Months",
    "type": "Narrative"
  },
  {
    "id": "P0096",
    "order": 96,
    "surahNumber": 9,
    "surahName": "At-Tawbah",
    "reference": "9:38–59",
    "startAyah": 38,
    "endAyah": 59,
    "title": "Striving and the Hypocrites",
    "type": "Address"
  },
  {
    "id": "P0097",
    "order": 97,
    "surahNumber": 9,
    "surahName": "At-Tawbah",
    "reference": "9:60–72",
    "startAyah": 60,
    "endAyah": 72,
    "title": "Charity and the Believers",
    "type": "Legal"
  },
  {
    "id": "P0098",
    "order": 98,
    "surahNumber": 9,
    "surahName": "At-Tawbah",
    "reference": "9:73–93",
    "startAyah": 73,
    "endAyah": 93,
    "title": "The Hypocrites",
    "type": "Address"
  },
  {
    "id": "P0099",
    "order": 99,
    "surahNumber": 9,
    "surahName": "At-Tawbah",
    "reference": "9:94–118",
    "startAyah": 94,
    "endAyah": 118,
    "title": "The Expedition of Tabūk",
    "type": "Narrative"
  },
  {
    "id": "P0100",
    "order": 100,
    "surahNumber": 9,
    "surahName": "At-Tawbah",
    "reference": "9:119–129",
    "startAyah": 119,
    "endAyah": 129,
    "title": "The Closing of At-Tawbah",
    "type": "Address"
  },
  {
    "id": "P0101",
    "order": 101,
    "surahNumber": 10,
    "surahName": "Yūnus",
    "reference": "10:1–20",
    "startAyah": 1,
    "endAyah": 20,
    "title": "The Opening of Yūnus",
    "type": "Address"
  },
  {
    "id": "P0102",
    "order": 102,
    "surahNumber": 10,
    "surahName": "Yūnus",
    "reference": "10:21–56",
    "startAyah": 21,
    "endAyah": 56,
    "title": "Signs, Guidance, and the Truth",
    "type": "Address"
  },
  {
    "id": "P0103",
    "order": 103,
    "surahNumber": 10,
    "surahName": "Yūnus",
    "reference": "10:57–70",
    "startAyah": 57,
    "endAyah": 70,
    "title": "Guidance from the Qur'an",
    "type": "Address"
  },
  {
    "id": "P0104",
    "order": 104,
    "surahNumber": 10,
    "surahName": "Yūnus",
    "reference": "10:71–93",
    "startAyah": 71,
    "endAyah": 93,
    "title": "Nūḥ and Mūsā",
    "type": "Narrative"
  },
  {
    "id": "P0105",
    "order": 105,
    "surahNumber": 10,
    "surahName": "Yūnus",
    "reference": "10:94–109",
    "startAyah": 94,
    "endAyah": 109,
    "title": "The Closing of Yūnus",
    "type": "Address"
  },
  {
    "id": "P0106",
    "order": 106,
    "surahNumber": 11,
    "surahName": "Hūd",
    "reference": "11:1–24",
    "startAyah": 1,
    "endAyah": 24,
    "title": "The Opening of Hūd",
    "type": "Address"
  },
  {
    "id": "P0107",
    "order": 107,
    "surahNumber": 11,
    "surahName": "Hūd",
    "reference": "11:25–49",
    "startAyah": 25,
    "endAyah": 49,
    "title": "Nūḥ",
    "type": "Narrative"
  },
  {
    "id": "P0108",
    "order": 108,
    "surahNumber": 11,
    "surahName": "Hūd",
    "reference": "11:50–60",
    "startAyah": 50,
    "endAyah": 60,
    "title": "Hūd",
    "type": "Narrative"
  },
  {
    "id": "P0109",
    "order": 109,
    "surahNumber": 11,
    "surahName": "Hūd",
    "reference": "11:61–68",
    "startAyah": 61,
    "endAyah": 68,
    "title": "Ṣāliḥ",
    "type": "Narrative"
  },
  {
    "id": "P0110",
    "order": 110,
    "surahNumber": 11,
    "surahName": "Hūd",
    "reference": "11:69–83",
    "startAyah": 69,
    "endAyah": 83,
    "title": "Ibrāhīm and Lūṭ",
    "type": "Narrative"
  },
  {
    "id": "P0111",
    "order": 111,
    "surahNumber": 11,
    "surahName": "Hūd",
    "reference": "11:84–95",
    "startAyah": 84,
    "endAyah": 95,
    "title": "Shuʿayb",
    "type": "Narrative"
  },
  {
    "id": "P0112",
    "order": 112,
    "surahNumber": 11,
    "surahName": "Hūd",
    "reference": "11:96–123",
    "startAyah": 96,
    "endAyah": 123,
    "title": "Mūsā and the Closing of Hūd",
    "type": "Address"
  },
  {
    "id": "P0113",
    "order": 113,
    "surahNumber": 12,
    "surahName": "Yūsuf",
    "reference": "12:1–22",
    "startAyah": 1,
    "endAyah": 22,
    "title": "Yūsuf's Dream and the Well",
    "type": "Narrative"
  },
  {
    "id": "P0114",
    "order": 114,
    "surahNumber": 12,
    "surahName": "Yūsuf",
    "reference": "12:23–35",
    "startAyah": 23,
    "endAyah": 35,
    "title": "The Wife of Al-'Azīz",
    "type": "Narrative"
  },
  {
    "id": "P0115",
    "order": 115,
    "surahNumber": 12,
    "surahName": "Yūsuf",
    "reference": "12:36–57",
    "startAyah": 36,
    "endAyah": 57,
    "title": "Prison and the King's Dream",
    "type": "Narrative"
  },
  {
    "id": "P0116",
    "order": 116,
    "surahNumber": 12,
    "surahName": "Yūsuf",
    "reference": "12:58–76",
    "startAyah": 58,
    "endAyah": 76,
    "title": "The Brothers Return to Egypt",
    "type": "Narrative"
  },
  {
    "id": "P0117",
    "order": 117,
    "surahNumber": 12,
    "surahName": "Yūsuf",
    "reference": "12:77–93",
    "startAyah": 77,
    "endAyah": 93,
    "title": "Yūsuf Reveals Himself",
    "type": "Narrative"
  },
  {
    "id": "P0118",
    "order": 118,
    "surahNumber": 12,
    "surahName": "Yūsuf",
    "reference": "12:94–111",
    "startAyah": 94,
    "endAyah": 111,
    "title": "The Family Reunited",
    "type": "Narrative"
  },
  {
    "id": "P0119",
    "order": 119,
    "surahNumber": 13,
    "surahName": "Ar-Raʿd",
    "reference": "13:1–18",
    "startAyah": 1,
    "endAyah": 18,
    "title": "The Opening of Ar-Raʿd",
    "type": "Description"
  },
  {
    "id": "P0120",
    "order": 120,
    "surahNumber": 13,
    "surahName": "Ar-Raʿd",
    "reference": "13:19–43",
    "startAyah": 19,
    "endAyah": 43,
    "title": "Truth and Falsehood",
    "type": "Address"
  },
  {
    "id": "P0121",
    "order": 121,
    "surahNumber": 14,
    "surahName": "Ibrāhīm",
    "reference": "14:1–27",
    "startAyah": 1,
    "endAyah": 27,
    "title": "Guidance and Gratitude",
    "type": "Address"
  },
  {
    "id": "P0122",
    "order": 122,
    "surahNumber": 14,
    "surahName": "Ibrāhīm",
    "reference": "14:28–52",
    "startAyah": 28,
    "endAyah": 52,
    "title": "The Closing of Ibrāhīm",
    "type": "Address"
  },
  {
    "id": "P0123",
    "order": 123,
    "surahNumber": 15,
    "surahName": "Al-Ḥijr",
    "reference": "15:1–25",
    "startAyah": 1,
    "endAyah": 25,
    "title": "The Opening of Al-Ḥijr",
    "type": "Address"
  },
  {
    "id": "P0124",
    "order": 124,
    "surahNumber": 15,
    "surahName": "Al-Ḥijr",
    "reference": "15:26–50",
    "startAyah": 26,
    "endAyah": 50,
    "title": "Adam and Iblīs",
    "type": "Narrative"
  },
  {
    "id": "P0125",
    "order": 125,
    "surahNumber": 15,
    "surahName": "Al-Ḥijr",
    "reference": "15:51–84",
    "startAyah": 51,
    "endAyah": 84,
    "title": "Ibrāhīm and the People of Lūṭ",
    "type": "Narrative"
  },
  {
    "id": "P0126",
    "order": 126,
    "surahNumber": 15,
    "surahName": "Al-Ḥijr",
    "reference": "15:85–99",
    "startAyah": 85,
    "endAyah": 99,
    "title": "The Closing of Al-Ḥijr",
    "type": "Address"
  },
  {
    "id": "P0127",
    "order": 127,
    "surahNumber": 16,
    "surahName": "An-Naḥl",
    "reference": "16:1–30",
    "startAyah": 1,
    "endAyah": 30,
    "title": "Blessings and Revelation",
    "type": "Description"
  },
  {
    "id": "P0128",
    "order": 128,
    "surahNumber": 16,
    "surahName": "An-Naḥl",
    "reference": "16:31–64",
    "startAyah": 31,
    "endAyah": 64,
    "title": "The People of Paradise and the Signs of Allah",
    "type": "Description"
  },
  {
    "id": "P0129",
    "order": 129,
    "surahNumber": 16,
    "surahName": "An-Naḥl",
    "reference": "16:65–89",
    "startAyah": 65,
    "endAyah": 89,
    "title": "Signs in Creation",
    "type": "Description"
  },
  {
    "id": "P0130",
    "order": 130,
    "surahNumber": 16,
    "surahName": "An-Naḥl",
    "reference": "16:90–128",
    "startAyah": 90,
    "endAyah": 128,
    "title": "Justice, Excellence, and Patience",
    "type": "Address"
  },
  {
    "id": "P0131",
    "order": 131,
    "surahNumber": 17,
    "surahName": "Al-Isrāʾ",
    "reference": "17:1–22",
    "startAyah": 1,
    "endAyah": 22,
    "title": "The Night Journey and Guidance",
    "type": "Narrative"
  },
  {
    "id": "P0132",
    "order": 132,
    "surahNumber": 17,
    "surahName": "Al-Isrāʾ",
    "reference": "17:23–39",
    "startAyah": 23,
    "endAyah": 39,
    "title": "Commands and Prohibitions",
    "type": "Legal"
  },
  {
    "id": "P0133",
    "order": 133,
    "surahNumber": 17,
    "surahName": "Al-Isrāʾ",
    "reference": "17:40–60",
    "startAyah": 40,
    "endAyah": 60,
    "title": "Revelation and Accountability",
    "type": "Address"
  },
  {
    "id": "P0134",
    "order": 134,
    "surahNumber": 17,
    "surahName": "Al-Isrāʾ",
    "reference": "17:61–84",
    "startAyah": 61,
    "endAyah": 84,
    "title": "Iblīs and Human Guidance",
    "type": "Narrative"
  },
  {
    "id": "P0135",
    "order": 135,
    "surahNumber": 17,
    "surahName": "Al-Isrāʾ",
    "reference": "17:85–111",
    "startAyah": 85,
    "endAyah": 111,
    "title": "The Closing of Al-Isrāʾ",
    "type": "Address"
  },
  {
    "id": "P0136",
    "order": 136,
    "surahNumber": 18,
    "surahName": "Al-Kahf",
    "reference": "18:1–8",
    "startAyah": 1,
    "endAyah": 8,
    "title": "The Opening of Al-Kahf",
    "type": "Description"
  },
  {
    "id": "P0137",
    "order": 137,
    "surahNumber": 18,
    "surahName": "Al-Kahf",
    "reference": "18:9–26",
    "startAyah": 9,
    "endAyah": 26,
    "title": "The People of the Cave",
    "type": "Narrative"
  },
  {
    "id": "P0138",
    "order": 138,
    "surahNumber": 18,
    "surahName": "Al-Kahf",
    "reference": "18:27–31",
    "startAyah": 27,
    "endAyah": 31,
    "title": "Recite What Has Been Revealed",
    "type": "Address"
  },
  {
    "id": "P0139",
    "order": 139,
    "surahNumber": 18,
    "surahName": "Al-Kahf",
    "reference": "18:32–44",
    "startAyah": 32,
    "endAyah": 44,
    "title": "The Two Gardens",
    "type": "Parable"
  },
  {
    "id": "P0140",
    "order": 140,
    "surahNumber": 18,
    "surahName": "Al-Kahf",
    "reference": "18:45–59",
    "startAyah": 45,
    "endAyah": 59,
    "title": "The Life of This World",
    "type": "Description"
  },
  {
    "id": "P0141",
    "order": 141,
    "surahNumber": 18,
    "surahName": "Al-Kahf",
    "reference": "18:60–82",
    "startAyah": 60,
    "endAyah": 82,
    "title": "Mūsā and Al-Khiḍr",
    "type": "Narrative"
  },
  {
    "id": "P0142",
    "order": 142,
    "surahNumber": 18,
    "surahName": "Al-Kahf",
    "reference": "18:83–98",
    "startAyah": 83,
    "endAyah": 98,
    "title": "Dhul-Qarnayn",
    "type": "Narrative"
  },
  {
    "id": "P0143",
    "order": 143,
    "surahNumber": 18,
    "surahName": "Al-Kahf",
    "reference": "18:99–110",
    "startAyah": 99,
    "endAyah": 110,
    "title": "The Closing of Al-Kahf",
    "type": "Description"
  },
  {
    "id": "P0144",
    "order": 144,
    "surahNumber": 19,
    "surahName": "Maryam",
    "reference": "19:1–40",
    "startAyah": 1,
    "endAyah": 40,
    "title": "Zakariyyā, Yaḥyā, Maryam, and ʿĪsā",
    "type": "Narrative"
  },
  {
    "id": "P0145",
    "order": 145,
    "surahNumber": 19,
    "surahName": "Maryam",
    "reference": "19:41–65",
    "startAyah": 41,
    "endAyah": 65,
    "title": "Ibrāhīm and the Prophets",
    "type": "Narrative"
  },
  {
    "id": "P0146",
    "order": 146,
    "surahNumber": 19,
    "surahName": "Maryam",
    "reference": "19:66–98",
    "startAyah": 66,
    "endAyah": 98,
    "title": "The Resurrection and the Closing of Maryam",
    "type": "Address"
  },
  {
    "id": "P0147",
    "order": 147,
    "surahNumber": 20,
    "surahName": "Ṭā Hā",
    "reference": "20:1–36",
    "startAyah": 1,
    "endAyah": 36,
    "title": "The Call of Mūsā",
    "type": "Narrative"
  },
  {
    "id": "P0148",
    "order": 148,
    "surahNumber": 20,
    "surahName": "Ṭā Hā",
    "reference": "20:37–76",
    "startAyah": 37,
    "endAyah": 76,
    "title": "Mūsā Before Firʿawn",
    "type": "Narrative"
  },
  {
    "id": "P0149",
    "order": 149,
    "surahNumber": 20,
    "surahName": "Ṭā Hā",
    "reference": "20:77–98",
    "startAyah": 77,
    "endAyah": 98,
    "title": "The Deliverance and the Calf",
    "type": "Narrative"
  },
  {
    "id": "P0150",
    "order": 150,
    "surahNumber": 20,
    "surahName": "Ṭā Hā",
    "reference": "20:99–135",
    "startAyah": 99,
    "endAyah": 135,
    "title": "The Closing of Ṭā Hā",
    "type": "Address"
  },
  {
    "id": "P0151",
    "order": 151,
    "surahNumber": 21,
    "surahName": "Al-Anbiyāʾ",
    "reference": "21:1–29",
    "startAyah": 1,
    "endAyah": 29,
    "title": "The Nearness of the Hour",
    "type": "Address"
  },
  {
    "id": "P0152",
    "order": 152,
    "surahNumber": 21,
    "surahName": "Al-Anbiyāʾ",
    "reference": "21:30–47",
    "startAyah": 30,
    "endAyah": 47,
    "title": "Signs and Resurrection",
    "type": "Description"
  },
  {
    "id": "P0153",
    "order": 153,
    "surahNumber": 21,
    "surahName": "Al-Anbiyāʾ",
    "reference": "21:48–91",
    "startAyah": 48,
    "endAyah": 91,
    "title": "The Prophets",
    "type": "Narrative"
  },
  {
    "id": "P0154",
    "order": 154,
    "surahNumber": 21,
    "surahName": "Al-Anbiyāʾ",
    "reference": "21:92–112",
    "startAyah": 92,
    "endAyah": 112,
    "title": "The Closing of Al-Anbiyāʾ",
    "type": "Address"
  },
  {
    "id": "P0155",
    "order": 155,
    "surahNumber": 22,
    "surahName": "Al-Ḥajj",
    "reference": "22:1–24",
    "startAyah": 1,
    "endAyah": 24,
    "title": "The Day of Resurrection",
    "type": "Address"
  },
  {
    "id": "P0156",
    "order": 156,
    "surahNumber": 22,
    "surahName": "Al-Ḥajj",
    "reference": "22:25–41",
    "startAyah": 25,
    "endAyah": 41,
    "title": "The Sacred Mosque and Permission to Fight",
    "type": "Legal"
  },
  {
    "id": "P0157",
    "order": 157,
    "surahNumber": 22,
    "surahName": "Al-Ḥajj",
    "reference": "22:42–57",
    "startAyah": 42,
    "endAyah": 57,
    "title": "Previous Nations",
    "type": "Narrative"
  },
  {
    "id": "P0158",
    "order": 158,
    "surahNumber": 22,
    "surahName": "Al-Ḥajj",
    "reference": "22:58–78",
    "startAyah": 58,
    "endAyah": 78,
    "title": "Striving in the Cause of Allah",
    "type": "Address"
  },
  {
    "id": "P0159",
    "order": 159,
    "surahNumber": 23,
    "surahName": "Al-Muʾminūn",
    "reference": "23:1–30",
    "startAyah": 1,
    "endAyah": 30,
    "title": "The Successful Believers and Nūḥ",
    "type": "Narrative"
  },
  {
    "id": "P0160",
    "order": 160,
    "surahNumber": 23,
    "surahName": "Al-Muʾminūn",
    "reference": "23:31–77",
    "startAyah": 31,
    "endAyah": 77,
    "title": "Later Nations and Their Messengers",
    "type": "Narrative"
  },
  {
    "id": "P0161",
    "order": 161,
    "surahNumber": 23,
    "surahName": "Al-Muʾminūn",
    "reference": "23:78–118",
    "startAyah": 78,
    "endAyah": 118,
    "title": "The Closing of Al-Muʾminūn",
    "type": "Address"
  },
  {
    "id": "P0162",
    "order": 162,
    "surahNumber": 24,
    "surahName": "An-Nūr",
    "reference": "24:1–26",
    "startAyah": 1,
    "endAyah": 26,
    "title": "The Slander",
    "type": "Legal"
  },
  {
    "id": "P0163",
    "order": 163,
    "surahNumber": 24,
    "surahName": "An-Nūr",
    "reference": "24:27–34",
    "startAyah": 27,
    "endAyah": 34,
    "title": "Privacy and Modesty",
    "type": "Legal"
  },
  {
    "id": "P0164",
    "order": 164,
    "surahNumber": 24,
    "surahName": "An-Nūr",
    "reference": "24:35–46",
    "startAyah": 35,
    "endAyah": 46,
    "title": "The Light Verse",
    "type": "Description"
  },
  {
    "id": "P0165",
    "order": 165,
    "surahNumber": 24,
    "surahName": "An-Nūr",
    "reference": "24:47–64",
    "startAyah": 47,
    "endAyah": 64,
    "title": "Obedience to Allah and His Messenger",
    "type": "Address"
  },
  {
    "id": "P0166",
    "order": 166,
    "surahNumber": 25,
    "surahName": "Al-Furqān",
    "reference": "25:1–20",
    "startAyah": 1,
    "endAyah": 20,
    "title": "The Opening of Al-Furqān",
    "type": "Address"
  },
  {
    "id": "P0167",
    "order": 167,
    "surahNumber": 25,
    "surahName": "Al-Furqān",
    "reference": "25:21–44",
    "startAyah": 21,
    "endAyah": 44,
    "title": "The Response of the Disbelievers",
    "type": "Address"
  },
  {
    "id": "P0168",
    "order": 168,
    "surahNumber": 25,
    "surahName": "Al-Furqān",
    "reference": "25:45–62",
    "startAyah": 45,
    "endAyah": 62,
    "title": "Signs in Creation",
    "type": "Description"
  },
  {
    "id": "P0169",
    "order": 169,
    "surahNumber": 25,
    "surahName": "Al-Furqān",
    "reference": "25:63–77",
    "startAyah": 63,
    "endAyah": 77,
    "title": "The Servants of the Most Merciful",
    "type": "Description"
  },
  {
    "id": "P0170",
    "order": 170,
    "surahNumber": 26,
    "surahName": "Ash-Shuʿarāʾ",
    "reference": "26:1–68",
    "startAyah": 1,
    "endAyah": 68,
    "title": "Mūsā and Firʿawn",
    "type": "Narrative"
  },
  {
    "id": "P0171",
    "order": 171,
    "surahNumber": 26,
    "surahName": "Ash-Shuʿarāʾ",
    "reference": "26:69–104",
    "startAyah": 69,
    "endAyah": 104,
    "title": "Ibrāhīm",
    "type": "Narrative"
  },
  {
    "id": "P0172",
    "order": 172,
    "surahNumber": 26,
    "surahName": "Ash-Shuʿarāʾ",
    "reference": "26:105–191",
    "startAyah": 105,
    "endAyah": 191,
    "title": "Nūḥ Through Lūṭ",
    "type": "Narrative"
  },
  {
    "id": "P0173",
    "order": 173,
    "surahNumber": 26,
    "surahName": "Ash-Shuʿarāʾ",
    "reference": "26:192–227",
    "startAyah": 192,
    "endAyah": 227,
    "title": "Revelation and the Poets",
    "type": "Address"
  },
  {
    "id": "P0174",
    "order": 174,
    "surahNumber": 27,
    "surahName": "An-Naml",
    "reference": "27:1–19",
    "startAyah": 1,
    "endAyah": 19,
    "title": "Mūsā and Sulaymān",
    "type": "Narrative"
  },
  {
    "id": "P0175",
    "order": 175,
    "surahNumber": 27,
    "surahName": "An-Naml",
    "reference": "27:20–44",
    "startAyah": 20,
    "endAyah": 44,
    "title": "Sulaymān and the Queen of Sheba",
    "type": "Narrative"
  },
  {
    "id": "P0176",
    "order": 176,
    "surahNumber": 27,
    "surahName": "An-Naml",
    "reference": "27:45–58",
    "startAyah": 45,
    "endAyah": 58,
    "title": "Ṣāliḥ and Lūṭ",
    "type": "Narrative"
  },
  {
    "id": "P0177",
    "order": 177,
    "surahNumber": 27,
    "surahName": "An-Naml",
    "reference": "27:59–93",
    "startAyah": 59,
    "endAyah": 93,
    "title": "Signs of Allah and the Closing of An-Naml",
    "type": "Address"
  },
  {
    "id": "P0178",
    "order": 178,
    "surahNumber": 28,
    "surahName": "Al-Qaṣaṣ",
    "reference": "28:1–43",
    "startAyah": 1,
    "endAyah": 43,
    "title": "The Birth and Early Life of Mūsā",
    "type": "Narrative"
  },
  {
    "id": "P0179",
    "order": 179,
    "surahNumber": 28,
    "surahName": "Al-Qaṣaṣ",
    "reference": "28:44–70",
    "startAyah": 44,
    "endAyah": 70,
    "title": "Revelation and the Truth",
    "type": "Address"
  },
  {
    "id": "P0180",
    "order": 180,
    "surahNumber": 28,
    "surahName": "Al-Qaṣaṣ",
    "reference": "28:71–88",
    "startAyah": 71,
    "endAyah": 88,
    "title": "Qarūn and the Closing of Al-Qaṣaṣ",
    "type": "Narrative"
  },
  {
    "id": "P0181",
    "order": 181,
    "surahNumber": 29,
    "surahName": "Al-ʿAnkabūt",
    "reference": "29:1–44",
    "startAyah": 1,
    "endAyah": 44,
    "title": "Trials of Faith and Earlier Nations",
    "type": "Narrative"
  },
  {
    "id": "P0182",
    "order": 182,
    "surahNumber": 29,
    "surahName": "Al-ʿAnkabūt",
    "reference": "29:45–69",
    "startAyah": 45,
    "endAyah": 69,
    "title": "Worship, Debate, and Striving",
    "type": "Address"
  },
  {
    "id": "P0183",
    "order": 183,
    "surahNumber": 30,
    "surahName": "Ar-Rūm",
    "reference": "30:1–27",
    "startAyah": 1,
    "endAyah": 27,
    "title": "Victory, Resurrection, and the Signs of Allah",
    "type": "Description"
  },
  {
    "id": "P0184",
    "order": 184,
    "surahNumber": 30,
    "surahName": "Ar-Rūm",
    "reference": "30:28–60",
    "startAyah": 28,
    "endAyah": 60,
    "title": "Signs in Creation and the Closing of Ar-Rūm",
    "type": "Description"
  },
  {
    "id": "P0185",
    "order": 185,
    "surahNumber": 31,
    "surahName": "Luqmān",
    "reference": "31:1–19",
    "startAyah": 1,
    "endAyah": 19,
    "title": "Luqmān's Advice to His Son",
    "type": "Narrative"
  },
  {
    "id": "P0186",
    "order": 186,
    "surahNumber": 31,
    "surahName": "Luqmān",
    "reference": "31:20–34",
    "startAyah": 20,
    "endAyah": 34,
    "title": "The Closing of Luqmān",
    "type": "Address"
  },
  {
    "id": "P0187",
    "order": 187,
    "surahNumber": 32,
    "surahName": "As-Sajdah",
    "reference": "32:1–30",
    "startAyah": 1,
    "endAyah": 30,
    "title": "The Whole Surah",
    "type": "Address"
  },
  {
    "id": "P0188",
    "order": 188,
    "surahNumber": 33,
    "surahName": "Al-Aḥzāb",
    "reference": "33:1–27",
    "startAyah": 1,
    "endAyah": 27,
    "title": "The Battle of the Trench",
    "type": "Narrative"
  },
  {
    "id": "P0189",
    "order": 189,
    "surahNumber": 33,
    "surahName": "Al-Aḥzāb",
    "reference": "33:28–48",
    "startAyah": 28,
    "endAyah": 48,
    "title": "The Household of the Prophet ﷺ",
    "type": "Legal"
  },
  {
    "id": "P0190",
    "order": 190,
    "surahNumber": 33,
    "surahName": "Al-Aḥzāb",
    "reference": "33:49–73",
    "startAyah": 49,
    "endAyah": 73,
    "title": "Marriage, Manners, and the Closing of Al-Aḥzāb",
    "type": "Legal"
  },
  {
    "id": "P0191",
    "order": 191,
    "surahNumber": 34,
    "surahName": "Saba'",
    "reference": "34:1–30",
    "startAyah": 1,
    "endAyah": 30,
    "title": "Gratitude and the Signs of Allah",
    "type": "Description"
  },
  {
    "id": "P0192",
    "order": 192,
    "surahNumber": 34,
    "surahName": "Saba'",
    "reference": "34:31–54",
    "startAyah": 31,
    "endAyah": 54,
    "title": "The Closing of Saba'",
    "type": "Address"
  },
  {
    "id": "P0193",
    "order": 193,
    "surahNumber": 35,
    "surahName": "Fāṭir",
    "reference": "35:1–45",
    "startAyah": 1,
    "endAyah": 45,
    "title": "The Whole Surah",
    "type": "Address"
  },
  {
    "id": "P0194",
    "order": 194,
    "surahNumber": 36,
    "surahName": "Yā Sīn",
    "reference": "36:1–32",
    "startAyah": 1,
    "endAyah": 32,
    "title": "The Messengers of the Town",
    "type": "Narrative"
  },
  {
    "id": "P0195",
    "order": 195,
    "surahNumber": 36,
    "surahName": "Yā Sīn",
    "reference": "36:33–50",
    "startAyah": 33,
    "endAyah": 50,
    "title": "Signs of Allah in Creation",
    "type": "Description"
  },
  {
    "id": "P0196",
    "order": 196,
    "surahNumber": 36,
    "surahName": "Yā Sīn",
    "reference": "36:51–83",
    "startAyah": 51,
    "endAyah": 83,
    "title": "Resurrection and the Closing of Yā Sīn",
    "type": "Description"
  },
  {
    "id": "P0197",
    "order": 197,
    "surahNumber": 37,
    "surahName": "Aṣ-Ṣāffāt",
    "reference": "37:1–74",
    "startAyah": 1,
    "endAyah": 74,
    "title": "The Prophets and Their Peoples",
    "type": "Narrative"
  },
  {
    "id": "P0198",
    "order": 198,
    "surahNumber": 37,
    "surahName": "Aṣ-Ṣāffāt",
    "reference": "37:75–148",
    "startAyah": 75,
    "endAyah": 148,
    "title": "Nūḥ Through Yūnus",
    "type": "Narrative"
  },
  {
    "id": "P0199",
    "order": 199,
    "surahNumber": 37,
    "surahName": "Aṣ-Ṣāffāt",
    "reference": "37:149–182",
    "startAyah": 149,
    "endAyah": 182,
    "title": "The Closing of Aṣ-Ṣāffāt",
    "type": "Address"
  },
  {
    "id": "P0200",
    "order": 200,
    "surahNumber": 38,
    "surahName": "Ṣād",
    "reference": "38:1–64",
    "startAyah": 1,
    "endAyah": 64,
    "title": "Dāwūd, Sulaymān, and Ayyūb",
    "type": "Narrative"
  },
  {
    "id": "P0201",
    "order": 201,
    "surahNumber": 38,
    "surahName": "Ṣād",
    "reference": "38:65–88",
    "startAyah": 65,
    "endAyah": 88,
    "title": "Adam, Iblīs, and the Closing of Ṣād",
    "type": "Narrative"
  },
  {
    "id": "P0202",
    "order": 202,
    "surahNumber": 39,
    "surahName": "Az-Zumar",
    "reference": "39:1–31",
    "startAyah": 1,
    "endAyah": 31,
    "title": "Sincere Worship",
    "type": "Address"
  },
  {
    "id": "P0203",
    "order": 203,
    "surahNumber": 39,
    "surahName": "Az-Zumar",
    "reference": "39:32–52",
    "startAyah": 32,
    "endAyah": 52,
    "title": "Truth and Falsehood",
    "type": "Address"
  },
  {
    "id": "P0204",
    "order": 204,
    "surahNumber": 39,
    "surahName": "Az-Zumar",
    "reference": "39:53–75",
    "startAyah": 53,
    "endAyah": 75,
    "title": "Mercy, Repentance, and the Hereafter",
    "type": "Address"
  },
  {
    "id": "P0205",
    "order": 205,
    "surahNumber": 40,
    "surahName": "Ghāfir",
    "reference": "40:1–30",
    "startAyah": 1,
    "endAyah": 30,
    "title": "The Opening of Ghāfir",
    "type": "Address"
  },
  {
    "id": "P0206",
    "order": 206,
    "surahNumber": 40,
    "surahName": "Ghāfir",
    "reference": "40:31–55",
    "startAyah": 31,
    "endAyah": 55,
    "title": "The Believing Man",
    "type": "Narrative"
  },
  {
    "id": "P0207",
    "order": 207,
    "surahNumber": 40,
    "surahName": "Ghāfir",
    "reference": "40:56–85",
    "startAyah": 56,
    "endAyah": 85,
    "title": "The Closing of Ghāfir",
    "type": "Address"
  },
  {
    "id": "P0208",
    "order": 208,
    "surahNumber": 41,
    "surahName": "Fuṣṣilat",
    "reference": "41:1–29",
    "startAyah": 1,
    "endAyah": 29,
    "title": "Revelation and the Response to It",
    "type": "Address"
  },
  {
    "id": "P0209",
    "order": 209,
    "surahNumber": 41,
    "surahName": "Fuṣṣilat",
    "reference": "41:30–54",
    "startAyah": 30,
    "endAyah": 54,
    "title": "The Friends of Allah and the Closing of Fuṣṣilat",
    "type": "Address"
  },
  {
    "id": "P0210",
    "order": 210,
    "surahNumber": 42,
    "surahName": "Ash-Shūrā",
    "reference": "42:1–29",
    "startAyah": 1,
    "endAyah": 29,
    "title": "Revelation and Allah's Sovereignty",
    "type": "Description"
  },
  {
    "id": "P0211",
    "order": 211,
    "surahNumber": 42,
    "surahName": "Ash-Shūrā",
    "reference": "42:30–53",
    "startAyah": 30,
    "endAyah": 53,
    "title": "Unity, Consultation, and Revelation",
    "type": "Address"
  },
  {
    "id": "P0212",
    "order": 212,
    "surahNumber": 43,
    "surahName": "Az-Zukhruf",
    "reference": "43:1–45",
    "startAyah": 1,
    "endAyah": 45,
    "title": "Revelation and Earlier Messengers",
    "type": "Narrative"
  },
  {
    "id": "P0213",
    "order": 213,
    "surahNumber": 43,
    "surahName": "Az-Zukhruf",
    "reference": "43:46–89",
    "startAyah": 46,
    "endAyah": 89,
    "title": "Mūsā, ʿĪsā, and the Closing of Az-Zukhruf",
    "type": "Narrative"
  },
  {
    "id": "P0214",
    "order": 214,
    "surahNumber": 44,
    "surahName": "Ad-Dukhān",
    "reference": "44:1–59",
    "startAyah": 1,
    "endAyah": 59,
    "title": "The Whole Surah",
    "type": "Address"
  },
  {
    "id": "P0215",
    "order": 215,
    "surahNumber": 45,
    "surahName": "Al-Jāthiyah",
    "reference": "45:1–37",
    "startAyah": 1,
    "endAyah": 37,
    "title": "The Whole Surah",
    "type": "Address"
  },
  {
    "id": "P0216",
    "order": 216,
    "surahNumber": 46,
    "surahName": "Al-Aḥqāf",
    "reference": "46:1–21",
    "startAyah": 1,
    "endAyah": 21,
    "title": "Revelation and the People of ʿĀd",
    "type": "Narrative"
  },
  {
    "id": "P0217",
    "order": 217,
    "surahNumber": 46,
    "surahName": "Al-Aḥqāf",
    "reference": "46:22–35",
    "startAyah": 22,
    "endAyah": 35,
    "title": "The Jinn and the Closing of Al-Aḥqāf",
    "type": "Narrative"
  },
  {
    "id": "P0218",
    "order": 218,
    "surahNumber": 47,
    "surahName": "Muḥammad",
    "reference": "47:1–19",
    "startAyah": 1,
    "endAyah": 19,
    "title": "The Believers and the Disbelievers",
    "type": "Address"
  },
  {
    "id": "P0219",
    "order": 219,
    "surahNumber": 47,
    "surahName": "Muḥammad",
    "reference": "47:20–38",
    "startAyah": 20,
    "endAyah": 38,
    "title": "Obedience and Steadfastness",
    "type": "Address"
  },
  {
    "id": "P0220",
    "order": 220,
    "surahNumber": 48,
    "surahName": "Al-Fatḥ",
    "reference": "48:1–29",
    "startAyah": 1,
    "endAyah": 29,
    "title": "The Whole Surah",
    "type": "Narrative"
  },
  {
    "id": "P0221",
    "order": 221,
    "surahNumber": 49,
    "surahName": "Al-Ḥujurāt",
    "reference": "49:1–18",
    "startAyah": 1,
    "endAyah": 18,
    "title": "Manners and Brotherhood",
    "type": "Address"
  },
  {
    "id": "P0222",
    "order": 222,
    "surahNumber": 50,
    "surahName": "Qāf",
    "reference": "50:1–45",
    "startAyah": 1,
    "endAyah": 45,
    "title": "The Whole Surah",
    "type": "Address"
  },
  {
    "id": "P0223",
    "order": 223,
    "surahNumber": 51,
    "surahName": "Adh-Dhāriyāt",
    "reference": "51:1–30",
    "startAyah": 1,
    "endAyah": 30,
    "title": "The Resurrection and the Guests of Ibrāhīm",
    "type": "Narrative"
  },
  {
    "id": "P0224",
    "order": 224,
    "surahNumber": 51,
    "surahName": "Adh-Dhāriyāt",
    "reference": "51:31–60",
    "startAyah": 31,
    "endAyah": 60,
    "title": "Earlier Nations and the Purpose of Creation",
    "type": "Narrative"
  },
  {
    "id": "P0225",
    "order": 225,
    "surahNumber": 52,
    "surahName": "Aṭ-Ṭūr",
    "reference": "52:1–49",
    "startAyah": 1,
    "endAyah": 49,
    "title": "The Whole Surah",
    "type": "Address"
  },
  {
    "id": "P0226",
    "order": 226,
    "surahNumber": 53,
    "surahName": "An-Najm",
    "reference": "53:1–62",
    "startAyah": 1,
    "endAyah": 62,
    "title": "The Whole Surah",
    "type": "Address"
  },
  {
    "id": "P0227",
    "order": 227,
    "surahNumber": 54,
    "surahName": "Al-Qamar",
    "reference": "54:1–55",
    "startAyah": 1,
    "endAyah": 55,
    "title": "Earlier Nations and the Hour",
    "type": "Narrative"
  },
  {
    "id": "P0228",
    "order": 228,
    "surahNumber": 55,
    "surahName": "Ar-Raḥmān",
    "reference": "55:1–78",
    "startAyah": 1,
    "endAyah": 78,
    "title": "The Favors of Ar-Raḥmān",
    "type": "Description"
  },
  {
    "id": "P0229",
    "order": 229,
    "surahNumber": 56,
    "surahName": "Al-Wāqiʿah",
    "reference": "56:1–56",
    "startAyah": 1,
    "endAyah": 56,
    "title": "The Three Groups",
    "type": "Description"
  },
  {
    "id": "P0230",
    "order": 230,
    "surahNumber": 56,
    "surahName": "Al-Wāqiʿah",
    "reference": "56:57–96",
    "startAyah": 57,
    "endAyah": 96,
    "title": "Creation, Provision, and Certainty",
    "type": "Description"
  },
  {
    "id": "P0231",
    "order": 231,
    "surahNumber": 57,
    "surahName": "Al-Ḥadīd",
    "reference": "57:1–15",
    "startAyah": 1,
    "endAyah": 15,
    "title": "Faith, Spending, and Light",
    "type": "Address"
  },
  {
    "id": "P0232",
    "order": 232,
    "surahNumber": 57,
    "surahName": "Al-Ḥadīd",
    "reference": "57:16–29",
    "startAyah": 16,
    "endAyah": 29,
    "title": "Hearts, Worldly Life, and Messengers",
    "type": "Address"
  },
  {
    "id": "P0233",
    "order": 233,
    "surahNumber": 58,
    "surahName": "Al-Mujādilah",
    "reference": "58:1–13",
    "startAyah": 1,
    "endAyah": 13,
    "title": "Ẓihār and Private Conversation",
    "type": "Legal"
  },
  {
    "id": "P0234",
    "order": 234,
    "surahNumber": 58,
    "surahName": "Al-Mujādilah",
    "reference": "58:14–22",
    "startAyah": 14,
    "endAyah": 22,
    "title": "Loyalty and the Party of Allah",
    "type": "Address"
  },
  {
    "id": "P0235",
    "order": 235,
    "surahNumber": 59,
    "surahName": "Al-Ḥashr",
    "reference": "59:1–10",
    "startAyah": 1,
    "endAyah": 10,
    "title": "The Exile of Banū Naḍīr",
    "type": "Narrative"
  },
  {
    "id": "P0236",
    "order": 236,
    "surahNumber": 59,
    "surahName": "Al-Ḥashr",
    "reference": "59:11–24",
    "startAyah": 11,
    "endAyah": 24,
    "title": "The Hypocrites and the Names of Allah",
    "type": "Address"
  },
  {
    "id": "P0237",
    "order": 237,
    "surahNumber": 60,
    "surahName": "Al-Mumtaḥanah",
    "reference": "60:1–13",
    "startAyah": 1,
    "endAyah": 13,
    "title": "Loyalty, Kindness, and Allegiance",
    "type": "Address"
  },
  {
    "id": "P0238",
    "order": 238,
    "surahNumber": 61,
    "surahName": "Aṣ-Ṣaff",
    "reference": "61:1–14",
    "startAyah": 1,
    "endAyah": 14,
    "title": "Standing Firm in the Cause of Allah",
    "type": "Address"
  },
  {
    "id": "P0239",
    "order": 239,
    "surahNumber": 62,
    "surahName": "Al-Jumuʿah",
    "reference": "62:1–11",
    "startAyah": 1,
    "endAyah": 11,
    "title": "Friday Prayer",
    "type": "Address"
  },
  {
    "id": "P0240",
    "order": 240,
    "surahNumber": 63,
    "surahName": "Al-Munāfiqūn",
    "reference": "63:1–11",
    "startAyah": 1,
    "endAyah": 11,
    "title": "The Hypocrites",
    "type": "Description"
  },
  {
    "id": "P0241",
    "order": 241,
    "surahNumber": 64,
    "surahName": "At-Taghābun",
    "reference": "64:1–18",
    "startAyah": 1,
    "endAyah": 18,
    "title": "Faith, Loss, and Reliance Upon Allah",
    "type": "Address"
  },
  {
    "id": "P0242",
    "order": 242,
    "surahNumber": 65,
    "surahName": "Aṭ-Ṭalāq",
    "reference": "65:1–12",
    "startAyah": 1,
    "endAyah": 12,
    "title": "Divorce",
    "type": "Legal"
  },
  {
    "id": "P0243",
    "order": 243,
    "surahNumber": 66,
    "surahName": "At-Taḥrīm",
    "reference": "66:1–12",
    "startAyah": 1,
    "endAyah": 12,
    "title": "The Prophet's Household",
    "type": "Narrative"
  },
  {
    "id": "P0244",
    "order": 244,
    "surahNumber": 67,
    "surahName": "Al-Mulk",
    "reference": "67:1–30",
    "startAyah": 1,
    "endAyah": 30,
    "title": "The Dominion",
    "type": "Description"
  },
  {
    "id": "P0245",
    "order": 245,
    "surahNumber": 68,
    "surahName": "Al-Qalam",
    "reference": "68:1–33",
    "startAyah": 1,
    "endAyah": 33,
    "title": "The Character of the Prophet and the Owners of the Garden",
    "type": "Narrative"
  },
  {
    "id": "P0246",
    "order": 246,
    "surahNumber": 68,
    "surahName": "Al-Qalam",
    "reference": "68:34–52",
    "startAyah": 34,
    "endAyah": 52,
    "title": "The Closing of Al-Qalam",
    "type": "Address"
  },
  {
    "id": "P0247",
    "order": 247,
    "surahNumber": 69,
    "surahName": "Al-Ḥāqqah",
    "reference": "69:1–37",
    "startAyah": 1,
    "endAyah": 37,
    "title": "The Reality",
    "type": "Description"
  },
  {
    "id": "P0248",
    "order": 248,
    "surahNumber": 69,
    "surahName": "Al-Ḥāqqah",
    "reference": "69:38–52",
    "startAyah": 38,
    "endAyah": 52,
    "title": "The Qur'an is Revelation",
    "type": "Address"
  },
  {
    "id": "P0249",
    "order": 249,
    "surahNumber": 70,
    "surahName": "Al-Maʿārij",
    "reference": "70:1–44",
    "startAyah": 1,
    "endAyah": 44,
    "title": "The Ascending Ways",
    "type": "Description"
  },
  {
    "id": "P0250",
    "order": 250,
    "surahNumber": 71,
    "surahName": "Nūḥ",
    "reference": "71:1–28",
    "startAyah": 1,
    "endAyah": 28,
    "title": "Nūḥ's Call",
    "type": "Narrative"
  },
  {
    "id": "P0251",
    "order": 251,
    "surahNumber": 72,
    "surahName": "Al-Jinn",
    "reference": "72:1–28",
    "startAyah": 1,
    "endAyah": 28,
    "title": "The Jinn Hear the Qur'an",
    "type": "Narrative"
  },
  {
    "id": "P0252",
    "order": 252,
    "surahNumber": 73,
    "surahName": "Al-Muzzammil",
    "reference": "73:1–20",
    "startAyah": 1,
    "endAyah": 20,
    "title": "Stand in Prayer at Night",
    "type": "Address"
  },
  {
    "id": "P0253",
    "order": 253,
    "surahNumber": 74,
    "surahName": "Al-Muddaththir",
    "reference": "74:1–31",
    "startAyah": 1,
    "endAyah": 31,
    "title": "Arise and Warn",
    "type": "Address"
  },
  {
    "id": "P0254",
    "order": 254,
    "surahNumber": 74,
    "surahName": "Al-Muddaththir",
    "reference": "74:32–56",
    "startAyah": 32,
    "endAyah": 56,
    "title": "The Closing of Al-Muddaththir",
    "type": "Address"
  },
  {
    "id": "P0255",
    "order": 255,
    "surahNumber": 75,
    "surahName": "Al-Qiyāmah",
    "reference": "75:1–40",
    "startAyah": 1,
    "endAyah": 40,
    "title": "The Resurrection",
    "type": "Description"
  },
  {
    "id": "P0256",
    "order": 256,
    "surahNumber": 76,
    "surahName": "Al-Insān",
    "reference": "76:1–31",
    "startAyah": 1,
    "endAyah": 31,
    "title": "The Human Being",
    "type": "Description"
  },
  {
    "id": "P0257",
    "order": 257,
    "surahNumber": 77,
    "surahName": "Al-Mursalāt",
    "reference": "77:1–50",
    "startAyah": 1,
    "endAyah": 50,
    "title": "The Emissary Winds",
    "type": "Description"
  },
  {
    "id": "P0258",
    "order": 258,
    "surahNumber": 78,
    "surahName": "An-Naba'",
    "reference": "78:1–40",
    "startAyah": 1,
    "endAyah": 40,
    "title": "The Great News",
    "type": "Description"
  },
  {
    "id": "P0259",
    "order": 259,
    "surahNumber": 79,
    "surahName": "An-Nāziʿāt",
    "reference": "79:1–46",
    "startAyah": 1,
    "endAyah": 46,
    "title": "The Angels and the Resurrection",
    "type": "Description"
  },
  {
    "id": "P0260",
    "order": 260,
    "surahNumber": 80,
    "surahName": "ʿAbasa",
    "reference": "80:1–42",
    "startAyah": 1,
    "endAyah": 42,
    "title": "He Frowned",
    "type": "Address"
  },
  {
    "id": "P0261",
    "order": 261,
    "surahNumber": 81,
    "surahName": "At-Takwīr",
    "reference": "81:1–29",
    "startAyah": 1,
    "endAyah": 29,
    "title": "The Overthrowing",
    "type": "Description"
  },
  {
    "id": "P0262",
    "order": 262,
    "surahNumber": 82,
    "surahName": "Al-Infiṭār",
    "reference": "82:1–19",
    "startAyah": 1,
    "endAyah": 19,
    "title": "The Cleaving Apart",
    "type": "Description"
  },
  {
    "id": "P0263",
    "order": 263,
    "surahNumber": 83,
    "surahName": "Al-Muṭaffifīn",
    "reference": "83:1–36",
    "startAyah": 1,
    "endAyah": 36,
    "title": "Those Who Give Less",
    "type": "Address"
  },
  {
    "id": "P0264",
    "order": 264,
    "surahNumber": 84,
    "surahName": "Al-Inshiqāq",
    "reference": "84:1–25",
    "startAyah": 1,
    "endAyah": 25,
    "title": "The Splitting Open",
    "type": "Description"
  },
  {
    "id": "P0265",
    "order": 265,
    "surahNumber": 85,
    "surahName": "Al-Burūj",
    "reference": "85:1–22",
    "startAyah": 1,
    "endAyah": 22,
    "title": "The People of the Trench",
    "type": "Narrative"
  },
  {
    "id": "P0266",
    "order": 266,
    "surahNumber": 86,
    "surahName": "Aṭ-Ṭāriq",
    "reference": "86:1–17",
    "startAyah": 1,
    "endAyah": 17,
    "title": "The Night Visitor",
    "type": "Description"
  },
  {
    "id": "P0267",
    "order": 267,
    "surahNumber": 87,
    "surahName": "Al-Aʿlā",
    "reference": "87:1–19",
    "startAyah": 1,
    "endAyah": 19,
    "title": "Glorify the Name of Your Lord",
    "type": "Address"
  },
  {
    "id": "P0268",
    "order": 268,
    "surahNumber": 88,
    "surahName": "Al-Ghāshiyah",
    "reference": "88:1–26",
    "startAyah": 1,
    "endAyah": 26,
    "title": "The Overwhelming Event",
    "type": "Description"
  },
  {
    "id": "P0269",
    "order": 269,
    "surahNumber": 89,
    "surahName": "Al-Fajr",
    "reference": "89:1–30",
    "startAyah": 1,
    "endAyah": 30,
    "title": "The Dawn",
    "type": "Address"
  },
  {
    "id": "P0270",
    "order": 270,
    "surahNumber": 90,
    "surahName": "Al-Balad",
    "reference": "90:1–20",
    "startAyah": 1,
    "endAyah": 20,
    "title": "The City",
    "type": "Address"
  },
  {
    "id": "P0271",
    "order": 271,
    "surahNumber": 91,
    "surahName": "Ash-Shams",
    "reference": "91:1–15",
    "startAyah": 1,
    "endAyah": 15,
    "title": "The Sun",
    "type": "Description"
  },
  {
    "id": "P0272",
    "order": 272,
    "surahNumber": 92,
    "surahName": "Al-Layl",
    "reference": "92:1–21",
    "startAyah": 1,
    "endAyah": 21,
    "title": "The Night",
    "type": "Address"
  },
  {
    "id": "P0273",
    "order": 273,
    "surahNumber": 93,
    "surahName": "Aḍ-Ḍuḥā",
    "reference": "93:1–11",
    "startAyah": 1,
    "endAyah": 11,
    "title": "The Morning Brightness",
    "type": "Address"
  },
  {
    "id": "P0274",
    "order": 274,
    "surahNumber": 94,
    "surahName": "Ash-Sharḥ",
    "reference": "94:1–8",
    "startAyah": 1,
    "endAyah": 8,
    "title": "Relief After Hardship",
    "type": "Address"
  },
  {
    "id": "P0275",
    "order": 275,
    "surahNumber": 95,
    "surahName": "At-Tīn",
    "reference": "95:1–8",
    "startAyah": 1,
    "endAyah": 8,
    "title": "The Fig",
    "type": "Description"
  },
  {
    "id": "P0276",
    "order": 276,
    "surahNumber": 96,
    "surahName": "Al-ʿAlaq",
    "reference": "96:1–19",
    "startAyah": 1,
    "endAyah": 19,
    "title": "Read in the Name of Your Lord",
    "type": "Narrative"
  },
  {
    "id": "P0277",
    "order": 277,
    "surahNumber": 97,
    "surahName": "Al-Qadr",
    "reference": "97:1–5",
    "startAyah": 1,
    "endAyah": 5,
    "title": "The Night of Decree",
    "type": "Description"
  },
  {
    "id": "P0278",
    "order": 278,
    "surahNumber": 98,
    "surahName": "Al-Bayyinah",
    "reference": "98:1–8",
    "startAyah": 1,
    "endAyah": 8,
    "title": "The Clear Proof",
    "type": "Address"
  },
  {
    "id": "P0279",
    "order": 279,
    "surahNumber": 99,
    "surahName": "Az-Zalzalah",
    "reference": "99:1–8",
    "startAyah": 1,
    "endAyah": 8,
    "title": "The Earthquake",
    "type": "Description"
  },
  {
    "id": "P0280",
    "order": 280,
    "surahNumber": 100,
    "surahName": "Al-ʿĀdiyāt",
    "reference": "100:1–11",
    "startAyah": 1,
    "endAyah": 11,
    "title": "The Charging Horses",
    "type": "Description"
  },
  {
    "id": "P0281",
    "order": 281,
    "surahNumber": 101,
    "surahName": "Al-Qāriʿah",
    "reference": "101:1–11",
    "startAyah": 1,
    "endAyah": 11,
    "title": "The Striking Calamity",
    "type": "Description"
  },
  {
    "id": "P0282",
    "order": 282,
    "surahNumber": 102,
    "surahName": "At-Takāthur",
    "reference": "102:1–8",
    "startAyah": 1,
    "endAyah": 8,
    "title": "Rivalry in Worldly Increase",
    "type": "Address"
  },
  {
    "id": "P0283",
    "order": 283,
    "surahNumber": 103,
    "surahName": "Al-ʿAṣr",
    "reference": "103:1–3",
    "startAyah": 1,
    "endAyah": 3,
    "title": "By Time",
    "type": "Description"
  },
  {
    "id": "P0284",
    "order": 284,
    "surahNumber": 104,
    "surahName": "Al-Humazah",
    "reference": "104:1–9",
    "startAyah": 1,
    "endAyah": 9,
    "title": "The Backbiter",
    "type": "Address"
  },
  {
    "id": "P0285",
    "order": 285,
    "surahNumber": 105,
    "surahName": "Al-Fīl",
    "reference": "105:1–5",
    "startAyah": 1,
    "endAyah": 5,
    "title": "The People of the Elephant",
    "type": "Narrative"
  },
  {
    "id": "P0286",
    "order": 286,
    "surahNumber": 106,
    "surahName": "Quraysh",
    "reference": "106:1–4",
    "startAyah": 1,
    "endAyah": 4,
    "title": "Quraysh",
    "type": "Address"
  },
  {
    "id": "P0287",
    "order": 287,
    "surahNumber": 107,
    "surahName": "Al-Māʿūn",
    "reference": "107:1–7",
    "startAyah": 1,
    "endAyah": 7,
    "title": "Small Kindnesses",
    "type": "Address"
  },
  {
    "id": "P0288",
    "order": 288,
    "surahNumber": 108,
    "surahName": "Al-Kawthar",
    "reference": "108:1–3",
    "startAyah": 1,
    "endAyah": 3,
    "title": "Al-Kawthar",
    "type": "Address"
  },
  {
    "id": "P0289",
    "order": 289,
    "surahNumber": 109,
    "surahName": "Al-Kāfirūn",
    "reference": "109:1–6",
    "startAyah": 1,
    "endAyah": 6,
    "title": "The Disbelievers",
    "type": "Dialogue"
  },
  {
    "id": "P0290",
    "order": 290,
    "surahNumber": 110,
    "surahName": "An-Naṣr",
    "reference": "110:1–3",
    "startAyah": 1,
    "endAyah": 3,
    "title": "Victory and Praise",
    "type": "Narrative"
  },
  {
    "id": "P0291",
    "order": 291,
    "surahNumber": 111,
    "surahName": "Al-Masad",
    "reference": "111:1–5",
    "startAyah": 1,
    "endAyah": 5,
    "title": "Abū Lahab",
    "type": "Narrative"
  },
  {
    "id": "P0292",
    "order": 292,
    "surahNumber": 112,
    "surahName": "Al-Ikhlāṣ",
    "reference": "112:1–4",
    "startAyah": 1,
    "endAyah": 4,
    "title": "Sincerity",
    "type": "Description"
  },
  {
    "id": "P0293",
    "order": 293,
    "surahNumber": 113,
    "surahName": "Al-Falaq",
    "reference": "113:1–5",
    "startAyah": 1,
    "endAyah": 5,
    "title": "Daybreak",
    "type": "Supplication"
  },
  {
    "id": "P0294",
    "order": 294,
    "surahNumber": 114,
    "surahName": "An-Nās",
    "reference": "114:1–6",
    "startAyah": 1,
    "endAyah": 6,
    "title": "Mankind",
    "type": "Supplication"
  }
];

/** Return a Reading Unit by its canonical ID, such as P0001. */
function getReadingUnitById(id) {
  return READING_UNITS.find((unit) => unit.id === id) ?? null;
}

/** Return all Reading Units belonging to one surah. */
function getReadingUnitsBySurah(surahNumber) {
  return READING_UNITS.filter((unit) => unit.surahNumber === Number(surahNumber));
}

/**
 * Validate canonical IDs, order, and within-surah ayah continuity.
 * Throws an Error when the source data is incomplete or malformed.
 */
function validateReadingLibrary() {
  if (READING_UNITS.length !== READING_UNIT_COUNT) {
    throw new Error(`Expected ${READING_UNIT_COUNT} Reading Units, found ${READING_UNITS.length}.`);
  }

  READING_UNITS.forEach((unit, index) => {
    const expectedOrder = index + 1;
    const expectedId = `P${String(expectedOrder).padStart(4, '0')}`;

    if (unit.order !== expectedOrder || unit.id !== expectedId) {
      throw new Error(`Reading Unit sequence error at index ${index}.`);
    }

    if (unit.startAyah < 1 || unit.endAyah < unit.startAyah) {
      throw new Error(`Invalid ayah range for ${unit.id}.`);
    }
  });

  const unitsBySurah = new Map();
  for (const unit of READING_UNITS) {
    const group = unitsBySurah.get(unit.surahNumber) ?? [];
    group.push(unit);
    unitsBySurah.set(unit.surahNumber, group);
  }

  for (const [surahNumber, units] of unitsBySurah) {
    units.sort((a, b) => a.startAyah - b.startAyah);

    if (units[0].startAyah !== 1) {
      throw new Error(`Surah ${surahNumber} does not begin at ayah 1.`);
    }

    for (let index = 1; index < units.length; index += 1) {
      const previous = units[index - 1];
      const current = units[index];
      if (current.startAyah !== previous.endAyah + 1) {
        throw new Error(`Gap or overlap between ${previous.id} and ${current.id}.`);
      }
    }
  }

  return true;
}


window.QURAN_READING_LIBRARY = Object.freeze({
  version: READING_LIBRARY_VERSION,
  count: READING_UNIT_COUNT,
  units: READING_UNITS,
  getById: getReadingUnitById,
  getBySurah: getReadingUnitsBySurah,
  validate: validateReadingLibrary
});
})();
