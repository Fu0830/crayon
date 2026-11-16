/* 蜡笔文具店 · 内容数据 */

const CATS = [
  { id: 'all', label: '全部' },
  { id: 'crayon', label: '蜡笔', en: 'CRAYONS' },
  { id: 'book', label: '本子', en: 'NOTEBOOKS' },
  { id: 'sticker', label: '贴纸', en: 'STICKERS' },
  { id: 'tool', label: '小工具', en: 'TOOLS' }
];

const PRODUCTS = [
  {
    id: 'c-box12', name: '十二色蜡笔盒', en: 'BOX OF 12',
    cat: 'crayon', price: 28, art: 'box', color: '#4f9fe0', tag: '店长推荐',
    desc: '12 支，笔杆细，手小的拿着正好。盒子边角有点旧，不影响用。',
    meta: ['12 色', '笔杆 9mm', '无毒 · 可水洗']
  },
  {
    id: 'c-box24', name: '二十四色蜡笔', en: 'BOX OF 24',
    cat: 'crayon', price: 48, art: 'box', color: '#2f7ea8', tag: '最多人拿',
    desc: '比十二色多两支金属色，画在深色纸上更明显。',
    meta: ['24 色', '含金属色 2 支', '附削笔刀']
  },
  {
    id: 'c-blue', name: '天蓝 · 单支', en: 'SKY BLUE',
    cat: 'crayon', price: 6, art: 'crayon', color: '#4f9fe0',
    desc: '最常被单买的一支，画完海再画天，很快就短了。',
    meta: ['单支', '可单买', '会变短']
  },
  {
    id: 'c-pink', name: '樱花粉 · 单支', en: 'SAKURA',
    cat: 'crayon', price: 6, art: 'crayon', color: '#ef9bb4',
    desc: '偏暖的粉，不荧光，涂在纸上不显廉价。',
    meta: ['单支', '偏暖', '不荧光']
  },
  {
    id: 'c-orange', name: '橘 · 单支', en: 'ORANGE',
    cat: 'crayon', price: 6, art: 'crayon', color: '#f0914b',
    desc: '显色比看着强，涂大面积会掉渣。',
    meta: ['单支', '显色强', '会掉渣']
  },
  {
    id: 'c-green', name: '草绿 · 单支', en: 'GRASS',
    cat: 'crayon', price: 6, art: 'crayon', color: '#69b87e',
    desc: '偏黄绿，削起来顺，学生最常拿的一支。',
    meta: ['单支', '偏黄绿', '好削']
  },
  {
    id: 'c-ink', name: '夜黑 · 单支', en: 'MIDNIGHT',
    cat: 'crayon', price: 6, art: 'crayon', color: '#2c3b4a',
    desc: '软芯，描边顺手，大面积涂会糊。',
    meta: ['单支', '软芯', '不适合大面积']
  },
  {
    id: 'c-white', name: '云白 · 单支', en: 'CLOUD WHITE',
    cat: 'crayon', price: 6, art: 'crayon', color: '#f7f4ea',
    desc: '覆盖力强，只在深色纸上显色。',
    meta: ['单支', '覆盖力强', '需深色纸']
  },
  {
    id: 'b-grid', name: '方格本 A5', en: 'GRID NOTE',
    cat: 'book', price: 18, art: 'book', color: '#8fb7d8',
    desc: '96 页，5mm 方格，写字容易对齐。',
    meta: ['A5', '96 页', '5mm 方格']
  },
  {
    id: 'b-ring', name: '线圈本 · 蓝', en: 'SPIRAL',
    cat: 'book', price: 22, art: 'book', color: '#3f83c4', tag: '新到',
    desc: 'B5，120 页，页边能整张撕下来，不留毛边。',
    meta: ['B5', '120 页', '可撕']
  },
  {
    id: 'b-memo', name: '便利贴 · 三色', en: 'MEMO PAD',
    cat: 'book', price: 12, art: 'sticker', color: '#f2c94c',
    desc: '三叠装，粘性一般，贴在玻璃上会掉。',
    meta: ['3 本装', '76×76mm', '粘性一般']
  },
  {
    id: 's-star', name: '星星贴纸', en: 'STARS',
    cat: 'sticker', price: 9, art: 'sticker', color: '#f2c94c',
    desc: '42 枚，哑光，撕下来不伤纸。',
    meta: ['42 枚', '哑光', '不伤纸']
  },
  {
    id: 's-duck', name: '小鸭子贴纸', en: 'DUCKS',
    cat: 'sticker', price: 9, art: 'sticker', color: '#f5b74f',
    desc: '18 枚，防水，贴在杯子上也不掉。',
    meta: ['18 枚', '防水', '有黄有白']
  },
  {
    id: 's-cloud', name: '云朵贴纸', en: 'CLOUDS',
    cat: 'sticker', price: 9, art: 'sticker', color: '#9fc7e4',
    desc: '半透明，贴在杯壁能透过去看到后面。',
    meta: ['24 枚', '半透明', '遇水不掉']
  },
  {
    id: 't-eraser', name: '云朵橡皮', en: 'ERASER',
    cat: 'tool', price: 8, art: 'eraser', color: '#b9d6ea',
    desc: '擦得干净，不留黑印，用久了会缩一圈。',
    meta: ['1 块', '不留痕', '会变小']
  },
  {
    id: 't-pencil', name: '自动铅笔 0.5', en: 'MECHANICAL',
    cat: 'tool', price: 15, art: 'pen', color: '#4f9fe0',
    desc: '0.5mm，重心低，附带两根铅芯。',
    meta: ['0.5mm', '低重心', '附 2 根铅芯']
  },
  {
    id: 't-marker', name: '荧光笔 · 三支', en: 'HIGHLIGHTERS',
    cat: 'tool', price: 19, art: 'pen', color: '#7fc7c3',
    desc: '三支一套，快干，不透到背面。',
    meta: ['3 支装', '快干', '不渗透']
  },
  {
    id: 't-pouch', name: '帆布笔袋', en: 'POUCH',
    cat: 'tool', price: 32, art: 'pouch', color: '#4f86b2', tag: '耐脏',
    desc: '20×9cm，厚帆布，拉链能拉到底。',
    meta: ['20×9cm', '厚帆布', '拉链式']
  }
];

