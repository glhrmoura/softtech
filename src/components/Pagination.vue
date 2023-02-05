<template>
  <ul :class="containerClass">
    <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
      <a
        @click="selectFirstPage()"
        @keyup.enter="selectFirstPage()"
        :class="pageLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0" v-html="firstButtonText"
      />
    </li>
    <li
      v-if="!(firstPageSelected() && hidePrevNext)"
      :class="[prevClass, firstPageSelected() ? disabledClass : '']"
    >
      <a
        v-html="prevText"
        btn-action btn-action-prev
        @click="prevPage()"
        @keyup.enter="prevPage()" :class="prevLinkClass" :tabindex="firstPageSelected() ? -1 : 0"
      />
    </li>
    <template v-if="isDesktop">
      <li
        v-for="(page, index) in pages"
        :key="index"
        :class="[
          pageClass,
          page.selected ? activeClass : '',
          page.disabled ? disabledClass : '',
          page.breakView ? breakViewClass: ''
        ]"
      >
        <a
          v-if="page.breakView"
          :class="[pageLinkClass, breakViewLinkClass]"
          tabindex="0"
        >
          <slot name="breakViewContent">{{ breakViewText }}</slot>
        </a>
        <a
          v-else-if="page.disabled"
          :class="pageLinkClass"
          tabindex="0"
        >
          {{ page.content }}
        </a>
        <a
          v-else
          @click="handlePageSelected(page.index + 1)"
          @keyup.enter="handlePageSelected(page.index + 1)"
          :class="pageLinkClass"
          tabindex="0"
        >
          {{ Math.floor(page.content) }}
        </a>
      </li>
    </template>
    <li
      v-if="!(lastPageSelected() && hidePrevNext)"
      :class="[nextClass, lastPageSelected() ? disabledClass : '']"
    >
      <a
        btn-action
        btn-action-next
        @click="nextPage()"
        @keyup.enter="nextPage()"
        :class="nextLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        v-html="nextText"
      />
    </li>

    <li
      v-if="firstLastButton"
      :class="[pageClass, lastPageSelected() ? disabledClass : '']"
    >
      <a
        @click="selectLastPage()"
        @keyup.enter="selectLastPage()"
        :class="pageLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0" v-html="lastButtonText"
      />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Pagination',

  props: {
    value: {
      type: Number
    },

    pageCount: {
      type: Number,
      required: true
    },

    forcePage: {
      type: Number
    },

    clickHandler: {
      type: Function,
      default: () => { }
    },

    pageRange: {
      type: Number,
      default: 3
    },

    marginPages: {
      type: Number,
      default: 1
    },

    prevText: {
      type: String,
      default: 'Prev'
    },

    nextText: {
      type: String,
      default: 'Next'
    },

    breakViewText: {
      type: String,
      default: '…'
    },

    containerClass: {
      type: String
    },

    pageClass: {
      type: String
    },

    pageLinkClass: {
      type: String
    },

    prevClass: {
      type: String
    },

    prevLinkClass: {
      type: String
    },

    nextClass: {
      type: String
    },

    nextLinkClass: {
      type: String
    },

    breakViewClass: {
      type: String
    },

    breakViewLinkClass: {
      type: String
    },

    activeClass: {
      type: String,
      default: 'active'
    },

    disabledClass: {
      type: String,
      default: 'disabled'
    },

    firstLastButton: {
      type: Boolean,
      default: false
    },

    firstButtonText: {
      type: String,
      default: 'First'
    },

    lastButtonText: {
      type: String,
      default: 'Last'
    },

    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },

  beforeUpdate() {
    if (this.forcePage === undefined) return;
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  },

  computed: {
    ...mapGetters({
      isDesktop: 'device/isDesktop',
    }),

    selected: {
      get: function() {
        return this.value || this.innerValue;
      },

      set: function(newValue) {
        this.innerValue = newValue;
      }
    },

    pages: function () {
      let items = {};

      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          };

          items[index] = page;
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2);

        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          };

          items[index] = page;
        };

        let setBreakView = index => {
          let breakView = {
            disabled: true,
            breakView: true
          };

          items[index] = breakView;
        };

        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }

        let selectedRangeLow = 0;

        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;

        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }

        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }

        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        }

        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        }

        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i);
        }
      }

      return items;
    }
  },
  data() {
    return {
      innerValue: 1,
    };
  },

  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return;

      this.innerValue = selected;
      this.$emit('input', selected);
      this.clickHandler(selected);
    },

    prevPage() {
      if (this.selected <= 1) return;

      this.handlePageSelected(this.selected - 1);
    },

    nextPage() {
      if (this.selected >= this.pageCount) return;

      this.handlePageSelected(this.selected + 1);
    },

    firstPageSelected() {
      return this.selected === 1;
    },

    lastPageSelected() {
      return (this.selected === this.pageCount) || (this.pageCount === 0);
    },

    selectFirstPage() {
      if (this.selected <= 1) return;

      this.handlePageSelected(1);
    },

    selectLastPage() {
      if (this.selected >= this.pageCount) return;

      this.handlePageSelected(this.pageCount);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  user-select: none;
  display: inline-block;
  padding-left: 0;
  font-size: 14px;
}

.pagination > li {
  display: inline;
  cursor: pointer;
}

.pagination > li > [btn-action] {
  position: relative;
  color: $primaryColor;
  font-weight: 500;
}

.pagination > li > [btn-action-next] {
  &::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
    background-color: currentColor;
    margin-right: 4px;
    -webkit-clip-path: polygon(6.2px 3.2px, 7.3px 3.2px, 11.5px 7.5px, 11.5px 8.5px, 7.3px 12.8px, 6.2px 11.7px, 9.9px 8px, 6.2px 4.3px, 6.2px 3.2px);
    clip-path: polygon(6.2px 3.2px, 7.3px 3.2px, 11.5px 7.5px, 11.5px 8.5px, 7.3px 12.8px, 6.2px 11.7px, 9.9px 8px, 6.2px 4.3px, 6.2px 3.2px);
  }
}
.pagination > li > [btn-action-prev] {
  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
    background-color: currentColor;
    margin-right: 4px;
    -webkit-clip-path: polygon(9.8px 12.8px, 8.7px 12.8px, 4.5px 8.5px, 4.5px 7.5px, 8.7px 3.2px, 9.8px 4.3px, 6.1px 8px, 9.8px 11.7px, 9.8px 12.8px);
    clip-path: polygon(9.8px 12.8px, 8.7px 12.8px, 4.5px 8.5px, 4.5px 7.5px, 8.7px 3.2px, 9.8px 4.3px, 6.1px 8px, 9.8px 11.7px, 9.8px 12.8px);
  }
}

.pagination > li > a,
.pagination > li > span {
  position: relative;
  outline: none;
  float: left;
  padding: 6px 12px;
  line-height: 1.42857143;
  color: $linkColor;
  text-decoration: none;
  background-color: $primaryBgColor;
  border: 1px solid $primaryBorderColor;
  margin: 0px 2px;
  border-radius: 4px;
}

.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  background-color:$primaryBgColor;
  border-color: $primaryBorderColor;
}

.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 2;
  cursor: default;
  color: $secondaryTextColor;
  background-color: $primaryColor;
  border-color: $primaryColor;
}

.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: $textGhost;
  cursor: default;
  background-color: $primaryBgColor;
  border-color: $primaryBorderColor;
}

.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  line-height: 1.3333333;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  line-height: 1.5;
}

.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
