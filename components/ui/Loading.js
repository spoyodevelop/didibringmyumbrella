export default function Loading({ size = "xs" }) {
  const sizeClass = {
    xs: "loading loading-spinner loading-xs",
    sm: "loading loading-spinner loading-sm",
    md: "loading loading-spinner loading-md",
    lg: "loading loading-spinner loading-lg",
  };
  return <span className={sizeClass[size]}></span>;
}
