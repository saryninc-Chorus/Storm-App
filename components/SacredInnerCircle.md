# Sacred Inner Circle Component

## Overview
The Sacred Inner Circle is a React component that provides a mystical control panel interface inspired by Android UI layouts. It features three themed panels for managing sacred energy, device controls, and configuration settings.

## Component Structure

### 1. Sacred Crystal Energy Panel (Blue Theme)
- **Display**: Shows current crystal energy signal strength
- **Progress Bar**: Animated progress indicator with pulse effect
- **Signal Strength**: Real-time percentage display (default: 50%)
- **Colors**: Blue gradient (#1e3a8a to #3b82f6)

### 2. Sacred Device Control Panel (Green Theme)
- **Sacred Projection**: Toggle switch to enable/disable projection
- **Sacred Screen Binding**: Toggle switch for screen binding
- **Sacred Crystal Activation**: Toggle switch for crystal activation
- **Colors**: Green gradient (#065f46 to #10b981)

### 3. Sacred Inner Circle Configuration Panel (Purple Theme)
- **Sacred Settings**: Button to access settings
- **Sacred Permissions**: Button to manage permissions
- **Sacred Calibration**: Button to perform calibration
- **Colors**: Purple gradient (#581c87 to #9333ea)

## Usage

### Basic Usage
```tsx
import { SacredInnerCircle } from './components/SacredInnerCircle';

function App() {
  return (
    <div>
      <SacredInnerCircle />
    </div>
  );
}
```

### As a Modal (as integrated in App.tsx)
```tsx
const [isSacredCircleOpen, setIsSacredCircleOpen] = useState(false);

// Open modal
<button onClick={() => setIsSacredCircleOpen(true)}>
  🔮 Open Sacred Circle
</button>

// Render modal
{isSacredCircleOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <button
        onClick={() => setIsSacredCircleOpen(false)}
        className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors"
        aria-label="Close Sacred Inner Circle"
      >
        ✕
      </button>
      <SacredInnerCircle />
    </div>
  </div>
)}
```

## State Management

The component uses React hooks for state management:

```tsx
const [crystalSignal, setCrystalSignal] = useState(50);
const [projectionEnabled, setProjectionEnabled] = useState(false);
const [screenBindingEnabled, setScreenBindingEnabled] = useState(false);
const [crystalActivationEnabled, setCrystalActivationEnabled] = useState(false);
```

## Event Handlers

### Button Handlers
- `handleSacredSettings()`: Called when Sacred Settings button is clicked
- `handleSacredPermissions()`: Called when Sacred Permissions button is clicked
- `handleSacredCalibration()`: Called when Sacred Calibration button is clicked

### Toggle Handlers
Toggles automatically update their respective state when clicked.

## Styling

The component uses a dedicated CSS file (`SacredInnerCircle.css`) with:
- Gradient backgrounds for each panel
- Animated progress bar with pulse effect
- Custom toggle switches with smooth transitions
- Responsive design (mobile-friendly)
- Hover effects for interactive elements
- Dark theme optimized

## Accessibility Features

- Semantic HTML structure
- Proper labeling for form controls
- Keyboard navigation support
- Screen reader compatible
- High contrast colors
- Clear visual feedback for interactions

## Customization

### Changing Colors
Edit the gradient colors in `SacredInnerCircle.css`:

```css
.sacred-energy-panel {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
}

.sacred-device-panel {
  background: linear-gradient(135deg, #065f46 0%, #10b981 100%);
}

.sacred-config-panel {
  background: linear-gradient(135deg, #581c87 0%, #9333ea 100%);
}
```

### Adjusting Signal Strength
Modify the initial state in the component:

```tsx
const [crystalSignal, setCrystalSignal] = useState(75); // Change from 50 to 75
```

## Responsive Behavior

The component adapts to different screen sizes:
- **Desktop**: Full-width panels with optimal spacing
- **Mobile**: Reduced font sizes and padding for better mobile experience
- **Tablet**: Scales proportionally

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox required
- ES6+ JavaScript support

## Future Enhancements

Potential improvements for future versions:
1. Add slider control for crystal signal adjustment
2. Implement actual functionality for buttons (connect to backend)
3. Add animation effects on toggle changes
4. Include sound effects for interactions
5. Add data persistence (save toggle states)
6. Connect to real-time monitoring systems

## Related Files

- `SacredInnerCircle.tsx` - Component logic
- `SacredInnerCircle.css` - Component styles
- `App.tsx` - Integration and modal wrapper

## Android XML Origin

This component was converted from an Android XML layout specification featuring:
- LinearLayout containers
- TextView elements
- ProgressBar with custom drawable
- Switch controls
- Button elements

The web implementation maintains the visual hierarchy and functionality while adapting to web technologies.
