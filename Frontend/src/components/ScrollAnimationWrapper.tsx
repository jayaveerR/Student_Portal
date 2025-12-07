import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollAnimationWrapperProps {
    children: ReactNode;
    animation?: "fade-up" | "fade-in" | "slide-in" | "slide-in-right";
    delay?: number;
    threshold?: number;
    className?: string;
}

const ScrollAnimationWrapper = ({
    children,
    animation = "fade-up",
    delay = 0,
    threshold = 0.1,
    className = "",
}: ScrollAnimationWrapperProps) => {
    const { elementRef, isVisible } = useScrollAnimation({ threshold });

    const animationClass = {
        "fade-up": "animate-fade-up",
        "fade-in": "animate-fade-in",
        "slide-in": "animate-slide-in",
        "slide-in-right": "animate-slide-in-right",
    }[animation];

    return (
        <div
            ref={elementRef}
            className={`${className} ${isVisible ? animationClass : "opacity-0"}`}
            style={{
                animationDelay: isVisible ? `${delay}ms` : "0ms",
            }}
        >
            {children}
        </div>
    );
};

export default ScrollAnimationWrapper;
