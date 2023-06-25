interface Props {
  value: number;
  onChange: (x: number) => void;
  title: string;
  min: number;
  max: number;
  step?: number;
}

export default function NumberInput(props: Props) {
  return (
    <div>
      <div class="mb-2 text-sm font-semibold sec--text">{props.title}</div>
      <input
        step={props.step || 1}
        min={props.min}
        max={props.max}
        type="number"
        value={props.value}
        onChange={(ev) => props.onChange(Number(ev.currentTarget.value) || 0)}
        class="
      shadow
      appearance-none
      border
      focus:border-blue-500
      rounded
      w-full
      py-2
      px-3
      text-gray-700
      leading-tight
      focus:outline-none focus:shadow-outline
    "
      />
    </div>
  );
}
