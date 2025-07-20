interface ColorPickerProps {
  colors: string[]
  selectedColor: string
  onColorSelect: (color: string) => void
}

export function ColorPicker({ colors, selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="modal-color-picker">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onColorSelect(color)}
          className={`modal-color-option ${
            selectedColor === color 
              ? 'modal-color-option-selected' 
              : 'modal-color-option-unselected'
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}