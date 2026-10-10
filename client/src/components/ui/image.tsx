import * as React from 'react';

import { cn } from '@/lib/utils';

export type ImageProps = React.ComponentPropsWithoutRef<'img'>;

/** 图片组件：渲染原生 <img>，默认懒加载 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, loading = 'lazy', decoding = 'async', ...rest }, ref) => (
    <img
      {...rest}
      ref={ref}
      loading={loading}
      decoding={decoding}
      className={cn('bg-white/5', className)}
    />
  ),
);

Image.displayName = 'Image';

export default Image;
