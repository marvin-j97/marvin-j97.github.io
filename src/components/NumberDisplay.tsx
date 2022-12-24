interface Props {
  value: string;
  title: string;
}

export default function NumberDisplay(props: Props) {
  return (
    <div>
      <div class="mb-1 text-sm font-semibold sec--text">{props.title}</div>
      <input
        type="text"
        value={props.value}
        readonly
        class="text-gray-500
      cursor-not-allowed
      appearance-none
      border
      rounded
      w-full
      py-2
      px-3
      leading-tight
      focus:outline-none focus:shadow-outline
    "
      />
    </div>
  );
}
