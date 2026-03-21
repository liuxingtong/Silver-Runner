/**
 * 研究区边界图层（Leaflet）：仅显示大徐家汇四街道并集。
 * 数据：data/daxujiahui-four-streets-union.geojson（npm run fetch:daxujiahui-4）
 * 样式沿用原徐汇区边界的玫红虚线填充。依赖全局 L。
 */
(function (global) {
  'use strict';

  const LOCAL_DAXUJIAHUI_GEOJSON = 'data/daxujiahui-four-streets-union.geojson';

  function pickGeometryAndLabel(j) {
    let geom = null;
    if (j.type === 'Feature' && j.geometry) geom = j.geometry;
    else if (j.type === 'FeatureCollection' && j.features?.[0]?.geometry) geom = j.features[0].geometry;
    else if (j.type === 'Polygon' || j.type === 'MultiPolygon') geom = j;
    if (!geom || !['Polygon', 'MultiPolygon'].includes(geom.type)) return null;
    const label =
      (j.properties && (j.properties.display_name || j.properties.name)) ||
      '大徐家汇（四街道并集）';
    return { geojson: geom, label };
  }

  async function loadDaxujiahuiFourStreetsGeoJSON() {
    try {
      const r = await fetch(LOCAL_DAXUJIAHUI_GEOJSON, { cache: 'no-store' });
      if (!r.ok) return null;
      const j = await r.json();
      return pickGeometryAndLabel(j);
    } catch (e) {
      console.warn('大徐家汇边界不可用:', LOCAL_DAXUJIAHUI_GEOJSON, e);
      return null;
    }
  }

  /**
   * 与历史 API 兼容：仅加载大徐家汇一层，样式同原徐汇边界。
   * @param {L.LayerGroup} layerGroup
   * @param {(layer: L.GeoJSON|null) => void} [onReady] 图层加入后回调（便于 bringToFront）
   */
  function addXuhuiBoundaryToGroup(layerGroup, onReady) {
    if (!global.L || !layerGroup) return;
    loadDaxujiahuiFourStreetsGeoJSON().then((daxj) => {
      if (!daxj) {
        console.warn('未获取到大徐家汇边界（请确认存在 ' + LOCAL_DAXUJIAHUI_GEOJSON + '）');
        if (typeof onReady === 'function') onReady(null);
        return;
      }
      const layer = global.L.geoJSON(daxj.geojson, {
        interactive: true,
        style: {
          color: '#ff4dad',
          weight: 2,
          opacity: 0.9,
          fillColor: '#e91e8c',
          fillOpacity: 0.06,
          dashArray: '10 7'
        },
        onEachFeature(_feature, fLayer) {
          fLayer.bindTooltip(daxj.label, {
            sticky: true,
            direction: 'center',
            className: 'boundary-tt'
          });
        }
      });
      layerGroup.addLayer(layer);
      if (typeof onReady === 'function') onReady(layer);
    });
  }

  global.addXuhuiBoundaryToGroup = addXuhuiBoundaryToGroup;
  global.addXujiahuiBoundaryToGroup = addXuhuiBoundaryToGroup;
})(typeof window !== 'undefined' ? window : globalThis);
