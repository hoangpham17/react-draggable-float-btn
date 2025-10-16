import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  CSSProperties,
} from "react";

export interface FloatingButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
  position?: {
    x: number;
    y: number;
  };
  defaultPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  draggable?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  boxShadow?: string;
  zIndex?: number;
  onDragStart?: (position: { x: number; y: number }) => void;
  onDragEnd?: (position: { x: number; y: number }) => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  onClick,
  className = "",
  style = {},
  position,
  defaultPosition = "bottom-right",
  draggable = true,
  disabled = false,
  size = "medium",
  color = "#000000",
  backgroundColor = "#ffffff",
  borderRadius = 50,
  boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)",
  zIndex = 1000,
  onDragStart,
  onDragEnd,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get default position based on defaultPosition prop
  const getDefaultPosition = useCallback(() => {
    if (position) return position;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonSize = size === "small" ? 40 : size === "large" ? 60 : 50;
    const margin = 20;

    switch (defaultPosition) {
      case "bottom-right":
        return {
          x: windowWidth - buttonSize - margin,
          y: windowHeight - buttonSize - margin,
        };
      case "bottom-left":
        return { x: margin, y: windowHeight - buttonSize - margin };
      case "top-right":
        return { x: windowWidth - buttonSize - margin, y: margin };
      case "top-left":
        return { x: margin, y: margin };
      default:
        return {
          x: windowWidth - buttonSize - margin,
          y: windowHeight - buttonSize - margin,
        };
    }
  }, [position, defaultPosition, size]);

  // Initialize position
  useEffect(() => {
    if (buttonPosition === null) {
      setButtonPosition(getDefaultPosition());
    }
  }, [buttonPosition, getDefaultPosition]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (buttonPosition && !position) {
        const newPosition = getDefaultPosition();
        setButtonPosition(newPosition);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [buttonPosition, position, getDefaultPosition]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable || disabled) return;

      e.preventDefault();
      setIsDragging(true);

      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }

      onDragStart?.(buttonPosition || { x: 0, y: 0 });
    },
    [draggable, disabled, buttonPosition, onDragStart]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !draggable || disabled) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Keep button within viewport bounds
      const buttonSize = size === "small" ? 40 : size === "large" ? 60 : 50;
      const maxX = window.innerWidth - buttonSize;
      const maxY = window.innerHeight - buttonSize;

      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      setButtonPosition({ x: constrainedX, y: constrainedY });
    },
    [isDragging, draggable, disabled, dragOffset, size]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.(buttonPosition || { x: 0, y: 0 });
    }
  }, [isDragging, buttonPosition, onDragEnd]);

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { width: 40, height: 40, fontSize: "14px" };
      case "large":
        return { width: 60, height: 60, fontSize: "18px" };
      default:
        return { width: 50, height: 50, fontSize: "16px" };
    }
  };

  const buttonStyles: CSSProperties = {
    position: "fixed",
    left: buttonPosition?.x || 0,
    top: buttonPosition?.y || 0,
    width: getSizeStyles().width,
    height: getSizeStyles().height,
    borderRadius,
    border: "none",
    backgroundColor,
    color,
    fontSize: getSizeStyles().fontSize,
    fontWeight: "bold",
    cursor: !disabled ? (isDragging ? "grabbing" : "grab") : "not-allowed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow,
    zIndex,
    transition: isDragging ? "none" : "all 0.2s ease",
    userSelect: "none",
    outline: "none",
    ...style,
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDragging && !disabled) {
      onClick?.(e);
    }
  };

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        className={className}
        style={buttonStyles}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        disabled={disabled}
        type="button"
      >
        {children}
      </button>
    </div>
  );
};

export default FloatingButton;
