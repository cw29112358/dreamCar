import { email } from 'utils/constants';

export default {
  // generatorMessage: '此页面由生成器生成',
  // componentMessage: '此组件由生成器生成',
  // welcome: '欢迎使用生成器生成你的文件',
  // footer: 'native 模版',
  // 以上为测试翻译的翻译代码

  // form
  placeholderPhoneNumber: '请输入您的手机号',
  placeholderPassword: '请输入您的密码',
  placeholderRepeatPassword: '请再次输入您的密码',
  placeholderVerificationCode: '请输入四位数字验证码',
  placeholderCurrentPassword: '请输入当前密码',
  placeholderNewPassword: '请输入新密码',
  placeholderRepeatNewPassword: '请再次输入新密码',

  phoneNumberIsRequired: '您必须填写电话号码',
  notPhoneNumber: '电话号码不符合规格',
  passwordIsRequired: '您必须填写密码',
  notPassword: '密码不符合规格（只包含数字和字母）',
  notPasswordLongEnough: '密码至少6个字符',
  notPasswordShortEnough: '密码最多32个字符',
  verificationCodeIsRequired: '您必须填写验证码',
  notVerificationCode: '验证码不符合规格(必须是四位数字)',
  currentPasswordIsRequired: '您必须填写当前密码',
  newPasswordIsRequired: '您必须填写新密码',
  repeatNewPasswordIsRequired: '您必须再次填写新密码',
  repeatPasswordIsRequired: '您必须填写确认密码',
  isNotRepeatPasswordSame: '两次输入的密码不一致',

  // EntryScene
  takeLook: '先去转转',
  login: '登录',
  signUp: '注册',
  loading: '加载中...',

  // LoginScene
  forgetPassword: '忘记密码?',
  noAccount: '没有账号？',
  hasAccount: '已有账号？',

  // ForgetPasswordScene
  forgetPasswordTitle: '忘记密码',
  nextStep: '下一步',
  done: '完成',
  passwordTip: '您的密码必须包含字母和数字，长度为7-32个字符。',
  sendVerificationCode: '发送验证码',
  passwordResetComplete: '密码修改成功，请登录',

  // signUpScene
  inputPasswordTipLineOne: '注册即代表阅读并同意接受',
  serviceTerms: '服务条款',
  and: '和',
  privacyPolicy: '隐私条款',

  // HomeScene
  purchaseBudget: '按价格筛选',
  cars: '辆',
  suv: 'SUV',
  van: '厢型车',
  sedan: '轿车',
  all: '全部',
  truck: '卡车',

  // InventoryScene
  placeholderSearch: '查询和找到你的车...',
  carList: '车辆列表',
  price: '价格',
  type: '类型',
  year: '年份',
  more: '更多',
  others: '其他',
  clear: '清除',
  sort: '排序',
  lowToHigh: '低到高',
  highToLow: '高到低',
  color: '颜色',
  brand: '品牌',
  startPay: '可退还',
  loadingCar: '努力加载中...',

  // InventoryCarScene
  holdFee: '预定金额',
  pickupDate: '取车日期',
  timeNote: '* 取车时间为中国当地时间',
  next: '下一步',
  validMembershipStatus: '目前每位会员只允许订购一辆汽车，后续会允许订购多辆，敬请谅解',
  installmentPaymentTitle: '押金付款参考案例',
  installmentDownPayment: '首付',
  installmentCarPrice: '汽车价格',
  monthlyInterest: '月付利息',
  installmentPaymentNote: '会员可享0首付、0月供',
  paymentNoteText: '* 详情咨询 ',
  favouriteFail: '收藏失败',
  favouriteSuccess: '收藏成功',
  middle: '中型',
  features: '车辆信息',
  size: '大小',
  miles: '米',
  engineCylinders: '汽缸',
  drivenWheels: '驱动轮',
  details: '车辆描述及配置',
  booking: '预订',

  // ProfileCenterScene
  profileCenter: '个人中心',
  toBeMemberShip: '成为会员',
  member: '会员',
  basicMember: '初级会员',
  premiumMember: '高级会员',
  deluxeMember: '顶级会员',
  agent: '推荐人',
  favourite: '收藏',
  orders: '订单',
  driver: '驾驶员',
  recommendationCode: '推荐码',
  setting: '设置',

  // ProfileScene
  male: '男',
  female: '女',
  personalCenter: '个人中心',
  name: '姓名',
  gender: '性别',
  birthday: '出生日期',
  email: '邮箱',
  emergencyContact: '紧急联系人手机号',
  zipCode: '邮编',
  placeholderName: '请输入您的姓名',
  placeholderGender: '请选择您的性别',
  placeholderBirthday: '请选择您的出生日期',
  placeholderEmail: '请输入您的邮箱',
  placeholderEmergencyContact: '请输入紧急联系人手机号',
  placeholderZipCode: '请输入邮编号码',
  pleaseEnterYourVaildEmail: '请输入正确的邮箱',
  notMember: '不是会员',

  // MemberScene
  buttonPrivilege: '加入会员',
  basic: '初级会员',
  premium: '高级会员',
  deluxe: '顶级会员',
  basicText: '一年后原价回购，开心买车',
  premiumText: '全年免费保养,安心养车',
  deluxeText: '一站式管家服务,省心留学',
  privilegeTitle: '会员权益',
  privilege1Text: '一年汽车使用权',
  privilege2Text: '160项汽车检查',
  privilege3Text: '一年四次机场接送',
  privilege4Text: '全面维护保养',
  privilege5Text: '提供全面租房信息',
  privilege6Text: '小管家服务',
  privilege7Text: '紧急事件服务',
  privilege8Text: '留学生金融服务',
  privilege1ModalText: '加入会员，一年之内，免费使用爱希汽车',
  privilege2ModalText: '汽车送到顾客手中之前，会做一个全面的检查，确保车的安全性',
  privilege3ModalText: '寒暑假都提供4次免费机场往返服务',
  privilege4ModalText: '全面汽车维护保养服务会定时清洗您的车辆，及时更换机油和清洁过滤网。让您开起来更加舒适和放心。',
  privilege5ModalText: '提供相关租房群，租房网站及周边房屋资源',
  privilege6ModalText: '学习生活小管家及时帮您解答衣食住行各方面的问题',
  privilege7ModalText: '美国紧急事件联系服务中心',
  privilege8ModalText: '为留学生提供全方位的学习生活资金支持',

  // FavouriteCarScene
  unFavouriteFail: '取消收藏失败',
  available: '销售中',
  notAvailable: '已下架',
  selectAll: '全选',
  noFavourite: '暂时没有收藏，去首页看看吧!',

  // MyNewsScene
  myNews: '我的消息',
  noNews: '没有更多消息',
  noMessage: '暂无消息',
  unFavourite: '取消收藏',

  // SettingScene
  updatePassword: '修改密码',
  feedBack: '给我们反馈',
  faq: '常见问题解答',
  version: '版本更新',
  logOut: '退出登录',
  feedBackQuestions: '您有什么建议或意见吗？',
  feedBackText: `我们一直希望能给您更好的用户体验，所以如果您有什么建议或者意见，请告诉我们，帮助我们更好的成长，也可邮件联系我们（${email}）。`,

  // ChangePasswordScene
  changePassword: '修改密码',
  toLogin: '去登陆',
  changeSuccess: '修改成功',
  changePasswordTip: '密码修改成功，请重新登录',

  // VersionScene
  latestVersion: '已经是最新版本了',
  currentVersion: '当前版本 ',
  latestVersionDetected: '检测到最新版本 ',
  checkForUpdate: '检查更新',
  updateNow: '立即更新',
  // findVersion: '发现新版本',
  // findVersionText: '爱希汽车更新啦，赶紧去下载看看吧！',
  // update: '更新',

  // RecommendationCodeModal
  recommendationCodeTitle: '填写推荐人ID',
  recommendationCodeTip: '您如果是通过代理商推荐的，您可在此处填写代理商ID号，如您是自行搜索下载爱希汽车，您可不必填写代理商ID号。',
  confirmAdd: '确认添加',

  // many pages used
  to: '至',
  yuan: '元',
  years: '年',
  edit: '编辑',
  save: '保存',
  delete: '删除',
  cancel: '取消',
  submit: '提交',
  confirm: '确定',
  noMoreCar: '下面没有了',
  dreamCar: '汽车',
  saveSuccess: '保存成功',

  // color
  black: '黑色',
};