/**
 * Created by wangchao on 21/11/18.
 */

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 判断身份证号码
 */
export function validateCardid(code) {
    code += ''
    let obj = {
        result: false,
        msg: ''
    };
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    if (!validatenull(code)) {
        if (Array.from(code).length == 18) {
            if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
                obj.msg = "证件号码格式错误";
            } else if (!city[code.substr(0, 2)]) {
                obj.msg = "地址编码错误";
            } else {
                //18位身份证需要验证最后一位校验位
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != code[17]) {
                    obj.msg = "证件号码校验位错误";
                } else {
                    obj.result = true;
                }

            }
        } else {
            obj.msg = "证件号码长度不为18位";
        }

    } else {
        obj.msg = "证件号码不能为空";
    }
    return obj;
}
/**
 * 判断手机号码是否正确
 */
export function validateMobile(phone) {
    let obj = {
        result: false,
        msg: ''
    };
    phone += ''
    var isPhone = /^0\d{2,3}-?\d{7,8}$/;
    //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
    if (!validatenull(phone)) {
        if (Array.from(phone).length == 11) {
            if (isPhone.test(phone)) {
                obj.msg = '手机号码格式不正确';
            } else {
                obj.result = true;
            }
        } else {
            obj.msg = '手机号码长度不为11位';
        }
    } else {
        obj.msg = '手机号码不能为空';
    }
    return obj;
}
/**
 * 判断是否为空
 */
export function validatenull(val) {
    if (typeof val == 'boolean') {
        return false;
    }
    if (typeof val == 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
        return false;
    }
    return false;
}
