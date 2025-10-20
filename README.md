# React Draggable Float Button

[![npm version](https://img.shields.io/npm/v/react-draggable-float-btn)](https://www.npmjs.com/package/react-draggable-float-btn)
[![npm downloads](https://img.shields.io/npm/dm/react-draggable-float-btn)](https://www.npmjs.com/package/react-draggable-float-btn)
![License](https://img.shields.io/npm/l/react-draggable-float-btn)

A lightweight, customizable draggable floating button component for React.

## Features

- 🎯 Fully draggable with viewport constraints
- 🎨 Customizable styles via props or CSS classes
- 📱 Responsive and automatically repositions on window resize
- 🎪 TypeScript support with full type definitions
- 🚀 Lightweight with zero dependencies
- 💅 BEM-style CSS classes for easy customization

## Installation

```bash
npm install react-draggable-float-btn
```

## Quick Start

```tsx
import { FloatingButton } from "react-draggable-float-btn";

function App() {
  return (
    <FloatingButton onClick={() => console.log("Clicked!")}>+</FloatingButton>
  );
}
```

## Props

| Prop              | Type                                                           | Default          | Description                                |
| ----------------- | -------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| `children`        | `React.ReactNode`                                              | Required         | Content to display inside the button       |
| `onClick`         | `(event: MouseEvent) => void`                                  | -                | Click handler                              |
| `size`            | `'small' \| 'medium' \| 'large'`                               | `'medium'`       | Button size (40px / 50px / 60px)           |
| `defaultPosition` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Default position                           |
| `position`        | `{ x: number; y: number }`                                     | -                | Fixed position (overrides defaultPosition) |
| `draggable`       | `boolean`                                                      | `true`           | Enable/disable dragging                    |
| `disabled`        | `boolean`                                                      | `false`          | Disable button interactions                |
| `backgroundColor` | `string`                                                       | `#ffffff`        | Background color                           |
| `color`           | `string`                                                       | `#000000`        | Text/content color                         |
| `borderRadius`    | `number`                                                       | `50`             | Border radius in pixels                    |
| `boxShadow`       | `string`                                                       | CSS default      | Custom box shadow                          |
| `zIndex`          | `number`                                                       | `1000`           | Z-index value                              |
| `className`       | `string`                                                       | -                | Additional CSS class                       |
| `style`           | `CSSProperties`                                                | -                | Inline styles                              |
| `onDragStart`     | `(position: { x: number; y: number }) => void`                 | -                | Callback when drag starts                  |
| `onDragEnd`       | `(position: { x: number; y: number }) => void`                 | -                | Callback when drag ends                    |

## Examples

### Different Sizes

```tsx
<FloatingButton size="small">S</FloatingButton>
<FloatingButton size="medium">M</FloatingButton>
<FloatingButton size="large">L</FloatingButton>
```

### Positions

```tsx
<FloatingButton defaultPosition="top-left">TL</FloatingButton>
<FloatingButton defaultPosition="bottom-right">BR</FloatingButton>
```

### Custom Styling

```tsx
<FloatingButton
  backgroundColor="#007bff"
  color="#ffffff"
  size="large"
  onClick={() => alert("Hello!")}
>
  💬
</FloatingButton>
```

### Multiple Buttons

```tsx
<>
  <FloatingButton defaultPosition="bottom-right">+</FloatingButton>
  <FloatingButton defaultPosition="bottom-left">💬</FloatingButton>
  <FloatingButton defaultPosition="top-right">🔔</FloatingButton>
</>
```

### Non-draggable

```tsx
<FloatingButton draggable={false} position={{ x: 100, y: 100 }}>
  📌
</FloatingButton>
```

## Styling

### CSS Classes

The component uses BEM-style classes:

- `.btn-float-draggable` - Base class
- `.btn-float-draggable--{size}` - Size variants (small/medium/large)
- `.btn-float-draggable--dragging` - Applied while dragging
- `.btn-float-draggable--disabled` - Applied when disabled

### Override Styles

```css
.btn-float-draggable {
  background-color: #007bff !important;
  box-shadow: 0 8px 16px rgba(0, 123, 255, 0.3) !important;
}

.btn-float-draggable--large {
  width: 70px !important;
  height: 70px !important;
}

.btn-float-draggable--dragging {
  opacity: 0.8;
  transform: scale(1.05);
}
```

### Using Custom Classes

```tsx
<FloatingButton className="my-custom-button">Custom</FloatingButton>
```

The button will render with combined classes:

```html
<button
  class="btn-float-draggable btn-float-draggable--medium my-custom-button"
></button>
```

## Advanced Usage

### With Drag Callbacks

```tsx
<FloatingButton
  onDragStart={(pos) => console.log("Drag started:", pos)}
  onDragEnd={(pos) => console.log("Drag ended:", pos)}
>
  📍
</FloatingButton>
```

### With Custom Styles

```tsx
<FloatingButton
  style={{
    background: "linear-gradient(45deg, #ff6b6b, #ff8e8e)",
    border: "3px solid #ff5252",
  }}
>
  ✨
</FloatingButton>
```

## Development

```bash
# Install dependencies
npm install

# Build package
npm run build

# Watch mode
npm run dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
