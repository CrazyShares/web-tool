<template>
  <div id="main">
    <!-- <p>Hello World!</p> -->
    <!-- <img id="sharingan" src="./assets/images/写轮眼.gif" alt="" srcset="" /> -->
    <!-- <img id="" src="./assets/images/三级操作手册.jpg" alt="" srcset="" /> -->
    <!-- <img width="1000px" /> -->
    <!-- <button @click="download">下载</button> -->
  </div>
</template>

<script>
import { isES6, arr } from "@/App"
import { __picWM } from "@/utils/tool"

export default {
  data() {
    return {
      arr,
    }
  },
  methods: {
    download(url) {
      const a = document.createElement("a")
      a.href = url
      a.download = "Image.png"
      a.click()
    },
  },
  created() {
    isES6()
    // 调用
    __picWM({
      url: require("/src/assets/images/girl.jpg"),
      content: "姓名 18888888888 2023-01-16",
      cb: (base64Url) => {
        // this.download(base64Url)
        // document.querySelector("img").src = base64Url;
        document.getElementById(
          "main"
        ).style.backgroundImage = `url(${base64Url})`
      },
    })
  },
}
</script>

<style lang="less" scoped>
#sharingan {
  width: 50vh;
  height: 50vh;
}
#main {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>