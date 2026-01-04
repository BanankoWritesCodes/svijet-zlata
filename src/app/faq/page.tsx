'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { QuestionIcon, ChevronDown } from '@/components/Icons';

const faqData = [
  { q: 'Kako se vrši procjena zlata?', a: 'Procjena zlata vrši se pomoću profesionalne opreme koja uključuje preciznu vagu i uređaj za određivanje čistoće (karataže) metala. Svaki predmet se pažljivo izmjeri i testira kako bismo odredili njegovu točnu vrijednost.' },
  { q: 'Koje vrste zlata otkupljujete?', a: 'Otkupljujemo sve vrste zlata uključujući: investicijske poluge svih veličina, zlatne kovanice, nakit (prstenje, narukvice, lančiće, naušnice), zubno zlato, i lomljeno zlato bilo koje karataže.' },
  { q: 'Kako se određuje cijena otkupa?', a: 'Cijena otkupa temelji se na trenutnoj tržišnoj cijeni zlata, karataži (čistoći) vašeg zlata i težini predmeta. Naše cijene su konkurentne i transparentne - uvijek vam pokazujemo izračun.' },
  { q: 'Koliko traje procjena?', a: 'Procjena obično traje samo nekoliko minuta. Za jednostavnije predmete poput poluga ili kovanica, procjena je gotovo trenutna. Za kompliciraniji nakit može potrajati malo duže.' },
  { q: 'Trebam li zakazati termin?', a: 'Nije nužno, ali preporučujemo da nas kontaktirate unaprijed kako bismo osigurali da ste na redu bez čekanja. Za veće količine zlata, molimo vas da zakažete termin.' },
  { q: 'Isplaćujete li odmah?', a: 'Da, isplata se vrši odmah nakon što prihvatite našu ponudu. Možete izabrati isplatu u gotovini ili bankovnim transferom.' },
  { q: 'Otkupljujete li i srebro?', a: 'Da, osim zlata otkupljujemo i srebro - uključujući srebrne poluge, kovanice, nakit i stolno posuđe. Također otkupljujemo platinu i paladij.' },
  { q: 'Što ako ne znam karataže svog zlata?', a: 'Nema problema! Naša oprema precizno određuje čistoću zlata. Mnogi predmeti imaju oznaku karataže (npr. 750 za 18K), ali i bez oznake možemo točno utvrditi čistoću.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16" style={{ minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <QuestionIcon size={48} />
              <h1 className="text-4xl gold-shimmer">Česta Pitanja</h1>
            </div>
            <p className="text-gray-400 text-lg">Odgovori na najčešća pitanja o otkupu zlata i srebra</p>
          </div>

          {/* Accordion */}
          <div>
            {faqData.map((item, index) => (
              <div key={index} className="accordion-item">
                <button className="accordion-header" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                  <span>{item.q}</span>
                  <ChevronDown size={24} className={`accordion-icon ${openIndex === index ? 'open' : ''}`} />
                </button>
                {openIndex === index && (
                  <div className="accordion-content">{item.a}</div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="card text-center mt-12" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '22px', color: '#d4a417', marginBottom: '16px' }}>Imate dodatnih pitanja?</h3>
            <p className="text-gray-400 mb-6">Kontaktirajte nas i rado ćemo odgovoriti na sva vaša pitanja</p>
            <Link href="/kontakt" className="btn btn-gold">Kontaktirajte nas</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
