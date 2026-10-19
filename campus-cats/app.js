/* 页面逻辑：渲染、搜索、筛选、详情弹层。一般不需要改这里。 */

var STATUS_CLASS = {
  '在校': 'st-in',
  '毕业': 'st-out',
  '休学': 'st-miss',
  '喵星': 'st-star'
};

var PLACEHOLDER = 'images/placeholder.svg';

var state = {
  keyword: '',
  status: '',
  spot: ''
};

var gridEl = document.getElementById('grid');
var emptyEl = document.getElementById('empty');
var countEl = document.getElementById('resultCount');
var modalEl = document.getElementById('modal');
var modalPanel = document.getElementById('modalPanel');

function escapeHtml(text) {
  return String(text == null ? '' : text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---------- 统计 ---------- */

function renderStats() {
  var total = CATS.length;
  var inSchool = CATS.filter(function (c) { return c.status === '在校'; }).length;
  var adopted = CATS.filter(function (c) { return c.status === '毕业'; }).length;

  document.getElementById('stats').innerHTML = [
    item(total, '只已建档'),
    item(inSchool, '只在校'),
    item(adopted, '只已领养')
  ].join('');

  function item(num, label) {
    return '<div class="stat-item"><span class="stat-num">' + num +
           '</span><span class="stat-label">' + label + '</span></div>';
  }
}

/* ---------- 地点下拉：自动从数据里提取 ---------- */

function renderSpotOptions() {
  var all = [];
  CATS.forEach(function (c) {
    (c.spots || []).forEach(function (s) {
      if (all.indexOf(s) === -1) all.push(s);
    });
  });

  var select = document.getElementById('spotSelect');
  select.innerHTML = '<option value="">全部出没地点</option>' +
    all.map(function (s) {
      return '<option value="' + escapeHtml(s) + '">' + escapeHtml(s) + '</option>';
    }).join('');
}

/* ---------- 状态筛选按钮 ---------- */

function renderChips() {
  var box = document.getElementById('statusChips');
  var list = ['在校', '毕业', '休学', '喵星'];
  box.innerHTML = list.map(function (s) {
    return '<button class="chip" data-status="' + s + '">' + s + '</button>';
  }).join('');

  box.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip');
    if (!btn) return;
    var s = btn.dataset.status;
    state.status = (state.status === s) ? '' : s;
    Array.prototype.forEach.call(box.children, function (b) {
      b.classList.toggle('is-on', b.dataset.status === state.status);
    });
    render();
  });
}

/* ---------- 筛选 ---------- */

function matched() {
  var kw = state.keyword.trim().toLowerCase();

  return CATS.filter(function (c) {
    if (state.status && c.status !== state.status) return false;
    if (state.spot && (c.spots || []).indexOf(state.spot) === -1) return false;
    if (!kw) return true;

    var hay = [
      c.name, c.color, c.gender, c.personality, c.appearance, c.story,
      (c.spots || []).join(' '), (c.relations || []).join(' ')
    ].join(' ').toLowerCase();

    return hay.indexOf(kw) !== -1;
  });
}

/* ---------- 卡片 ---------- */

function render() {
  var list = matched();

  countEl.textContent = '共 ' + list.length + ' 只';

  if (list.length === 0) {
    gridEl.innerHTML = '';
    gridEl.hidden = true;
    emptyEl.hidden = false;
    return;
  }

  gridEl.hidden = false;
  emptyEl.hidden = true;

  gridEl.innerHTML = list.map(function (c) {
    return '' +
      '<article class="card" data-id="' + escapeHtml(c.id) + '">' +
        '<img class="card-photo" src="' + escapeHtml(c.photo) + '" alt="' + escapeHtml(c.name) + '的照片" loading="lazy" onerror="this.src=\'' + PLACEHOLDER + '\'">' +
        '<div class="card-body">' +
          '<div class="card-name-row">' +
            '<span class="card-name">' + escapeHtml(c.name) + '</span>' +
            '<span class="badge ' + (STATUS_CLASS[c.status] || 'st-in') + '">' + escapeHtml(c.status) + '</span>' +
          '</div>' +
          '<p class="card-meta">' + escapeHtml(c.color) + ' · ' + escapeHtml(c.gender) + ' · ' + escapeHtml(c.sterilized) + '</p>' +
          '<div class="card-spots">' +
            (c.spots || []).map(function (s) {
              return '<span class="spot-tag">' + escapeHtml(s) + '</span>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</article>';
  }).join('');
}

/* ---------- 详情弹层 ---------- */

function field(label, value) {
  if (!value) return '';
  if (Array.isArray(value)) value = value.join('、');
  return '<div class="field"><span class="field-label">' + label +
         '</span><span class="field-value">' + escapeHtml(value) + '</span></div>';
}

function openModal(id) {
  var c = CATS.filter(function (x) { return x.id === id; })[0];
  if (!c) return;

  modalPanel.innerHTML = '' +
    '<button class="modal-close" id="modalClose" aria-label="关闭">&times;</button>' +
    '<div class="modal-grid">' +
      '<img class="modal-photo" src="' + escapeHtml(c.photo) + '" alt="' + escapeHtml(c.name) + '的照片" onerror="this.src=\'' + PLACEHOLDER + '\'">' +
      '<div class="modal-info">' +
        '<div class="modal-title">' +
          '<h2>' + escapeHtml(c.name) + '</h2>' +
          '<span class="badge ' + (STATUS_CLASS[c.status] || 'st-in') + '">' + escapeHtml(c.status) + '</span>' +
        '</div>' +
        '<p class="modal-sub">' + escapeHtml(c.color) + ' · ' + escapeHtml(c.gender) + '</p>' +
        field('绝育情况', c.sterilized) +
        field('性格', c.personality) +
        field('外貌特征', c.appearance) +
        field('常出没', c.spots) +
        field('首次目击', c.firstSeen) +
        field('猫圈关系', c.relations) +
        (c.story ? '<p class="story">' + escapeHtml(c.story) + '</p>' : '') +
      '</div>' +
    '</div>';

  modalEl.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
}

function closeModal() {
  modalEl.hidden = true;
  modalPanel.innerHTML = '';
  document.body.style.overflow = '';
}

/* ---------- 事件绑定 ---------- */

gridEl.addEventListener('click', function (e) {
  var card = e.target.closest('.card');
  if (card) openModal(card.dataset.id);
});

modalEl.addEventListener('click', function (e) {
  if (e.target === modalEl || e.target.id === 'modalClose') closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

var searchInput = document.getElementById('search');
var timer = null;
searchInput.addEventListener('input', function (e) {
  clearTimeout(timer);
  var v = e.target.value;
  timer = setTimeout(function () {
    state.keyword = v;
    render();
  }, 120);
});

document.getElementById('spotSelect').addEventListener('change', function (e) {
  state.spot = e.target.value;
  render();
});

/* ---------- 启动 ---------- */

renderStats();
renderSpotOptions();
renderChips();
render();
