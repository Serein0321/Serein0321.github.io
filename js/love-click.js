/* 爱心特效 */

class Circle {
  constructor({ origin, speed, color, angle, context }) {
    this.origin = origin
    this.position = { ...this.origin }
    this.color = color
    this.speed = speed
    this.angle = angle
    this.context = context
    this.renderCount = 0
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
    this.context.fill()
  }

  move() {
    this.position.x = (Math.sin(this.angle) * this.speed) + this.position.x
    this.position.y = (Math.cos(this.angle) * this.speed) + this.position.y + (this.renderCount * 0.3)
    this.renderCount++
  }
}

class Boom {
  constructor({ origin, context, circleCount = 16, area }) {
    this.origin = origin
    this.context = context
    this.circleCount = circleCount
    this.area = area
    this.stop = false
    this.circles = []
  }

  randomArray(range) {
    const length = range.length
    const randomIndex = Math.floor(length * Math.random())
    return range[randomIndex]
  }

  randomColor() {
    const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    return '#' + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range)
  }

  randomRange(start, end) {
    return (end - start) * Math.random() + start
  }

  init() {
    for (let i = 0; i < this.circleCount; i++) {
      const circle = new Circle({
        context: this.context,
        origin: this.origin,
        color: this.randomColor(),
        angle: this.randomRange(Math.PI - 1, Math.PI + 1),
        speed: this.randomRange(1, 6)
      })
      this.circles.push(circle)
    }
  }

  move() {
    this.circles.forEach((circle, index) => {
      if (circle.position.x > this.area.width || circle.position.y > this.area.height) {
        return this.circles.splice(index, 1)
      }
      circle.move()
    })
    if (this.circles.length == 0) {
      this.stop = true
    }
  }

  draw() {
    this.circles.forEach(circle => circle.draw())
  }
}

class CursorSpecialEffects {
  constructor() {
    this.computerCanvas = document.createElement('canvas')
    this.renderCanvas = document.createElement('canvas')

    this.computerContext = this.computerCanvas.getContext('2d')
    this.renderContext = this.renderCanvas.getContext('2d')

    this.globalWidth = window.innerWidth
    this.globalHeight = window.innerHeight

    this.booms = []
    this.running = false
  }

  handleMouseDown(e) {
    const boom = new Boom({
      origin: { x: e.clientX, y: e.clientY },
      context: this.computerContext,
      area: {
        width: this.globalWidth,
        height: this.globalHeight
      }
    })
    boom.init()
    this.booms.push(boom)
    this.running || this.run()
  }

  handlePageHide() {
    this.booms = []
    this.running = false
  }

  init() {
    const style = this.renderCanvas.style
    style.position = 'fixed'
    style.top = style.left = 0
    style.zIndex = '999999999999999999999999999999999999999999'
    style.pointerEvents = 'none'

    style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
    style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight

    document.body.append(this.renderCanvas)

    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    window.addEventListener('pagehide', this.handlePageHide.bind(this))
  }

  run() {
    this.running = true
    if (this.booms.length == 0) {
      return this.running = false
    }

    requestAnimationFrame(this.run.bind(this))

    this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
    this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

    this.booms.forEach((boom, index) => {
      if (boom.stop) {
        return this.booms.splice(index, 1)
      }
      boom.move()
      boom.draw()
    })
    this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
  }
}

const cursorSpecialEffects = new CursorSpecialEffects()
cursorSpecialEffects.init();

