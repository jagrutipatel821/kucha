import Image from 'next/image';

type Props = {
  src?: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
};

export default function SafeImage({
  src,
  alt,
  fill,
  className,
  sizes,
}: Props) {
  return (
    <Image
      src={src || '/product_images/8.jpg'}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/placeholder.png';
      }}
    />
  );
}
