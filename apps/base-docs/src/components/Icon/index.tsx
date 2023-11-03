type IconProps = {
  name: 'thumbs-up' | 'thumbs-up-filled' | 'thumbs-down' | 'thumbs-down-filled' | 'caret-down';
  color?: 'white' | 'black';
  width?: string;
  height?: string;
};

export default function Icon({ name, color = 'white', width = '24', height = '24' }: IconProps) {
  if (name === 'thumbs-up') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5466 0.0420685L11.6316 -0.231445L8 10.1481V24.0002L19.0426 24.0002C20.5745 24.0002 21.9797 22.8632 22.0135 21.2643L23 12.0149V11.9618C23 10.3319 21.5792 9.16684 20.0284 9.16684L15.1921 9.16685L15.8437 6.01904C16.6257 3.45312 15.117 0.810491 12.5466 0.0420685ZM10 10.4879L12.8392 2.37324C13.835 3.06664 14.2897 4.30372 13.921 5.46663L13.9055 5.5157L12.7357 11.1669L20.0284 11.1668C20.6321 11.1668 20.9739 11.5767 20.9986 11.922L20.0142 21.1521V21.2052C20.0142 21.558 19.6696 22.0002 19.0426 22.0002L10 22.0002V10.4879Z"
          fill="current"
        />
        <path d="M6.5 10.0001H1.5V24.0001H6.5V10.0001Z" fill="current" />
      </svg>
    );
  }
  if (name === 'thumbs-up-filled') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1.5 10H6.5V24H1.5V10Z" fill="current" />
        <path
          d="M19.3151 24C20.4877 24 21.4383 23.1233 21.4383 22.0419L22.5 11.9581C22.5 10.8767 21.5494 10 20.3767 10L13.8457 10L14.8261 5.20216C15.5161 2.9972 14.2524 0.678776 12.0109 0L8.5 10.1649V24L19.3151 24Z"
          fill="current"
        />
      </svg>
    );
  }
  if (name === 'thumbs-down') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 25"
        fill="current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5466 23.9581C15.117 23.1897 16.6257 20.5471 15.8437 17.9811L15.1921 14.8333L20.0284 14.8333C21.5792 14.8333 23 13.6683 23 12.0384V11.9852L22.0135 2.73592C21.9797 1.13701 20.5745 0 19.0426 0L8 3.8147e-06V13.8521L11.6316 24.2316L12.5466 23.9581ZM10 13.5123V2L19.0426 2C19.6696 2 20.0142 2.44218 20.0142 2.79494V2.84811L20.9986 12.0782C20.9739 12.4235 20.6321 12.8333 20.0284 12.8333L12.7357 12.8333L13.9055 18.4845L13.921 18.5335C14.2897 19.6965 13.835 20.9335 12.8392 21.6269L10 13.5123Z"
          fill="current"
        />
        <path d="M6.5 14.0001H1.5V5.14984e-05H6.5V14.0001Z" fill="current" />
      </svg>
    );
  }
  if (name === 'thumbs-down-filled') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1.5 14H6.5V3.8147e-06H1.5V14Z" fill="current" />
        <path
          d="M19.3151 0C20.4877 0 21.4383 0.87668 21.4383 1.95811L22.5 12.0419C22.5 13.1233 21.5494 14 20.3767 14L13.8457 14L14.8261 18.7978C15.5161 21.0028 14.2524 23.3212 12.0109 24L8.5 13.8351V3.8147e-06L19.3151 0Z"
          fill="current"
        />
      </svg>
    );
  }
  if (name === 'caret-down') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4199 7.52002L11.9999 14.94L4.57994 7.52002L2.80994 9.29002L11.9999 18.48L21.1899 9.29002L19.4199 7.52002Z"
          fill="current"
        />
      </svg>
    );
  }
  return null;
}
