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
| `map_intervention_nodes.html` | 潜力 · 资源节点街段地图（资源四主导类型）；`ac-dom-aggregate.js` 与矩阵、AC 地图共用聚合规则 |
| `xujiahui-site-selection.html` | **场域系统选址主页面**（叙事 S9 iframe）：双圆场域、大徐家汇 OSM 边界、轴线/多边形选址、用地与 POI 导入；廊道折线默认不绘制 |
| `field_system_selection.html` | 同算法独立页，**绘制**玫红簇间廊道折线（无选址工具栏） |
| `csvi-model.html` | CSVI 结构示意 |
| `node-type-cards-v3.html` | 三类节点类型卡 |

## 脚本与数据（简要）

| 命令 | 作用 |
|------|------|
| `npm run sync:cld` | `cld_priority.csv` → `public/` |
| `cld_priority.csv` 可选列 | `AC_med_dom`、`AC_tech_dom`、`AC_mkt_dom`、`AC_sport_dom`（医疗资源主导…体育资源主导）：**四列在同一行均非空**时，`map_AC_buffer.html` 与停留意愿矩阵用其**算术平均**作为 AC_phys；`map_intervention_nodes.html` 另用四列 **argmax** 标资源主导类型 |
| `npm run filter:cld-daxujiahui` | 按大徐家汇四街道并集筛选 CSV |
| `npm run fetch:daxujiahui-4` | 拉取四街道边界 GeoJSON → `data/` |
| `npm run clip:lan-use` | 需已安装 Python `pyshp`：将 `data/lan_use.shp` 按大徐家汇 bbox 裁剪为 `data/lan_use_daxujiahui.geojson`（供 `xujiahui-site-selection.html` 用地统计） |
| `npm run fetch:field-parcels` | （可选）Overpass 示例地块，易超时 |

共享逻辑脚本：`catalyst-seam-clusters.js`、`corridor-bottleneck-routing.js`、`cluster-field-circles.js`、`xujiahui-osm-boundary.js`。

## 文档

- **`docs/PROJECT_LAYOUT.md`** — 目录与文件说明（更全）
- **`docs/徐家汇数据分析完整手册.md`** — 指标、节点判定、廊道/瓶颈与实现对照
- **`docs/PPT框架_人机共生空间与认知恢复.md`** — 汇报页结构参考

## 许可与数据

地图边界与部分脚本数据来自 **OpenStreetMap**，适用 **ODbL**。使用 `fetch:*` 脚本时请遵守各服务的使用政策。
