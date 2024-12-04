<script setup>
import { ref, unref } from 'vue';
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const arr = Array.from(Array(77), (v, k) => k);

const pageID = ref(1);
const pageSize = ref(10);

const fetchList = (pageID = 1, pageSize = 10) =>
  new Promise((resolve) => {
    const start = pageSize * (pageID - 1);
    const end = start + pageSize;
    const _list = arr.slice(start, end);
    const res = {
      code: 200,
      data: {
        list: _list,
        total: arr.length,
        pageID,
        pageSize,
      },
    };
    setTimeout(() => {
      resolve(res);
    }, 1000);
  });

const onLoad = async () => {
  console.log('onload', pageID.value);
  // init
  if (refreshing.value) {
    pageID.value = 1;
    list.value = [];
    refreshing.value = false;
  }

  const res = await fetchList(unref(pageID), unref(pageSize));
  console.log(unref(pageID), unref(pageSize), res.data.list);
  if (res.code === 200) {
    pageID.value++;
    if (res.data.list.length < pageSize.value) {
      finished.value = true;
    }
    list.value = list.value.concat(res.data.list);
  }
  loading.value = false;
};

const onRefresh = () => {
  console.log('refresing');
  // 清空列表数据
  finished.value = false;
  list.value = [];

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  pageID.value = 1;
  onLoad();
};

const active = ref(0);
</script>

<template>
  <div class="h-full flex flex-col flex-nowrap">
    <!-- <div> -->
    <div class="flex justify-between px-2 py-2">
      <div class="">
        <span class="text-xs text-gray-500">类型</span>
        <van-icon size="10" name="arrow-down" />
      </div>
      <div class="">
        <van-icon @click="onRefresh" name="replay" />
      </div>
    </div>
    <div class="grow bg-gray-200 overflow-auto pb-12">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="bg-blue-500"
          style="min-height: calc(100vdh - 40px)"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
  <van-tabbar v-model="active" fixed>
    <van-tabbar-item icon="home-o">home</van-tabbar-item>
    <van-tabbar-item icon="search">search</van-tabbar-item>
    <van-tabbar-item icon="friends-o">friends</van-tabbar-item>
    <van-tabbar-item icon="setting-o">setting</van-tabbar-item>
  </van-tabbar>
</template>
