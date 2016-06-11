void function() {

	var _ = (a => new ArrayWrapper(a));
	_.mapInline = mapInline;
	_.map = map; /*.......*/ map.bind = (()=>map);
	_.filter = filter; /*.*/ filter.bind = (()=>filter);
	_.reduce = reduce; /*.*/ reduce.bind = (()=>reduce);
	window.CSSUsageLodash = _;
	// test case: 
	// 35 = CSSUsageLodash([1,2,3,4,5]).map(v => v*v).filter(v => v%2).reduce(0, (a,b)=>(a+b)).value()
	
	function ArrayWrapper(array) {
		this.source = array;
		this.mapInline = function(f) { mapInline(this.source, f); return this; };
		this.map = function(f) { this.source = map(this.source, f); return this; };
		this.filter = function(f) { this.source = filter(this.source, f); return this; };
		this.reduce = function(v,f) { this.source = reduce(this.source, f, v); return this; };
		this.value = function() { return this.source };
	}
	
	function map(source, transform) {
		var clone = new Array(source.length);
		for(var i = source.length; i--;) {
			clone[i] = transform(source[i]);
		}
		return clone;
	}
	
	function mapInline(source, transform) {
		for(var i = source.length; i--;) {
			source[i] = transform(source[i]);
		}
		return source;
	}
	
	function filter(source, shouldValueBeIncluded) {
		var clone = new Array(source.length), i=0;
		for(var value of source) {
			if(shouldValueBeIncluded(value)) {
				clone[i++] = value
			}
		}
		clone.length = i;
		return clone;
	}
	
	function reduce(source, computeReduction, reduction) {
		for(var value of source) {
			reduction = computeReduction(reduction, value);
		}
		return reduction;
	}
	
}();
/* pako 0.2.8 nodeca/pako */
!function(t){window.pako=t()}(function(){return function t(e,a,n){function r(s,h){if(!a[s]){if(!e[s]){var l="function"==typeof require&&require;if(!h&&l)return l(s,!0);if(i)return i(s,!0);var o=new Error("Cannot find module '"+s+"'");throw o.code="MODULE_NOT_FOUND",o}var _=a[s]={exports:{}};e[s][0].call(_.exports,function(t){var a=e[s][1][t];return r(a?a:t)},_,_.exports,t,e,a,n)}return a[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({1:[function(t,e,a){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;a.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(var n in a)a.hasOwnProperty(n)&&(t[n]=a[n])}}return t},a.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var r={arraySet:function(t,e,a,n,r){if(e.subarray&&t.subarray)return void t.set(e.subarray(a,a+n),r);for(var i=0;n>i;i++)t[r+i]=e[a+i]},flattenChunks:function(t){var e,a,n,r,i,s;for(n=0,e=0,a=t.length;a>e;e++)n+=t[e].length;for(s=new Uint8Array(n),r=0,e=0,a=t.length;a>e;e++)i=t[e],s.set(i,r),r+=i.length;return s}},i={arraySet:function(t,e,a,n,r){for(var i=0;n>i;i++)t[r+i]=e[a+i]},flattenChunks:function(t){return[].concat.apply([],t)}};a.setTyped=function(t){t?(a.Buf8=Uint8Array,a.Buf16=Uint16Array,a.Buf32=Int32Array,a.assign(a,r)):(a.Buf8=Array,a.Buf16=Array,a.Buf32=Array,a.assign(a,i))},a.setTyped(n)},{}],2:[function(t,e,a){"use strict";function n(t,e){if(65537>e&&(t.subarray&&s||!t.subarray&&i))return String.fromCharCode.apply(null,r.shrinkBuf(t,e));for(var a="",n=0;e>n;n++)a+=String.fromCharCode(t[n]);return a}var r=t("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(h){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(h){s=!1}for(var l=new r.Buf8(256),o=0;256>o;o++)l[o]=o>=252?6:o>=248?5:o>=240?4:o>=224?3:o>=192?2:1;l[254]=l[254]=1,a.string2buf=function(t){var i,h=t.length,e=new r.Buf8(h);for(i=0;h>i;i++)e[i]=t.charCodeAt(i)&255;return e},a.buf2binstring=function(t){return n(t,t.length)},a.binstring2buf=function(t){for(var e=new r.Buf8(t.length),a=0,n=e.length;n>a;a++)e[a]=t.charCodeAt(a);return e},a.buf2string=function(t,e){var a,r,i,s,h=e||t.length,o=new Array(2*h);for(r=0,a=0;h>a;)if(i=t[a++],128>i)o[r++]=i;else if(s=l[i],s>4)o[r++]=65533,a+=s-1;else{for(i&=2===s?31:3===s?15:7;s>1&&h>a;)i=i<<6|63&t[a++],s--;s>1?o[r++]=65533:65536>i?o[r++]=i:(i-=65536,o[r++]=55296|i>>10&1023,o[r++]=56320|1023&i)}return n(o,r)},a.utf8border=function(t,e){var a;for(e=e||t.length,e>t.length&&(e=t.length),a=e-1;a>=0&&128===(192&t[a]);)a--;return 0>a?e:0===a?e:a+l[t[a]]>e?a:e}},{"./common":1}],3:[function(t,e,a){"use strict";function n(t,e,a,n){for(var r=65535&t|0,i=t>>>16&65535|0,s=0;0!==a;){s=a>2e3?2e3:a,a-=s;do r=r+e[n++]|0,i=i+r|0;while(--s);r%=65521,i%=65521}return r|i<<16|0}e.exports=n},{}],4:[function(t,e,a){"use strict";function n(){for(var t,e=[],a=0;256>a;a++){t=a;for(var n=0;8>n;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}function r(t,e,a,n){var r=i,s=n+a;t=-1^t;for(var h=n;s>h;h++)t=t>>>8^r[255&(t^e[h])];return-1^t}var i=n();e.exports=r},{}],5:[function(t,e,a){"use strict";function n(t,e){return t.msg=I[e],e}function r(t){return(t<<1)-(t>4?9:0)}function i(t){for(var e=t.length;--e>=0;)t[e]=0}function s(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(S.arraySet(t.output,e.pending_buf,e.pending_out,a,t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))}function h(t,e){j._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,s(t.strm)}function l(t,e){t.pending_buf[t.pending++]=e}function o(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function _(t,e,a,n){var r=t.avail_in;return r>n&&(r=n),0===r?0:(t.avail_in-=r,S.arraySet(e,t.input,t.next_in,r,a),1===t.state.wrap?t.adler=E(t.adler,e,r,a):2===t.state.wrap&&(t.adler=U(t.adler,e,r,a)),t.next_in+=r,t.total_in+=r,r)}function d(t,e){var a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,h=t.nice_match,l=t.strstart>t.w_size-ot?t.strstart-(t.w_size-ot):0,o=t.window,_=t.w_mask,d=t.prev,u=t.strstart+lt,f=o[i+s-1],c=o[i+s];t.prev_length>=t.good_match&&(r>>=2),h>t.lookahead&&(h=t.lookahead);do if(a=e,o[a+s]===c&&o[a+s-1]===f&&o[a]===o[i]&&o[++a]===o[i+1]){i+=2,a++;do;while(o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&u>i);if(n=lt-(u-i),i=u-lt,n>s){if(t.match_start=e,s=n,n>=h)break;f=o[i+s-1],c=o[i+s]}}while((e=d[e&_])>l&&0!==--r);return s<=t.lookahead?s:t.lookahead}function u(t){var e,a,n,r,i,s=t.w_size;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=s+(s-ot)){S.arraySet(t.window,t.window,s,s,0),t.match_start-=s,t.strstart-=s,t.block_start-=s,a=t.hash_size,e=a;do n=t.head[--e],t.head[e]=n>=s?n-s:0;while(--a);a=s,e=a;do n=t.prev[--e],t.prev[e]=n>=s?n-s:0;while(--a);r+=s}if(0===t.strm.avail_in)break;if(a=_(t.strm,t.window,t.strstart+t.lookahead,r),t.lookahead+=a,t.lookahead+t.insert>=ht)for(i=t.strstart-t.insert,t.ins_h=t.window[i],t.ins_h=(t.ins_h<<t.hash_shift^t.window[i+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[i+ht-1])&t.hash_mask,t.prev[i&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=i,i++,t.insert--,!(t.lookahead+t.insert<ht)););}while(t.lookahead<ot&&0!==t.strm.avail_in)}function f(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(u(t),0===t.lookahead&&e===D)return bt;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,h(t,!1),0===t.strm.avail_out))return bt;if(t.strstart-t.block_start>=t.w_size-ot&&(h(t,!1),0===t.strm.avail_out))return bt}return t.insert=0,e===T?(h(t,!0),0===t.strm.avail_out?wt:yt):t.strstart>t.block_start&&(h(t,!1),0===t.strm.avail_out)?bt:bt}function c(t,e){for(var a,n;;){if(t.lookahead<ot){if(u(t),t.lookahead<ot&&e===D)return bt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ot&&(t.match_length=d(t,a)),t.match_length>=ht)if(n=j._tr_tally(t,t.strstart-t.match_start,t.match_length-ht),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=ht){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else n=j._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(h(t,!1),0===t.strm.avail_out))return bt}return t.insert=t.strstart<ht-1?t.strstart:ht-1,e===T?(h(t,!0),0===t.strm.avail_out?wt:yt):t.last_lit&&(h(t,!1),0===t.strm.avail_out)?bt:vt}function g(t,e){for(var a,n,r;;){if(t.lookahead<ot){if(u(t),t.lookahead<ot&&e===D)return bt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=ht-1,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ot&&(t.match_length=d(t,a),t.match_length<=5&&(t.strategy===P||t.match_length===ht&&t.strstart-t.match_start>4096)&&(t.match_length=ht-1)),t.prev_length>=ht&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-ht,n=j._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-ht),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=r&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=ht-1,t.strstart++,n&&(h(t,!1),0===t.strm.avail_out))return bt}else if(t.match_available){if(n=j._tr_tally(t,0,t.window[t.strstart-1]),n&&h(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return bt}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=j._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<ht-1?t.strstart:ht-1,e===T?(h(t,!0),0===t.strm.avail_out?wt:yt):t.last_lit&&(h(t,!1),0===t.strm.avail_out)?bt:vt}function p(t,e){for(var a,n,r,i,s=t.window;;){if(t.lookahead<=lt){if(u(t),t.lookahead<=lt&&e===D)return bt;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=ht&&t.strstart>0&&(r=t.strstart-1,n=s[r],n===s[++r]&&n===s[++r]&&n===s[++r])){i=t.strstart+lt;do;while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&i>r);t.match_length=lt-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=ht?(a=j._tr_tally(t,1,t.match_length-ht),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=j._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(h(t,!1),0===t.strm.avail_out))return bt}return t.insert=0,e===T?(h(t,!0),0===t.strm.avail_out?wt:yt):t.last_lit&&(h(t,!1),0===t.strm.avail_out)?bt:vt}function m(t,e){for(var a;;){if(0===t.lookahead&&(u(t),0===t.lookahead)){if(e===D)return bt;break}if(t.match_length=0,a=j._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(h(t,!1),0===t.strm.avail_out))return bt}return t.insert=0,e===T?(h(t,!0),0===t.strm.avail_out?wt:yt):t.last_lit&&(h(t,!1),0===t.strm.avail_out)?bt:vt}function b(t){t.window_size=2*t.w_size,i(t.head),t.max_lazy_match=C[t.level].max_lazy,t.good_match=C[t.level].good_length,t.nice_match=C[t.level].nice_length,t.max_chain_length=C[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=ht-1,t.match_available=0,t.ins_h=0}function v(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=X,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new S.Buf16(2*it),this.dyn_dtree=new S.Buf16(2*(2*nt+1)),this.bl_tree=new S.Buf16(2*(2*rt+1)),i(this.dyn_ltree),i(this.dyn_dtree),i(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new S.Buf16(st+1),this.heap=new S.Buf16(2*at+1),i(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new S.Buf16(2*at+1),i(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function w(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=W,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?dt:pt,t.adler=2===e.wrap?0:1,e.last_flush=D,j._tr_init(e),N):n(t,H)}function y(t){var e=w(t);return e===N&&b(t.state),e}function z(t,e){return t&&t.state?2!==t.state.wrap?H:(t.state.gzhead=e,N):H}function k(t,e,a,r,i,s){if(!t)return H;var h=1;if(e===M&&(e=6),0>r?(h=0,r=-r):r>15&&(h=2,r-=16),1>i||i>Y||a!==X||8>r||r>15||0>e||e>9||0>s||s>Q)return n(t,H);8===r&&(r=9);var l=new v;return t.state=l,l.strm=t,l.wrap=h,l.gzhead=null,l.w_bits=r,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=i+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+ht-1)/ht),l.window=new S.Buf8(2*l.w_size),l.head=new S.Buf16(l.hash_size),l.prev=new S.Buf16(l.w_size),l.lit_bufsize=1<<i+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new S.Buf8(l.pending_buf_size),l.d_buf=l.lit_bufsize>>1,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,y(t)}function x(t,e){return k(t,e,X,Z,$,V)}function B(t,e){var a,h,_,d;if(!t||!t.state||e>L||0>e)return t?n(t,H):H;if(h=t.state,!t.output||!t.input&&0!==t.avail_in||h.status===mt&&e!==T)return n(t,0===t.avail_out?K:H);if(h.strm=t,a=h.last_flush,h.last_flush=e,h.status===dt)if(2===h.wrap)t.adler=0,l(h,31),l(h,139),l(h,8),h.gzhead?(l(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),l(h,255&h.gzhead.time),l(h,h.gzhead.time>>8&255),l(h,h.gzhead.time>>16&255),l(h,h.gzhead.time>>24&255),l(h,9===h.level?2:h.strategy>=G||h.level<2?4:0),l(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(l(h,255&h.gzhead.extra.length),l(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(t.adler=U(t.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=ut):(l(h,0),l(h,0),l(h,0),l(h,0),l(h,0),l(h,9===h.level?2:h.strategy>=G||h.level<2?4:0),l(h,zt),h.status=pt);else{var u=X+(h.w_bits-8<<4)<<8,f=-1;f=h.strategy>=G||h.level<2?0:h.level<6?1:6===h.level?2:3,u|=f<<6,0!==h.strstart&&(u|=_t),u+=31-u%31,h.status=pt,o(h,u),0!==h.strstart&&(o(h,t.adler>>>16),o(h,65535&t.adler)),t.adler=1}if(h.status===ut)if(h.gzhead.extra){for(_=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>_&&(t.adler=U(t.adler,h.pending_buf,h.pending-_,_)),s(t),_=h.pending,h.pending!==h.pending_buf_size));)l(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>_&&(t.adler=U(t.adler,h.pending_buf,h.pending-_,_)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=ft)}else h.status=ft;if(h.status===ft)if(h.gzhead.name){_=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>_&&(t.adler=U(t.adler,h.pending_buf,h.pending-_,_)),s(t),_=h.pending,h.pending===h.pending_buf_size)){d=1;break}d=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,l(h,d)}while(0!==d);h.gzhead.hcrc&&h.pending>_&&(t.adler=U(t.adler,h.pending_buf,h.pending-_,_)),0===d&&(h.gzindex=0,h.status=ct)}else h.status=ct;if(h.status===ct)if(h.gzhead.comment){_=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>_&&(t.adler=U(t.adler,h.pending_buf,h.pending-_,_)),s(t),_=h.pending,h.pending===h.pending_buf_size)){d=1;break}d=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,l(h,d)}while(0!==d);h.gzhead.hcrc&&h.pending>_&&(t.adler=U(t.adler,h.pending_buf,h.pending-_,_)),0===d&&(h.status=gt)}else h.status=gt;if(h.status===gt&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&s(t),h.pending+2<=h.pending_buf_size&&(l(h,255&t.adler),l(h,t.adler>>8&255),t.adler=0,h.status=pt)):h.status=pt),0!==h.pending){if(s(t),0===t.avail_out)return h.last_flush=-1,N}else if(0===t.avail_in&&r(e)<=r(a)&&e!==T)return n(t,K);if(h.status===mt&&0!==t.avail_in)return n(t,K);if(0!==t.avail_in||0!==h.lookahead||e!==D&&h.status!==mt){var c=h.strategy===G?m(h,e):h.strategy===J?p(h,e):C[h.level].func(h,e);if((c===wt||c===yt)&&(h.status=mt),c===bt||c===wt)return 0===t.avail_out&&(h.last_flush=-1),N;if(c===vt&&(e===O?j._tr_align(h):e!==L&&(j._tr_stored_block(h,0,0,!1),e===q&&(i(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),s(t),0===t.avail_out))return h.last_flush=-1,N}return e!==T?N:h.wrap<=0?R:(2===h.wrap?(l(h,255&t.adler),l(h,t.adler>>8&255),l(h,t.adler>>16&255),l(h,t.adler>>24&255),l(h,255&t.total_in),l(h,t.total_in>>8&255),l(h,t.total_in>>16&255),l(h,t.total_in>>24&255)):(o(h,t.adler>>>16),o(h,65535&t.adler)),s(t),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?N:R)}function A(t){var e;return t&&t.state?(e=t.state.status,e!==dt&&e!==ut&&e!==ft&&e!==ct&&e!==gt&&e!==pt&&e!==mt?n(t,H):(t.state=null,e===pt?n(t,F):N)):H}var C,S=t("../utils/common"),j=t("./trees"),E=t("./adler32"),U=t("./crc32"),I=t("./messages"),D=0,O=1,q=3,T=4,L=5,N=0,R=1,H=-2,F=-3,K=-5,M=-1,P=1,G=2,J=3,Q=4,V=0,W=2,X=8,Y=9,Z=15,$=8,tt=29,et=256,at=et+1+tt,nt=30,rt=19,it=2*at+1,st=15,ht=3,lt=258,ot=lt+ht+1,_t=32,dt=42,ut=69,ft=73,ct=91,gt=103,pt=113,mt=666,bt=1,vt=2,wt=3,yt=4,zt=3,kt=function(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r};C=[new kt(0,0,0,0,f),new kt(4,4,8,4,c),new kt(4,5,16,8,c),new kt(4,6,32,32,c),new kt(4,4,16,16,g),new kt(8,16,32,32,g),new kt(8,16,128,128,g),new kt(8,32,128,256,g),new kt(32,128,258,1024,g),new kt(32,258,258,4096,g)],a.deflateInit=x,a.deflateInit2=k,a.deflateReset=y,a.deflateResetKeep=w,a.deflateSetHeader=z,a.deflate=B,a.deflateEnd=A,a.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":4,"./messages":6,"./trees":7}],6:[function(t,e,a){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],7:[function(t,e,a){"use strict";function n(t){for(var e=t.length;--e>=0;)t[e]=0}function r(t){return 256>t?st[t]:st[256+(t>>>7)]}function i(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function s(t,e,a){t.bi_valid>Q-a?(t.bi_buf|=e<<t.bi_valid&65535,i(t,t.bi_buf),t.bi_buf=e>>Q-t.bi_valid,t.bi_valid+=a-Q):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)}function h(t,e,a){s(t,a[2*e],a[2*e+1])}function l(t,e){var a=0;do a|=1&t,t>>>=1,a<<=1;while(--e>0);return a>>>1}function o(t){16===t.bi_valid?(i(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}function _(t,e){var a,n,r,i,s,h,l=e.dyn_tree,o=e.max_code,_=e.stat_desc.static_tree,d=e.stat_desc.has_stree,u=e.stat_desc.extra_bits,f=e.stat_desc.extra_base,c=e.stat_desc.max_length,g=0;for(i=0;J>=i;i++)t.bl_count[i]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;G>a;a++)n=t.heap[a],i=l[2*l[2*n+1]+1]+1,i>c&&(i=c,g++),l[2*n+1]=i,n>o||(t.bl_count[i]++,s=0,n>=f&&(s=u[n-f]),h=l[2*n],t.opt_len+=h*(i+s),d&&(t.static_len+=h*(_[2*n+1]+s)));if(0!==g){do{for(i=c-1;0===t.bl_count[i];)i--;t.bl_count[i]--,t.bl_count[i+1]+=2,t.bl_count[c]--,g-=2}while(g>0);for(i=c;0!==i;i--)for(n=t.bl_count[i];0!==n;)r=t.heap[--a],r>o||(l[2*r+1]!==i&&(t.opt_len+=(i-l[2*r+1])*l[2*r],l[2*r+1]=i),n--)}}function d(t,e,a){var n,r,i=new Array(J+1),s=0;for(n=1;J>=n;n++)i[n]=s=s+a[n-1]<<1;for(r=0;e>=r;r++){var h=t[2*r+1];0!==h&&(t[2*r]=l(i[h]++,h))}}function u(){var t,e,a,n,r,i=new Array(J+1);for(a=0,n=0;H-1>n;n++)for(lt[n]=a,t=0;t<1<<$[n];t++)ht[a++]=n;for(ht[a-1]=n,r=0,n=0;16>n;n++)for(ot[n]=r,t=0;t<1<<tt[n];t++)st[r++]=n;for(r>>=7;M>n;n++)for(ot[n]=r<<7,t=0;t<1<<tt[n]-7;t++)st[256+r++]=n;for(e=0;J>=e;e++)i[e]=0;for(t=0;143>=t;)rt[2*t+1]=8,t++,i[8]++;for(;255>=t;)rt[2*t+1]=9,t++,i[9]++;for(;279>=t;)rt[2*t+1]=7,t++,i[7]++;for(;287>=t;)rt[2*t+1]=8,t++,i[8]++;for(d(rt,K+1,i),t=0;M>t;t++)it[2*t+1]=5,it[2*t]=l(t,5);_t=new ft(rt,$,F+1,K,J),dt=new ft(it,tt,0,M,J),ut=new ft(new Array(0),et,0,P,V)}function f(t){var e;for(e=0;K>e;e++)t.dyn_ltree[2*e]=0;for(e=0;M>e;e++)t.dyn_dtree[2*e]=0;for(e=0;P>e;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*W]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function c(t){t.bi_valid>8?i(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function g(t,e,a,n){c(t),n&&(i(t,a),i(t,~a)),E.arraySet(t.pending_buf,t.window,e,a,t.pending),t.pending+=a}function p(t,e,a,n){var r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]}function m(t,e,a){for(var n=t.heap[a],r=a<<1;r<=t.heap_len&&(r<t.heap_len&&p(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!p(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n}function b(t,e,a){var n,i,l,o,_=0;if(0!==t.last_lit)do n=t.pending_buf[t.d_buf+2*_]<<8|t.pending_buf[t.d_buf+2*_+1],i=t.pending_buf[t.l_buf+_],_++,0===n?h(t,i,e):(l=ht[i],h(t,l+F+1,e),o=$[l],0!==o&&(i-=lt[l],s(t,i,o)),n--,l=r(n),h(t,l,a),o=tt[l],0!==o&&(n-=ot[l],s(t,n,o)));while(_<t.last_lit);h(t,W,e)}function v(t,e){var a,n,r,i=e.dyn_tree,s=e.stat_desc.static_tree,h=e.stat_desc.has_stree,l=e.stat_desc.elems,o=-1;for(t.heap_len=0,t.heap_max=G,a=0;l>a;a++)0!==i[2*a]?(t.heap[++t.heap_len]=o=a,t.depth[a]=0):i[2*a+1]=0;for(;t.heap_len<2;)r=t.heap[++t.heap_len]=2>o?++o:0,i[2*r]=1,t.depth[r]=0,t.opt_len--,h&&(t.static_len-=s[2*r+1]);for(e.max_code=o,a=t.heap_len>>1;a>=1;a--)m(t,i,a);r=l;do a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],m(t,i,1),n=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=n,i[2*r]=i[2*a]+i[2*n],t.depth[r]=(t.depth[a]>=t.depth[n]?t.depth[a]:t.depth[n])+1,i[2*a+1]=i[2*n+1]=r,t.heap[1]=r++,m(t,i,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],_(t,e),d(i,o,t.bl_count)}function w(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,o=4;for(0===s&&(l=138,o=3),e[2*(a+1)+1]=65535,n=0;a>=n;n++)r=s,s=e[2*(n+1)+1],++h<l&&r===s||(o>h?t.bl_tree[2*r]+=h:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[2*X]++):10>=h?t.bl_tree[2*Y]++:t.bl_tree[2*Z]++,h=0,i=r,0===s?(l=138,o=3):r===s?(l=6,o=3):(l=7,o=4))}function y(t,e,a){var n,r,i=-1,l=e[1],o=0,_=7,d=4;for(0===l&&(_=138,d=3),n=0;a>=n;n++)if(r=l,l=e[2*(n+1)+1],!(++o<_&&r===l)){if(d>o){do h(t,r,t.bl_tree);while(0!==--o)}else 0!==r?(r!==i&&(h(t,r,t.bl_tree),o--),h(t,X,t.bl_tree),s(t,o-3,2)):10>=o?(h(t,Y,t.bl_tree),s(t,o-3,3)):(h(t,Z,t.bl_tree),s(t,o-11,7));o=0,i=r,0===l?(_=138,d=3):r===l?(_=6,d=3):(_=7,d=4)}}function z(t){var e;for(w(t,t.dyn_ltree,t.l_desc.max_code),w(t,t.dyn_dtree,t.d_desc.max_code),v(t,t.bl_desc),e=P-1;e>=3&&0===t.bl_tree[2*at[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}function k(t,e,a,n){var r;for(s(t,e-257,5),s(t,a-1,5),s(t,n-4,4),r=0;n>r;r++)s(t,t.bl_tree[2*at[r]+1],3);y(t,t.dyn_ltree,e-1),y(t,t.dyn_dtree,a-1)}function x(t){var e,a=4093624447;for(e=0;31>=e;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return I;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return D;for(e=32;F>e;e++)if(0!==t.dyn_ltree[2*e])return D;return I}function B(t){gt||(u(),gt=!0),t.l_desc=new ct(t.dyn_ltree,_t),t.d_desc=new ct(t.dyn_dtree,dt),t.bl_desc=new ct(t.bl_tree,ut),t.bi_buf=0,t.bi_valid=0,f(t)}function A(t,e,a,n){s(t,(q<<1)+(n?1:0),3),g(t,e,a,!0)}function C(t){s(t,T<<1,3),h(t,W,rt),o(t)}function S(t,e,a,n){var r,i,h=0;t.level>0?(t.strm.data_type===O&&(t.strm.data_type=x(t)),v(t,t.l_desc),v(t,t.d_desc),h=z(t),r=t.opt_len+3+7>>>3,i=t.static_len+3+7>>>3,r>=i&&(r=i)):r=i=a+5,r>=a+4&&-1!==e?A(t,e,a,n):t.strategy===U||i===r?(s(t,(T<<1)+(n?1:0),3),b(t,rt,it)):(s(t,(L<<1)+(n?1:0),3),k(t,t.l_desc.max_code+1,t.d_desc.max_code+1,h+1),b(t,t.dyn_ltree,t.dyn_dtree)),f(t),n&&c(t)}function j(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(ht[a]+F+1)]++,t.dyn_dtree[2*r(e)]++),t.last_lit===t.lit_bufsize-1}var E=t("../utils/common"),U=4,I=0,D=1,O=2,q=0,T=1,L=2,N=3,R=258,H=29,F=256,K=F+1+H,M=30,P=19,G=2*K+1,J=15,Q=16,V=7,W=256,X=16,Y=17,Z=18,$=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],tt=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],et=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],at=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],nt=512,rt=new Array(2*(K+2));n(rt);var it=new Array(2*M);n(it);var st=new Array(nt);n(st);var ht=new Array(R-N+1);n(ht);var lt=new Array(H);n(lt);var ot=new Array(M);n(ot);var _t,dt,ut,ft=function(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t&&t.length},ct=function(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e},gt=!1;a._tr_init=B,a._tr_stored_block=A,a._tr_flush_block=S,a._tr_tally=j,a._tr_align=C},{"../utils/common":1}],8:[function(t,e,a){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}e.exports=n},{}],"/lib/deflate.js":[function(t,e,a){"use strict";function n(t,e){var a=new w(e);if(a.push(t,!0),a.err)throw a.msg;return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}function i(t,e){return e=e||{},e.gzip=!0,n(t,e)}var s=t("./zlib/deflate.js"),h=t("./utils/common"),l=t("./utils/strings"),o=t("./zlib/messages"),_=t("./zlib/zstream"),d=Object.prototype.toString,u=0,f=4,c=0,g=1,p=2,m=-1,b=0,v=8,w=function(t){this.options=h.assign({level:m,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:b,to:""},t||{});var e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new _,this.strm.avail_out=0;var a=s.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==c)throw new Error(o[a]);e.header&&s.deflateSetHeader(this.strm,e.header)};w.prototype.push=function(t,e){var a,n,r=this.strm,i=this.options.chunkSize;if(this.ended)return!1;n=e===~~e?e:e===!0?f:u,"string"==typeof t?r.input=l.string2buf(t):"[object ArrayBuffer]"===d.call(t)?r.input=new Uint8Array(t):r.input=t,r.next_in=0,r.avail_in=r.input.length;do{if(0===r.avail_out&&(r.output=new h.Buf8(i),r.next_out=0,r.avail_out=i),a=s.deflate(r,n),a!==g&&a!==c)return this.onEnd(a),this.ended=!0,!1;(0===r.avail_out||0===r.avail_in&&(n===f||n===p))&&this.onData("string"===this.options.to?l.buf2binstring(h.shrinkBuf(r.output,r.next_out)):h.shrinkBuf(r.output,r.next_out))}while((r.avail_in>0||0===r.avail_out)&&a!==g);return n===f?(a=s.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===c):n===p?(this.onEnd(c),r.avail_out=0,!0):!0},w.prototype.onData=function(t){this.chunks.push(t)},w.prototype.onEnd=function(t){t===c&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Deflate=w,a.deflate=n,a.deflateRaw=r,a.gzip=i,a.string2buf=l.string2buf},{"./utils/common":1,"./utils/strings":2,"./zlib/deflate.js":5,"./zlib/messages":6,"./zlib/zstream":8}]},{},[])("/lib/deflate.js")});
/*!
 * Based on:
 * https://github.com/gilmoreorless/css-shorthand-properties
 * MIT Licensed: http://gilmoreorless.mit-license.org/
 */
void function () {
    /**
     * Data collated from multiple W3C specs: http://www.w3.org/Style/CSS/current-work
     */
    var shorthands = this.shorthandProperties = {
		
        // CSS 2.1: http://www.w3.org/TR/CSS2/propidx.html
        'list-style':          ['-type', '-position', '-image'],
        'margin':              ['-top', '-right', '-bottom', '-left'],
        'outline':             ['-width', '-style', '-color'],
        'padding':             ['-top', '-right', '-bottom', '-left'],

        // CSS Backgrounds and Borders Module Level 3: http://www.w3.org/TR/css3-background/
        'background':          ['-image', '-position', '-size', '-repeat', '-origin', '-clip', '-attachment', '-color'],
		'background-repeat':   ['-x','-y'],
		'background-position': ['-x','-y'],
        'border':              ['-width', '-style', '-color'],
        'border-color':        ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
        'border-style':        ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
        'border-width':        ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
        'border-top':          ['-width', '-style', '-color'],
        'border-right':        ['-width', '-style', '-color'],
        'border-bottom':       ['-width', '-style', '-color'],
        'border-left':         ['-width', '-style', '-color'],
        'border-radius':       ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
        'border-image':        ['-source', '-slice', '-width', '-outset', '-repeat'],

        // CSS Fonts Module Level 3: http://www.w3.org/TR/css3-fonts/
        'font':                ['-style', '-variant', '-weight', '-stretch', '-size', 'line-height', '-family'],
        'font-variant':        ['-ligatures', '-alternates', '-caps', '-numeric', '-east-asian'],

        // CSS Masking Module Level 1: http://www.w3.org/TR/css-masking/
        'mask':                ['-image', '-mode', '-position', '-size', '-repeat', '-origin', '-clip'],
        'mask-border':         ['-source', '-slice', '-width', '-outset', '-repeat', '-mode'],

        // CSS Multi-column Layout Module: http://www.w3.org/TR/css3-multicol/
        'columns':             ['column-width', 'column-count'],
        'column-rule':         ['-width', '-style', '-color'],

        // CSS Speech Module: http://www.w3.org/TR/css3-speech/
        'cue':                 ['-before', '-after'],
        'pause':               ['-before', '-after'],
        'rest':                ['-before', '-after'],

        // CSS Text Decoration Module Level 3: http://www.w3.org/TR/css-text-decor-3/
        'text-decoration':     ['-line', '-style', '-color'],
        'text-emphasis':       ['-style', '-color'],

        // CSS Animations (WD): http://www.w3.org/TR/css3-animations
        'animation':           ['-name', '-duration', '-timing-function', '-delay', '-iteration-count', '-direction', '-fill-mode', '-play-state'],

        // CSS Transitions (WD): http://www.w3.org/TR/css3-transitions/
        'transition':          ['-property', '-duration', '-timing-function', '-delay'],

        // CSS Flexible Box Layout Module Level 1 (WD): http://www.w3.org/TR/css3-flexbox/
        'flex':                ['-grow', '-shrink', '-basis'],
		
		// CSS Grid: https://drafts.csswg.org/css-grid/#grid-shorthand
		'grid':                ['-template', '-auto-flow', '-auto-rows','-auto-columns'],
		'grid-template':       ['-rows', '-columns', '-areas'],
		
		// Others:
		'overflow':            ['-x','-y','-style'], // https://drafts.csswg.org/css-overflow-3/
		
    };
	
	var expandCache = Object.create(null);
	var unexpandCache = Object.create(null);

    /**
     * Expand a shorthand property into an array of longhand properties which are set by it
     * @param  {string} property CSS property name
     * @return {array}           List of longhand properties, or an empty array if it's not a shorthand
     */
    this.expand = function (property) {
		
		var result = expandCache[property];
		if(result) { return result; }
		
		var prefixData = property.match(/^(-[a-zA-Z]+-)?(.*)$/);
		var prefix = prefixData[1]||'', prefixFreeProperty = prefixData[2]||'';
        if (!shorthands.hasOwnProperty(prefixFreeProperty)) {
            return [];
        }
		
		result = [];
        shorthands[prefixFreeProperty].forEach((p) => {
            var longhand = p[0] === '-' ? property + p : prefix + p;
            result.push(longhand);
			result.push.apply(result, this.expand(longhand));
        });
		
		return expandCache[property] = result;
		
    };
	
	/**
	 * Expand a longhand property into an array of shorthand which may set the value
     * @param  {string} property CSS property name
     * @return {array}           List of shorthand properties, or the original property if it's not a shorthand
	 */
	this.unexpand = function unexpand(property) {
		
		var result = unexpandCache[property];
		if(result) { return result; }
		
		var prefixData = property.match(/^(-[a-zA-Z]+-)?(.*)$/);
		var prefix = prefixData[1]||'', prefixFreeProperty = prefixData[2]||'';
		
		result = [];
		for(var shorthand in shorthands) {
			if(this.expand(shorthand).indexOf(prefixFreeProperty) >= 0) {
				result.push(prefix+shorthand);
				result.push.apply(result,this.unexpand(prefix+shorthand));
			}
		}
		
		return unexpandCache[property] = result;
		
	}
	
}.call(window.CSSShorthands={});


//
// Prepare the whole instrumentation world
//
void function() {
	
	/*	String hash function
	/*	credits goes to http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash- */
	const hashCodeOf = (str) => {
		var hash = 5381; var char = 0;
		for (var i = 0; i < str.length; i++) {
			char = str.charCodeAt(i);
			hash = ((hash << 5) + hash) + char;
		}
		return hash;
	}
	
	var ua = navigator.userAgent;
	var uaName = ua.indexOf('Edge')>=0 ? 'EDGE' :ua.indexOf('Chrome')>=0 ? 'CHROME' : 'FIREFOX';
	window.INSTRUMENTATION_RESULTS = {
		UA: uaName,
		UASTRING: ua,
		UASTRING_HASH: hashCodeOf(ua),
		URL: location.href,
		TIMESTAMP: Date.now(),
		css: {/*  see CSSUsageResults  */},
		dom: {},
		scripts: {/* "bootstrap.js": 1 */},
	};
	window.INSTRUMENTATION_RESULTS_TSV = [];
	
	/* make the script work in the context of a webview */
	try {
		var console = window.console || (window.console={log:function(){},warn:function(){},error:function(){}});
		console.unsafeLog = console.log;
		console.log = function() {
			try {
				this.unsafeLog.apply(this,arguments);
			} catch(ex) {
				// ignore
			}
		};
	} catch (ex) {
		// we tried...
	}
	
	/* now, let's help browser to optimize this simple function */
	for(var i=100; i--;) {
		if(window.pako) { pako.string2buf(" "); }
	}
	
}();

window.onCSSUsageResults = function onCSSUsageResults(CSSUsageResults) {

	// Collect the results (css)
	INSTRUMENTATION_RESULTS.css = CSSUsageResults;
	
	/*
	// Collect the results (scripts)
	INSTRUMENTATION_RESULTS.scripts = {};
	for(var i = document.scripts.length; i--;) { 
		var s = document.scripts[i]; if(s.src) {
			// get and simplify the script url
			var surl = s.src.replace(/^(.*)[/]([^/?#]+)[/]?([?#].*)?$/gi,'$2');
			surl = surl.replace(/([.]min)?([.]js)/gi,'');
			surl = surl.substr(0, 20);
			// save it
			INSTRUMENTATION_RESULTS.scripts[surl] = 1;
		}
	}
	*/
	
	// Convert it to a more efficient format
	INSTRUMENTATION_RESULTS_TSV = convertToTSV(INSTRUMENTATION_RESULTS);
	
	// Remove tabs and new lines from the data
	for(var i = INSTRUMENTATION_RESULTS_TSV.length; i--;) {
		var row = INSTRUMENTATION_RESULTS_TSV[i];
		for(var j = row.length; j--;) {
			row[j] = (''+row[j]).replace(/(\s|\r|\n)+/g, ' ');
		}
	}
	
	function uint6ToB64(nUint6) {
		return (
			nUint6 < 26 ? nUint6 + 65
			: nUint6 < 52 ? nUint6 + 71
			: nUint6 < 62 ? nUint6 - 4
			: nUint6 === 62 ? 43
			: nUint6 === 63 ? 47
			: 65
		);
	}

	function base64EncArr(aBytes) {

	  var nMod3 = 2, sB64Enc = "";

	  for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
		nMod3 = nIdx % 3;
		//if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) { sB64Enc += "\r\n"; }
		nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
		if (nMod3 === 2 || aBytes.length - nIdx === 1) {
		  sB64Enc += String.fromCharCode(uint6ToB64(nUint24 >>> 18 & 63), uint6ToB64(nUint24 >>> 12 & 63), uint6ToB64(nUint24 >>> 6 & 63), uint6ToB64(nUint24 & 63));
		  nUint24 = 0;
		}
	  }

	  return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');

	}
	
	// Convert into one signle tsv file
	var tsvString = INSTRUMENTATION_RESULTS_TSV.map((row) => (row.join('\t'))).join('\n');
	if(window.debugCSSUsage) console.log(tsvString);
	
	// Compress the data if needed
	var needsCompression = INSTRUMENTATION_RESULTS.UA=="EDGE";
	if(needsCompression) { tsvString = "\r\n"+base64EncArr(pako.deflate(tsvString))+"\r\n"; }
	
	// Add it to the document dom
	var output = document.createElement('script');
	output.id = "css-usage-tsv-results";
	output.textContent = tsvString;
    output.type = 'text/plain';
    document.querySelector('head').appendChild(output);

	/** convert the instrumentation results to a spreadsheet for analysis */
	function convertToTSV(INSTRUMENTATION_RESULTS) {
		
		var VALUE_COLUMN = 4;
		var finishedRows = [];
		var currentRowTemplate = [
			INSTRUMENTATION_RESULTS.UA,
			INSTRUMENTATION_RESULTS.UASTRING_HASH,
			INSTRUMENTATION_RESULTS.URL,
			INSTRUMENTATION_RESULTS.TIMESTAMP,
			0
		];
		
		currentRowTemplate.push('ua');
		convertToTSV({identifier: INSTRUMENTATION_RESULTS.UASTRING});
		currentRowTemplate.pop();
		
		currentRowTemplate.push('css');
		convertToTSV(INSTRUMENTATION_RESULTS['css']);
		currentRowTemplate.pop();
		
		currentRowTemplate.push('dom');
		convertToTSV(INSTRUMENTATION_RESULTS['dom']);
		currentRowTemplate.pop();
		
		//currentRowTemplate.push('scripts');
		//convertToTSV(INSTRUMENTATION_RESULTS['scripts']);
		//currentRowTemplate.pop();
		
		var l = finishedRows[0].length;
		finishedRows.sort((a,b) => {
			for(var i = VALUE_COLUMN+1; i<l; i++) {
				if(a[i]<b[i]) return -1;
				if(a[i]>b[i]) return +1;
			}
			return 0;
		});
		
		return finishedRows;
		
		/** helper function doing the actual conversion */
		function convertToTSV(object) {
			if(object==null || object==undefined || typeof object == 'number' || typeof object == 'string') {
				finishedRows.push(new Row(currentRowTemplate, ''+object));
			} else {
				for(var key in object) {
					if({}.hasOwnProperty.call(object,key)) {
						currentRowTemplate.push(key);
						convertToTSV(object[key]);
						currentRowTemplate.pop();
					}
				}
			}
		}
		
		/** constructor for a row of our table */
		function Row(currentRowTemplate, value) {
			
			// Initialize an empty row with enough columns
			var row = [
				/*UANAME:     edge                            */'',
				/*UASTRING:   mozilla/5.0 (...)               */'',
				/*URL:        http://.../...                  */'',
				/*TIMESTAMP:  1445622257303                   */'',
				/*VALUE:      0|1|...                         */'',
				/*DATATYPE:   css|dom|...                     */'',
				/*SUBTYPE:    props|types|api|...             */'',
				/*NAME:       font-size|querySelector|...     */'',
				/*CONTEXT:    count|values|...                */'',
				/*SUBCONTEXT: px|em|...                       */'',
				/*...                                         */'',
				/*...                                         */'',
			];
			
			// Copy the column values from the template
			for(var i = currentRowTemplate.length; i--;) {
				row[i] = currentRowTemplate[i];
			}
			
			// Add the value to the row
			row[VALUE_COLUMN] = value;
			
			return row;
		}

	}

};
void function() { try {
	
	var _ = window.CSSUsageLodash;
	var map = _.map.bind(_);
	var mapInline = _.mapInline ? _.mapInline : map;
	var reduce = _.reduce.bind(_);
	var filter = _.filter.bind(_);
	
	var browserIsEdge = navigator.userAgent.indexOf('Edge')>=0;
	var browserIsFirefox = navigator.userAgent.indexOf('Firefox')>=0;
	
	//
	// Guards execution against invalid conditions
	//
	void function() {
		
		// Don't run in subframes for now
		if (top.location.href !== location.href) throw new Error("CSSUsage: the script doesn't run in frames for now");
		
		// Don't run if already ran
		if (window.CSSUsage) throw new Error("CSSUsage: second execution attempted; only one run can be executed; if you specified parameters, check the right ones were chosen");
		
		// Don't run if we don't have lodash
		if (!window.CSSUsageLodash) throw new Error("CSSUsage: missing CSSUsageLodash dependency");
		
		// Do not allow buggy trim() to bother usage
		if((''+String.prototype.trim).indexOf("[native code]") == -1) {
			console.warn('Replaced custom trim function with something known to work. Might break website.');
			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, '');
			}
		}
		
	}();

	//
	// Prepare our global namespace
	//
	void function() {
		window.CSSUsage = {};
		window.CSSUsageResults = {
			
			// this will contain the usage stats of various at-rules and rules
			types: [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, ], /* 
			types ~= {
				"unknown":0,   //0
				"style":0,     //1
				"charset": 0,  //2
				"import":0,    //3
				"media":0,     //4
				"font-face":0, //5
				"page":0,      //6
				"keyframes":0, //7 This is the @keyframe at rule
				"keyframe":0,  //8 This is the individual 0%, or from/to
				"reserved9":0, //9
				"namespace":0, //10
				"reserved11":0,//11
				"supports":0,  //12
				"reserved13":0,//13
				"reserved14":0,//14
				"viewport":0,  //15
			}*/
			
			// this will contain the usage stats of various css properties and values
			props: Object.create(null), /*
			props ~= {
				"background-color": {
					count: 10,
					values: {
						"<color-keyword>": 9,
						"inherit": 1
					}
				}
			}*/
			
			// this will contains the various datapoints we measure on css selector usage
			usages: {"SuccessfulCrawls":1},
			
			// this will contain selectors and the properties they refer to
			rules: {"@stylerule":0,"@atrule":0,"@inline":0}, /*
			rules ~= {
				"#id:hover .class": {
					count: 10,
					props: {
						"background-color": 5,
						"color": 4,
						"opacity": 3,
						"transform": 3
					}
				}
			}*/
			
		}
	}();

	//
	// The StyleWalker API cover the extraction of style in the browser
	//
	void function() { "use strict";

		CSSUsage.StyleWalker = {
			
			// This array contains the list of functions being run on each CSSStyleDeclaration
			// [ function(style, selectorText, matchedElements, ruleType) { ... }, ... ]
			ruleAnalyzers: [],
			
			// This array contains the list of functions being run on each DOM element of the page
			// [ function(element) { ...} ]
			elementAnalyzers: [],
			
			// 
			walkOverCssStyles: walkOverCssStyles,
			walkOverDomElements: walkOverDomElements,
			
			// Those stats are being collected while walking over the css style rules
			amountOfInlineStyles: 0,
			amountOfSelectorsUnused: 0,
			amountOfSelectors: 0,
		}
		
		// holds @keyframes temporarily while we wait to know how much they are used
		var keyframes = Object.create(null);
		
		/**
		 * For all stylesheets of the document, 
		 * walk through the stylerules and run analyzers
		 */
		function walkOverCssStyles() {
			var styleSheets = document.styleSheets;

			// Loop through StyeSheets
			for (var ssIndex = styleSheets.length; ssIndex--;) {
				var styleSheet = styleSheets[ssIndex];
				try {
					if(styleSheet.cssRules) {
						walkOverCssRules(styleSheet.cssRules, styleSheet);
					} else {
						console.warn("No content loaded for stylesheet: ", styleSheet.href||styleSheet);
					}
				}
				catch (e) {
					console.log(e, e.stack);
				}
			}
			
			// Hack: rely on the results to find out which
			// animations actually run, and parse their keyframes
			var animations = (CSSUsageResults.props['animation-name']||{}).values||{};
			for(var animation in keyframes) {
				var keyframe = keyframes[animation];
				var matchCount = animations[animation]|0;
				var fakeElements = initArray(matchCount, (i)=>({tagName:'@keyframes '+animation+' ['+i+']'}));
				processRule(keyframe, fakeElements);
			}

		}

		/**
		 * This is the css work horse, this will will loop over the
		 * rules and then call the rule analyzers currently registered
		 */
		function walkOverCssRules(/*CSSRuleList*/ cssRules, styleSheet, parentMatchedElements) {
			for (var ruleIndex = cssRules.length; ruleIndex--;) {

				// Loop through the rules
				var rule = cssRules[ruleIndex];

				// Until we can correlate animation usage
				// to keyframes do not parse @keyframe rules
				if(rule.type == 7) {
					keyframes[rule.name] = rule;
					continue;
				}
				
				// Filter "@supports" which the current browser doesn't support
				if(rule.type == 12 && (!CSS.supports || !CSS.supports(rule.conditionText))) {
					continue;
				}
					
				// Other rules should be processed immediately
				processRule(rule,parentMatchedElements);
					

			}
		}
		
		/**
		 * This function takes a css rule and:
		 * [1] walk over its child rules if needed
		 * [2] call rule analyzers for that rule if it has style data
		 */
		function processRule(rule, parentMatchedElements) {
			
			// Increment the rule type's counter
			CSSUsageResults.types[rule.type|0]++; 

			// Some CssRules have nested rules to walk through:
			if (rule.cssRules && rule.cssRules.length>0) {
				
				walkOverCssRules(rule.cssRules, rule.parentStyleSheet, parentMatchedElements);
				
			}

			// Some CssRules have style we can ananlyze
			if(rule.style) {
				
				// find what the rule applies to
				var selectorText;
				var matchedElements; 
				if(rule.selectorText) {
					selectorText = CSSUsage.PropertyValuesAnalyzer.cleanSelectorText(rule.selectorText);
					try {
						if(parentMatchedElements) {
							matchedElements = [].slice.call(document.querySelectorAll(selectorText));
							matchedElements.parentMatchedElements = parentMatchedElements;
						} else {
							matchedElements = [].slice.call(document.querySelectorAll(selectorText));
						}
					} catch(ex) {
						matchedElements = [];
						console.warn(ex.stack||("Invalid selector: "+selectorText+" -- via "+rule.selectorText));
					}
				} else {
					selectorText = '@atrule:'+rule.type;
					if(parentMatchedElements) {
						matchedElements = parentMatchedElements;
					} else {
						matchedElements = [];
					}
				}
				
				// run an analysis on it
				runRuleAnalyzers(rule.style, selectorText, matchedElements, rule.type);
				
			}
		}

		/**
		 * This is the dom work horse, this will will loop over the
		 * dom elements and then call the element analyzers currently registered,
		 * as well as rule analyzers for inline styles
		 */
		function walkOverDomElements(obj, index, depth) {
			obj = obj || document.documentElement; index = index|0; depth = depth|0;

			// Loop through the elements
			var elements = [].slice.call(document.all,0);
			for(var i=elements.length; i--;) { var element=elements[i];
			
				// Analyze the element
				runElementAnalyzers(element, index);
				
				// Analyze its style, if any
				if (element.hasAttribute('style')) {
					
					// Inline styles count like a style rule with no selector but one matched element
					var ruleType = 1;
					var isInline = true;
					var selectorText = '@inline:'+element.tagName;
					var matchedElements = [element];
					runRuleAnalyzers(element.style, selectorText, matchedElements, ruleType, isInline);
					
				}
			}
			
		}

		/**
		 * Given a rule and its data, send it to all rule analyzers
		 */
		function runRuleAnalyzers(style, selectorText, matchedElements, type, isInline) {
			
			// Keep track of the counters
			if(isInline) {
				CSSUsage.StyleWalker.amountOfInlineStyles++;
			} else {
				CSSUsage.StyleWalker.amountOfSelectors++;
			}
			
			// Run all rule analyzers
			for(var runAnalyzer of CSSUsage.StyleWalker.ruleAnalyzers) {
				runAnalyzer(style, selectorText, matchedElements, type, isInline);
			}
			
		}
		
		/**
		 * Given an element and its data, send it to all element analyzers
		 */
		function runElementAnalyzers(element, index, depth) {
			for(var runAnalyzer of CSSUsage.StyleWalker.elementAnalyzers) {
				runAnalyzer(element,index,depth);
			}
		}
		
		/**
		 * Creates an array of "length" elements, by calling initializer for each cell
		 */
		function initArray(length, initializer) {
			var array = Array(length);
			for(var i = length; i--;) { 
				array[i] = initializer(i);
			}
			return array;
		}

	}();

	//
	// helper to work with css values
	//
	void function() {

		CSSUsage.CSSValues = {
			createValueArray: createValueArray,
			parseValues: parseValues,
			normalizeValue: createValueArray
		};

		/**
		 * This will take a string value and reduce it down
		 * to only the aspects of the value we wish to keep
		 */
		function parseValues(value,propertyName) {
			
			// Trim value on the edges
			value = value.trim();
			
			// Normalize letter-casing
			value = value.toLowerCase();

			// Map colors to a standard value (eg: white, blue, yellow)
			if (isKeywordColor(value)) { return "<color-keyword>"; }
			value = value.replace(/[#][0-9a-fA-F]+/g, '#xxyyzz');
			
			// Escapce identifiers containing numbers
			var numbers = ['ZERO','ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE'];
			value = value.replace(
				/([_a-z][-_a-z]|[_a-df-z])[0-9]+[-_a-z0-9]*/g, 
				s=>numbers.reduce(
					(m,nstr,nint)=>m.replace(RegExp(nint,'g'),nstr),
					s
				)
			);
			
			// Remove any digits eg: 55px -> px, 1.5 -> 0.0, 1 -> 0
			value = value.replace(/(?:[+]|[-]|)(?:(?:[0-9]+)(?:[.][0-9]+|)|(?:[.][0-9]+))(?:[e](?:[+]|[-]|)(?:[0-9]+))?(%|e[a-z]+|[a-df-z][a-z]*)/g, "$1"); 
			value = value.replace(/(?:[+]|[-]|)(?:[0-9]+)(?:[.][0-9]+)(?:[e](?:[+]|[-]|)(?:[0-9]+))?/g, " <float> ");
			value = value.replace(/(?:[+]|[-]|)(?:[.][0-9]+)(?:[e](?:[+]|[-]|)(?:[0-9]+))?/g, " <float> ");
			value = value.replace(/(?:[+]|[-]|)(?:[0-9]+)(?:[e](?:[+]|[-]|)(?:[0-9]+))/g, " <float> ");
			value = value.replace(/(?:[+]|[-]|)(?:[0-9]+)/g, " <int> ");
			
			// Unescapce identifiers containing numbers
			value = numbers.reduce(
				(m,nstr,nint)=>m.replace(RegExp(nstr,'g'),nint),
				value
			)
			
			// Remove quotes
			value = value.replace(/('|‘|’|")/g, "");
			
			//
			switch(propertyName) {
				case 'counter-increment':
				case 'counter-reset':
					
					// Anonymize the user identifier
					value = value.replace(/[-_a-zA-Z0-9]+/g,' <custom-ident> ');
					break;
					
				case 'grid':
				case 'grid-template':
				case 'grid-template-rows':
				case 'grid-template-columns':
				case 'grid-template-areas':
					
					// Anonymize line names
					value = value.replace(/\[[-_a-zA-Z0-9 ]+\]/g,' <line-names> ');
					break;
					
				case '--var':
				
					// Replace (...), {...} and [...]
					value = value.replace(/[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, " <parentheses-block> ");
					value = value.replace(/[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, " <parentheses-block> ");
					value = value.replace(/\[(?:[^()]+|\[(?:[^()]+|\[(?:[^()]+|\[(?:[^()]+|\[(?:[^()]*)\])*\])*\])*\])*\]/g, " <curly-brackets-block> ");
					value = value.replace(/\[(?:[^()]+|\[(?:[^()]+|\[(?:[^()]+|\[(?:[^()]+|\[(?:[^()]*)\])*\])*\])*\])*\]/g, " <curly-brackets-block> ");
					value = value.replace(/\{(?:[^()]+|\{(?:[^()]+|\{(?:[^()]+|\{(?:[^()]+|\{(?:[^()]*)\})*\})*\})*\})*\}/g, " <square-brackets-block> ");
					value = value.replace(/\{(?:[^()]+|\{(?:[^()]+|\{(?:[^()]+|\{(?:[^()]+|\{(?:[^()]*)\})*\})*\})*\})*\}/g, " <square-brackets-block> ");
					break;
					
			}
			 
			return value.trim();
			 
		}

		//-----------------------------------------------------------------------------

		/**
		 * This will transform a value into an array of value identifiers
		 */ 
		function createValueArray(value, propertyName) {

			// Trim value on the edges
			value = value.trim();
			
			// Normalize letter-casing
			value = value.toLowerCase();
			
			// Remove comments and !important
			value = value.replace(/([/][*](?:.|\r|\n)*[*][/]|[!]important.*)/g,'');
			
			// Do the right thing in function of the property
			switch(propertyName) {
				case 'font-family':
					
					// Remove various quotes
					if (value.indexOf("'") != -1 || value.indexOf("‘") != -1 || value.indexOf('"')) {
						value = value.replace(/('|‘|’|")/g, "");
					}
					
					// Divide at commas to separate different font names
					value = value.split(/\s*,\s*/g);
					return value;
					
				case '--var':
				
					// Replace strings by dummies
					value = value.replace(/"([^"\\]|\\[^"\\]|\\\\|\\")*"/g,' <string> ')
					value = value.replace(/'([^'\\]|\\[^'\\]|\\\\|\\')*'/g,' <string> ');
					
					// Replace url(...) functions by dummies
					value = value.replace(/([a-z]?)[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, "$1()");
					value = value.replace(/([a-z]?)[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, "$1()");
					
					// Remove group contents (...), {...} and [...]
					value = value.replace(/[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, " <parentheses-block> ");
					value = value.replace(/[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, " <parentheses-block> ");
					value = value.replace(/[{](?:[^{}]+|[{](?:[^{}]+|[{](?:[^{}]+|[{](?:[^{}]+|[{](?:[^{}]*)[}])*[}])*[}])*[}])*[}]/g, " <curly-brackets-block> ");
					value = value.replace(/[{](?:[^{}]+|[{](?:[^{}]+|[{](?:[^{}]+|[{](?:[^{}]+|[{](?:[^{}]*)[}])*[}])*[}])*[}])*[}]/g, " <curly-brackets-block> ");
					value = value.replace(/[\[](?:[^\[\]]+|[\[](?:[^\[\]]+|[\[](?:[^\[\]]+|[\[](?:[^\[\]]+|[\[](?:[^\[\]]*)[\]])*[\]])*[\]])*[\]])*[\]]/g, " <square-brackets-block> ");
					value = value.replace(/[\[](?:[^\[\]]+|[\[](?:[^\[\]]+|[\[](?:[^\[\]]+|[\[](?:[^\[\]]+|[\[](?:[^\[\]]*)[\]])*[\]])*[\]])*[\]])*[\]]/g, " <square-brackets-block> ");
					
					break;
					
				default:
				
					// Replace strings by dummies
					value = value.replace(/"([^"\\]|\\[^"\\]|\\\\|\\")*"/g,' <string> ')
								 .replace(/'([^'\\]|\\[^'\\]|\\\\|\\')*'/g,' <string> ');
					
					// Replace url(...) functions by dummies
					if (value.indexOf("(") != -1) {
						value = value.replace(/([a-z]?)[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, "$1() ");
						value = value.replace(/([a-z]?)[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, "$1() ");
					}
					
			}
			
			// Collapse whitespace
			value = value.trim().replace(/\s+/g, " ");
			
			// Divide at commas and spaces to separate different values
			value = value.split(/\s*(?:,|[/])\s*|\s+/g);
			
			return value;
		}

		/**
		 * So that we don't end up with a ton of color
		 * values, this will determine if the color is a
		 * keyword color value
		 */
		function isKeywordColor(candidateColor) {
			
			// Keyword colors from the W3C specs
			var isColorKeyword = /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgreen|lightgray|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lighslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|navyblue|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/;
			return isColorKeyword.test(candidateColor);
			
		}

	}();

	//
	// computes various css stats
	//
	void function() {

		CSSUsage.PropertyValuesAnalyzer = analyzeStyleOfRule;
		CSSUsage.PropertyValuesAnalyzer.cleanSelectorText = cleanSelectorText;
		CSSUsage.PropertyValuesAnalyzer.generalizedSelectorsOf = generalizedSelectorsOf;
		CSSUsage.PropertyValuesAnalyzer.finalize = finalize;

		// We put a computed style in cache for filtering purposes
		var defaultStyle = getComputedStyle(document.createElement('div'));
		// As well as some basic lies
		var getBuggyValuesForThisBrowser = function() {
			var buggyValues = getBuggyValuesForThisBrowser.cache;
			if(buggyValues) { return buggyValues; }
			else { buggyValues = Object.create(null); }
			
			// Edge reports initial value instead of "initial", we have to be cautious
			if(browserIsEdge) {

				buggyValues['*'] = 1; // make 0 values automatic for longhand properties
				
				//buggyValues['list-style-position:outside'] = 0;
				buggyValues['list-style-image:none'] = 1;
				//buggyValues['outline-color:invert'] = 0;
				//buggyValues['outline-style:none'] = 0;
				//buggyValues['outline-width:medium'] = 0;
				//buggyValues['background-image:none'] = 0;
				//buggyValues['background-attachment:scroll'] = 0;
				//buggyValues['background-repeat:repeat'] = 0;
				//buggyValues['background-repeat-x:repeat'] = 0;
				//buggyValues['background-repeat-y:repeat'] = 0;
				//buggyValues['background-position-x:0%'] = 0;
				//buggyValues['background-position-y:0%'] = 0;
				//buggyValues['background-size:auto'] = 0;
				//buggyValues['background-origin:padding-box'] = 0;
				//buggyValues['background-clip:border-box'] = 0;
				//buggyValues['background-color:transparent'] = 0;
				buggyValues['border-top-color:currentcolor'] = 1;
				buggyValues['border-right-color:currentcolor'] = 1;
				buggyValues['border-bottom-color:currentcolor'] = 1;
				buggyValues['border-left-color:currentcolor'] = 1;
				//buggyValues['border-top-style:solid'] = 0;
				//buggyValues['border-right-style:solid'] = 0;
				//buggyValues['border-bottom-style:solid'] = 0;
				//buggyValues['border-left-style:solid'] = 0;
				buggyValues['border-top-width:medium'] = 1;
				buggyValues['border-right-width:medium'] = 1;
				buggyValues['border-bottom-width:medium'] = 1;
				buggyValues['border-left-width:medium'] = 1;
				buggyValues['border-image-source:none'] = 1;
				buggyValues['border-image-outset:0'] = 1;
				buggyValues['border-image-width:1'] = 1;
				buggyValues['border-image-repeat:repeat'] = 1;
				buggyValues['border-image-repeat-x:repeat'] = 1;
				buggyValues['border-image-repeat-y:repeat'] = 1;
				buggyValues['line-height:normal'] = 1;
				//buggyValues['font-size-adjust:none'] = 0;
				buggyValues['font-stretch:normal'] = 1;
				
			}
			
			// Firefox reports initial values instead of "initial", we have to be cautious
			if(browserIsFirefox) {
				
				buggyValues['*'] = 1; // make 0 values automatic for longhand properties
				
			}
			
			// Attempt to force to optimize the object somehow
			Object.create(buggyValues);
			
			return getBuggyValuesForThisBrowser.cache = buggyValues;

		};
		var valueExistsInRootProperty = (cssText,key,rootKey,value) => {
			value = value.trim().toLowerCase();
			
			// detect suspicious values
			var buggyValues = getBuggyValuesForThisBrowser();
			
			// apply common sense to the given value, per browser
			var buggyState = buggyValues[key+':'+value];
			if(buggyState === 1) { return false; }
			if(buggyState !== 0 && (!buggyValues['*'] || CSSShorthands.unexpand(key).length == 0)) { return true; }

			// root properties are unlikely to lie
			if(key==rootKey) return false;			
			
			// ask the browser is the best we can do right now
			var values = value.split(/\s+|\s*,\s*/g);
			var validValues = ' ';
			var validValuesExtractor = new RegExp(' '+rootKey+'(?:[-][-_a-zA-Z0-9]+)?[:]([^;]*)','gi');
			var match; while(match = validValuesExtractor.exec(cssText)) {
				validValues += match[1] + ' ';
			}
			for(var value of values) {
				if(validValues.indexOf(' '+value+' ')==-1) return false;
			}
			return true;
			
		};
		
		/** This will loop over the styles declarations */
		function analyzeStyleOfRule(style, selectorText, matchedElements, type, isInline) { isInline=!!isInline;
			
			// We want to filter rules that are not actually used
			var count = matchedElements.length;
			var selector = selectorText;
			var selectorCat = {'1:true':'@inline','1:false':'@stylerule'}[''+type+':'+isInline]||'@atrule';
			
			// Keep track of unused rules
			var isRuleUnused = (count == 0);
			if(isRuleUnused) {
				CSSUsage.StyleWalker.amountOfSelectorsUnused++;
			}
			
			// We need a generalized selector to collect some stats
			var generalizedSelectors = (
				(selectorCat=='@stylerule')
					? [selectorCat].concat(generalizedSelectorsOf(selector))
					: [selectorCat, selector]
			);
			
			// Get the datastores of the generalized selectors
			var generalizedSelectorsData = map(generalizedSelectors, (generalizedSelector) => (
				CSSUsageResults.rules[generalizedSelector] || (CSSUsageResults.rules[generalizedSelector] = {count:0,props:Object.create(null)})
			));
			
			// Increment the occurence counter of found generalized selectors
			for(var generalizedSelectorData of generalizedSelectorsData) {
				generalizedSelectorData.count++
			}
			
			// avoid most common browser lies
			var cssText = ' '+style.cssText.toLowerCase(); 
			if(browserIsEdge) {
				cssText = cssText.replace(/border: medium; border-image: none;/,'border: none;');
				cssText = cssText.replace(/ border-image: none;/,' ');
			}
			
			// For each property declaration in this rule, we collect some stats
			for (var i = style.length; i--;) {

				var key = style[i], rootKeyIndex=key.indexOf('-'), rootKey = rootKeyIndex==-1 ? key : key.substr(0,rootKeyIndex);
				var normalizedKey = rootKeyIndex==0&&key.indexOf('-',1)==1 ? '--var' : key;
				var styleValue = style.getPropertyValue(key);
				
				// Only keep styles that were declared by the author
				// We need to make sure we're only checking string props
				var isValueInvalid = typeof styleValue !== 'string' && styleValue != "" && styleValue != undefined;
				if (isValueInvalid) { 
					continue;
				}
				
				var isPropertyUndefined = (cssText.indexOf(' '+key+':') == -1) && (styleValue=='initial' || !valueExistsInRootProperty(cssText, key, rootKey, styleValue));
				if (isPropertyUndefined) {
					continue;
				}
				
				// divide the value into simplified components
				var values = CSSUsage.CSSValues.createValueArray(styleValue,normalizedKey);
				for(var j=values.length; j--;) {
					values[j] = CSSUsage.CSSValues.parseValues(values[j],normalizedKey)
				}
				
				// log the property usage per selector
				for(var generalizedSelectorData of generalizedSelectorsData) {
					
					// get the datastore for current property
					var propStats = generalizedSelectorData.props[normalizedKey] || (generalizedSelectorData.props[normalizedKey] = {count:0,values:Object.create(null)});

					// we saw the property one time
					propStats.count++;
					
					// we also saw a bunch of values
					for(var value of values) {
												
						// increment the counts for those by one, too
						if(value.length>0) {
							propStats.values[value] = (propStats.values[value]|0) + 1
						}
						
					}
					
				}
				
				// if we may increment some counts due to this declaration
				if(count > 0) {
					
					// instanciate or fetch the property metadata
					var propObject = CSSUsageResults.props[normalizedKey];
					if (!propObject) {
						propObject = CSSUsageResults.props[normalizedKey] = {
							count: 0,
							values: Object.create(null)
						};
					}
					
					// update the occurence counts of the property and value
					for(var element of matchedElements) {
						
						// check what the elements already contributed for this property
						var cssUsageMeta = element.CSSUsage || (element.CSSUsage=Object.create(null));
						var knownValues = cssUsageMeta[normalizedKey] || (cssUsageMeta[normalizedKey] = []);
						
						// increment the amount of affected elements which we didn't count yet
						if(knownValues.length == 0) { propObject.count += 1; }

						// add newly found values too
						for(var value of values) {
							
							if(knownValues.indexOf(value) >= 0) { return; }
							propObject.values[value] = (propObject.values[value]|0) + 1;
							knownValues.push(value);

						}
						
					}
					
				}
				
			}
		}
		
		function finalize() {
			
			// anonymize identifiers used for animation-name
			function removeAnimationNames() {
				
				// anonymize identifiers used for animation-name globally
				if(CSSUsageResults.props["animation-name"]) {
					CSSUsageResults.props["animation-name"].values = {"<custom-ident>":CSSUsageResults.props["animation-name"].count};
				}
				
				// anonymize identifiers used for animation-name per selector
				for(var selector in CSSUsageResults.rules) { 
					var rule = CSSUsageResults.rules[selector];
					if(rule && rule.props && rule.props["animation-name"]) {
						rule.props["animation-name"].values = {"<custom-ident>":rule.props["animation-name"].count};
					}
				}
				
			}
			
			removeAnimationNames();
			
		}

		//-------------------------------------------------------------------------

		/**
		 * If you try to do querySelectorAll on pseudo selectors
		 * it returns 0 because you are not actually doing the action the pseudo is stating those things,
		 * but we will honor those declarations and we don't want them to be missed,
		 * so we remove the pseudo selector from the selector text
		 */
		function cleanSelectorText(text) {
			if(text.indexOf(':') == -1) {
				return text;
			} else {
				return text.replace(/([-_a-zA-Z0-9*\[\]]?):(?:hover|active|focus|before|after|not\(:(hover|active|focus)\))|::(?:before|after)/gi, '>>$1<<').replace(/(^| |>|\+|~)>><</g,'$1*').replace(/\(>><<\)/g,'(*)').replace(/>>([-_a-zA-Z0-9*\[\]]?)<</g,'$1');
			}
		}
		
		/**
		 * Returns an anonymized version of the selector.
		 * @example "#menu.open:hover>a.submenu" => "#id.class:hover > a.class"
		 */
		function generalizedSelectorsOf(value) {
			
			// Trim
			value = value.trim();
			
			// Collapse whitespace
			if (value) {
				value = value.replace(/\s+/g, " ");
			}
			
			// Remove (...)
			if (value.indexOf("(") != -1) {
				value = value.replace(/[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, "");
				value = value.replace(/[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]+|[(](?:[^()]*)[)])*[)])*[)])*[)])*[)]/g, "");
			}
			
			// Simplify "..." and '...'
			value = value.replace(/"([^"\\]|\\[^"\\]|\\\\|\\")*"/g,'""')
			value = value.replace(/'([^'\\]|\\[^'\\]|\\\\|\\')*'/g,"''");

			
			// Simplify [att]
			if (value.indexOf("[") != -1) {
				value = value.replace(/\[[^=\[\]]+="([^"\\]|\\[^"\\]|\\\\|\\")*"\]/g, "[a]");
				value = value.replace(/\[[^=\[\]]+='([^'\\]|\\[^'\\]|\\\\|\\')*'\]/g, "[a]");
				value = value.replace(/\[[^\[\]]+\]/g, "[a]");
			}
			
			// Simplify .class
			if (value.indexOf(".") != -1) {
				value = value.replace(/[.][-_a-zA-Z][-_a-zA-Z0-9]*/g, ".c");
			}
			
			// Simplify #id
			if (value.indexOf("#") != -1) {
				value = value.replace(/[#][-_a-zA-Z][-_a-zA-Z0-9]*/g, "#i");
			}
			
			// Normalize combinators
			value = value.replace(/[ ]*([>|+|~])[ ]*/g,' $1 ');
			
			// Trim whitespace
			value = value.trim();
			
			// Remove unnecessary * to match Chrome
			value = value.replace(/[*]([#.\x5B:])/g,'$1');
			
			// Now we can sort components so that all browsers give results similar to Chrome
			value = sortSelectorComponents(value)
			
			// Split multiple selectors
			value = value.split(/\s*,\s*/g);

			return value;

		}
		
		var ID_REGEXP = "[#]i";         // #id
		var CLASS_REGEXP = "[.]c";      // .class
		var ATTR_REGEXP = "\\[a\\]";    // [att]
		var PSEUDO_REGEXP = "[:][:]?[-_a-zA-Z][-_a-zA-Z0-9]*"; // :pseudo
		var SORT_REGEXPS = [
			
			// #id first
			new RegExp("("+CLASS_REGEXP+")("+ID_REGEXP+")",'g'),
			new RegExp("("+ATTR_REGEXP+")("+ID_REGEXP+")",'g'),
			new RegExp("("+PSEUDO_REGEXP+")("+ID_REGEXP+")",'g'),
			
			// .class second
			new RegExp("("+ATTR_REGEXP+")("+CLASS_REGEXP+")",'g'),
			new RegExp("("+PSEUDO_REGEXP+")("+CLASS_REGEXP+")",'g'),
			
			// [attr] third
			new RegExp("("+PSEUDO_REGEXP+")("+ATTR_REGEXP+")",'g'),
			
			// :pseudo last
			
		];
		function sortSelectorComponents(value) {
			
			var oldValue; do { // Yeah this is a very inefficient bubble sort. I know.
				
				oldValue = value;
				for(var wrongPair of SORT_REGEXPS) {
					value = value.replace(wrongPair,'$2$1');
				}
				
			} while(oldValue != value); return value;

		}

	}();

	//
	// extracts valuable informations about selectors in use
	//
	void function() {
		
		// 
		// To understand framework and general css usage, we collect stats about classes, ids and pseudos.
		// Those objects have the following shape: 
		// {"hover":5,"active":1,"focus":2}
		// 
		var cssPseudos = Object.create(null); // collect stats about which pseudo-classes and pseudo-elements are used in the css
		var domClasses = Object.create(null); // collect stats about which css classes are found in the <... class> attributes of the dom
		var cssClasses = Object.create(null); // collect stats about which css classes are used in the css
		var domIds = Object.create(null);     // collect stats about which ids are found in the <... id> attributes of the dom
		var cssIds = Object.create(null);     // collect stats about which ids are used in the css
		
		// 
		// To understand Modernizer usage, we need to know how often some classes are used at the front of a selector
		// While we're at it, the code also collect the state for ids
		// 
		var cssLonelyIdGates = Object.create(null);    // .class something-else ==> {"class":1}
		var cssLonelyClassGates = Object.create(null); // #id something-else ==> {"id":1}
		var cssLonelyClassGatesMatches = [];           // .class something-else ==> [".class something-else"]
		var cssLonelyIdGatesMatches = [];              // #id something-else ==> ["#id something-else"]
		
		//
		// These regular expressions catch patterns we want to track (see before)
		//
		var ID_REGEXP = /[#][-_a-zA-Z][-_a-zA-Z0-9]*/g;     // #id
		var ID_REGEXP1 = /[#][-_a-zA-Z][-_a-zA-Z0-9]*/;     // #id (only the first one)
		var CLASS_REGEXP = /[.][-_a-zA-Z][-_a-zA-Z0-9]*/g;  // .class
		var CLASS_REGEXP1 = /[.][-_a-zA-Z][-_a-zA-Z0-9]*/;  // .class (only the first one)
		var PSEUDO_REGEXP = /[:][-_a-zA-Z][-_a-zA-Z0-9]*/g; // :pseudo (only the )
		var GATEID_REGEXP = /^\s*[#][-_a-zA-Z][-_a-zA-Z0-9]*([.][-_a-zA-Z][-_a-zA-Z0-9]*|[:][-_a-zA-Z][-_a-zA-Z0-9]*)*\s+[^>+{, ][^{,]+$/; // #id ...
		var GATECLASS_REGEXP = /^\s*[.][-_a-zA-Z][-_a-zA-Z0-9]*([:][-_a-zA-Z][-_a-zA-Z0-9]*)*\s+[^>+{, ][^{,]+$/; // .class ...
		
		/**
		 * From a css selector text and a set of counters, 
		 * increment the counters for the matches in the selector of the 'feature' regular expression
		 */
		function extractFeature(feature, selector, counters) {
			var instances = selector.match(feature)||[];
			for(var instance of instances) {
				instance = instance.substr(1);
				counters[instance] = (counters[instance]|0) + 1;
			}
		}
		
		/**
		 * This analyzer will collect over the selectors the stats defined before
		 */
		CSSUsage.SelectorAnalyzer = function parseSelector(style, selectorsText) {
			if(typeof selectorsText != 'string') return;
				
			var selectors = selectorsText.split(',');
			for(var i = selectors.length; i--;) { var selector = selectors[i];
				
				// extract all features from the selectors
				extractFeature(ID_REGEXP, selector, cssIds);
				extractFeature(CLASS_REGEXP, selector, cssClasses);
				extractFeature(PSEUDO_REGEXP, selector, cssPseudos);
				
				// detect specific selector patterns we're interested in
				if(GATEID_REGEXP.test(selector)) {
					cssLonelyIdGatesMatches.push(selector);
					extractFeature(ID_REGEXP1, selector, cssLonelyIdGates);
				}
				if(GATECLASS_REGEXP.test(selector)) {
					cssLonelyClassGatesMatches.push(selector);
					extractFeature(CLASS_REGEXP1, selector, cssLonelyClassGates);
				}
			}
			
		}
		
		/**
		 * This analyzer will collect over the dom elements the stats defined before
		 */
		CSSUsage.DOMClassAnalyzer = function(element) {
			
			// collect classes used in the wild
			if(element.className) {
				var elementClasses = element.classList;
				for(var c of elementClasses) {
					domClasses[c] = (domClasses[c]|0) + 1;
				}
			}
			
			// collect ids used in the wild
			if(element.id) {
				domIds[element.id] = (domIds[element.id]|0) + 1;
			}
			
		}
		
		/**
		 * This function will be called when all stats have been collected
		 * at which point we will agregate some of them in useful values like Bootstrap usages, etc...
		 */
		CSSUsage.SelectorAnalyzer.finalize = function() {
			
			// get arrays of the classes/ids used ({"hover":5} => ["hover"]))
			var domClassesArray = Object.keys(domClasses);
			var cssClassesArray = Object.keys(cssClasses);
			var domIdsArray = Object.keys(domIds);
			var cssIdsArray = Object.keys(cssIds);

			// get arrays of the .class gates used ({"hover":5} => ["hover"]), filter irrelevant entries
			var cssUniqueLonelyClassGatesArray = Object.keys(cssLonelyClassGates);
			var cssUniqueLonelyClassGatesUsedArray = _(cssUniqueLonelyClassGatesArray).filter((c) => domClasses[c]).value();
			var cssUniqueLonelyClassGatesUsedWorthArray = _(cssUniqueLonelyClassGatesUsedArray).filter((c)=>(cssLonelyClassGates[c]>9)).value();
			if(window.debugCSSUsage) console.log(cssLonelyClassGates);
			if(window.debugCSSUsage) console.log(cssUniqueLonelyClassGatesUsedWorthArray);

			// get arrays of the #id gates used ({"hover":5} => ["hover"]), filter irrelevant entries
			var cssUniqueLonelyIdGatesArray = Object.keys(cssLonelyIdGates);
			var cssUniqueLonelyIdGatesUsedArray = _(cssUniqueLonelyIdGatesArray).filter((c) => domIds[c]).value();
			var cssUniqueLonelyIdGatesUsedWorthArray = _(cssUniqueLonelyIdGatesUsedArray).filter((c)=>(cssLonelyIdGates[c]>9)).value();
			if(window.debugCSSUsage) console.log(cssLonelyIdGates);
			if(window.debugCSSUsage) console.log(cssUniqueLonelyIdGatesUsedWorthArray);
			
			//
			// report how many times the classes in the following arrays have been used in the dom
			// (general stats)
			//
			
			/** count how many times the usual clearfix classes are used */
			var detectedClearfixUsages = function(domClasses) {
				
				var trackedClasses = [
					'clearfix','clear',
				];
				
				return reduce(trackedClasses, (a,b) => a+(domClasses[b]|0), 0);
				
			};
			
			/** count how many times the usual hide/show classes are used */
			var detectedVisibilityUsages = function(domClasses) {
				
				var trackedClasses = [
					'show', 'hide', 'visible', 'hidden', 
				];
				
				return reduce(trackedClasses, (a,b) => a+(domClasses[b]|0), 0);
				
			};
			
			//
			// report how many times the classes in the following arrays have been used in the dom
			// (bootstrap stats)
			//
			
			var detectedBootstrapGridUsages = function(domClasses) {
				
				var trackedClasses = [];
				
				var sizes = ['xs','sm','md','lg'];
				for(var i = sizes.length; i--;) { var size = sizes[i];
					for(var j = 12+1; --j;) {
						trackedClasses.push('col-'+size+'-'+j);
						for(var k = 12+1; --k;) {
							trackedClasses.push('col-'+size+'-'+j+'-offset-'+k);
							trackedClasses.push('col-'+size+'-'+j+'-push-'+k);
							trackedClasses.push('col-'+size+'-'+j+'-pull-'+k);
						}
					}
				}
				
				return reduce(trackedClasses, (a,b) => a+(domClasses[b]|0), 0);
				
			};
			
			var detectedBootstrapFormUsages = function(domClasses) {
				
				var trackedClasses = [
					'form-group', 'form-group-xs', 'form-group-sm', 'form-group-md', 'form-group-lg',
					'form-control', 'form-horizontal', 'form-inline',
					'btn','btn-primary','btn-secondary','btn-success','btn-warning','btn-danger','btn-error'
				];
				
				return reduce(trackedClasses, (a,b) => a+(domClasses[b]|0), 0);
				
			};
			
			var detectedBootstrapAlertUsages = function(domClasses) {
				
				var trackedClasses = [
					'alert','alert-primary','alert-secondary','alert-success','alert-warning','alert-danger','alert-error'
				];
				
				return reduce(trackedClasses, (a,b) => a+(domClasses[b]|0), 0);
				
			};
			
			var detectedBootstrapFloatUsages = function(domClasses) {
				
				var trackedClasses = [
					'pull-left','pull-right',
				];
				
				return reduce(trackedClasses, (a,b) => a+(domClasses[b]|0), 0);
				
			};
			
			//
			// report how many times the classes in the following arrays have been used as css gate
			// (modernizer stats)
			//
			
			// https://modernizr.com/docs#features
			var detectedModernizerUsages = function(cssLonelyClassGates) {
				
				var ModernizerUsages = {count:0,values:{/*  "js":1,  "no-js":2  */}};
				var trackedClasses = ["js","ambientlight","applicationcache","audio","batteryapi","blobconstructor","canvas","canvastext","contenteditable","contextmenu","cookies","cors","cryptography","customprotocolhandler","customevent","dart","dataview","emoji","eventlistener","exiforientation","flash","fullscreen","gamepads","geolocation","hashchange","hiddenscroll","history","htmlimports","ie8compat","indexeddb","indexeddbblob","input","search","inputtypes","intl","json","olreversed","mathml","notification","pagevisibility","performance","pointerevents","pointerlock","postmessage","proximity","queryselector","quotamanagement","requestanimationframe","serviceworker","svg","templatestrings","touchevents","typedarrays","unicoderange","unicode","userdata","vibrate","video","vml","webintents","animation","webgl","websockets","xdomainrequest","adownload","audioloop","audiopreload","webaudio","lowbattery","canvasblending","todataurljpeg,todataurlpng,todataurlwebp","canvaswinding","getrandomvalues","cssall","cssanimations","appearance","backdropfilter","backgroundblendmode","backgroundcliptext","bgpositionshorthand","bgpositionxy","bgrepeatspace,bgrepeatround","backgroundsize","bgsizecover","borderimage","borderradius","boxshadow","boxsizing","csscalc","checked","csschunit","csscolumns","cubicbezierrange","display-runin","displaytable","ellipsis","cssescape","cssexunit","cssfilters","flexbox","flexboxlegacy","flexboxtweener","flexwrap","fontface","generatedcontent","cssgradients","hsla","csshyphens,softhyphens,softhyphensfind","cssinvalid","lastchild","cssmask","mediaqueries","multiplebgs","nthchild","objectfit","opacity","overflowscrolling","csspointerevents","csspositionsticky","csspseudoanimations","csspseudotransitions","cssreflections","regions","cssremunit","cssresize","rgba","cssscrollbar","shapes","siblinggeneral","subpixelfont","supports","target","textalignlast","textshadow","csstransforms","csstransforms3d","preserve3d","csstransitions","userselect","cssvalid","cssvhunit","cssvmaxunit","cssvminunit","cssvwunit","willchange","wrapflow","classlist","createelementattrs,createelement-attrs","dataset","documentfragment","hidden","microdata","mutationobserver","bdi","datalistelem","details","outputelem","picture","progressbar,meter","ruby","template","time","texttrackapi,track","unknownelements","es5array","es5date","es5function","es5object","es5","strictmode","es5string","es5syntax","es5undefined","es6array","contains","generators","es6math","es6number","es6object","promises","es6string","devicemotion,deviceorientation","oninput","filereader","filesystem","capture","fileinput","directory","formattribute","localizednumber","placeholder","requestautocomplete","formvalidation","sandbox","seamless","srcdoc","apng","jpeg2000","jpegxr","sizes","srcset","webpalpha","webpanimation","webplossless,webp-lossless","webp","inputformaction","inputformenctype","inputformmethod","inputformtarget","beacon","lowbandwidth","eventsource","fetch","xhrresponsetypearraybuffer","xhrresponsetypeblob","xhrresponsetypedocument","xhrresponsetypejson","xhrresponsetypetext","xhrresponsetype","xhr2","scriptasync","scriptdefer","speechrecognition","speechsynthesis","localstorage","sessionstorage","websqldatabase","stylescoped","svgasimg","svgclippaths","svgfilters","svgforeignobject","inlinesvg","smil","textareamaxlength","bloburls","datauri","urlparser","videoautoplay","videoloop","videopreload","webglextensions","datachannel","getusermedia","peerconnection","websocketsbinary","atob-btoa","framed","matchmedia","blobworkers","dataworkers","sharedworkers","transferables","webworkers"];
				for(var c of trackedClasses) { countInstancesOfTheClass(c); countInstancesOfTheClass('no-'+c); }
				return ModernizerUsages;
				
				function countInstancesOfTheClass(c) {
					var count = cssLonelyClassGates[c]; if(!count) return; 
					ModernizerUsages.count += count; 
					ModernizerUsages.values[c]=count; 
				}
				
			}
			
			//
			// try to detect other popular frameworks
			//
			
			// https://github.com/Dogfalo/materialize/blob/master/sass/components/_grid.scss
			var hasDogfaloMaterializeUsage = function() {
				
				if(!document.querySelector(".container > .row > .col")) {
					return false;
				}
				
				for(var i = 12+1; --i;) {
					for(var s of ['s','m','l']) {
						if(document.querySelector(".container > .row > .col."+s+""+i)) {
							return true;
						}
					}
				}
				return false;
				
			}
			
			// http://blueprintcss.org/tests/parts/grid.html
			var hasBluePrintUsage = function() {
				
				if(!document.querySelector(".container")) {
					return false;
				}
				
				for(var i = 24+1; --i;) {
					if(document.querySelector(".container > .span-"+i)) {
						return true;
					}
				}
				return false;
				
			}
			
			// https://raw.githubusercontent.com/csswizardry/inuit.css/master/generic/_widths.scss
			var hasInuitUsage = function() {
				
				if(!document.querySelector(".grid .grid__item")) {
					return false;
				}
				
				for(var fraction of ["one-whole","one-half","one-third","two-thirds","one-quarter","two-quarters","one-half","three-quarters","one-fifth","two-fifths","three-fifths","four-fifths","one-sixth","two-sixths","one-third","three-sixths","one-half","four-sixths","two-thirds","five-sixths","one-eighth","two-eighths","one-quarter","three-eighths","four-eighths","one-half","five-eighths","six-eighths","three-quarters","seven-eighths","one-tenth","two-tenths","one-fifth","three-tenths","four-tenths","two-fifths","five-tenths","one-half","six-tenths","three-fifths","seven-tenths","eight-tenths","four-fifths","nine-tenths","one-twelfth","two-twelfths","one-sixth","three-twelfths","one-quarter","four-twelfths","one-third","five-twelfths","six-twelfths","one-half","seven-twelfths","eight-twelfths","two-thirds","nine-twelfths","three-quarters","ten-twelfths","five-sixths","eleven-twelfths"]) {
					for(var ns of ["","palm-","lap-","portable-","desk-"]) {
						if(document.querySelector(".grid > .grid__item."+ns+fraction)) {
							return true;
						}
					}
				}
				return false;
				
			}
			
			// http://www.gumbyframework.com/docs/grid/#!/basic-grid
			var hasGrumbyUsage = function() {
				
				if(!document.querySelector(".row .columns")) {
					return false;
				}
				
				for(var fraction of ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"]) {
					if(document.querySelector(".row > .columns."+fraction)) {
						return true;
					}
				}
				return false;
				
			}

			//
			//
			//
			var results = {
				
				// how many crawls are aggregated in this file (one of course in this case)
				SuccessfulCrawls: 1,
				
				// how many elements on the page (used to compute percentages for css.props)
				DOMElements: document.all.length,
				
				// how many selectors vs inline style, and other usage stats
				SelectorsFound: CSSUsage.StyleWalker.amountOfSelectors,
				InlineStylesFound: CSSUsage.StyleWalker.amountOfInlineStyles,
				SelectorsUnused: CSSUsage.StyleWalker.amountOfSelectorsUnused,
				
				// ids stats
				IdsUsed: domIdsArray.length,
				IdsRecognized: Object.keys(cssIds).length,
				IdsUsedRecognized: filter(domIdsArray, i => cssIds[i]).length,
				
				// classes stats
				ClassesUsed: domClassesArray.length,
				ClassesRecognized: Object.keys(cssClasses).length,
				ClassesUsedRecognized: filter(domClassesArray, c => cssClasses[c]).length,
				
				// non-framework usage stats (see before)
				NFwkClearfixUsage: detectedClearfixUsages(domClasses),
				NFwkVisibilityUsage: detectedVisibilityUsages(domClasses),
				
				NFwkClearfixRecognized: detectedClearfixUsages(cssClasses),
				NFwkVisibilityRecognized: detectedVisibilityUsages(cssClasses),
				
				// framework usage stats (see before)
				FwkModernizer: !!window.Modernizer,
				FwkModernizerDOMUsages: detectedModernizerUsages(domClasses),
				FwkModernizerCSSUsages: detectedModernizerUsages(cssLonelyClassGates),
			   
				FwkBootstrap: !!((window.jQuery||window.$) && (window.jQuery||window.$).fn && (window.jQuery||window.$).fn.modal)|0,
				
				FwkBootstrapGridUsage: detectedBootstrapGridUsages(domClasses),
				FwkBootstrapFormUsage: detectedBootstrapFormUsages(domClasses),
				FwkBootstrapFloatUsage: detectedBootstrapFloatUsages(domClasses),
				FwkBootstrapAlertUsage: detectedBootstrapAlertUsages(domClasses),
				
				FwkBootstrapGridRecognized: detectedBootstrapGridUsages(cssClasses),
				FwkBootstrapFormRecognized: detectedBootstrapFormUsages(cssClasses),
				FwkBootstrapFloatRecognized: detectedBootstrapFloatUsages(cssClasses),
				FwkBootstrapAlertRecognized: detectedBootstrapAlertUsages(cssClasses),
				
				FwkDogfaloMaterialize: hasDogfaloMaterializeUsage()|0,
				FwkBluePrint: hasBluePrintUsage()|0,
				FwkInuit: hasInuitUsage()|0,
				FwkGrumby: hasGrumbyUsage()|0,
				
			};
			
			CSSUsageResults.usages = results;
			if(window.debugCSSUsage) console.log(CSSUsageResults.usages);
			
		}
			
	}();

	//
	// Execution scheduler:
	// This is where we decide what to run, and when
	//
	void function() {

		if(document.readyState !== 'complete') {
			
			// if the document is loading, run when it loads or in 10s, whichever is less
			window.addEventListener('load', onready);
			setTimeout(onready, 10000);
			
		} else {
			
			// if the document is ready, run now
			onready();
			
		}

		/**
		 * This is the main entrypoint of our script
		 */
		function onready() {
			
			// Uncomment if you want to set breakpoints when running in the console
			//debugger;
			
			// Prevent this code from running multiple times
			var firstTime = !onready.hasAlreadyRun; onready.hasAlreadyRun = true;
			if(!firstTime) { return; /* for now... */ }
			
			// Prevent this code from running when the page has no stylesheet (probably a redirect page)
			if(document.styleSheets.length == 0) { return; }

			// Keep track of duration
			var startTime = performance.now();

			// register tools
			CSSUsage.StyleWalker.ruleAnalyzers.push(CSSUsage.PropertyValuesAnalyzer);
			CSSUsage.StyleWalker.ruleAnalyzers.push(CSSUsage.SelectorAnalyzer);
			CSSUsage.StyleWalker.elementAnalyzers.push(CSSUsage.DOMClassAnalyzer);

			// perform analysis
			CSSUsage.StyleWalker.walkOverDomElements();
			CSSUsage.StyleWalker.walkOverCssStyles();
			CSSUsage.PropertyValuesAnalyzer.finalize();
			CSSUsage.SelectorAnalyzer.finalize();

			// Update duration
			CSSUsageResults.duration = (performance.now() - startTime)|0;

			// DO SOMETHING WITH THE CSS OBJECT HERE
			if(window.debugCSSUsage) console.log(CSSUsageResults);
			if(window.onCSSUsageResults) {
				window.onCSSUsageResults(CSSUsageResults);
			};
			
		}


	}();
	
} catch (ex) { /* do something maybe */ throw ex; } }();