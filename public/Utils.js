/**
 * Created by jiangsong on 16/7/17.
 */
'use strict';

class Utils {
    static sanitizeUrl(url) {
        if (!/^[a-zA-Z-_]+:/.test(url)) {
            url = 'http://' + url;
        }
        return url.toLowerCase();
    }
}

module.exports = Utils;