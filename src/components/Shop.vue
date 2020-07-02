<template>
  <div v-if="list.length">
    <table class="table table-hover">
      <thead>
        <th>ID</th>
        <th>名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{index + 1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>
            <button
              class="btn btn-sm btn-outline-danger"
              :disabled="item.count===1"
              @click="decrease(index)"
            >-</button>
            <span> {{item.count}} </span>
            <button class="btn btn-sm btn-outline-success" @click="increase(index)">+</button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click="remove(index)">删除</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">
            <span class="btn btn-sm btn-outline-success">总价: ￥{{totalPrice}}</span>
            <button class="btn btn-sm btn-danger" @click="clear">清空购物车</button>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b-form-input v-model="commodity.name" placeholder="请输入您要添加的商品名称"></b-form-input>
          </td>
          <td colspan="2">
            <b-form-input v-model="commodity.price" placeholder="请输入您要添加的商品价格"></b-form-input>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-success" @click="add">添加商品</button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <table class="table table-hover" v-else>
    <tbody>
      <td>购物车为空</td>
    </tbody>
    <tfoot>
      <tr>
      <td colspan="2">
        <b-form-input v-model="commodity.name" placeholder="请输入您要添加的商品名称"></b-form-input>
      </td>
      <td colspan="2">
        <b-form-input v-model="commodity.price" placeholder="请输入您要添加的商品价格"></b-form-input>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-success" @click="add">添加商品</button>
      </td>
    </tr>
    </tfoot>
  </table>
</template>

<script>
import Axios from 'axios'
export default {
  name: "Shop",
  data() {
    return {
      list: [],
      commodity: {
        // id: list.length,
        name: "",
        price: 0,
        count: 1
      }
      // totalPrice: 0
    };
  },
  methods: {
    increase(index) {
      this.list[index].count++;
    },
    decrease(index) {
      if (this.list[index].count === 1) return;
      this.list[index].count--;
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    clear() {
      this.list = [];
    },
    add() {
      this.list.push(this.commodity);
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      total = this.list.reduce((sum, item) => {
        sum += item.price * item.count;
        return sum;
      }, 0);
      return total.toFixed(2);
    }
  },
  mounted() {
    Axios.post('/api/shop').then(res => {
      console.log(res);
      const { list } = res.data;
      console.log(list);
      this.list = list
    }).catch(err => {
      console.log(err);
    })
  },
};
</script>

<style>
</style>
