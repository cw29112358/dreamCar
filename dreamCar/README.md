dream-car

插件介绍
----------------------------------------------------------------------------------------------------

--------
[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
搭配eslint，eslint-plugin-import，eslint-plugin-react，eslint-plugin-react-hooks，eslint-plugin-jsx-a11ys插件使用
npm info "eslint-config-airbnb@latest" peerDependencies => 查看各插件版本

--------
[hoist-non-react-statics](https://www.npmjs.com/package/hoist-non-react-statics)
将非反应特定静态从子组件复制到父组件

--------
[immutable](https://www.npmjs.com/package/immutable)
创建后不可更改不可变数据

--------
[invariant](https://www.npmjs.com/package/invariant)

--------
[lodash](https://www.lodashjs.com/)
小工具

--------
[moment](http://momentjs.cn/docs/)
日期

--------
[native-base](https://docs.nativebase.io/) => react-native link
UI库

--------
[prop-types](https://www.npmjs.com/package/prop-types)
类型检查

--------
[react](https://react.docschina.org/)

--------
[react-native => 0.60.5](https://reactnative.cn/)

--------需要link
[react-native-device-info](https://www.npmjs.com/package/react-native-device-info)
获取设备信息

--------需要link
[react-native-fs](https://www.npmjs.com/package/react-native-fs)
访问本地文件系统

--------需要link,项目中虽有集成react-native-i18n，但是没有使用，目前并未link
[react-native-i18n](https://www.npmjs.com/package/react-native-i18n)

--------需要link,该link还需要参考：https://www.npmjs.com/package/react-native-photo-upload
[react-native-image-picker](https://www.npmjs.com/package/react-native-image-picker)
允许您使用本机UI从设备库或直接从相机中选择照片/视频

--------需要link
[react-native-image-resizer](https://github.com/bamlab/react-native-image-resizer)
可以创建本地图片的缩放版本（也支持iOS上的资源库）

--------
[react-native-modal](https://www.npmjs.com/package/react-native-modal)

--------
[react-native-modal-datetime-picker](https://www.npmjs.com/package/react-native-modal-datetime-picker)

--------
[react-native-photo-upload](https://www.npmjs.com/package/react-native-photo-upload)

--------需要link
[react-native-picker](https://www.npmjs.com/package/react-native-picker)

--------
[react-native-router-flux](https://www.npmjs.com/package/react-native-router-flux)
路由

--------
[react-redux](http://cn.redux.js.org/docs/react-redux/)
搭配react-native，必须使用5.x 版本的 React Redux

--------
[redux](https://www.npmjs.com/package/redux-form)
版本：^4.0.0-rc.1

--------仔细参考官网
[redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)

--------项目中集成了该库，但是我并没有去使用它
【redux-form】(https://www.npmjs.com/package/redux-form)
redux的表单操作，可以简化Form

--------
[redux-immutable](https://www.npmjs.com/package/redux-immutable)
用于创建combineReducers与Immutable.js状态一起使用的Redux的等效函数。

--------
[redux-saga](https://redux-saga-in-chinese.js.org/)
选择器

--------
[reselect-immutable-helpers](https://github.com/DanielleB-R/reselect-immutable-helpers)
一个辅助函数库，用于将Reselect与使用Immutable对象构建的存储一起使用。

--------
[validator](https://www.npmjs.com/package/validator)
字符串验证器和清理器的库

--------
[yarn](https://yarn.bootcss.com/)
替代npm的工具

--------
[react-native-extra-dimensions-android](https://www.npmjs.com/package/react-native-extra-dimensions-android)
此模块允许您访问Android设备上的其他显示指标,更加精确返回

--------需要link，详细参考官网
[react-native-image-crop-picker](https://www.npmjs.com/package/react-native-image-crop-picker)
iOS / Android图像选择器，支持相机，视频，可配置压缩，多个图像和裁剪


项目结构
----------------------------------------------------------------------------------------------------
 * dreamCar/
  * android/
  * ios/
  * ...
  * src/
    * apis/  接口
    * assets/  静态图片
    * components/  公共组件
      * componentName/
        * index.js
        * styles.js
    * containers/ 组件
      * containerName/
        * actions.js  redux--action
        * constants.js  常量
        * index.js
        * reducer.js  redux--reducer
        * sagas.js
        * selectors.js  选择器
        * styles.js  样式
    * forms/  表单
      * formFields/
        * formFieldName/
          * index.js
        * constants.js
        * index.js
        * styles.js
      * formName/
        * index.js
        * styles.js
    * theme/  主题
      * variables/
        * commonColor.js  颜色
        * platform.js  平台代码
    * translations/  翻译
      * en.js  英文
      * zh.js  中文
    * utils/  小工具
    * App.js
    * AppRouter.js  所有路由
    * reducer.js


开始使用
----------------------------------------------------------------------------------------------------

1. ```git clone```

2. ```npm i``` or ```yarn```

4. ```yarn ios && react-native run-ios``` or ```yarn android && react-native run-android```

debugger 工具
----------------------------------------------------------------------------------------------------
本项目使用 [React Native Debugger](https://github.com/jhen0409/react-native-debugger) 进行测试。(工具需要安装)


相对路径引入文件
----------------------------------------------------------------------------------------------------

已设置的相对路径文件有：

1. apis: "./src/apis",
2. src: "./src",
3. configs: "./src/configs",
4. components: "./src/components",
5. containers: "./src/containers",
6. forms: "./src/forms",
7. utils: "./src/utils",
8. commonColor: "./src/theme/variables/commonColor",
9. platform: "./src/theme/variables/platform",
10. theme: "./src/theme",
11. translations: "./src/translations",

全局方法
----------------------------------------------------------------------------------------------------

 目前暂时有两个：

 1. translate(value: string) 方法（翻译）；
 2. alert(title, message, buttons, options = {}, type) 方法（跳弹窗）；
 3. toast(title = '', message = '', type = '', duration = 2500) 方法 （提醒框）

常见报错
----------------------------------------------------------------------------------------------------
### third-party: 'config.h' file not found
cd node_modules/react-native/third-party/glog-0.3.4
../../scripts/ios-configure-glog.sh

### Xcode10 has error 'Build input file cannot be found':
switch back to the Legacy Build System (File > Project Settings > Workspace Settings > Legacy Build System)
