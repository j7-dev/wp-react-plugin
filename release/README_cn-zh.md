# 這個 `release` 目錄是做什麼的?

> 一句話講完: 讓整個 WordPress Plugin 發布流程自動化🚀

> 以前寫套件要一直手動 build 前端檔案、排除 composer 開發依賴、手動發布、打更新內容、上傳到 github release etc...
> 有太多一系列的動作需要手動操作，這份 release 內的檔案可以幫助你把整個發布流程自動化
> 目前流程是這樣
> 1. 打 tag 版本號
> 2. 同步 package.json 還有外掛入口檔案 (即plugin.php) 版本號
> 3. build 前端檔案
> 4. 只複製發布檔案到 release 內的目錄，相當於創建一個發布版的套件目錄
> 5. 自定義 發布版的套件 需要 include 的目錄&檔案 (只保留生產依賴)
> 例如 vendor, node_modules, eslint, config 都不會進去
> 6. 排除 composer 開發依賴 composer install --no-dev
> 7. 整個 release外掛檔案打包成 zip，上傳 github release
>
> 然後用戶就會在 WordPress 後台收到外掛更新通知了
>
> 以上動作就濃縮成一個指令 yarn release


<br />
<br />

DEMO 影片

<video src="https://github.com/j7-dev/wp-react-plugin/assets/9213776/3c41ba8f-a1de-42bb-9b56-7ce1a7047373
" width="100%"></video>




<br />
<br />
<br />


### 💻 運行環境

首先建議您必須要有 `nodejs v18.18.0` 以上版本環境

`php 8.0` 以上，以及 composer 安裝 (7.4 未測試過)

<br />
<br />
<br />

## 🤘 如何開始

### 1. 依賴安裝

在專案根目錄 (也就是 `release` 的上層目錄) 執行依賴安裝

Javascript 依賴安裝

```bash
npm install
```

或者您使用 `yarn`

```bash
yarn
```

---

php 依賴安裝

```bash
composer install
```

### 2. 配置設定項

複製 `.env.example` 為 `.env`

然後修改內容

將 `GITHUB_TOKEN` 填入您的 [`github personal token`](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)

```bash
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

🚩🚩🚩 因為安全因素，請勿將 GITHUB_TOKEN, 即此 `.env` 納入 github 版本控制中 (預設已在 `.gitignore` 排除)，否則 github 將會 Block 你的 push

---

接著到 [`.release-it.cjs`](https://github.com/j7-dev/wp-react-plugin/blob/master/release/.release-it.cjs)

更多關於 `release-it` 的配置可以參考 [release-it repo](https://github.com/release-it/release-it)

所有預設 config 可以參考這 [default config](https://github.com/release-it/release-it/blob/main/config/release-it.json)

---

我們在 `.release-it.cjs` 有兩個自訂的配置項: `allowedItems` 與 `releasedPluginName`

`allowedItems`: 只有被寫入在 `allowedItems` array 內的檔案會被複製 (會遞規複製裡面的檔案&目錄)，例如

```
// .release-it.cjs
{
	...
	allowedItems: [
		'inc',
		'js/dist', // 只複製 js/dist，而不會複製 js/src
		'required_plugins',
		'composer.json', // 需要這個是因為，打包過程中會執行 composer install --no-dev
		'composer.lock', // 需要這個是因為，打包過程中會執行 composer install --no-dev
		'index.php',
		'plugin.php',
		'README.md'
	]
}
```

`releasedPluginName`: 最終打包的 zip 檔案名稱，例如: 您也可以叫做 my-plugin-release


### 3. 發布

發布前確保一系列工具指令是可以運作的，例如 `eslint`, `phpcbf` 可以作用

在 `.release-it.cjs` 中 [`commitArgs`](https://github.com/j7-dev/wp-react-plugin/blob/1257b83683b81f0b87d5aa0ce93b8e3496e485e7/release/.release-it.cjs#L21) 有設置 `['-n']` 因此預設是不會走 `pre-commit` 的檢查流程的，如果希望發布過程中走 CI 流程 (`eslint`, `phpcbf`) 可以直接將 `commitArgs` 刪除

發布 patch 版本更新

```bash
yarn release
```

```bash
yarn release:patch
```

發布 minor 版本更新

```bash
yarn release:minor
```

發布 major 版本更新

```bash
yarn release:major
```

<br />
<br />
<br />

## 📁 release 檔案結構

`.cjs` 是 `commonJS 模組`，會告訴 `nodeJS` 以 `commonJS 模組` 而不是 `ESM 模組` 的方式來執行 `Javascript`

```
|-- release
    |-- .release-it.cjs - release-it 這個 library 的 config 檔案 (更多資訊請看)
    |-- create-release.cjs - 這隻檔案會先執行 `create-release.cjs`，然後將你指定要 include 的 檔案/目錄 複製到 release 底下
    |-- delete-release.cjs - 刪除 release 目錄 內的 套件檔案/zip (如果有的話，通常由 `create-release.cjs` 產生)
    |-- mv-manifest.cjs - 將 build 後的 `manifest.json` 移動位置 (為什麼需要這個?)
    |-- zip.cjs - 將指定目錄壓縮成 `.zip` 檔案到指定位置
```
