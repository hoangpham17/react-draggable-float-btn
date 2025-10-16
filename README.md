# React Draggable Float Button

A customizable, draggable floating button component for React applications.

## Features

- 🎯 **Draggable**: Drag the button anywhere on the screen
- 🎨 **Customizable**: Custom styles, colors, sizes, and positions
- 📱 **Responsive**: Automatically adjusts to window resize
- 🎭 **Flexible**: Support for custom children and click handlers
- 🎪 **TypeScript**: Full TypeScript support with type definitions
- 🚀 **Lightweight**: Minimal dependencies, optimized bundle size
- 🎨 **Flexible Content**: Support for text, emojis, icons, or any React elements

## Installation

```bash
npm install react-draggable-float-btn
```

## Usage

### Basic Usage

```tsx
import React from "react";
import { FloatingButton } from "react-draggable-float-btn";

function App() {
  return (
    <FloatingButton onClick={() => console.log("Button clicked!")}>
      +
    </FloatingButton>
  );
}
```

**Note**: You need to provide `children` content for the button to display.

### Advanced Usage

```tsx
import React from "react";
import { FloatingButton } from "react-draggable-float-btn";

function App() {
  const handleClick = () => {
    console.log("Floating button clicked!");
  };

  const handleDragStart = (position) => {
    console.log("Drag started at:", position);
  };

  const handleDragEnd = (position) => {
    console.log("Drag ended at:", position);
  };

  return (
    <FloatingButton
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      size="large"
      backgroundColor="#ff6b6b"
      color="#ffffff"
      defaultPosition="bottom-right"
      style={{
        boxShadow: "0 8px 24px rgba(255, 107, 107, 0.3)",
      }}
    >
      <span>💬</span>
    </FloatingButton>
  );
}
```

## Props

| Prop              | Type                                                           | Default                            | Description                                     |
| ----------------- | -------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------- |
| `children`        | `React.ReactNode`                                              | -                                  | Content to display inside the button            |
| `onClick`         | `(event: MouseEvent) => void`                                  | -                                  | Click handler function                          |
| `className`       | `string`                                                       | `''`                               | CSS class name for the button                   |
| `style`           | `CSSProperties`                                                | `{}`                               | Inline styles for the button                    |
| `position`        | `{ x: number; y: number }`                                     | -                                  | Custom position (overrides defaultPosition)     |
| `defaultPosition` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'`                   | Default position when no custom position is set |
| `draggable`       | `boolean`                                                      | `true`                             | Whether the button can be dragged               |
| `disabled`        | `boolean`                                                      | `false`                            | Whether the button is disabled                  |
| `size`            | `'small' \| 'medium' \| 'large'`                               | `'medium'`                         | Button size                                     |
| `color`           | `string`                                                       | `'#000000'`                        | Text color                                      |
| `backgroundColor` | `string`                                                       | `'#ffffff'`                        | Background color                                |
| `borderRadius`    | `number`                                                       | `50`                               | Border radius (50 = fully rounded)              |
| `boxShadow`       | `string`                                                       | `'0 4px 12px rgba(0, 0, 0, 0.15)'` | Box shadow                                      |
| `zIndex`          | `number`                                                       | `1000`                             | Z-index of the button                           |
| `onDragStart`     | `(position: { x: number; y: number }) => void`                 | -                                  | Called when drag starts                         |
| `onDragEnd`       | `(position: { x: number; y: number }) => void`                 | -                                  | Called when drag ends                           |

## Examples

### Different Sizes

```tsx
<FloatingButton size="small">S</FloatingButton>
<FloatingButton size="medium">M</FloatingButton>
<FloatingButton size="large">L</FloatingButton>
```

### Different Positions

```tsx
<FloatingButton defaultPosition="top-left">TL</FloatingButton>
<FloatingButton defaultPosition="top-right">TR</FloatingButton>
<FloatingButton defaultPosition="bottom-left">BL</FloatingButton>
<FloatingButton defaultPosition="bottom-right">BR</FloatingButton>
```

### Custom Styling

```tsx
<FloatingButton
  backgroundColor="#28a745"
  color="#ffffff"
  borderRadius={25}
  boxShadow="0 6px 20px rgba(40, 167, 69, 0.4)"
  style={{
    border: "2px solid #1e7e34",
  }}
>
  Save
</FloatingButton>
```

### Non-draggable Button

```tsx
<FloatingButton
  draggable={false}
  onClick={() => alert("Fixed position button!")}
>
  Fixed
</FloatingButton>
```

### Custom Position

```tsx
<FloatingButton
  position={{ x: 100, y: 100 }}
  onClick={() => console.log("Custom position!")}
>
  Custom
</FloatingButton>
```

### Custom Content

```tsx
import { FloatingButton } from "react-draggable-float-btn";

// With text
<FloatingButton onClick={() => console.log("Text button!")}>
  Click me
</FloatingButton>

// With emoji
<FloatingButton onClick={() => console.log("Emoji button!")}>
  🚀
</FloatingButton>

// With custom icon
<FloatingButton onClick={() => console.log("Icon button!")}>
  <span>⚡</span>
</FloatingButton>
```

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch for changes
npm run dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
