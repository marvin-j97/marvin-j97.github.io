interface Props {
  onChange: (x: File) => void;
}

export default function FileInput(props: Props) {
  let fileInput: HTMLInputElement | undefined;

  return (
    <>
      <div class="flex justify-center">
        <div
          onClick={() => fileInput?.click()}
          class="
    shadow
    appearance-none
    border
    focus:border-blue-500
    rounded
    py-3
    px-5
    text-gray-700
    leading-tight
    focus:outline-none focus:shadow-outline cursor-pointer
  "
        >
          Select file
        </div>
      </div>
      <input
        accept="jpg,jpeg,png"
        ref={fileInput!}
        class="hidden"
        type="file"
        onChange={(ev) => {
          const file = ev.currentTarget.files?.[0];
          file && props.onChange(file);
        }}
      />
    </>
  );
}
