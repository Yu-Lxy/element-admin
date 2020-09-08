
/**
 * [加法]
 */
export const accAdd = (arg1, arg2) => {
  var r1, r2, m;
  if (parseInt(arg1) == arg1) {
    r1 = 0;
  } else {
    r1 = arg1.toString().split(".")[1].length;
  }
  if (parseInt(arg2) == arg2) {
    r2 = 0;
  } else {
    r2 = arg2.toString().split(".")[1].length;
  }
  m = Math.pow(10, Math.max(r1, r2));
  var sum = (arg1 * m + arg2 * m) / m;
  return sum;
}

/**
 * [减法]
 */
export const accSub = (arg1, arg2) => {
  var r1, r2, m, n;
  if (parseInt(arg1) == arg1) {
    r1 = 0;
  } else {
    r1 = arg1.toString().split(".")[1].length;
  }
  if (parseInt(arg2) == arg2) {
    r2 = 0;
  } else {
    r2 = arg2.toString().split(".")[1].length;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 > r2) ? r1 : r2;
  var sum = ((arg1 * m - arg2 * m) / m).toFixed(n);
  return sum;
}

/**
 * [乘法]
 */
export const accMul = (arg1, arg2) => {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 * [除法]
 */
export const accDiv = (arg1, arg2) => {
  var r1, r2, m, n, q, j;
  if (parseInt(arg1) == arg1) {
    r1 = 0;
  } else {
    r1 = arg1.toString().split(".")[1].length;
  }
  if (parseInt(arg2) == arg2) {
    r2 = 0;
  } else {
    r2 = arg2.toString().split(".")[1].length;
  }

  q = r1 >= r2 ? r1 - r2 : r2 - r1;
  m = Math.pow(10, r1);
  n = Math.pow(10, r2);
  j = Math.pow(10, q);

  var sum = r1 >= r2 ? ((arg1 * m) / (arg2 * n) / j) : ((arg1 * m) / (arg2 * n) * j);
  return sum;
}