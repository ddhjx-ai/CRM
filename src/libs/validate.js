/**
 * 用户名
 * @param rule 验证规则（不含特殊字符）
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateUsername = (rule, value, callback) => {
  var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,16}$/;
  if (value.length > 16) {
    callback(new Error('长度不能超过16个字符'));
  } else if (!reg.test(value)) {
    callback(new Error('仅支持大小写英文、中文和下划线_'));
  } else {
    callback();
  }
};

/**
 * 密码格式验证
 * @param rule 验证规则（不少于6位）
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码长度不得小于6位'));
  } else {
    callback();
  }
};

/**
 * 手机号码格式验证
 * @param rule 验证规则
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateMobile = (rule, value, callback) => {
  var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!reg.test(value)) {
    callback(new Error('手机号格式错误'));
  } else {
    callback();
  }
};

/**
 * 身份证号码格式验证
 * @param rule 验证规则（是否满足18位）
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateIDCard = (rule, value, callback) => {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!reg.test(value)) {
    callback(new Error('身份证号码格式错误'));
  } else {
    callback();
  }
};

/**
 * 数字格式验证
 * @param rule 验证规则
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateNum = (rule, value, callback) => {
  const reg = /^(0|[1-9][0-9]*)$/;
  if(value === ''){
    callback();
  }else if (!reg.test(value)) {
    callback(new Error('请输入大于等于0的数字，并且不能是小数'))
  } else {
    callback();
  }
};

/**
 * 排序校验
 * @param rule 验证规则
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateSort = (rule, value, callback) => {
  const reg = /^(0|[1-9][0-9]*)$/;
  if(value === ''){
    callback();
  }else if (!reg.test(value)) {
    callback(new Error('该值不能是小数'))
  } else {
    callback();
  }
};

/**
 * 价格验证
 * @param rule 验证规则(保留两位小数)
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validatePrice = (rule, value, callback) => {
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  if(!reg.test(value)) {
    callback(new Error('金额必须大于0并且只能精确到分'))
  }else {
    callback();
  }
};

/**
 * 库存验证
 * @param rule 验证规则(最多10w，不能是小数和负数)
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateAmount = (rule, value, callback) => {
  const reg = /^(0|[1-9][0-9]*)$/;
  if(value.length > 5) {
    callback(new Error('最多可以输入 5 个字符'));
  } else if(!reg.test(value)) {
    callback(new Error('总数必须大于等于0，并且不能是小数'))
  }else {
    callback();
  }
};

/**
 * 限制数量验证
 * @param rule 验证规则(最多1w，不能是小数和负数)
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateLimit = (rule, value, callback) => {
  const reg = /^(0|[1-9][0-9]*)$/;
  if(value.length > 4) {
    callback(new Error('最多可以输入 4 个字符'));
  } else if(!reg.test(value)) {
    callback(new Error('总数必须大于等于0，并且不能是小数'))
  }else {
    callback();
  }
};


/**
 * IP校验
 * @param rule 
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateIP = (rule, value, callback) => {
  const reg = /^(\d{1}|[1-9]{1}\d{1}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1}|[1-9]{1}\d{1}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1}|[1-9]{1}\d{1}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1}|[1-9]{1}\d{1}|1\d\d|2[0-4]\d|25[0-5])$/
  if(!reg.test(value)) {
    callback(new Error('请输入合法的IP地址'))
  }else {
    callback();
  }
};