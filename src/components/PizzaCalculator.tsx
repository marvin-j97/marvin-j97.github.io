import { createMemo, createSignal, Show } from "solid-js";
import NumberDisplay from "./NumberDisplay";
import NumberInput from "./NumberInput";

function toRatio(num: number): number {
  return num / 100;
}

function truncate(num: number): string {
  return num.toFixed(1);
}

export default function PizzaCalculator() {
  const [pizzaCount, setPizzaCount] = createSignal(1);
  const [farinaPerPizza, setFarina] = createSignal(140);
  const [waterRatio, setWaterRatio] = createSignal(toRatio(65));
  const [yeastRatio, setYeastRatio] = createSignal(toRatio(1));
  const [saltRatio, setSaltRatio] = createSignal(toRatio(2.5));
  const [showAdvancedSettings, setAdvancedSettings] = createSignal(false);

  const farina = createMemo(() => pizzaCount() * farinaPerPizza());
  const water = createMemo(() => farina() * waterRatio());
  const salt = createMemo(() => farina() * saltRatio());
  const yeast = createMemo(() => farina() * yeastRatio());

  return (
    <>
      <div class="flex flex-col gap-4">
        <NumberInput
          min={1}
          max={1000}
          title="Pizzen (ganz)"
          value={pizzaCount()}
          onChange={setPizzaCount}
        />
        <hr class="border-0 bg-gray-300 text-gray-500 h-px" />
        <NumberDisplay title="Mehl (g)" value={truncate(farina())} />
        <NumberDisplay title="Wasser (ml)" value={truncate(water())} />
        <NumberDisplay title="Trockenhefe (g)" value={truncate(yeast())} />
        <NumberDisplay title="Salz (g)" value={truncate(salt())} />
        <label>
          <input
            class="mr-2"
            id="advanced-settings-checkbox"
            type="checkbox"
            checked={showAdvancedSettings()}
            onChange={(ev) => setAdvancedSettings(ev.currentTarget.checked)}
          />
          Erweitert
        </label>
        <Show when={showAdvancedSettings()}>
          <NumberInput
            min={100}
            max={200}
            title="Mehl pro Pizza"
            value={farinaPerPizza()}
            onChange={setFarina}
          />
          <NumberInput
            min={60}
            max={80}
            title="Hydration (%)"
            value={waterRatio() * 100}
            onChange={(x) => setWaterRatio(Number(truncate(x / 100)))}
            step={0.5}
          />
          <NumberInput
            min={0}
            max={2}
            title="Hefeanteil (%)"
            value={yeastRatio() * 100}
            onChange={(x) => setYeastRatio(toRatio(Number(truncate(x))))}
            step={0.1}
          />
          <NumberInput
            min={0}
            max={3}
            title="Salzanteil (%)"
            value={saltRatio() * 100}
            onChange={(x) => setSaltRatio(toRatio(Number(truncate(x))))}
            step={0.1}
          />
        </Show>
      </div>
    </>
  );
}
