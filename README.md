# @reactleaf/input

Variable Input components

[See on Storybook](https://main--6447d5ba8b8f8cd5016c6166.chromatic.com/)

## Usage

@reactleaf/input requires `react-select` and `react-datepicker` as peer dependency.

```sh
pnpm add @reactleaf/input react-hook-form react-select react-datepicker
```

```tsx
import { TextInput } from "@reactleaf/input"

function YourComponent() {
  const [value, setValue] = useState()
  return <TextInput value={value} onValueChange={setValue} />
}
```

### Use with react-hook-form

Install with `react-hook-form`

```sh
pnpm add @reactleaf/input react-hook-form react-select
```

```tsx
import useForm, { FormProvider } from "react-hook-form"
import { TextInput } from "@reactleaf/input/hookform"

function YourComponent() {
  const form = useForm()
  return (
    <FormProvider {...form}>
      <TextInput name="hook-form-name" />
    </FormProvider>
  )
}
```
