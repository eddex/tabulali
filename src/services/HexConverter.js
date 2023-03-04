// https://stackoverflow.com/a/13698172/10069673
export const hex2a = (hex) => {
  var str = "";
  for (var i = 0; i < hex.length; i += 2) {
    var v = parseInt(hex.substr(i, 2), 16);
    if (v) str += String.fromCharCode(v);
  }
  return str;
};
