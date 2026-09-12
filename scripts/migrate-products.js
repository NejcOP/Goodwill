#!/usr/bin/env node

require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mock products data
const products = [
  {
    id: "p1",
    slug: "volneni-plasc-antracit",
    name: "Volneni plašč",
    category: "zenske",
    gender: "zenske",
    price: 690,
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&auto=format&fit=crop",
    ],
    colors: [
      { name: "Antracit", swatch: "#2D2D2D" },
      { name: "Peščena", swatch: "#D7C8B6" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Premišljena silhueta, krojena iz dvoslojne volne. Volneni plašč je zasnovan tako, da ga nosite desetletja, ne le sezone. Sproščen skozi ramena z mehkim zavihanim ovratnikom.",
    materials:
      "100 % merino volna brez mulesinga, kupro podloga, rogovi gumbi.",
    care: "Samo kemično čiščenje. Med nošenjem naj oblačilo diha. Hranite na širnem obešalniku.",
    shipping: "Brezplačna dostava za vsa naročila. Vračila možena v 30 dneh.",
    is_new: true,
    rating: 4.8,
    review_count: 42,
  },
  {
    id: "p2",
    slug: "lanena-srajca-naravna",
    name: "Lanena srajca",
    category: "moski",
    gender: "moski",
    price: 220,
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&auto=format&fit=crop",
    ],
    colors: [
      { name: "Naravna", swatch: "#E8E1D8" },
      { name: "Antracit", swatch: "#2D2D2D" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Prani evropski lan s sproščenim ovratnikom in spuščeno ramensko linijo. Z vsakim pranjem postane mehkejši.",
    materials: "100 % evropski lan, biserni gumbi.",
    care: "Strojno pranje na hladno. Sušenje na zraku. Po potrebi likajte na nizki temperaturi.",
    shipping:
      "Brezplačna dostava za vsa naročila. Vračila možena v 30 dneh.",
    rating: 4.6,
    review_count: 28,
  },
  {
    id: "p3",
    slug: "usnjena-torba-bron",
    name: "Usnjena torba",
    category: "dodatki",
    price: 480,
    images: [
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&auto=format&fit=crop",
    ],
    colors: [{ name: "Bron", swatch: "#A97A4A" }],
    sizes: ["Enotna velikost"],
    description:
      "Torba iz polnozrnatega, rastlinsko strojenega usnja z notranjim žepom na zadrgo in odstranljivim naramnim trakom. Sčasoma pridobi bogato, edinstveno patino.",
    materials:
      "Polnozrnato usnje, mesingasti okovi, podloga iz bombažnega platna.",
    care: "Usnje negujte vsakih 6 mesecev. Izogibajte se dolgotrajni izpostavljenosti soncu.",
    shipping:
      "Brezplačna dostava za vsa naročila. Vračila možena v 30 dneh.",
    is_new: true,
    rating: 4.9,
    review_count: 17,
  },
  {
    id: "p4",
    slug: "kasmirski-pulover-ovsena",
    name: "Kašmirski pulover",
    category: "zenske",
    gender: "zenske",
    price: 380,
    images: [
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&auto=format&fit=crop",
    ],
    colors: [
      { name: "Ovsena", swatch: "#E8E1D8" },
      { name: "Oliva", swatch: "#7C7C5C" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Sproščen pulover z okroglim izrezom iz dvoslojnega mongolskega kašmirja. Prikrojen v bokih z rebrastimi manžetami za premišljen, sproščen padec.",
    materials: "100 % mongolski kašmir.",
    care: "Ročno pranje na hladno ali kemično čiščenje. Sušenje v ležečem položaju. Hranite zloženo, ne obešeno.",
    shipping:
      "Brezplačna dostava za vsa naročila. Vračila možena v 30 dneh.",
    rating: 4.7,
    review_count: 33,
  },
  {
    id: "p5",
    slug: "kroj-hlace-pescene",
    name: "Kroj hlače",
    category: "moski",
    gender: "moski",
    price: 260,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&auto=format&fit=crop",
    ],
    colors: [
      { name: "Peščena", swatch: "#D7C8B6" },
      { name: "Antracit", swatch: "#2D2D2D" },
    ],
    sizes: ["30", "32", "34", "36", "38"],
    description:
      "Široke hlače, krojene iz česane volnene tkanine, dokončane s pasom in eno gubo za gibanje in udobje.",
    materials: "95 % volna, 5 % elastan, polpolotna platnena podloga.",
    care: "Samo kemično čiščenje. Po potrebi likajte s paro.",
    shipping:
      "Brezplačna dostava za vsa naročila. Vračila možena v 30 dneh.",
    is_new: true,
    rating: 4.5,
    review_count: 21,
  },
  {
    id: "p6",
    slug: "acetatna-soncna-ocala-oliva",
    name: "Sončna očala",
    category: "dodatki",
    price: 210,
    images: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&auto=format&fit=crop",
    ],
    colors: [{ name: "Oliva", swatch: "#7C7C5C" }],
    sizes: ["Enotna velikost"],
    description:
      "Ročno polirani italijanski acetatni okvirji s polariziranimi UV400 stekli. Umirjena, arhitekturna različica klasične silhuete.",
    materials: "Italijanski bio-acetat, polarizirana steklena stekla.",
    care: "Čistite s krpo iz mikrovlaken. Hranite v priloženem etuiju.",
    shipping:
      "Brezplačna dostava za vsa naročila. Vračila možena v 30 dneh.",
    rating: 4.4,
    review_count: 12,
  },
  {
    id: "p7",
    slug: "jeans-jakna-prana",
    name: "Prana jeans jakna",
    category: "arhiv",
    price: 320,
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&auto=format&fit=crop",
    ],
    colors: [{ name: "Prano indigo", swatch: "#4A5560" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Iz naše prve kolekcije. Kamnito prani rob (selvedge) jeans z ohlapnim, prikrojenim krojem in biserno-sedefastimi gumbi na pritiskanje.",
    materials: "100 % organski bombažni rob jeans.",
    care: "Strojno pranje na hladno, obrnjeno navznoter. Sušenje na zraku.",
    shipping:
      "Brezplačna dostava za vsa naročila. Vračila možena v 30 dneh.",
    rating: 4.9,
    review_count: 9,
  },
  {
    id: "p8",
    slug: "svilena-obleka-toplo-bela",
    name: "Svilena obleka",
    category: "zenske",
    gender: "zenske",
    price: 340,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&auto=format&fit=crop",
    ],
    colors: [
      { name: "Toplo bela", swatch: "#FAF8F5" },
      { name: "Bron", swatch: "#A97A4A" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Krojena po diagonali iz prane murvine svile, Svilena obleka pada v fluidnem, nepodloženem padcu z nežnimi nastavljivimi naramnicami.",
    materials: "100 % murvina svila.",
    care: "Samo kemično čiščenje.",
    shipping:
      "Brezplačna dostava za vsa naročila. Vračila možena v 30 dneh.",
    is_new: true,
    rating: 4.8,
    review_count: 25,
  },
];

async function migrateProducts() {
  try {
    console.log("📦 Migriram proizvode u Supabase...");

    // Obriši stare podatke
    const { error: deleteError } = await supabase.from("products").delete().gte("id", "");
    if (deleteError) console.warn("⚠️  Upozorenje pri brisanju:", deleteError);

    // Unesi nove podatke
    const { error: insertError } = await supabase
      .from("products")
      .insert(
        products.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          category: p.category,
          gender: p.gender,
          price: p.price,
          images: p.images,
          colors: p.colors,
          sizes: p.sizes,
          description: p.description,
          materials: p.materials,
          care: p.care,
          shipping: p.shipping,
          is_new: p.is_new,
          rating: p.rating,
          review_count: p.review_count,
        }))
      );

    if (insertError) {
      console.error("❌ Greška pri unosu:", insertError);
      process.exit(1);
    }

    console.log("✅ Svi proizvodi su uspješno migrirani!");
  } catch (error) {
    console.error("❌ Greška:", error);
    process.exit(1);
  }
}

migrateProducts();
