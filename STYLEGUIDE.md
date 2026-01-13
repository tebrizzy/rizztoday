# Rizzy.Today Style Guide

## Animation Principles

All hover interactions follow **macOS-inspired animation patterns** for a premium, native feel.

### Core Animation Properties

```css
/* Standard easing - smooth deceleration */
transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

/* Subtle easing - for micro-interactions */
transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Hover Animation Patterns

#### 1. Genie Effect (Scale + Fade)
Elements appear to emerge from their trigger point, scaling up while fading in.
- Start: `scale(0.8) opacity(0)`
- End: `scale(1) opacity(1)`
- Use for: Dropdowns, cards, tooltips, popovers

#### 2. Float Effect
Subtle lift with enhanced shadow on hover.
- Transform: `translateY(-2px)`
- Shadow increase on hover
- Use for: Buttons, interactive cards

#### 3. Staggered Reveal
Multiple items appear sequentially with slight delays.
- Delay increment: `0.03s` per item
- Use for: Action buttons, menu items, lists

#### 4. Spring Bounce
Overshoot animation using cubic-bezier for playful interactions.
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Use for: Toggles, expanding elements

### Animation Values

| Property | Default | Hover |
|----------|---------|-------|
| Scale | 1 | 1.02 - 1.05 |
| Opacity | varies | 1 |
| TranslateY | 0 | -2px to -4px |
| Blur (backdrop) | 20px | 20px |

### Color Transitions

- Duration: `0.2s - 0.3s`
- Links on hover: `#3b82f6` (blue)
- Background darken on hover: increase opacity by 15-20%

### Do's and Don'ts

**Do:**
- Use consistent easing across all animations
- Keep durations between 0.2s - 0.4s
- Add slight scale increase on interactive elements
- Use backdrop-filter blur for depth

**Don't:**
- Use linear easing (feels mechanical)
- Exceed 0.5s duration (feels sluggish)
- Animate too many properties at once
- Use jarring color changes
