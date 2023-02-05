<template>
  <label :for="`${name}__${value}`" class="checkbox">
    <input
      :name="name"
      type="checkbox"
      @input="onInput"
      :id="`${name}__${value}`"
      class="checkbox__input"
    />

    <span
      class="checkbox__element"
      :class="{ 'checkbox__element--checked': model.includes(value) }"
    />

    <span class="checkbox__label">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',

  model: {
    prop: 'model',
  },

  props: {
    model: Array,
    value: String,
    label: String,
    name: String,
  },

  methods: {
    onInput() {
      const newModel = [...this.model];
      const checked = newModel.includes(this.value);
      const index = newModel.indexOf(this.value);

      if (checked) {
        newModel.splice(index, 1);
      } else {
        newModel.push(this.value);
      }

      this.$emit('input', newModel);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
}

.checkbox__input {
  display: none;
}

.checkbox__element {
  &::before {
    content: '';
    position: absolute;
    transition: all 0.2s;
    width: 6px;
    height: 6px;
    transform: scale(0);
    border-radius: 1px;
  }
}

.checkbox__element--checked {
  &::before {
    content: '';
    position: absolute;
    transform: scale(2);
    background-color: $primaryColor;
  }
}

.checkbox__element {
  height: 18px;
  width: 18px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: $primaryBgColor;
  border: 1px solid $primaryBorderColor;
  border-radius: 3px;
}

.checkbox__label {
  display: inline-block;
  margin-left: 10px;
  font-size: 12px;
}
</style>
