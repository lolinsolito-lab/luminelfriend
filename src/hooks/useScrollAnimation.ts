import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
    /** Animation start position relative to viewport, e.g. "top 80%" */
    start?: string;
    /** Animation end position, e.g. "bottom 20%" */
    end?: string;
    /** Whether to pin the element during animation */
    pin?: boolean;
    /** Scrub: true for smooth, number for lerp delay */
    scrub?: boolean | number;
    /** Markers for debugging */
    markers?: boolean;
}

/**
 * Creates a GSAP timeline linked to ScrollTrigger for scroll-driven animations.
 * Returns a ref to attach to the trigger element.
 *
 * Usage:
 * ```tsx
 * const { ref, tl } = useScrollAnimation({ scrub: 1, pin: true });
 * useEffect(() => {
 *   if (!tl.current) return;
 *   tl.current.fromTo('.my-element', { opacity: 0 }, { opacity: 1 });
 * }, []);
 * return <div ref={ref}>...</div>;
 * ```
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: options.start || 'top 80%',
                end: options.end || 'bottom 20%',
                scrub: options.scrub ?? 1,
                pin: options.pin || false,
                markers: options.markers || false,
            },
        });

        return () => {
            tl.current?.scrollTrigger?.kill();
            tl.current?.kill();
        };
    }, []);

    return { ref, tl };
}
