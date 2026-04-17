"use client";
/* ═══════════════════════════════════════
   useLibrary
   Converts the standalone Library module (L1590-1740):
   setState (L1619), libRender, getAI (L1612),
   localSrch (L1613), onQ (L1620), clrQ (L1621),
   togBook (L1622), togSB (L1623), togRec (L1624),
   rmvRec (L1625), clrRec (L1626), askRm (L1627),
   askPd (L1628), restB (L1629), restAll (L1630),
   showMod/closeMod/konfirm (L1616-1618)
═══════════════════════════════════════ */
import { useState, useCallback, useRef } from 'react';
import { highlight, snip } from '@/lib/utils';

// ── Book database (original DB array in library IIFE) ──
const LIBRARY_DB = [
  { id: 'b1', name: 'Organon of Medicine', icon: '📖', category: 'Foundation', pages: 294, content: 'The Organon of Medicine by Samuel Hahnemann. Fundamental principles of homeopathy. Law of Similars: similia similibus curentur. Minimum dose principle. Single remedy. Vital force concept. Miasm theory: Psora, Sycosis, Syphilis. Dynamic disease concept. Potentization and succussion. Proving methodology. Case-taking guidelines. Chronic diseases theory.' },
  { id: 'b2', name: 'Materia Medica Pura', icon: '💊', category: 'Materia Medica', pages: 812, content: 'Materia Medica Pura by Hahnemann. Drug provings on healthy individuals. Natrum Muriaticum: grief, reserved personality, salt craving, headaches worse sun, aversion consolation. Sulphur: burning sensations, skin eruptions, philosophical, untidy, worse bathing. Pulsatilla: weeping, changeable symptoms, thirstless, desires open air, worse warm rooms. Lycopodium: anticipatory anxiety, digestive issues, right-sided complaints, 4-8PM aggravation. Arsenicum Album: anxiety, restlessness, burning ameliorated by warmth, fastidious, fear of death.' },
  { id: 'b3', name: 'Kent Repertory', icon: '🔍', category: 'Repertory', pages: 1423, content: 'Kent Repertory. Systematic arrangement of symptoms. Mind section: anxiety, fear, irritability, grief effects. Head: headaches by location and modality. Eyes, ears, nose. Respiratory: cough types, dyspnea. Abdomen: digestive complaints. Extremities: joint pain, stiffness. Skin: eruptions, itching, discoloration. Generalities: thermal state, food desires, time aggravation. Cross-referencing symptoms to remedies.' },
  { id: 'b4', name: 'Boericke Materia Medica', icon: '📚', category: 'Materia Medica', pages: 1058, content: 'Boericke Pocket Manual of Materia Medica with Repertory. Clinical manual with therapeutic index. Natrum Muriaticum clinical uses: migraine, sinusitis, grief ailments. Thuja: warts, sycotic conditions, vaccination effects. Graphites: skin conditions, obesity, constipation. Rhus Tox: joint stiffness worse initial motion better continued motion. Bryonia: worse any motion, dry mucous membranes, stitching pains.' },
  { id: 'b5', name: 'Allen Key Notes', icon: '🔑', category: 'Clinical', pages: 376, content: 'Allen Key Notes and Characteristics. Quick reference for clinical practice. Keynotes of major polycrest remedies. Belladonna: sudden onset, high fever, red face, throbbing. Aconitum: sudden fright, anxiety, restlessness, first stage inflammation. Nux Vomica: over-indulgence, irritability, chilly, constipation. Ignatia: grief, emotional suppression, sighing, contradictory symptoms. Sepia: hormonal issues, bearing down sensation, indifference to family.' },
  { id: 'b6', name: 'Miasmatic Prescribing', icon: '🧬', category: 'Clinical', pages: 245, content: 'Miasmatic approach to chronic disease. Psora: functional disorders, skin conditions, allergies, anxiety. Sycosis: excess growth, warts, tumors, secretions, joint deposits. Syphilis: destruction, ulceration, bone pathology, mental deterioration. Tubercular: respiratory, changeability, desire for travel, restlessness. Mixed miasm identification. Anti-miasmatic remedies. Layer prescribing approach.' },
];

