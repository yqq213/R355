# 图片处理功能使用说明

## 功能概述

当点击"完成"按钮时，系统会自动将右侧区域（包括底部空格背景和中间的切割图）保存成一张base64格式的图片，要求：
- 底部空格背景转成黑色背景
- 中间的切割图转成白色

## 实现原理

### 1. 图片处理流程

1. **获取预览画布**：从右侧预览画布获取当前的图像状态
2. **创建临时画布**：创建一个与预览画布相同尺寸的临时canvas
3. **绘制黑色背景**：在临时画布上先绘制纯黑色背景
4. **叠加预览内容**：将预览画布的内容绘制到临时画布上
5. **像素级处理**：逐像素分析颜色，进行颜色转换
6. **生成base64**：将处理后的图像转换为base64格式

### 2. 颜色转换规则

```javascript
// 颜色阈值定义
const BLACK_THRESHOLD = 30;        // 黑色阈值
const TRANSPARENCY_THRESHOLD = 10; // 透明度阈值

// 处理逻辑
if (alpha > TRANSPARENCY_THRESHOLD) {
  const isBlack = r < BLACK_THRESHOLD && g < BLACK_THRESHOLD && b < BLACK_THRESHOLD;
  
  if (!isBlack) {
    // 非黑色像素转换为白色
    data[i] = 255;     // R
    data[i + 1] = 255; // G
    data[i + 2] = 255; // B
    data[i + 3] = 255; // A
  } else {
    // 黑色像素保持黑色
    data[i] = 0;       // R
    data[i + 1] = 0;   // G
    data[i + 2] = 0;   // B
    data[i + 3] = 255; // A
  }
} else {
  // 透明像素保持透明
  data[i + 3] = 0;
}
```

## 使用方法

### 1. 在主应用中

```javascript
// 点击完成按钮时自动触发
$('.edit-confirm-btn').click(function() {
  generateProcessedImage().then(base64 => {
    console.log('处理后的图片base64:', base64);
    // 这里可以将base64发送到服务器或进行其他处理
    layer.closeAll();
  }).catch(error => {
    console.error('生成图片失败:', error);
    layer.closeAll();
  });
});
```

### 2. 在测试页面中

1. 打开 `ai-dress/test-segment.html`
2. 点击"测试自动选区"按钮生成选区
3. 点击"测试图片处理"按钮测试图片处理功能
4. 查看处理后的图片和下载链接

## 核心函数

### generateProcessedImage()

主要的图片处理函数，返回Promise对象，解析为处理后的base64字符串。

### processImagePixels(data, width, height)

像素级处理函数，负责颜色转换逻辑。

### processImagePixelsAdvanced(data, width, height)

高级处理函数，包含边缘平滑处理，可选使用。

## 参数配置

可以通过修改以下参数来调整处理效果：

```javascript
const BLACK_THRESHOLD = 30;        // 调整黑色检测的敏感度
const TRANSPARENCY_THRESHOLD = 10; // 调整透明度检测的敏感度
```

## 输出格式

- **格式**: PNG
- **质量**: 1.0 (最高质量)
- **编码**: Base64
- **背景**: 黑色 (#000000)
- **前景**: 白色 (#FFFFFF)

## 注意事项

1. **性能考虑**：大尺寸图片处理可能需要较长时间
2. **内存使用**：处理过程中会创建临时canvas，注意内存管理
3. **跨域问题**：确保图片支持跨域访问
4. **浏览器兼容性**：需要支持Canvas API的现代浏览器

## 错误处理

函数包含完整的错误处理机制：

```javascript
generateProcessedImage().then(base64 => {
  // 成功处理
}).catch(error => {
  console.error('生成图片失败:', error);
  // 错误处理
});
```

## 扩展功能

### 1. 自定义颜色

可以修改颜色转换逻辑来支持其他颜色组合：

```javascript
// 例如：背景为红色，前景为蓝色
if (!isBlack) {
  data[i] = 0;       // R
  data[i + 1] = 0;   // G
  data[i + 2] = 255; // B (蓝色)
} else {
  data[i] = 255;     // R (红色)
  data[i + 1] = 0;   // G
  data[i + 2] = 0;   // B
}
```

### 2. 添加滤镜效果

可以在处理过程中添加各种滤镜效果：

```javascript
// 例如：添加模糊效果
tempCtx.filter = 'blur(2px)';
tempCtx.drawImage(img, 0, 0);
tempCtx.filter = 'none';
```

### 3. 批量处理

可以扩展为支持批量处理多张图片：

```javascript
async function processMultipleImages(imageUrls) {
  const results = [];
  for (const url of imageUrls) {
    const base64 = await generateProcessedImage(url);
    results.push(base64);
  }
  return results;
}
``` 