import styles from "./bodyBox.module.css";
function BodyBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.bodyBox} ${className || ""}`}>{children}</div>
  );
}

export default BodyBox;