var a_idx = 0;
jQuery(document).ready(function ($) {
  $("body").click(function (e) {
    var a = new Array(
  "爱与友情以及勇气改变不了一个人，只有受伤才能让人成长。", "富江有天使的脸孔，但其实她是个恶魔，不，恶魔也比她要好一点。", "我不会去统治这片大海，在这片大海上，最自由的人就是海贼王！", "其实每个女孩身边都有张万森，只是女孩不想承认罢了。", "我们现在所做的，只是自认为是动态规划的贪 心罢了。",
  "成败就此一战，我们必须拼尽全力。", "如此生活30年，直到大厦崩塌。", "神即道，道即法，道法自然，如来。", "野蛮人之间人吃人，文明人之间人骗人。", "千山暮雪，耳畔层云。这段旅程，我们一起走过。",
  "失去故土的花朵，回不去，却也离不开。", "这长江天险后，便是江东铁壁。", "实践是检验真理的唯一标准。", "欲买桂花同载酒，荒泷天下第一斗。", "不稼不穑，耕怠者无获；不了不当，事辍者无功。",
  "每个人的心里，都有一个忘不记，却无法拥抱珍惜的人。", "也许我们终将行踪不明，但你该知道，我曾为你动情。", "“妈妈，我将变成萤火虫。”", "万有引力可无法对坠入爱河的人负责。", "我只对现实世界绝望过，却未对自己绝望过！",
  "人的伟大之处是在于面对困难的时候还能摆出崇高的姿态。", "如果惧怕前面跌宕的山岩，生命就永远只能是死水一潭。", "这个世界很大，告别的方式有多少种，人生的正确答案就有多少个。", "现在不是搞分裂的时候，恶魔与人类们，我们需要同心协力。", "明月装饰了你的窗子，你装饰了别人的梦。",       
  "纵使天光终将熄灭，我们也要歌颂太阳。", "弱水三千，我只取一瓢饮。", "人是万灵之长，智慧的差异是很小的，经历本身也是文化。", "高调做事，低调做人。", "要保持希望在每天清晨太阳升起。",
  "智商是硬伤。", "善与恶逆转的瞬间，便是奇迹", "我在最没有能力的年纪，遇见了最想照顾一生的人。", "实变函数学十遍，泛函学完心泛寒。", "南天寂静亮星少，北落师门赛明灯。",
  "你特殊的遭遇并不是你可以特殊的理由。", "夜阑卧听风吹雨，铁马冰河入梦来。", "水是眼波横，山是眉峰聚。", "世界上没有鸟黑，只有鸟厨和丧心病狂的鸟厨！", "温柔正确的人总是难以生存，因为这世界既不温柔，也不正确。",
  "幸福破灭之时，总是伴随着血腥味。", "隔着屏幕轻易产生感情的你，肯定很孤独吧。", "你现在的气质里，藏着你走过的路，读过的书和爱过的人。", "山海自有归期，风雨自有相逢，意难平终将和解，万事终将如意。", "仲夏夜茫，七月未央，我们年少轻狂，不惧岁月漫长。",
  "逸一时，误一世。", "小鸟......是无法追上飞龙的。", "身是菩提树，心如明镜台，时时勤拂拭，勿使惹尘埃。", "善恶终有报，天道好轮回。不信抬头看，苍天饶过谁。", "问世间，情为何物，直教生死相许？",
  "Far", "暴雨中前进，伞是倒划天空的船。", "人是要整活的——没活了，可不就是死了么？", "爱你我也不在是那个幼稚的少年。", "当星星变成星空，梦想 也就近在咫尺了。",
  "下辈子变成你喜欢的人，然后不喜欢你！", "这只是乌龙茶啦。", "世界上哪有不会输的英雄啊。", "我之所以想变强，是为了活得轻松写意。", "恋爱本质不是走向婚姻，而是探究最真实的自己。",
  "飒爽英姿闯江湖，诗酒茶话莫孤独。", "从来如此，便对吗？", "有些人坐飞机就能见到，有些人坐时光机才可以。", "以后不见面的日子要按年算了，希望你不留遗憾地度过。", "慢也好，步伐小也罢，是往前走就好。",
  "是你赢了...哲...", "I like you, but just like you.", "愿时光能缓，愿故人不散！", "物质决定意识，意识反作用于物质", "我们生活在阴沟里，但有人依然仰望星空。",
  "我真的很想喜欢你们，可是你们没有人喜欢我。", "谎言重复一千遍就成了真理。", "大本钟下送快递——上面摆，下面寄。", "君埋泉下泥销骨，我寄人间雪满头。", "且视他人之疑目如盏盏鬼火，大胆地去你的夜路。",
  "走下去。AMa-10。你存在的意义远超你自身。", "不敢打开信封啊。因为，打开了就结束了啊。", "记不分明疑是梦，梦来还隔一重帘。", "闪电风暴过后，一定是那充满蓝天白云，充满碧草繁花的世界。", "她轻轻唱起来宛如天籁，让我的梦似翅膀心似海。",
  "我也许不是好人，也不是坏人，但肯定不是小人。", "在和平年代中，儿子埋葬父亲，但在战争中，父亲埋葬儿子。", "人的精神思想方面的优势越大，给无聊留下的空间就越小。", "人生就像爬楼梯，只有脚踏实地的向上，才能到达屋顶。", "在战略上要藐视敌人，在战术上要重视敌人！",
  "孤独不是病，习惯了自然会好。", "这世界太大，勇敢的少年奔赴天涯。", "如果你能在浪费时间中获得乐趣，就不算浪费时间。", "欺骗世界，欺骗最初的你。", "我们的学生会长，比高达还强。",
  "恋爱不是下定决心后才开始的，而是回过神来时就开始了哦。", "当君怀归日，是妾断肠时。", "阶砖不会拒绝磨蚀，窗花不可幽禁落霞。", "时间是件无价的易耗品，不管你愿不愿意，它总是被消耗着。", "人类侥幸拥有了智慧，就应该善用它。",
  "就算天塌下来变成一片废墟，他的脸色也不会有丝毫变化。", "为有牺牲多壮志，敢教日月换新天。", "就像是一场华尔街的阴谋，透露着优雅的杀戮。", "身为蝼蚁的你，真的很努力呢。", "我只希望，我喜欢的人可以健康的活着。");
    var $i = $("<span/>").text(a[a_idx]);
    var x = e.pageX,
      y = e.pageY;
    $i.css({
      "z-index": 99999,
      "top": y - 28,
      "left": x - a[a_idx].length * 8,
      "position": "absolute",
      "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    });
    $("body").append($i);
    $i.animate({
      "top": y - 180,
      "opacity": 0
    }, 1500, function () {
      $i.remove();
    });
    a_idx = (a_idx + 1) % a.length;
  });
});
