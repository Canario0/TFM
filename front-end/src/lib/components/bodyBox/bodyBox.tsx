import { useEffect, useRef } from "react";
import styles from "./bodyBox.module.css";

function BodyBox({
  children,
  className,
  onOverflow,
}: {
  children: React.ReactNode;
  className?: string;
  onOverflow?: (overflow: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkOverflowWithRef = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        onOverflow?.(scrollWidth > clientWidth);
      }
    };
    checkOverflowWithRef();
    window.addEventListener("resize", checkOverflowWithRef);
    return () => {
      window.removeEventListener("resize", checkOverflowWithRef);
    };
  }, [onOverflow, containerRef]);

  return (
    <div className={`${styles.bodyBox} ${className || ""}`} ref={containerRef}>
      {children}
    </div>
  );
}

export default BodyBox;
