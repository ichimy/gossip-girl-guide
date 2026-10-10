import type { MouseEvent, ReactNode } from 'react';

interface ActiveLinkProps {
  /** 目标锚点，如 "#hero" */
  to: string;
  /** 选中态由 Layout 的滚动监听统一计算后传入 */
  isActive?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

/** 锚点导航链接：点击后平滑滚动到目标区块并同步地址栏 hash */
export const ActiveLink = ({
  to,
  isActive,
  className,
  children,
  onClick,
}: ActiveLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const id = to.replace(/^#/, '');
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    onClick?.();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', to);
  };

  return (
    <a
      href={to}
      className={className}
      onClick={handleClick}
      aria-current={isActive ? 'true' : undefined}
    >
      {children}
    </a>
  );
};

export default ActiveLink;
