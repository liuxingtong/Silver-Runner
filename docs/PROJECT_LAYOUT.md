# 项目目录说明（cards）

静态叙事页、Leaflet 地图与少量 Node 脚本共用本仓库。以下路径以仓库根目录为准。

## 顶层一览

| 路径 | 用途 |
|------|------|
| **`1narrative-framework.html`** | 主叙事框架；内嵌 iframe 引用下方多数页面，**勿改这些 HTML 的文件名/相对路径**除非同步改 iframe。 |
| **`map_*.html`** | 单主题地图：`map_E_exposure.html`、`map_S_stressor.html`、`map_AC_buffer.html`、`map_intervention_nodes.html`。 |
| **`field_system_selection.html`** | 场域系统三尺度选址地图；叙事 **S9** 通过 iframe 嵌入；与 `map_*.html` 共用 `xujiahui-osm-boundary.js` 叠加大徐家汇边界。 |
| **`cld_2d_interactive.html`** | CLD 二维交互。 |
| **`csvi-model.html`**、`dual-line-framework.html`、`feedback-loop.html`、`prototype-cards.html`、`xujiahui-pole-cards.html`、`node-type-cards (1).html` | 模型与卡片页。 |
| **`stay_willingness_matrix.html`** | 停留意愿矩阵入口（Vite 构建另有配置）。 |
| **`xujiahui-osm-boundary.js`** | 研究区边界：仅大徐家汇四街道并集（`data/daxujiahui-four-streets-union.geojson`），样式同原徐汇玫红虚线；供各 `map_*.html` 共用。 |
| **`cld_priority.csv`** | 主 CLD/CSVI 边表（当前多为徐汇筛选后数据）；备份可命名如 `cld_priority_beifan.csv`。 |
| **`package.json`** / **`vite.config.js`** | 前端依赖与 Vite 构建（`dist/`）。 |

## 子目录

| 路径 | 用途 |
|------|------|
| **`data/`** | 静态地理数据：`xuhui-district-R1278188.geojson`（全区）；`daxujiahui-four-streets-union.geojson`（徐/天平/湖南/枫林四街道 OSM 并集，见 `npm run fetch:daxujiahui-4`）。 |
| **`docs/`** | 手册与说明（本文件、`徐家汇数据分析完整手册.md` 等）。 |
| **`profiles/`** | 人物画像 HTML 与插图。 |
| **`public/`** | 构建时拷贝到站点根的资源（如 `sync:cld` 同步的 `cld_priority.csv`）。 |
| **`dist/`** | `npm run build` 输出。 |
| **`scripts/`** | Node 工具链：`sync-cld.mjs`、`filter-cld-xuhui.mjs`、`filter-cld-daxujiahui.mjs`、`fetch-daxujiahui-four-streets.mjs`、`persona-png-transparent.mjs`；`scripts/cache/` 为可选 Nominatim 缓存（gitignore）。 |
| **`.vscode/`** | 编辑器配置（按需提交）。 |

## 资源位置说明

- **`1.jpg` / `2.jpg`**：叙事页插图，与 `1narrative-framework.html` 同目录引用；若移动需改 `<img src>`。
- **`csvi_quadrant.jsx` / `matrix_main.jsx`**：独立 JSX 片段，非 Vite 主入口时需自行挂载或复制。

## 常用命令

```bash
npm run dev              # Vite 开发（默认入口见 vite.config）
npm run build
npm run sync:cld         # 根目录 cld_priority.csv → public/
npm run filter:cld-xuhui      # 按徐汇多边形筛 CSV → cld_priority_xuhui.csv
npm run filter:cld-daxujiahui # 按大徐家汇四街道并集筛 CSV → cld_priority_daxujiahui.csv
```

## 整理建议（未自动执行）

为减少破坏 iframe 与 `fetch('data/...')` 的相对路径，**未批量搬迁根目录 HTML**。若以后要归档，可优先考虑：

1. 新建 `pages/maps/` 等目录，并**批量替换** `1narrative-framework.html` 内所有 `data-src` 与地图内 `CSV_FILENAME`、`xujiahui-osm-boundary.js`、`data/` 的相对路径。
2. 将散落的 `*.jpg` 收入 `assets/photos/` 并更新引用。

当前以「文档化目录含义」为主，根目录保持扁平便于本地直接双击打开 HTML。
