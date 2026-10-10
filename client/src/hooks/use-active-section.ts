import { useEffect, useState } from 'react';

/** 顶部导航的滚动高亮：返回当前视口内最靠上的区块 id */
export function useActiveSection(ids: readonly string[], offset = 96) {
  const [activeId, setActiveId] = useState(() => ids[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const scrolled = window.scrollY + offset;
      let current = ids[0] ?? '';

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrolled) current = id;
      }

      // 滚动到底部时高亮最后一项，否则最后一段永远点不亮
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
