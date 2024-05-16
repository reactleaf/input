# @reactleaf/input

Variable Input components

[See on Storybook](https://main--6447d5ba8b8f8cd5016c6166.chromatic.com/)

## Usage

```sh
pnpm add @reactleaf/input
```

```tsx
import TextInput from "@reactleaf/input/TextInput"

function YourComponent() {
  const [value, setValue] = useState()
  return <TextInput value={value} onValueChange={setValue} />
}
```

### Use with hook-form-ready components

Install `react-hook-form`

```sh
pnpm add @reactleaf/input react-hook-form
```

```tsx
import useForm, { FormProvider } from "react-hook-form"
import TextInput from "@reactleaf/input/TextInput/hookform"

function YourComponent() {
  const form = useForm()
  return (
    <FormProvider {...form}>
      <TextInput name="hook-form-name" />
    </FormProvider>
  )
}
```

### Using Autocomplete, Combobox or DateInput

Autocomplete and Combobox depends on `react-select` and\
DateInput depends on `react-datepicker`.

```sh
pnpm add @reactleaf/input react-datepicker
```

```tsx
import DateInput from "@reactleaf/input/DateInput"

function YourComponent() {
  const [value, setValue] = useState()
  return <DateInput value={value} onSelect={setValue} />
}
```
