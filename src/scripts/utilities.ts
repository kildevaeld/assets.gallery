export function ajax (): XMLHttpRequest {
    var e;
    if (window.hasOwnProperty('XMLHttpRequest')) {
        return new XMLHttpRequest();
    }
    try {
        return new ActiveXObject('msxml2.xmlhttp.6.0');
    } catch (_error) {
        e = _error;
    }
    try {
        return new ActiveXObject('msxml2.xmlhttp.3.0');
    } catch (_error) {
        e = _error;
    }
    try {
        return new ActiveXObject('msxml2.xmlhttp');
    } catch (_error) {
        e = _error;
    }
    return e;
};


export function truncate(str:string, length: number): string {
   let n = str.substring(0, Math.min(length,str.length))

   return n + (n.length == str.length ? '' : '...')
}

export function humanFileSize(bytes:number, si:boolean = false): string {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}


export function normalizeURL(url:string, ...segments:string[]): string {
    let i:number, p: string = "";
    if ((i = url.indexOf('?')) >= 0) {
        p = url.substr(i);
        url = url.substr(0,i);
   }
   
   if (url[url.length - 1] !== '/') url += '/';
   
   for (let i = 0, ii = segments.length; i < ii; i++) {
       let s = segments[i];
       if (s === '/') continue;
       if (s[0] === '/') s = s.substr(1);
       if (s[s.length - 1] !== '/') s += '/';
       url += s;
   }
   if (url[url.length - 1] === '/') url = url.substr(0, url.length - 1);
   
   return url + p;
}