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
    desc: '短小、好握，一整页天空刚好够用。盒子有点旧，但每支都还能画。',
    meta: ['12 色', '笔杆 9mm', '无毒 · 可水洗']
  },
  {
    id: 'c-box24', name: '二十四色蜡笔', en: 'BOX OF 24',
    cat: 'crayon', price: 48, art: 'box', color: '#2f7ea8', tag: '最多人拿',
    desc: '多出来的十二种颜色，其实主要用来画心情。',
    meta: ['24 色', '含金属色 2 支', '附削笔刀']
  },
  {
    id: 'c-blue', name: '天蓝 · 单支', en: 'SKY BLUE',
    cat: 'crayon', price: 6, art: 'crayon', color: '#4f9fe0',
    desc: '画海，画衬衫，画那条一直没回的消息。',
    meta: ['单支', '可单买', '会变短']
  },
  {
    id: 'c-pink', name: '樱花粉 · 单支', en: 'SAKURA',
    cat: 'crayon', price: 6, art: 'crayon', color: '#ef9bb4',
    desc: '涂脸颊的时候容易用力过猛，没关系，本来就该脸红。',
    meta: ['单支', '偏暖', '不荧光']
  },
  {
    id: 'c-orange', name: '橘 · 单支', en: 'ORANGE',
    cat: 'crayon', price: 6, art: 'crayon', color: '#f0914b',
    desc: '傍晚六点的光，和便利店的招牌。',
    meta: ['单支', '显色强', '会掉渣']
  },
  {
    id: 'c-green', name: '草绿 · 单支', en: 'GRASS',
    cat: 'crayon', price: 6, art: 'crayon', color: '#69b87e',
    desc: '画完草地通常会剩半支，然后被借走再也不还。',
    meta: ['单支', '偏黄绿', '好削']
  },
  {
    id: 'c-ink', name: '夜黑 · 单支', en: 'MIDNIGHT',
    cat: 'crayon', price: 6, art: 'crayon', color: '#2c3b4a',
    desc: '只用来描边，不用来涂。涂满了就不是夜里，是心事。',
    meta: ['单支', '软芯', '不适合大面积']
  },
  {
    id: 'c-white', name: '云白 · 单支', en: 'CLOUD WHITE',
    cat: 'crayon', price: 6, art: 'crayon', color: '#f7f4ea',
    desc: '在深色纸上才看得见。像那种说了但等于没说的话。',
    meta: ['单支', '覆盖力强', '需深色纸']
  },
  {
    id: 'b-grid', name: '方格本 A5', en: 'GRID NOTE',
    cat: 'book', price: 18, art: 'book', color: '#8fb7d8',
    desc: '一格一个字，写慢了就整齐，写快了就好看。',
    meta: ['A5', '96 页', '5mm 方格']
  },
  {
    id: 'b-ring', name: '线圈本 · 蓝', en: 'SPIRAL',
    cat: 'book', price: 22, art: 'book', color: '#3f83c4', tag: '新到',
    desc: '可以整页撕下来，也可以整本留着。看你舍不舍得。',
    meta: ['B5', '120 页', '可撕']
  },
  {
    id: 'b-memo', name: '便利贴 · 三色', en: 'MEMO PAD',
    cat: 'book', price: 12, art: 'sticker', color: '#f2c94c',
    desc: '蓝色那叠用来提醒别人，黄色那叠用来提醒自己。',
    meta: ['3 本装', '76×76mm', '粘性一般']
  },
  {
    id: 's-star', name: '星星贴纸', en: 'STARS',
    cat: 'sticker', price: 9, art: 'sticker', color: '#f2c94c',
    desc: '一天贴一颗，贴满一行就奖励自己一次早睡。',
    meta: ['42 枚', '哑光', '不伤纸']
  },
  {
    id: 's-duck', name: '小鸭子贴纸', en: 'DUCKS',
    cat: 'sticker', price: 9, art: 'sticker', color: '#f5b74f',
    desc: '排队的那种。贴在本子角落，像有人在等你翻开。',
    meta: ['18 枚', '防水', '有黄有白']
  },
  {
    id: 's-cloud', name: '云朵贴纸', en: 'CLOUDS',
    cat: 'sticker', price: 9, art: 'sticker', color: '#9fc7e4',
    desc: '贴在杯壁上，喝到最后会看到一朵云浮在杯底。',
    meta: ['24 枚', '半透明', '遇水不掉']
  },
  {
    id: 't-eraser', name: '云朵橡皮', en: 'ERASER',
    cat: 'tool', price: 8, art: 'eraser', color: '#b9d6ea',
    desc: '擦得干净，但擦不掉说错的话。',
    meta: ['1 块', '不留痕', '会变小']
  },
  {
    id: 't-pencil', name: '自动铅笔 0.5', en: 'MECHANICAL',
    cat: 'tool', price: 15, art: 'pen', color: '#4f9fe0',
    desc: '写字很轻，适合在本子边缘写不打算给人看的字。',
    meta: ['0.5mm', '低重心', '附 2 根铅芯']
  },
  {
    id: 't-marker', name: '荧光笔 · 三支', en: 'HIGHLIGHTERS',
    cat: 'tool', price: 19, art: 'pen', color: '#7fc7c3',
    desc: '蓝、黄、粉。划重点的时候别把整页都划了。',
    meta: ['3 支装', '快干', '不渗透']
  },
  {
    id: 't-pouch', name: '帆布笔袋', en: 'POUCH',
    cat: 'tool', price: 32, art: 'pouch', color: '#4f86b2', tag: '耐脏',
    desc: '装得下所有笔，也装得下几颗不打算用的糖。',
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
  { name: '天蓝', hex: '#4f9fe0', deep: '#2b6da3', soft: '#dbeaf8' },
  { name: '雾蓝', hex: '#8fb7d8', deep: '#56809f', soft: '#e6eff6' },
  { name: '湖蓝', hex: '#2f7ea8', deep: '#1d5b7d', soft: '#d5e8f0' },
  { name: '夜蓝', hex: '#3c5f8a', deep: '#22385c', soft: '#dfe6f1' },
  { name: '奶油蓝', hex: '#a9cfe6', deep: '#6f9bb5', soft: '#eaf3f9' }
];

/* 小票上那句手写的实话（每次随机） */
const RECEIPT_NOTES = [
  '不用谢，下次别迟到就行。',
  '钱记在我账本上了，你不用掏。',
  '你挑的那几支，我都削好了。',
  '这单不算模板，是我现写的。',
  '小票撕了没关系，别把话说一半就走。'
];
