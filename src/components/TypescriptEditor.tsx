import { createSignal, For, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { JSX } from "solid-js/jsx-runtime";
import { transpile } from "typescript";
import debounce from "lodash.debounce";

const clog = console.log;
const cerr = console.error;
const cwarn = console.warn;

const saveToLocalStorage = debounce((text) => {
  clog("saving to local storage");
  localStorage.setItem("code", text);
}, 500);

export default function TypescriptEditor(): JSX.Element {
  const [code, setCode] = createSignal(`const str: string = "Hello world!";

console.log(str);
`);
  const [stdout, setStdout] = createStore({
    items: ["REPL ready"],
  });

  function runCode(): void {
    console.log = (...args) =>
      setStdout(
        produce((store) => {
          for (const message of args) {
            if (typeof message == "object") {
              store.items.push(JSON.stringify(message, null, 2));
            } else {
              store.items.push(message);
            }
          }
        })
      );
    console.error = console.warn = console.log;

    const result = transpile(code());
    eval(result);
  }

  onMount(() => {
    const fromLocal = localStorage.getItem("code");
    if (fromLocal) {
      setCode(fromLocal);
    }
  });

  return (
    <div class="flex flex-col gap-4">
      <div class="flex justify-center gap-2">
        <button
          onClick={runCode}
          class="px-4 py-1 rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-colors"
        >
          Run
        </button>
        <button
          onClick={() => setStdout("items", [])}
          class="px-4 py-1 border-2 border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 transition-colors"
        >
          Clear
        </button>
      </div>
      <div class="text-gray-600">Code (TypeScript 5.0.4)</div>
      <textarea
        spellcheck={false}
        value={code()}
        onInput={(ev) => {
          setCode(ev.currentTarget.value);
          saveToLocalStorage(ev.currentTarget.value);
        }}
        class="shadow w-full rounded border-2 border-gray-200 p-2 outline-0 transition-all hover:border-indigo-200 focus:border-indigo-400 font-mono text-sm"
        rows={15}
      />
      <div class="text-gray-600">Console</div>
      <div class="shadow console h-[250px] overflow-y-scroll rounded border-2 border-gray-100 bg-white text-gray-700 flex flex-col whitespace-pre font-mono">
        <For each={stdout.items}>
          {(line) => <div class="px-1 py-2">{line}</div>}
        </For>
      </div>
    </div>
  );
}