// ── AI knowledge base (original RDB) ──
const REMEDY_DB: Record<string, string> = {
  'natrum': '**Natrum Muriaticum** — Constitutional remedy. Key: grief, reserved personality, salt craving, headaches worse in sun, aversion to consolation. Potencies: 200C constitutional, 30C acute. Miasm: Psoric. Complementary: Ignatia, Sepia.',
  'sulphur': '**Sulphur** — King of anti-psorics. Key: burning sensations, skin eruptions, philosophical nature, untidy appearance, worse bathing, 11AM hunger. Potencies: 30C-200C. Miasm: Psoric. Often used to begin treatment of chronic cases.',
  'pulsatilla': '**Pulsatilla** — Emotional, weeping disposition. Key: changeable symptoms, thirstless, desires open air, worse warm rooms, bland discharges. Potencies: 30C common. Miasm: Psoric/Sycotic. Good for hormonal and respiratory complaints.',
  'lycopodium': '**Lycopodium** — Anticipatory anxiety. Key: digestive issues, right-sided complaints, 4-8PM aggravation, lack of confidence despite capability. Potencies: 200C-1M. Miasm: Psoric/Sycotic.',
  'arsenicum': '**Arsenicum Album** — Anxious, restless, fastidious. Key: burning pains better warmth, midnight aggravation, fear of death, thirsty for small sips. Potencies: 30C-200C. Miasm: Psoric. Acute: food poisoning, asthma.',
  'thuja': '**Thuja Occidentalis** — Anti-sycotic. Key: warts, fixed ideas, secretive, oily skin, left-sided. Effects of vaccination. Potencies: 200C-1M for miasmatic. Miasm: Sycotic.',
  'graphites': '**Graphites** — Skin remedy. Key: oozing eruptions (honey-like), obesity, constipation, chilly, indecisive. Potencies: 30C-200C. Miasm: Psoric. Good for eczema, particularly behind ears.',
  'sinusitis': 'For **sinusitis**, consider: **Kali Bich** (thick stringy discharge, pressure at root of nose), **Nat. Mur** (thin watery discharge, loss of smell/taste), **Pulsatilla** (bland yellow-green discharge, worse warm room), **Silicea** (chronic sinusitis, offensive discharge).',
  'headache': 'For **headaches**, consider: **Belladonna** (throbbing, worse light/noise, sudden onset), **Nat. Mur** (hammering, worse sun, periodical), **Glonoinum** (congestive, sun headaches), **Sanguinaria** (right-sided migraine, better sleep/vomiting).',
  'anxiety': 'For **anxiety**, consider: **Arsenicum** (health anxiety, restlessness, midnight worse), **Aconitum** (panic attacks, sudden fear), **Argentum Nitricum** (anticipatory, impulsive), **Gelsemium** (paralysis from anticipation, trembling).',
  'psoric': 'The **Psoric miasm** represents functional disturbance. Characteristic: itching, allergies, skin conditions, anxiety. Chief anti-psoric: **Sulphur**. Other important: Calcarea Carb, Lycopodium, Nat. Mur, Graphites, Psorinum (nosode).',
  'sycotic': 'The **Sycotic miasm** represents excess/overgrowth. Characteristic: warts, tumors, discharges, joint deposits. Chief anti-sycotic: **Thuja**. Other: Medorrhinum (nosode), Nat. Sulph, Staphysagria, Nitric Acid.',
  'syphilitic': 'The **Syphilitic miasm** represents destruction. Characteristic: ulceration, bone pathology, mental deterioration. Chief anti-syphilitic: **Mercurius Sol**. Other: Syphilinum (nosode), Aurum Met, Nitric Acid, Hepar Sulph.',
};

interface SearchResult {
  name: string;
  snippet: string;
  structured: { use: string; type: string; note: string };
}

