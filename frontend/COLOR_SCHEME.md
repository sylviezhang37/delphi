# Delphi Color Scheme

## 🎨 Color Palette

### Primary Colors
- **White**: `#ffffff` - Main background, clean and accessible
- **Green**: `#497a5b` - Primary accent color for branding and actions
- **Gold**: `#f4b400` - Secondary accent for highlights and borders

### Color Usage

#### 🏠 Home Page
- **Background**: White (`#ffffff`)
- **Logo**: Green (`#497a5b`)
- **Start Button**: Green background (`#497a5b`) with gold border (`#f4b400`)
- **Button Text**: White (`#ffffff`)

#### 💬 Chat Screen
- **Header Title**: Green (`#497a5b`)
- **Back Button**: Green (`#497a5b`)
- **User Messages**: Green background (`#497a5b`)
- **AI Messages**: Light background with green text (`#497a5b`)
- **Send Button**: Green background (`#497a5b`) with gold border (`#f4b400`)
- **Camera Button**: Green background (`#497a5b`) with gold border (`#f4b400`)

#### 👁️ Observation Screen
- **Header Elements**: Green (`#497a5b`)
- **Scan Button**: Green background (`#497a5b`) with gold border (`#f4b400`)
- **Speak Button**: Green background (`#497a5b`) with gold border (`#f4b400`)
- **Description Text**: Green (`#497a5b`)

## 🎯 Design Principles

### Accessibility
- **High Contrast**: Green on white provides excellent readability
- **Color Blind Friendly**: Green and gold work well for color vision deficiencies
- **Screen Reader Support**: All colors have sufficient contrast ratios

### Visual Hierarchy
- **Primary Actions**: Green buttons with gold borders for emphasis
- **Secondary Elements**: Green text for consistency
- **Background**: Clean white for focus and clarity

### Brand Identity
- **Professional**: Green conveys trust and reliability
- **Warmth**: Gold adds warmth and premium feel
- **Clean**: White background ensures clarity and accessibility

## 🔧 Implementation

### React Native Styles
```javascript
// Primary colors
const colors = {
  white: '#ffffff',
  green: '#497a5b',
  gold: '#f4b400'
};

// Button styling
startButton: {
  backgroundColor: '#497a5b',
  borderWidth: 2,
  borderColor: '#f4b400',
  // ... other styles
}
```

### CSS (Web Preview)
```css
.logo {
  color: #497a5b;
}

.start-button {
  background: #497a5b;
  border: 2px solid #f4b400;
}
```

## 📱 Component Color Mapping

| Component | Background | Text | Accent |
|-----------|------------|------|--------|
| Home Page | White | Green | Gold borders |
| Chat Screen | White | Green | Gold borders |
| Observation | White | Green | Gold borders |
| Buttons | Green | White | Gold borders |
| Messages | Green/White | White/Green | - |

## ♿ Accessibility Features

- **WCAG AA Compliant**: All color combinations meet accessibility standards
- **High Contrast**: Minimum 4.5:1 contrast ratio for all text
- **Color Independence**: Information not conveyed by color alone
- **Screen Reader Friendly**: Colors enhance but don't replace text content