import type { Category, Product } from "./types";

/** Base Unsplash CDN url (no size params — Next/Image handles responsive sizing). */
function img(id: string) {
  return `https://images.unsplash.com/photo-${id}?q=80&auto=format&fit=crop`;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  zenske: "Ženske",
  moski: "Moški",
  dodatki: "Dodatki",
  arhiv: "Arhiv",
};

export const categoryImages: Record<Category, string> = {
  zenske: img("1509631179647-0177331693ae"),
  moski: img("1517841905240-472988babdf9"),
  dodatki: img("1519085360753-af0119f7cbe7"),
  arhiv: img("1483985988355-763728e1935b"),
};

export const heroImage = img("1490481651871-ab68de25d43d");
export const storyImage = img("1490114538077-0a7f8cb49891");

export const editorialBlocks = [
  {
    id: "materiali",
    eyebrow: "Materiali",
    title: "Tkano iz narave, narejeno za vztrajnost",
    copy: "Vsak kos GOODWILL nastane iz vlaken odgovornih pridelovalcev — organski bombaž, volna brez mulesinga, prana lanena tkanina. Brez sinteti\u010dnih materialov, brez odpadka.",
    image: img("1500534623283-312aade485b7"),
  },
  {
    id: "obrt",
    eyebrow: "Obrt",
    title: "Po\u010dasi izdelano, v majhnih serijah",
    copy: "Sodelujemo z majhnim \u0161tevilom dru\u017einskih delavnic, ki delijo na\u0161o obsedenost z detajli izdelave — ro\u010dno obrobljeni \u0161ivi, kostni gumbi, umirjeno barvanje obla\u010dil.",
    image: img("1445205170230-053b83016050"),
  },
  {
    id: "izvor",
    eyebrow: "Izvor",
    title: "Skandinavska umirjenost. Avstralska svetloba.",
    copy: "GOODWILL je nastal med dvema obalama in prena\u0161a mirnost severa ter lahkotnost juga v garderobo, ki se giblje z vami.",
    image: img("1523381210434-271e8be1f52b"),
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "volneni-plasc-antracit",
    name: "Volneni pla\u0161\u010d",
    category: "zenske",
    price: 690,
    images: [img("1516762689617-e1cffcef479d"), img("1552374196-c4e7ffc6e126")],
    colors: [
      { name: "Antracit", swatch: "#2D2D2D" },
      { name: "Pe\u0161\u010dena", swatch: "#D7C8B6" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Premi\u0161ljena silhueta, krojena iz dvoslojne volne. Volneni pla\u0161\u010d je zasnovan tako, da ga nosite desetletja, ne le sezone. Sproš\u010den skozi ramena z mehkim zavihanim ovratnikom.",
    materials: "100 % merino volna brez mulesinga, kupro podloga, rogovi gumbi.",
    care: "Samo kemi\u010dno \u010di\u0161\u010denje. Med no\u0161enjem naj obla\u010dilo diha. Hranite na \u0161irokem obe\u0161alniku.",
    shipping: "Brezpla\u010dna dostava za vsa naro\u010dila. Vra\u010dila mo\u017ena v 30 dneh.",
    isNew: true,
    rating: 4.8,
    reviewCount: 42,
  },
  {
    id: "p2",
    slug: "lanena-srajca-naravna",
    name: "Lanena srajca",
    category: "moski",
    price: 220,
    images: [img("1503341504253-dff4815485f1"), img("1503342217505-b0a15ec3261c")],
    colors: [
      { name: "Naravna", swatch: "#E8E1D8" },
      { name: "Antracit", swatch: "#2D2D2D" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Prani evropski lan s sproš\u010denim ovratnikom in spu\u0161\u010deno ramensko linijo. Z vsakim pranjem postane mehkej\u0161i.",
    materials: "100 % evropski lan, biserni gumbi.",
    care: "Strojno pranje na hladno. Su\u0161enje na zraku. Po potrebi likajte na nizki temperaturi.",
    shipping: "Brezpla\u010dna dostava za vsa naro\u010dila. Vra\u010dila mo\u017ena v 30 dneh.",
    rating: 4.6,
    reviewCount: 28,
  },
  {
    id: "p3",
    slug: "usnjena-torba-bron",
    name: "Usnjena torba",
    category: "dodatki",
    price: 480,
    images: [img("1524253482453-3fed8d2fe12b"), img("1541099649105-f69ad21f3246")],
    colors: [{ name: "Bron", swatch: "#A97A4A" }],
    sizes: ["Enotna velikost"],
    description:
      "Torba iz polnozrnatega, rastlinsko strojenega usnja z notranjim \u017eepom na zadrgo in odstranljivim naramnim trakom. Sčasoma pridobi bogato, edinstveno patino.",
    materials: "Polnozrnato usnje, mesingasti okovi, podloga iz bomba\u017enega platna.",
    care: "Usnje negujte vsakih 6 mesecev. Izogibajte se dolgotrajni izpostavljenosti soncu.",
    shipping: "Brezpla\u010dna dostava za vsa naro\u010dila. Vra\u010dila mo\u017ena v 30 dneh.",
    isNew: true,
    rating: 4.9,
    reviewCount: 17,
  },
  {
    id: "p4",
    slug: "kasmirski-pulover-ovsena",
    name: "Ka\u0161mirski pulover",
    category: "zenske",
    price: 380,
    images: [img("1495385794356-15371f348c31"), img("1441986300917-64674bd600d8")],
    colors: [
      { name: "Ovsena", swatch: "#E8E1D8" },
      { name: "Oliva", swatch: "#7C7C5C" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Sproš\u010den pulover z okroglim izrezom iz dvoslojnega mongolskega ka\u0161mirja. Prikrojen v bokih z rebrastimi manžetami za premi\u0161ljen, sproš\u010den padec.",
    materials: "100 % mongolski ka\u0161mir.",
    care: "Ro\u010dno pranje na hladno ali kemi\u010dno \u010di\u0161\u010denje. Su\u0161enje v le\u017eečem polo\u017eaju. Hranite zlo\u017eeno, ne obešeno.",
    shipping: "Brezpla\u010dna dostava za vsa naro\u010dila. Vra\u010dila mo\u017ena v 30 dneh.",
    rating: 4.7,
    reviewCount: 33,
  },
  {
    id: "p5",
    slug: "kroj-hlace-pescene",
    name: "Kroj hla\u010de",
    category: "moski",
    price: 260,
    images: [img("1544022613-e87ca75a784a"), img("1523381210434-271e8be1f52b")],
    colors: [
      { name: "Pe\u0161\u010dena", swatch: "#D7C8B6" },
      { name: "Antracit", swatch: "#2D2D2D" },
    ],
    sizes: ["30", "32", "34", "36", "38"],
    description:
      "\u0160iroke hla\u010de, krojene iz \u010desane volnene tkanine, dokon\u010dane s pasom in eno gubo za gibanje in udobje.",
    materials: "95 % volna, 5 % elastan, polovi\u010dna platnena podloga.",
    care: "Samo kemi\u010dno \u010di\u0161\u010denje. Po potrebi likajte s paro.",
    shipping: "Brezpla\u010dna dostava za vsa naro\u010dila. Vra\u010dila mo\u017ena v 30 dneh.",
    isNew: true,
    rating: 4.5,
    reviewCount: 21,
  },
  {
    id: "p6",
    slug: "acetatna-soncna-ocala-oliva",
    name: "Son\u010dna o\u010dala",
    category: "dodatki",
    price: 210,
    images: [img("1441984904996-e0b6ba687e04"), img("1519085360753-af0119f7cbe7")],
    colors: [{ name: "Oliva", swatch: "#7C7C5C" }],
    sizes: ["Enotna velikost"],
    description:
      "Ro\u010dno polirani italijanski acetatni okvirji s polariziranimi UV400 stekli. Umirjena, arhitekturna razli\u010dica klasi\u010dne silhuete.",
    materials: "Italijanski bio-acetat, polarizirana steklena stekla.",
    care: "\u010cistite s krpo iz mikrovlaken. Hranite v prilo\u017eenem etuiju.",
    shipping: "Brezpla\u010dna dostava za vsa naro\u010dila. Vra\u010dila mo\u017ena v 30 dneh.",
    rating: 4.4,
    reviewCount: 12,
  },
  {
    id: "p7",
    slug: "jeans-jakna-prana",
    name: "Prana jeans jakna",
    category: "arhiv",
    price: 320,
    images: [img("1483985988355-763728e1935b"), img("1445205170230-053b83016050")],
    colors: [{ name: "Prano indigo", swatch: "#4A5560" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Iz na\u0161e prve kolekcije. Kamnito prani rob (selvedge) jeans z ohlapnim, prikrojenim krojem in biserno-sedefastimi gumbi na pritiskanje.",
    materials: "100 % organski bomba\u017eni rob jeans.",
    care: "Strojno pranje na hladno, obrnjeno navznoter. Su\u0161enje na zraku.",
    shipping: "Brezpla\u010dna dostava za vsa naro\u010dila. Vra\u010dila mo\u017ena v 30 dneh.",
    rating: 4.9,
    reviewCount: 9,
  },
  {
    id: "p8",
    slug: "svilena-obleka-toplo-bela",
    name: "Svilena obleka",
    category: "zenske",
    price: 340,
    images: [img("1509631179647-0177331693ae"), img("1516762689617-e1cffcef479d")],
    colors: [
      { name: "Toplo bela", swatch: "#FAF8F5" },
      { name: "Bron", swatch: "#A97A4A" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Krojena po diagonali iz prane murvine svile, Svilena obleka pada v fluidnem, nepodlo\u017eenem padcu z ne\u017enimi nastavljivimi naramnicami.",
    materials: "100 % murvina svila.",
    care: "Samo kemi\u010dno \u010di\u0161\u010denje.",
    shipping: "Brezpla\u010dna dostava za vsa naro\u010dila. Vra\u010dila mo\u017ena v 30 dneh.",
    isNew: true,
    rating: 4.8,
    reviewCount: 25,
  },
];

export const newArrivals = products.filter((p) => p.isNew);

export const instagramImages = [
  img("1509631179647-0177331693ae"),
  img("1517841905240-472988babdf9"),
  img("1524253482453-3fed8d2fe12b"),
  img("1495385794356-15371f348c31"),
  img("1544022613-e87ca75a784a"),
  img("1441984904996-e0b6ba687e04"),
  img("1483985988355-763728e1935b"),
  img("1500534623283-312aade485b7"),
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}