export function useLibrary() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [books, setBooks] = useState([...LIBRARY_DB]);
  const [removedBooks, setRemovedBooks] = useState<typeof LIBRARY_DB>([]);
  const [activeBook, setActiveBook] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentOpen, setRecentOpen] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();

  // ── getAI (original L1612) ──
  const getAI = useCallback((q: string): string | null => {
    const lo = q.toLowerCase();
    for (const key in REMEDY_DB) {
      if (lo.includes(key)) return REMEDY_DB[key];
    }
    return null;
  }, []);

  // ── localSrch (original L1613) ──
  const localSearch = useCallback((q: string): SearchResult[] => {
    if (!q.trim()) return [];
    const lo = q.toLowerCase();
    return books
      .filter(b => b.content && b.content.toLowerCase().includes(lo))
      .map(b => {
        const s = snip(b.content, lo);
        const segs = s.split('.').map(x => x.trim()).filter(Boolean);
        return {
          name: b.name,
          snippet: highlight(s, q),
          structured: {
            use: segs[0] || s.slice(0, 60),
            type: 'Homeopathic Remedy',
            note: 'Derived from clinical knowledge base',
          },
        };
      });
  }, [books]);

  // ── onQ (original L1620) — debounced search ──
  const onQuery = useCallback((q: string) => {
    setQuery(q);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      if (q.trim()) {
        const ai = getAI(q);
        const res = localSearch(q);
        const rec = [q, ...recentSearches.filter(s => s !== q)].slice(0, 6);
        setResults(res);
        setAiAnswer(ai);
        setRecentSearches(rec);
      } else {
        setResults([]);
        setAiAnswer(null);
      }
    }, 350);
  }, [getAI, localSearch, recentSearches]);

  // ── clrQ (original L1621) ──
  const clearQuery = useCallback(() => {
    setQuery('');
    setResults([]);
    setAiAnswer(null);
  }, []);

  // ── togBook (original L1622) ──
  const toggleBook = useCallback((name: string) => {
    setActiveBook(prev => prev === name ? null : name);
  }, []);

  // ── togSB (original L1623) ──
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // ── togRec (original L1624) ──
  const toggleRecent = useCallback(() => {
    setRecentOpen(prev => !prev);
  }, []);

  // ── rmvRec (original L1625) ──
  const removeRecentSearch = useCallback((s: string) => {
    setRecentSearches(prev => prev.filter(x => x !== s));
  }, []);

  // ── clrRec (original L1626) ──
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    setRecentOpen(false);
  }, []);

  // ── askRm — remove book (original L1627) ──
  const removeBook = useCallback((id: string) => {
    const book = books.find(b => b.id === id);
    if (!book) return;
    setBooks(prev => prev.filter(b => b.id !== id));
    setRemovedBooks(prev => [...prev, book]);
    if (activeBook === book.name) setActiveBook(null);
    // Re-search if query active
    if (query.trim()) {
      const ai = getAI(query);
      setAiAnswer(ai);
    }
  }, [books, activeBook, query, getAI]);

  // ── askPd — permanently delete (original L1628) ──
  const permanentlyDelete = useCallback((id: string) => {
    setRemovedBooks(prev => prev.filter(b => b.id !== id));
  }, []);

  // ── restB — restore book (original L1629) ──
  const restoreBook = useCallback((id: string) => {
    const book = removedBooks.find(b => b.id === id);
    if (!book) return;
    const order = LIBRARY_DB.map(b => b.id);
    const restored = [...books, book].sort((a, b) => {
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
    setBooks(restored);
    setRemovedBooks(prev => prev.filter(b => b.id !== id));
  }, [books, removedBooks]);

  // ── restAll — restore all (original L1630) ──
  const restoreAll = useCallback(() => {
    if (!removedBooks.length) return;
    const order = LIBRARY_DB.map(b => b.id);
    const restored = [...books, ...removedBooks].sort((a, b) => {
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
    setBooks(restored);
    setRemovedBooks([]);
  }, [books, removedBooks]);

  // ── Active book content ──
  const activeBookData = books.find(b => b.name === activeBook) || null;

  return {
    query, results, aiAnswer,
    books, removedBooks,
    activeBook, activeBookData,
    sidebarOpen, recentSearches, recentOpen,
    onQuery, clearQuery,
    toggleBook, toggleSidebar, toggleRecent,
    removeRecentSearch, clearRecentSearches,
    removeBook, permanentlyDelete, restoreBook, restoreAll,
  };
}
