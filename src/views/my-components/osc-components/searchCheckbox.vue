<template>
  <div>
    <CheckboxGroup v-model="searchValue" @on-change="searchChange">
      <Checkbox
        style="margin-bottom: 10px"
        :disabled="item.flag"
        v-for="item in searchList"
        :key="item.value"
        :label="item.value"
        border
        >{{ item.name }}</Checkbox
      >
    </CheckboxGroup>
  </div>
</template>

<script>
export default {
  name: "searchCheckbox",
  props: {
    searchValue: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchList: [
        {
          name: '工程招标',
          value: '001',
          flag: false,
          status: 1
        },
        {
          name: '货物招标',
          value: '002',
          flag: false,
          status: 1
        },
        {
          name: '服务招标',
          value: '003',
          flag: false,
          status: 1
        },
        {
          name: '招标预告',
          value: 'ZBYG',
          flag: false,
          status: 1
        },
        {
          name: '中标公示',
          value: 'ZBGS',
          flag: false,
          status: 1
        },
        {
          name: '政府采购',
          value: 'ZFCG',
          flag: false,
          status: 1
        },
        {
          name: '企业采购',
          value: 'QYCG',
          flag: false,
          status: 1
        },
        {
          name: 'VIP项目',
          value: 'VIP',
          flag: false,
          status: 2
        },
        {
          name: '项目核准批复',
          value: 'XMHZPF',
          flag: false,
          status: 2
        },
        {
          name: '项目动态',
          value: 'XMDT',
          flag: false,
          status: 2
        },
        {
          name: '项目跟踪',
          value: 'XMGZ',
          flag: false,
          status: 2
        },
      ],
    };
  },
  mounted() {
    /* this.$nextTick(()=> {
      console.log(this.searchValue)
      this.searchChange(this.searchValue)
    }) */
  },
  watch: {
    searchValue(newVal) {
      this.searchChange(newVal)
    }
  },
  methods: {
    searchChange(v) {
      if(v.length > 0){
        let status = this.searchList.filter(item => item.value === v[0])[0].status
        this.searchList = this.searchList.map(item => {
          if(item.status !== status){
            item.flag = true
          }
          return item;
        })
      }
      if(v.length === 0) {
        this.searchList = this.searchList.map(item => {
          item.flag = false;
          return item;
        })
      }
      this.$emit("update:searchValue",v)
    }
  },
};
</script>