function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={`skeleton ${className}`} {...props}>
      <span className="move" />
    </div>
  );
}

export { Skeleton };
