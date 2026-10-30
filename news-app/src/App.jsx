import { useState, useEffect } from "react";
import "./App.css";

const NEWS = [
  {
    id: 1,
    category: "Politics",
    title: "اجتماع طارئ لمجلس الأمن حول الأوضاع في المنطقة",
    desc: "ناقش المجلس تطورات الأحداث الأخيرة وسط دعوات لوقف التصعيد.",
    date: "2026-10-30",
    image: "https://picsum.photos/seed/n1/600/360",
    url: "#",
  },
  {
    id: 2,
    category: "Technology",
    title: "شركة جديدة تطلق نموذج ذكاء اصطناعي أسرع بمرتين",
    desc: "النموذج الجديد يعد بأداء أفضل على الأجهزة المحمولة.",
    date: "2026-10-30",
    image: "https://picsum.photos/seed/n2/600/360",
    url: "#",
  },
  {
    id: 3,
    category: "Sports",
    title: "الأهلي يفوز في مباراة مثيرة بالدوري",
    desc: "هدف في الدقائق الأخيرة يمنح الفريق ثلاث نقاط مهمة.",
    date: "2026-10-29",
    image: "https://picsum.photos/seed/n3/600/360",
    url: "#",
  },
  {
    id: 4,
    category: "Health",
    title: "دراسة: المشي 30 دقيقة يوميا يحسن صحة القلب",
    desc: "باحثون يؤكدون أن النشاط البسيط له فوائد كبيرة على المدى الطويل.",
    date: "2026-10-29",
    image: "https://picsum.photos/seed/n4/600/360",
    url: "#",
  },
  {
    id: 5,
    category: "Society",
    title: "مبادرة جديدة لدعم الشباب في سوق العمل",
    desc: "برنامج تدريبي مجاني يستهدف آلاف الخريجين.",
    date: "2026-10-28",
    image: "https://picsum.photos/seed/n5/600/360",
    url: "#",
  },
  {
    id: 6,
    category: "Education",
    title: "تحديث المناهج الدراسية بإضافة مادة البرمجة",
    desc: "الخطة الجديدة تبدأ من العام الدراسي القادم.",
    date: "2026-10-28",
    image: "https://picsum.photos/seed/n6/600/360",
    url: "#",
  },
];

const CATEGORIES = [
  "Latest News",
  "Technology",
  "Politics",
  "Sports",
  "Health",
  "Society",
  "Education",
  "Favorites",
];

function NewsCard({ item, isFav, onToggleFav }) {
  return (
    <article className="card">
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="card-body">
        <h3>{item.title}</h3>
        <span className="date">{item.date}</span>
        <p>{item.desc}</p>
        <div className="card-footer">
          <button
            className={`fav ${isFav ? "active" : ""}`}
            onClick={() => onToggleFav(item.id)}
            aria-label="أضف للمفضلة"
          >
            {isFav ? "♥" : "♡"}
          </button>
          <a
            className="read-more"
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [active, setActive] = useState("Latest News");
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favs")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);

  const toggleFav = (id) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const visible = NEWS.filter((n) => {
    if (active === "Latest News") return true;
    if (active === "Favorites") return favs.includes(n.id);
    return n.category === active;
  });

  return (
    <div className="app" dir="rtl">
      <header className="header">News App</header>

      <nav className="tabs" dir="ltr">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`tab ${active === c ? "active" : ""}`}
            onClick={() => setActive(c)}
          >
            {c === "Favorites" ? "♥ " : ""}
            {c}
          </button>
        ))}
      </nav>

      <main>
        <h2 className="section-title" dir="ltr">
          {active}
        </h2>
        {visible.length === 0 ? (
          <p className="empty">مفيش أخبار هنا لسه.</p>
        ) : (
          <div className="grid">
            {visible.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                isFav={favs.includes(item.id)}
                onToggleFav={toggleFav}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">Copyright © 2026 Toddly News App</footer>
    </div>
  );
}
