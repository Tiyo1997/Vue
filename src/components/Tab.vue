<template>
  <div>
    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab
          v-for="(item, index) in list"
          :key="index"
          :title="item.classType"
          :title-link-class="linkClass(index)"
        >
          <div v-for="(newsItem, i) in item.titleList" :key="i">
            <div class="mb-3">
                <span class="num">{{i+1}}</span>
              <a v-b-toggle :href="'#a' + newsItem.titleId" @click.prevent>{{newsItem.title}}</a>
            </div>

            <b-collapse :id="'a' + newsItem.titleId">
              <b-card :title="newsItem.title">{{newsItem.body}}</b-card>
            </b-collapse>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      list: [],
      tabIndex: 0,
      isShow: true
    };
  },
  created() {
    Axios.get("/api/tab")
      .then(res => {
        console.log(res);
        const {
          data: { list }
        } = res;
        console.log(list);
        this.list = list;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-primary", "text-light"];
      } else {
        return ["bg-light", "text-info"];
      }
    },
    
  }
};
</script>

<style>
    .num{
        color: red;
        font-size: 20px;
        padding: 0 10px;
    }
</style>