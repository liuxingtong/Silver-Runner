# 徐家汇中期 · 叙事与地图（cards）

人机共生空间与认知恢复方向的**静态叙事页 + Leaflet 地图 + CSVI 街段数据可视化**。主入口为根目录 **`1narrative-framework.html`**（滚动叙事 + iframe 嵌入模型页、矩阵、多维地图、三类节点与场域选址等）。

## 本地运行

```bash
npm install
```

- **矩阵等 Vite 页面**：`npm run dev`（默认打开 `stay_willingness_matrix.html`；会先执行 `sync:cld` 将 `cld_priority.csv` 同步到 `public/`）。
- **多数 HTML（含叙事框架、地图）**：需通过 **HTTP** 访问（否则 `fetch('cld_priority.csv')`、`data/*.geojson` 会失败）。可用任意静态服务器，例如：
  - 在项目根目录执行：`python -m http.server 8080`，浏览器打开 `http://localhost:8080/1narrative-framework.html`（或目录首页后点进对应 HTML）；
  - `npx serve .` 或 VS Code Live Server，在项目根目录打开；
  - 或将构建产物部署到 GitHub Pages 等静态托管。

生产构建（当前 Vite 入口为停留意愿矩阵）：

```bash
npm run build
```

## 核心页面（根目录）

| 文件 | 说明 |
|------|------|
| `1narrative-framework.html` | 主叙事框架，**勿单独改被 iframe 引用的文件名/相对路径**除非同步修改此处 |
| `map_E_exposure.html` / `map_S_stressor.html` / `map_AC_buffer.html` | CSVI 三维度地图 |
| `map_intervention_nodes.html` | 激活 · 瓶颈 · 临界三类节点 |
| `field_system_selection.html` | 触媒 → 廊道 → 场域三尺度选址（双圆场域、玫红廊道） |
| `csvi-model.html` | CSVI 结构示意 |
| `node-type-cards (1).html` | 三类节点类型卡 |

## 脚本与数据（简要）

| 命令 | 作用 |
|------|------|
| `npm run sync:cld` | `cld_priority.csv` → `public/` |
| `npm run filter:cld-daxujiahui` | 按大徐家汇四街道并集筛选 CSV |
| `npm run fetch:daxujiahui-4` | 拉取四街道边界 GeoJSON → `data/` |
| `npm run fetch:field-parcels` | （可选）Overpass 示例地块，易超时 |

共享逻辑脚本：`catalyst-seam-clusters.js`、`corridor-bottleneck-routing.js`、`cluster-field-circles.js`、`xujiahui-osm-boundary.js`。

## 文档

- **`docs/PROJECT_LAYOUT.md`** — 目录与文件说明（更全）
- **`docs/徐家汇数据分析完整手册.md`** — 指标、节点判定、廊道/瓶颈与实现对照
- **`docs/PPT框架_人机共生空间与认知恢复.md`** — 汇报页结构参考

## 许可与数据

地图边界与部分脚本数据来自 **OpenStreetMap**，适用 **ODbL**。使用 `fetch:*` 脚本时请遵守各服务的使用政策。
