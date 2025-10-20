
# rules-js-kt

A small, framework-agnostic collection of input validation rules for JavaScript/TypeScript forms. Each rule has the shape `(value) => true | string` where `true` means the value passed validation and a `string` is an error message describing why validation failed. `rules-js-kt` is suitable for use with Vuetify, react-native-kt-forms, plain HTML forms, or any form library that accepts validator functions with this signature.

## Installation

Using npm:

```bash
npm install rules-js-kt
```

Or with yarn:

```bash
yarn add rules-js-kt
```

## Usage

Import the `rules` object or `createValidator` helper from the package and use the provided rule factories to validate values.

Example (simple usage):

```ts
import { rules, createValidator } from 'rules-js-kt';

const validators = {
 email: [rules.email('email'), rules.required('email')],
 age: [rules.number('age', 120, 0)],
};

const validate = createValidator(validators);

const values = { email: 'me@example.com', age: 30 };
const errors = validate(values);
// errors is an object with field keys and error messages (or undefined)
```

The `rules` object exposes many rule factories, for example:

- `rules.required(field)` — required value. Accepts arrays as well.
- `rules.email(field)` — RFC-style email validation.
- `rules.phone(field)` — generic phone validation.
- `rules.phoneLibya(field)` — Libya-specific phone numbers.
- `rules.username(field)` — username format.
- `rules.password(field)` — minimum length and allowed characters.
- `rules.number(field, max?, min?)` — numeric validation with optional inclusive bounds.
- `rules.inValues(field, list)` / `rules.notInValues(field, list)` — membership checks.
- `rules.hex(field, maxLength?, minLength?)` — hex string validation.
- `rules.name(field)` — basic name validation using Unicode letters.
- `rules.ipAndHostname(field)` — validate IPv4 or hostname (and localhost).
- `rules.title` / `rules.description` — length-limited string validators.

See the source (`index.ts`) for precise behavior and available options.

## createValidator

`createValidator(rules, inputsMap?)` returns a function that receives a values object and returns an errors object. The `rules` argument is a map where keys are field names and values are arrays of rule functions. A rule function returns `true` when the value is valid, or a `string` error message when invalid.

The returned validator will run the rules for each key present in the values object and stop at the first failing rule for that field.

Example (React/Vuetify):

```ts
// Vuetify expects an array of validator functions for each field.
// You can use the rule factories directly:
const emailRules = [rules.required('Email'), rules.email('Email')];

// In a component template (Vue + Vuetify):
// <v-text-field :rules="emailRules" v-model="email" />
```

### Vuetify form example

Here is a small single-file Vue component example showing how to use `rules-js-kt` with Vuetify (Vue 2 / Vuetify 2 style). It demonstrates using the rule factories directly in a component to validate a form before submission.

```vue
<template>
 <v-form ref="form" v-model="valid" lazy-validation>
  <v-text-field
   v-model="payload.email"
   :rules="emailRules"
   label="Email"
   required
  />

  <v-text-field
   v-model="payload.age"
   :rules="ageRules"
   label="Age"
   required
   type="number"
  />

  <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
 </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { rules } from 'rules-js-kt';

export default Vue.extend({
 data() {
  return {
   valid: false,
   payload: {
    email: '',
    age: null,
   },
   emailRules: [rules.required('Email'), rules.email('Email')],
   ageRules: [rules.required('Age'), rules.number('Age', 120, 0)],
  };
 },
 methods: {
  submit() {
   // this.$refs.form is the Vuetify form ref
   // You can also run a manual validation using createValidator if you prefer
   if ((this.$refs.form as any).validate()) {
    // form is valid — send payload
    console.log('submit', this.payload);
   }
  },
 },
});
</script>

<style scoped>
/* optional styling */
</style>
```

## Types

This package is written in TypeScript and ships types. Importing in TypeScript projects will provide type hints for `Rule`, `RulesList`, `createValidator`, and the `Input` helpers.

## Contributing

Contributions, fixes and suggestions are welcome. Please open issues or pull requests on the repository.

## License

MIT
