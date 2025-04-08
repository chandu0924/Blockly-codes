import { FixedEdgesMetricsManager } from '@blockly/fixed-edges';

FixedEdgesMetricsManager.setFixedEdges({
  top: true,
  left: true,
  right: true
});

export const DEFAULT_OPTIONS = {
  collapse: true,
  comments: true,
  disable: true,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: true,
  toolboxPosition: "end",
  css: true,
  media: 'https://blockly-demo.appspot.com/static/media/',
  rtl: false,
  scrollbars: true,
  sounds: true,
  oneBasedIndex: true,
  readOnly: false,
  renderer: 'Zelos',
  // renderer: "custom_renderer",
  grid: {
    spacing: 20,
    length: 1,
    colour: '#888',
    snap: true
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.6,
    maxScale: 3,
    minScale: 0.1,
    scaleSpeed: 1.2
  },
  maxInstances: {
    alert_context: 1
  },
  plugins: {
    metricsManager: FixedEdgesMetricsManager,
  }
};
