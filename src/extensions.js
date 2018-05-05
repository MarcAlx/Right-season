/**
 * Add formating option to string
 * 
 * Use it like this : "it\'s %s!".format('plane')
 */
String.prototype.format = function() {
    return [...arguments].reduce((p,c) => p.replace(/%s/,c), this);
};
  