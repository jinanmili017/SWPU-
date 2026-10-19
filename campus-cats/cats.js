/* ============================================================
   猫咪档案数据
   —— 这是整个网站唯一需要你经常修改的文件 ——

   加一只新猫的做法：
   1. 复制下面任意一整段  { ... },
   2. 粘到数组末尾（注意上一段末尾要有逗号）
   3. 改里面的内容，不改字段名
   4. 照片放进 images 文件夹，把 photo 改成 'images/你的文件名.jpg'

   字段说明：
   status     只能填这四个之一：
                在校 = 还在校园里
                毕业 = 已经被领养走了
                休学 = 很长一段时间没见到
                喵星 = 已经离开了这个世界
   ============================================================ */

const CATS = [
  {
    id: '001',
    name: '橘座',
    color: '橘猫',
    gender: '公',
    status: '在校',
    sterilized: '已绝育',
    personality: '见人就往腿边蹭，饭点比学生还准时',
    appearance: '尾巴尖有一撮白毛，左耳后有个小缺口',
    spots: ['三教后门', '一食堂东侧'],
    firstSeen: '2024年3月',
    relations: ['和灰机形影不离', '见了芝麻糊就绕道走'],
    photo: 'images/placeholder.svg',
    story: '每天早上八点蹲在三教后门的台阶上，眯着眼看人进进出出，像在检查谁迟到了。'
  },

  {
    id: '002',
    name: '灰机',
    color: '狸花',
    gender: '母',
    status: '在校',
    sterilized: '已绝育',
    personality: '警觉，生人靠近三步就跑，熟人给摸',
    appearance: '身上是标准的鱼骨刺纹，四只脚掌都是白的',
    spots: ['图书馆西侧草坪', '明湖边'],
    firstSeen: '2023年11月',
    relations: ['和橘座一起吃饭', '带大过一窝小猫，都已送养'],
    photo: 'images/placeholder.svg',
    story: '草坪上最难拍的一只，听见快门声就抬头。据说它带大的三只小猫全被领养走了。'
  },

  {
    id: '003',
    name: '芝麻糊',
    color: '奶牛',
    gender: '公',
    status: '在校',
    sterilized: '未绝育',
    personality: '话多，冲着人喵喵叫，其实胆子很小',
    appearance: '背上两块黑斑连成一片，下巴一撮黑毛',
    spots: ['3号宿舍楼下', '一食堂东侧'],
    firstSeen: '2025年5月',
    relations: ['被橘座追着打过', '最近总跟着花卷出现过的地方转'],
    photo: 'images/placeholder.svg',
    story: '去年夏天出现在宿舍区，叫得最凶但一伸手就缩。同学们一致认为它是个嘴硬的家伙。'
  },

  {
    id: '004',
    name: '花卷',
    color: '三花',
    gender: '母',
    status: '毕业',
    sterilized: '已绝育',
    personality: '温顺亲人是出了名的，谁都能摸',
    appearance: '脸上一半橘一半黑，分界线正中间',
    spots: ['明湖边', '实验楼B座'],
    firstSeen: '2022年9月',
    relations: ['带过芝麻糊一阵子'],
    photo: 'images/placeholder.svg',
    story: '在湖边待了三年，被一位来开会的校友抱走了。现在据说在一个有阳台的家里过得很体面。'
  },

  {
    id: '005',
    name: '雪梨',
    color: '白猫',
    gender: '母',
    status: '休学',
    sterilized: '不详',
    personality: '极怕人，只在清晨和深夜出现',
    appearance: '通体纯白，一只眼睛是蓝色的',
    spots: ['实验楼B座'],
    firstSeen: '2025年1月',
    relations: [],
    photo: 'images/placeholder.svg',
    story: '今年入夏之后就没再出现过。有同学说在校外的小区见过一只很像的，希望是它。'
  },

  {
    id: '006',
    name: '老校长',
    color: '橘白',
    gender: '公',
    status: '喵星',
    sterilized: '已绝育',
    personality: '什么都不怕，敢在自行车筐里睡觉',
    appearance: '右眼周围一大圈橘色，像戴了个眼罩',
    spots: ['图书馆西侧草坪', '三教后门'],
    firstSeen: '2019年秋',
    relations: ['灰机是它看着长大的'],
    photo: 'images/placeholder.svg',
    story: '在这个校园待了六年，送走了好几届学生。去年冬天走的时候，草坪上放了一排猫粮和花。'
  }
];
