<style lang="less">
@import "../styles/menu.less";
</style>
<template>
  <Menu
    ref="sideMenu"
    accordion
    :active-name="$route.name"
    :open-names="singleOpenName"
    :theme="menuTheme"
    width="auto"
    @on-select="changeMenu"
    @on-open-change="openChange"
  >
    <template v-for="item in menuList">
      <!-- 如果是一级菜单并设置了不一直显示 -->
      <template v-if="item.level == '1' && !item.showAlways">
        <MenuItem
          v-if="item.children.length <= 1"
          :name="item.children[0].name"
          :key="'menuitem' + item.name"
        >
          <Icon
            :type="item.children[0].icon || item.icon"
            :size="iconSize"
            :key="'menuicon' + item.name"
          ></Icon>
          <span class="layout-text" :key="'title' + item.name">{{
            itemTitle(item.children[0])
          }}</span>
        </MenuItem>
        <Submenu
          v-if="item.children.length > 1"
          :name="item.name"
          :key="item.name"
        >
          <template slot="title">
            <Icon :type="item.icon" :size="iconSize"></Icon>
            <span class="layout-text">{{ itemTitle(item) }}</span>
          </template>
          <template v-for="child in item.children">
            <MenuItem :name="child.name" :key="'menuitem' + child.name">
              <Icon
                :type="child.icon"
                :size="iconSize"
                :key="'icon' + child.name"
              ></Icon>
              <span class="layout-text" :key="'title' + child.name">{{
                itemTitle(child)
              }}</span>
            </MenuItem>
          </template>
        </Submenu>
      </template>
      <template v-else>
        <Submenu
          :name="item.name"
          :key="item.name"
          :ref="item.name"
          :class="item.name"
        >
          <template slot="title">
            <Icon :type="item.icon" :size="iconSize"></Icon>
            <span class="layout-text">{{ itemTitle(item) }}</span>
          </template>
          <template v-for="child in item.children">
            <MenuItem :name="child.name" :key="'menuitem' + child.name">
              <Icon
                :type="child.icon"
                :size="iconSize"
                :key="'icon' + child.name"
              ></Icon>
              <span class="layout-text" :key="'title' + child.name">{{
                itemTitle(child)
              }}</span>
            </MenuItem>
          </template>
        </Submenu>
      </template>
    </template>
  </Menu>
</template>

<script>
export default {
  name: "sidebarMenu",
  data() {
    return {
      singleOpenName: [],
    };
  },
  props: {
    menuList: Array,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: "dark",
    },
    openNames: {
      type: Array,
    },
  },
  methods: {
    getElementToPageTop(el) {
      if (el.parentElement) {
        return this.getElementToPageTop(el.parentElement) + el.offsetTop;
      }
      return el.offsetTop;
    },
    openChange(name) {
      if (name.length === 0) return;
      let ulDOM = document.querySelector("." + name).lastChild;
      let liLength = ulDOM.querySelectorAll("li").length;

      let dd = document.querySelector(".sidebar-menu-con.menu-bar");
      let ulTop = this.getElementToPageTop(ulDOM);
      let wHeight = document.documentElement.clientHeight;

      let ll = ulTop + 49 * (liLength + 2) - wHeight;
      let scrollTopNow = dd.scrollTop || 0;
      let timerId = null;
      if (ulTop + 100 > wHeight) {
        // dd.scrollIntoView({block: "end", behavior: 'smooth'});
        timerId = setInterval(() => {
          scrollTopNow += 5;
          if (scrollTopNow >= ll) {
            clearInterval(timerId);
            timerId = null;
          } else {
            dd.scrollTop = scrollTopNow;
          }
        }, 3);
      }
    },
    changeMenu(active) {
      this.$emit("on-change", active);
    },
    handleSelect(name) {
      this.$emit("on-select", name);
    },
    itemTitle(item) {
      if (typeof item.title == "object") {
        return this.$t(item.title.i18n);
      } else {
        return item.title;
      }
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched
        .map((item) => item.name)
        .filter((item) => item !== name);
    },
  },
  updated() {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened();
      }
    });
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.singleOpenName = [this.$route.matched[0].name];
    },
  },
  mounted() {
    this.singleOpenName = [this.$route.matched[0].name];
  },
};
</script>