/* 个人须知 */
const NOTICE = {
  name: '蜡笔',
  tags: ['天蝎座', '永远 18'],
  rules: [
    '天蝎座',
    '预约单不要迟到，后续有预约请告知，不要打一半溜走。',
    '请仔细阅读板卡，跳单默认看过板卡。'
  ],
  likes: [
    '普通话标准声音好听。',
    '顺风局让红/让蓝/让人头/回泉水接我/主动帮我保评分/刷牌子。',
    '需要坚定的维护我。',
    '适当教我思路，能告诉我要做什么。',
    '喜欢多鼓励我夸夸我的但请不要硬夸。',
    '喜欢小窝活跃，如果能多和我分享日常我会很开心。',
    '喜欢帅的英雄。'
  ],
  hates: [
    '讨厌安静，请不要让我说完话没有回应。',
    '小窝潜水只有点单时出现。',
    '讨厌特别夹的夹子音，尤其是夹不住的。',
    '板类称呼单字姐/预约迟到/心态不好/甩锅/叫错我名字/背后蛐蛐我/菜。',
    '讨厌模版化的感谢or结单小票，坑了炸了请立刻道歉极其反感事后道歉。'
  ]
};

/* 回忆陈列（把 assets/memories/01.jpg … 换成自己的照片即可） */
const MEMORIES = [
  {
    id: 'm1',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/01.jpg'
  },
  {
    id: 'm2',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/02.jpg'
  },
  {
    id: 'm3',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/03.jpg'
  },
  {
    id: 'm4',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/04.jpg'
  },
  {
    id: 'm5',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/05.jpg'
  },
  {
    id: 'm6',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/06.jpg'
  },
  {
    id: 'm7',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/07.jpg'
  },
  {
    id: 'm8',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/08.jpg'
  },
  {
    id: 'm9',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/09.jpg'
  },
  {
    id: 'm10',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/10.jpg'
  },
  {
    id: 'm11',
    title: '待填写', date: '',
    front: '', back: '',
    img: 'assets/memories/11.jpg'
  }
];

/* 相册总位置数：多出来的位置会显示成虚线空框，等照片填进来 */
const ALBUM_SLOTS = 12;

/* 换蜡笔（主题色） */
const PALETTES = [
  {
    name: '天蓝', hex: '#4f9fe0', deep: '#2b6da3', soft: '#dbeaf8', rgb: '79, 159, 224',
    sky: '#eaf3fc', sky2: '#dbeaf7', skyMid: '#e4f0fa',
    bg1: '#edf6ff', bg2: '#d8eaf9', bg3: '#c9e0f3',
    font: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif'
  },
  {
    name: '雾蓝', hex: '#6f93ad', deep: '#47647b', soft: '#e3ecf2', rgb: '111, 147, 173',
    sky: '#f2f6f9', sky2: '#e4ecf1', skyMid: '#eef3f6',
    bg1: '#f9fbfd', bg2: '#e9f0f4', bg3: '#dbe4ea',
    font: '"Songti SC", "Noto Serif SC", "SimSun", "Times New Roman", serif'
  },
  {
    name: '湖蓝', hex: '#2f8fa8', deep: '#1d6275', soft: '#d6edf0', rgb: '47, 143, 168',
    sky: '#e9f6f6', sky2: '#d6eced', skyMid: '#e3f2f3',
    bg1: '#f1fbfb', bg2: '#dcf1f2', bg3: '#cbe6e9',
    font: '"Yuanti SC", "Hiragino Maru Gothic ProN", "Quicksand", "Noto Sans SC", system-ui, sans-serif'
  },
  {
    name: '夜蓝', hex: '#3c5f8a', deep: '#22385c', soft: '#dfe6f1', rgb: '60, 95, 138',
    sky: '#e8ecf3', sky2: '#d8dfea', skyMid: '#e3e8f1',
    bg1: '#f2f5fa', bg2: '#e1e7f0', bg3: '#d3dbe7',
    font: '"Kaiti SC", "STKaiti", "KaiTi", "Songti SC", serif'
  },
  {
    name: '奶油蓝', hex: '#8fbcd9', deep: '#5f8aa5', soft: '#eaf3f9', rgb: '143, 188, 217',
    sky: '#f5f9fc', sky2: '#e8f0f6', skyMid: '#f0f6fa',
    bg1: '#fbfdfe', bg2: '#eff5f9', bg3: '#e3ecf3',
    font: '"FangSong", "STFangsong", "Songti SC", "Noto Serif SC", serif'
  }
];

/* 小票上那句手写的实话（每次随机） */
const RECEIPT_NOTES = [
  '那本角上有点压痕，已经给你换过一本了。',
  '钱不收，账我记在纸上。',
  '拿的这几支都试过，能画。',
  '下次早点来，早上店里人少。',
  '东西拿走就行，不用客气。'
];
