(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[333],{3940:function(t,e,n){"use strict";n.d(e,{$:function(){return c},A:function(){return ke},B:function(){return tt},C:function(){return ye},D:function(){return w},E:function(){return on},F:function(){return Ue},G:function(){return un},H:function(){return L},I:function(){return o},J:function(){return an},K:function(){return Ve},L:function(){return X},M:function(){return q},N:function(){return p},O:function(){return m},P:function(){return Y},Q:function(){return we},R:function(){return J},S:function(){return Jt},T:function(){return F},U:function(){return ct},V:function(){return te},W:function(){return oe},X:function(){return ue},Y:function(){return ie},Z:function(){return xe},_:function(){return Se},a:function(){return me},a0:function(){return a},a1:function(){return Qt},a2:function(){return O},a3:function(){return C},a4:function(){return Zt},a5:function(){return j},a6:function(){return Ie},a7:function(){return Ce},a8:function(){return je},a9:function(){return T},aA:function(){return bn},aB:function(){return s},aC:function(){return et},aD:function(){return V},aE:function(){return z},aF:function(){return K},aG:function(){return Z},aH:function(){return G},aI:function(){return Gt},aJ:function(){return Oe},aK:function(){return Me},aa:function(){return f},ab:function(){return i},ac:function(){return cn},ad:function(){return ee},ae:function(){return E},af:function(){return v},ag:function(){return A},ah:function(){return at},ai:function(){return ge},aj:function(){return Ke},ak:function(){return vn},al:function(){return wn},am:function(){return fn},an:function(){return ln},ao:function(){return sn},ap:function(){return ce},aq:function(){return ae},ar:function(){return ne},as:function(){return fe},at:function(){return pe},au:function(){return be},av:function(){return mn},aw:function(){return rt},ax:function(){return gn},ay:function(){return pn},az:function(){return u},b:function(){return h},c:function(){return zt},d:function(){return Ut},e:function(){return lt},f:function(){return S},g:function(){return g},h:function(){return ve},i:function(){return d},j:function(){return I},k:function(){return l},l:function(){return Pe},m:function(){return y},n:function(){return x},o:function(){return dn},p:function(){return ot},q:function(){return Q},r:function(){return r},s:function(){return D},t:function(){return U},u:function(){return Re},v:function(){return b},w:function(){return it},x:function(){return _e},y:function(){return nn},z:function(){return re}});const r="undefined"===typeof window?function(t){return t()}:window.requestAnimationFrame;function o(t,e,n){const o=n||(t=>Array.prototype.slice.call(t));let i=!1,c=[];return function(...n){c=o(n),i||(i=!0,r.call(window,(()=>{i=!1,t.apply(e,c)})))}}function i(t,e){let n;return function(...r){return e?(clearTimeout(n),n=setTimeout(t,e,r)):t.apply(this,r),e}}const c=t=>"start"===t?"left":"end"===t?"right":"center",a=(t,e,n)=>"start"===t?e:"end"===t?n:(e+n)/2,u=(t,e,n,r)=>t===(r?"left":"right")?n:"center"===t?(e+n)/2:e;function s(){}const f=function(){let t=0;return function(){return t++}}();function l(t){return null===t||"undefined"===typeof t}function h(t){if(Array.isArray&&Array.isArray(t))return!0;const e=Object.prototype.toString.call(t);return"[object"===e.substr(0,7)&&"Array]"===e.substr(-6)}function d(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)}const g=t=>("number"===typeof t||t instanceof Number)&&isFinite(+t);function p(t,e){return g(t)?t:e}function b(t,e){return"undefined"===typeof t?e:t}const y=(t,e)=>"string"===typeof t&&t.endsWith("%")?parseFloat(t)/100:t/e,x=(t,e)=>"string"===typeof t&&t.endsWith("%")?parseFloat(t)/100*e:+t;function m(t,e,n){if(t&&"function"===typeof t.call)return t.apply(n,e)}function w(t,e,n,r){let o,i,c;if(h(t))if(i=t.length,r)for(o=i-1;o>=0;o--)e.call(n,t[o],o);else for(o=0;o<i;o++)e.call(n,t[o],o);else if(d(t))for(c=Object.keys(t),i=c.length,o=0;o<i;o++)e.call(n,t[c[o]],c[o])}function v(t,e){let n,r,o,i;if(!t||!e||t.length!==e.length)return!1;for(n=0,r=t.length;n<r;++n)if(o=t[n],i=e[n],o.datasetIndex!==i.datasetIndex||o.index!==i.index)return!1;return!0}function M(t){if(h(t))return t.map(M);if(d(t)){const e=Object.create(null),n=Object.keys(t),r=n.length;let o=0;for(;o<r;++o)e[n[o]]=M(t[n[o]]);return e}return t}function _(t){return-1===["__proto__","prototype","constructor"].indexOf(t)}function k(t,e,n,r){if(!_(t))return;const o=e[t],i=n[t];d(o)&&d(i)?O(o,i,r):e[t]=M(i)}function O(t,e,n){const r=h(e)?e:[e],o=r.length;if(!d(t))return t;const i=(n=n||{}).merger||k;for(let c=0;c<o;++c){if(!d(e=r[c]))continue;const o=Object.keys(e);for(let r=0,c=o.length;r<c;++r)i(o[r],t,e,n)}return t}function T(t,e){return O(t,e,{merger:P})}function P(t,e,n){if(!_(t))return;const r=e[t],o=n[t];d(r)&&d(o)?T(r,o):Object.prototype.hasOwnProperty.call(e,t)||(e[t]=M(o))}function R(t,e){const n=t.indexOf(".",e);return-1===n?t.length:n}function S(t,e){if(""===e)return t;let n=0,r=R(e,n);for(;t&&r>n;)t=t[e.substr(n,r-n)],n=r+1,r=R(e,n);return t}function C(t){return t.charAt(0).toUpperCase()+t.slice(1)}const I=t=>"undefined"!==typeof t,j=t=>"function"===typeof t,E=(t,e)=>{if(t.size!==e.size)return!1;for(const n of t)if(!e.has(n))return!1;return!0};function A(t){return"mouseup"===t.type||"click"===t.type||"contextmenu"===t.type}const Y=Math.PI,F=2*Y,W=F+Y,N=Number.POSITIVE_INFINITY,B=Y/180,L=Y/2,H=Y/4,$=2*Y/3,X=Math.log10,D=Math.sign;function z(t){const e=Math.round(t);t=Z(t,e,t/1e3)?e:t;const n=Math.pow(10,Math.floor(X(t))),r=t/n;return(r<=1?1:r<=2?2:r<=5?5:10)*n}function q(t){const e=[],n=Math.sqrt(t);let r;for(r=1;r<n;r++)t%r===0&&(e.push(r),e.push(t/r));return n===(0|n)&&e.push(n),e.sort(((t,e)=>t-e)).pop(),e}function Q(t){return!isNaN(parseFloat(t))&&isFinite(t)}function Z(t,e,n){return Math.abs(t-e)<n}function K(t,e){const n=Math.round(t);return n-e<=t&&n+e>=t}function V(t,e,n){let r,o,i;for(r=0,o=t.length;r<o;r++)i=t[r][n],isNaN(i)||(e.min=Math.min(e.min,i),e.max=Math.max(e.max,i))}function U(t){return t*(Y/180)}function J(t){return t*(180/Y)}function G(t){if(!g(t))return;let e=1,n=0;for(;Math.round(t*e)/e!==t;)e*=10,n++;return n}function tt(t,e){const n=e.x-t.x,r=e.y-t.y,o=Math.sqrt(n*n+r*r);let i=Math.atan2(r,n);return i<-.5*Y&&(i+=F),{angle:i,distance:o}}function et(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function nt(t,e){return(t-e+W)%F-Y}function rt(t){return(t%F+F)%F}function ot(t,e,n,r){const o=rt(t),i=rt(e),c=rt(n),a=rt(i-o),u=rt(c-o),s=rt(o-i),f=rt(o-c);return o===i||o===c||r&&i===c||a>u&&s<f}function it(t,e,n){return Math.max(e,Math.min(n,t))}function ct(t){return it(t,-32768,32767)}function at(t,e,n,r=1e-6){return t>=Math.min(e,n)-r&&t<=Math.max(e,n)+r}const ut=t=>0===t||1===t,st=(t,e,n)=>-Math.pow(2,10*(t-=1))*Math.sin((t-e)*F/n),ft=(t,e,n)=>Math.pow(2,-10*t)*Math.sin((t-e)*F/n)+1,lt={linear:t=>t,easeInQuad:t=>t*t,easeOutQuad:t=>-t*(t-2),easeInOutQuad:t=>(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1),easeInCubic:t=>t*t*t,easeOutCubic:t=>(t-=1)*t*t+1,easeInOutCubic:t=>(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2),easeInQuart:t=>t*t*t*t,easeOutQuart:t=>-((t-=1)*t*t*t-1),easeInOutQuart:t=>(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2),easeInQuint:t=>t*t*t*t*t,easeOutQuint:t=>(t-=1)*t*t*t*t+1,easeInOutQuint:t=>(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2),easeInSine:t=>1-Math.cos(t*L),easeOutSine:t=>Math.sin(t*L),easeInOutSine:t=>-.5*(Math.cos(Y*t)-1),easeInExpo:t=>0===t?0:Math.pow(2,10*(t-1)),easeOutExpo:t=>1===t?1:1-Math.pow(2,-10*t),easeInOutExpo:t=>ut(t)?t:t<.5?.5*Math.pow(2,10*(2*t-1)):.5*(2-Math.pow(2,-10*(2*t-1))),easeInCirc:t=>t>=1?t:-(Math.sqrt(1-t*t)-1),easeOutCirc:t=>Math.sqrt(1-(t-=1)*t),easeInOutCirc:t=>(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1),easeInElastic:t=>ut(t)?t:st(t,.075,.3),easeOutElastic:t=>ut(t)?t:ft(t,.075,.3),easeInOutElastic(t){const e=.1125;return ut(t)?t:t<.5?.5*st(2*t,e,.45):.5+.5*ft(2*t-1,e,.45)},easeInBack(t){const e=1.70158;return t*t*((e+1)*t-e)},easeOutBack(t){const e=1.70158;return(t-=1)*t*((e+1)*t+e)+1},easeInOutBack(t){let e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},easeInBounce:t=>1-lt.easeOutBounce(1-t),easeOutBounce(t){const e=7.5625,n=2.75;return t<1/n?e*t*t:t<2/n?e*(t-=1.5/n)*t+.75:t<2.5/n?e*(t-=2.25/n)*t+.9375:e*(t-=2.625/n)*t+.984375},easeInOutBounce:t=>t<.5?.5*lt.easeInBounce(2*t):.5*lt.easeOutBounce(2*t-1)+.5},ht={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},dt="0123456789ABCDEF",gt=t=>dt[15&t],pt=t=>dt[(240&t)>>4]+dt[15&t],bt=t=>(240&t)>>4===(15&t);function yt(t){var e=function(t){return bt(t.r)&&bt(t.g)&&bt(t.b)&&bt(t.a)}(t)?gt:pt;return t?"#"+e(t.r)+e(t.g)+e(t.b)+(t.a<255?e(t.a):""):t}function xt(t){return t+.5|0}const mt=(t,e,n)=>Math.max(Math.min(t,n),e);function wt(t){return mt(xt(2.55*t),0,255)}function vt(t){return mt(xt(255*t),0,255)}function Mt(t){return mt(xt(t/2.55)/100,0,1)}function _t(t){return mt(xt(100*t),0,100)}const kt=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;const Ot=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Tt(t,e,n){const r=e*Math.min(n,1-n),o=(e,o=(e+t/30)%12)=>n-r*Math.max(Math.min(o-3,9-o,1),-1);return[o(0),o(8),o(4)]}function Pt(t,e,n){const r=(r,o=(r+t/60)%6)=>n-n*e*Math.max(Math.min(o,4-o,1),0);return[r(5),r(3),r(1)]}function Rt(t,e,n){const r=Tt(t,1,.5);let o;for(e+n>1&&(o=1/(e+n),e*=o,n*=o),o=0;o<3;o++)r[o]*=1-e-n,r[o]+=e;return r}function St(t){const e=t.r/255,n=t.g/255,r=t.b/255,o=Math.max(e,n,r),i=Math.min(e,n,r),c=(o+i)/2;let a,u,s;return o!==i&&(s=o-i,u=c>.5?s/(2-o-i):s/(o+i),a=o===e?(n-r)/s+(n<r?6:0):o===n?(r-e)/s+2:(e-n)/s+4,a=60*a+.5),[0|a,u||0,c]}function Ct(t,e,n,r){return(Array.isArray(e)?t(e[0],e[1],e[2]):t(e,n,r)).map(vt)}function It(t,e,n){return Ct(Tt,t,e,n)}function jt(t){return(t%360+360)%360}function Et(t){const e=Ot.exec(t);let n,r=255;if(!e)return;e[5]!==n&&(r=e[6]?wt(+e[5]):vt(+e[5]));const o=jt(+e[2]),i=+e[3]/100,c=+e[4]/100;return n="hwb"===e[1]?function(t,e,n){return Ct(Rt,t,e,n)}(o,i,c):"hsv"===e[1]?function(t,e,n){return Ct(Pt,t,e,n)}(o,i,c):It(o,i,c),{r:n[0],g:n[1],b:n[2],a:r}}const At={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Yt={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};let Ft;function Wt(t){Ft||(Ft=function(){const t={},e=Object.keys(Yt),n=Object.keys(At);let r,o,i,c,a;for(r=0;r<e.length;r++){for(c=a=e[r],o=0;o<n.length;o++)i=n[o],a=a.replace(i,At[i]);i=parseInt(Yt[c],16),t[a]=[i>>16&255,i>>8&255,255&i]}return t}(),Ft.transparent=[0,0,0,0]);const e=Ft[t.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:4===e.length?e[3]:255}}function Nt(t,e,n){if(t){let r=St(t);r[e]=Math.max(0,Math.min(r[e]+r[e]*n,0===e?360:1)),r=It(r),t.r=r[0],t.g=r[1],t.b=r[2]}}function Bt(t,e){return t?Object.assign(e||{},t):t}function Lt(t){var e={r:0,g:0,b:0,a:255};return Array.isArray(t)?t.length>=3&&(e={r:t[0],g:t[1],b:t[2],a:255},t.length>3&&(e.a=vt(t[3]))):(e=Bt(t,{r:0,g:0,b:0,a:1})).a=vt(e.a),e}function Ht(t){return"r"===t.charAt(0)?function(t){const e=kt.exec(t);let n,r,o,i=255;if(e){if(e[7]!==n){const t=+e[7];i=255&(e[8]?wt(t):255*t)}return n=+e[1],r=+e[3],o=+e[5],n=255&(e[2]?wt(n):n),r=255&(e[4]?wt(r):r),o=255&(e[6]?wt(o):o),{r:n,g:r,b:o,a:i}}}(t):Et(t)}class $t{constructor(t){if(t instanceof $t)return t;const e=typeof t;let n;"object"===e?n=Lt(t):"string"===e&&(n=function(t){var e,n=t.length;return"#"===t[0]&&(4===n||5===n?e={r:255&17*ht[t[1]],g:255&17*ht[t[2]],b:255&17*ht[t[3]],a:5===n?17*ht[t[4]]:255}:7!==n&&9!==n||(e={r:ht[t[1]]<<4|ht[t[2]],g:ht[t[3]]<<4|ht[t[4]],b:ht[t[5]]<<4|ht[t[6]],a:9===n?ht[t[7]]<<4|ht[t[8]]:255})),e}(t)||Wt(t)||Ht(t)),this._rgb=n,this._valid=!!n}get valid(){return this._valid}get rgb(){var t=Bt(this._rgb);return t&&(t.a=Mt(t.a)),t}set rgb(t){this._rgb=Lt(t)}rgbString(){return this._valid?(t=this._rgb)&&(t.a<255?`rgba(${t.r}, ${t.g}, ${t.b}, ${Mt(t.a)})`:`rgb(${t.r}, ${t.g}, ${t.b})`):this._rgb;var t}hexString(){return this._valid?yt(this._rgb):this._rgb}hslString(){return this._valid?function(t){if(!t)return;const e=St(t),n=e[0],r=_t(e[1]),o=_t(e[2]);return t.a<255?`hsla(${n}, ${r}%, ${o}%, ${Mt(t.a)})`:`hsl(${n}, ${r}%, ${o}%)`}(this._rgb):this._rgb}mix(t,e){const n=this;if(t){const r=n.rgb,o=t.rgb;let i;const c=e===i?.5:e,a=2*c-1,u=r.a-o.a,s=((a*u===-1?a:(a+u)/(1+a*u))+1)/2;i=1-s,r.r=255&s*r.r+i*o.r+.5,r.g=255&s*r.g+i*o.g+.5,r.b=255&s*r.b+i*o.b+.5,r.a=c*r.a+(1-c)*o.a,n.rgb=r}return n}clone(){return new $t(this.rgb)}alpha(t){return this._rgb.a=vt(t),this}clearer(t){return this._rgb.a*=1-t,this}greyscale(){const t=this._rgb,e=xt(.3*t.r+.59*t.g+.11*t.b);return t.r=t.g=t.b=e,this}opaquer(t){return this._rgb.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Nt(this._rgb,2,t),this}darken(t){return Nt(this._rgb,2,-t),this}saturate(t){return Nt(this._rgb,1,t),this}desaturate(t){return Nt(this._rgb,1,-t),this}rotate(t){return function(t,e){var n=St(t);n[0]=jt(n[0]+e),n=It(n),t.r=n[0],t.g=n[1],t.b=n[2]}(this._rgb,t),this}}function Xt(t){return new $t(t)}const Dt=t=>t instanceof CanvasGradient||t instanceof CanvasPattern;function zt(t){return Dt(t)?t:Xt(t)}function qt(t){return Dt(t)?t:Xt(t).saturate(.5).darken(.1).hexString()}const Qt=Object.create(null),Zt=Object.create(null);function Kt(t,e){if(!e)return t;const n=e.split(".");for(let r=0,o=n.length;r<o;++r){const e=n[r];t=t[e]||(t[e]=Object.create(null))}return t}function Vt(t,e,n){return"string"===typeof e?O(Kt(t,e),n):O(Kt(t,""),e)}var Ut=new class{constructor(t){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=t=>t.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(t,e)=>qt(e.backgroundColor),this.hoverBorderColor=(t,e)=>qt(e.borderColor),this.hoverColor=(t,e)=>qt(e.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t)}set(t,e){return Vt(this,t,e)}get(t){return Kt(this,t)}describe(t,e){return Vt(Zt,t,e)}override(t,e){return Vt(Qt,t,e)}route(t,e,n,r){const o=Kt(this,t),i=Kt(this,n),c="_"+e;Object.defineProperties(o,{[c]:{value:o[e],writable:!0},[e]:{enumerable:!0,get(){const t=this[c],e=i[r];return d(t)?Object.assign({},e,t):b(t,e)},set(t){this[c]=t}}})}}({_scriptable:t=>!t.startsWith("on"),_indexable:t=>"events"!==t,hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}});function Jt(t,e,n,r,o){let i=e[o];return i||(i=e[o]=t.measureText(o).width,n.push(o)),i>r&&(r=i),r}function Gt(t,e,n,r){let o=(r=r||{}).data=r.data||{},i=r.garbageCollect=r.garbageCollect||[];r.font!==e&&(o=r.data={},i=r.garbageCollect=[],r.font=e),t.save(),t.font=e;let c=0;const a=n.length;let u,s,f,l,d;for(u=0;u<a;u++)if(l=n[u],void 0!==l&&null!==l&&!0!==h(l))c=Jt(t,o,i,c,l);else if(h(l))for(s=0,f=l.length;s<f;s++)d=l[s],void 0===d||null===d||h(d)||(c=Jt(t,o,i,c,d));t.restore();const g=i.length/2;if(g>n.length){for(u=0;u<g;u++)delete o[i[u]];i.splice(0,g)}return c}function te(t,e,n){const r=t.currentDevicePixelRatio,o=0!==n?Math.max(n/2,.5):0;return Math.round((e-o)*r)/r+o}function ee(t,e){(e=e||t.getContext("2d")).save(),e.resetTransform(),e.clearRect(0,0,t.width,t.height),e.restore()}function ne(t,e,n,r){let o,i,c,a,u;const s=e.pointStyle,f=e.rotation,l=e.radius;let h=(f||0)*B;if(s&&"object"===typeof s&&(o=s.toString(),"[object HTMLImageElement]"===o||"[object HTMLCanvasElement]"===o))return t.save(),t.translate(n,r),t.rotate(h),t.drawImage(s,-s.width/2,-s.height/2,s.width,s.height),void t.restore();if(!(isNaN(l)||l<=0)){switch(t.beginPath(),s){default:t.arc(n,r,l,0,F),t.closePath();break;case"triangle":t.moveTo(n+Math.sin(h)*l,r-Math.cos(h)*l),h+=$,t.lineTo(n+Math.sin(h)*l,r-Math.cos(h)*l),h+=$,t.lineTo(n+Math.sin(h)*l,r-Math.cos(h)*l),t.closePath();break;case"rectRounded":u=.516*l,a=l-u,i=Math.cos(h+H)*a,c=Math.sin(h+H)*a,t.arc(n-i,r-c,u,h-Y,h-L),t.arc(n+c,r-i,u,h-L,h),t.arc(n+i,r+c,u,h,h+L),t.arc(n-c,r+i,u,h+L,h+Y),t.closePath();break;case"rect":if(!f){a=Math.SQRT1_2*l,t.rect(n-a,r-a,2*a,2*a);break}h+=H;case"rectRot":i=Math.cos(h)*l,c=Math.sin(h)*l,t.moveTo(n-i,r-c),t.lineTo(n+c,r-i),t.lineTo(n+i,r+c),t.lineTo(n-c,r+i),t.closePath();break;case"crossRot":h+=H;case"cross":i=Math.cos(h)*l,c=Math.sin(h)*l,t.moveTo(n-i,r-c),t.lineTo(n+i,r+c),t.moveTo(n+c,r-i),t.lineTo(n-c,r+i);break;case"star":i=Math.cos(h)*l,c=Math.sin(h)*l,t.moveTo(n-i,r-c),t.lineTo(n+i,r+c),t.moveTo(n+c,r-i),t.lineTo(n-c,r+i),h+=H,i=Math.cos(h)*l,c=Math.sin(h)*l,t.moveTo(n-i,r-c),t.lineTo(n+i,r+c),t.moveTo(n+c,r-i),t.lineTo(n-c,r+i);break;case"line":i=Math.cos(h)*l,c=Math.sin(h)*l,t.moveTo(n-i,r-c),t.lineTo(n+i,r+c);break;case"dash":t.moveTo(n,r),t.lineTo(n+Math.cos(h)*l,r+Math.sin(h)*l)}t.fill(),e.borderWidth>0&&t.stroke()}}function re(t,e,n){return n=n||.5,!e||t&&t.x>e.left-n&&t.x<e.right+n&&t.y>e.top-n&&t.y<e.bottom+n}function oe(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()}function ie(t){t.restore()}function ce(t,e,n,r,o){if(!e)return t.lineTo(n.x,n.y);if("middle"===o){const r=(e.x+n.x)/2;t.lineTo(r,e.y),t.lineTo(r,n.y)}else"after"===o!==!!r?t.lineTo(e.x,n.y):t.lineTo(n.x,e.y);t.lineTo(n.x,n.y)}function ae(t,e,n,r){if(!e)return t.lineTo(n.x,n.y);t.bezierCurveTo(r?e.cp1x:e.cp2x,r?e.cp1y:e.cp2y,r?n.cp2x:n.cp1x,r?n.cp2y:n.cp1y,n.x,n.y)}function ue(t,e,n,r,o,i={}){const c=h(e)?e:[e],a=i.strokeWidth>0&&""!==i.strokeColor;let u,s;for(t.save(),t.font=o.string,function(t,e){e.translation&&t.translate(e.translation[0],e.translation[1]);l(e.rotation)||t.rotate(e.rotation);e.color&&(t.fillStyle=e.color);e.textAlign&&(t.textAlign=e.textAlign);e.textBaseline&&(t.textBaseline=e.textBaseline)}(t,i),u=0;u<c.length;++u)s=c[u],a&&(i.strokeColor&&(t.strokeStyle=i.strokeColor),l(i.strokeWidth)||(t.lineWidth=i.strokeWidth),t.strokeText(s,n,r,i.maxWidth)),t.fillText(s,n,r,i.maxWidth),se(t,n,r,s,i),r+=o.lineHeight;t.restore()}function se(t,e,n,r,o){if(o.strikethrough||o.underline){const i=t.measureText(r),c=e-i.actualBoundingBoxLeft,a=e+i.actualBoundingBoxRight,u=n-i.actualBoundingBoxAscent,s=n+i.actualBoundingBoxDescent,f=o.strikethrough?(u+s)/2:s;t.strokeStyle=t.fillStyle,t.beginPath(),t.lineWidth=o.decorationWidth||2,t.moveTo(c,f),t.lineTo(a,f),t.stroke()}}function fe(t,e){const{x:n,y:r,w:o,h:i,radius:c}=e;t.arc(n+c.topLeft,r+c.topLeft,c.topLeft,-L,Y,!0),t.lineTo(n,r+i-c.bottomLeft),t.arc(n+c.bottomLeft,r+i-c.bottomLeft,c.bottomLeft,Y,L,!0),t.lineTo(n+o-c.bottomRight,r+i),t.arc(n+o-c.bottomRight,r+i-c.bottomRight,c.bottomRight,L,0,!0),t.lineTo(n+o,r+c.topRight),t.arc(n+o-c.topRight,r+c.topRight,c.topRight,0,-L,!0),t.lineTo(n+c.topLeft,r)}const le=new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/),he=new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);function de(t,e){const n=(""+t).match(le);if(!n||"normal"===n[1])return 1.2*e;switch(t=+n[2],n[3]){case"px":return t;case"%":t/=100}return e*t}function ge(t,e){const n={},r=d(e),o=r?Object.keys(e):e,i=d(t)?r?n=>b(t[n],t[e[n]]):e=>t[e]:()=>t;for(const c of o)n[c]=+i(c)||0;return n}function pe(t){return ge(t,{top:"y",right:"x",bottom:"y",left:"x"})}function be(t){return ge(t,["topLeft","topRight","bottomLeft","bottomRight"])}function ye(t){const e=pe(t);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function xe(t,e){t=t||{},e=e||Ut.font;let n=b(t.size,e.size);"string"===typeof n&&(n=parseInt(n,10));let r=b(t.style,e.style);r&&!(""+r).match(he)&&(console.warn('Invalid font style specified: "'+r+'"'),r="");const o={family:b(t.family,e.family),lineHeight:de(b(t.lineHeight,e.lineHeight),n),size:n,style:r,weight:b(t.weight,e.weight),string:""};return o.string=function(t){return!t||l(t.size)||l(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}(o),o}function me(t,e,n,r){let o,i,c,a=!0;for(o=0,i=t.length;o<i;++o)if(c=t[o],void 0!==c&&(void 0!==e&&"function"===typeof c&&(c=c(e),a=!1),void 0!==n&&h(c)&&(c=c[n%c.length],a=!1),void 0!==c))return r&&!a&&(r.cacheable=!1),c}function we(t,e,n){const{min:r,max:o}=t,i=x(e,(o-r)/2),c=(t,e)=>n&&0===t?0:t+e;return{min:c(r,-Math.abs(i)),max:c(o,i)}}function ve(t,e){return Object.assign(Object.create(t),e)}function Me(t,e,n){n=n||(n=>t[n]<e);let r,o=t.length-1,i=0;for(;o-i>1;)r=i+o>>1,n(r)?i=r:o=r;return{lo:i,hi:o}}const _e=(t,e,n)=>Me(t,n,(r=>t[r][e]<n)),ke=(t,e,n)=>Me(t,n,(r=>t[r][e]>=n));function Oe(t,e,n){let r=0,o=t.length;for(;r<o&&t[r]<e;)r++;for(;o>r&&t[o-1]>n;)o--;return r>0||o<t.length?t.slice(r,o):t}const Te=["push","pop","shift","splice","unshift"];function Pe(t,e){t._chartjs?t._chartjs.listeners.push(e):(Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),Te.forEach((e=>{const n="_onData"+C(e),r=t[e];Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value(...e){const o=r.apply(this,e);return t._chartjs.listeners.forEach((t=>{"function"===typeof t[n]&&t[n](...e)})),o}})})))}function Re(t,e){const n=t._chartjs;if(!n)return;const r=n.listeners,o=r.indexOf(e);-1!==o&&r.splice(o,1),r.length>0||(Te.forEach((e=>{delete t[e]})),delete t._chartjs)}function Se(t){const e=new Set;let n,r;for(n=0,r=t.length;n<r;++n)e.add(t[n]);return e.size===r?t:Array.from(e)}function Ce(t,e=[""],n=t,r,o=(()=>t[0])){I(r)||(r=He("_fallback",t));const i={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:t,_rootScopes:n,_fallback:r,_getTarget:o,override:o=>Ce([o,...t],e,n,r)};return new Proxy(i,{deleteProperty:(e,n)=>(delete e[n],delete e._keys,delete t[0][n],!0),get:(n,r)=>Ye(n,r,(()=>function(t,e,n,r){let o;for(const i of e)if(o=He(Ee(i,t),n),I(o))return Ae(t,o)?Be(n,r,t,o):o}(r,e,t,n))),getOwnPropertyDescriptor:(t,e)=>Reflect.getOwnPropertyDescriptor(t._scopes[0],e),getPrototypeOf:()=>Reflect.getPrototypeOf(t[0]),has:(t,e)=>$e(t).includes(e),ownKeys:t=>$e(t),set(t,e,n){const r=t._storage||(t._storage=o());return t[e]=r[e]=n,delete t._keys,!0}})}function Ie(t,e,n,r){const o={_cacheable:!1,_proxy:t,_context:e,_subProxy:n,_stack:new Set,_descriptors:je(t,r),setContext:e=>Ie(t,e,n,r),override:o=>Ie(t.override(o),e,n,r)};return new Proxy(o,{deleteProperty:(e,n)=>(delete e[n],delete t[n],!0),get:(t,e,n)=>Ye(t,e,(()=>function(t,e,n){const{_proxy:r,_context:o,_subProxy:i,_descriptors:c}=t;let a=r[e];j(a)&&c.isScriptable(e)&&(a=function(t,e,n,r){const{_proxy:o,_context:i,_subProxy:c,_stack:a}=n;if(a.has(t))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+t);a.add(t),e=e(i,c||r),a.delete(t),Ae(t,e)&&(e=Be(o._scopes,o,t,e));return e}(e,a,t,n));h(a)&&a.length&&(a=function(t,e,n,r){const{_proxy:o,_context:i,_subProxy:c,_descriptors:a}=n;if(I(i.index)&&r(t))e=e[i.index%e.length];else if(d(e[0])){const n=e,r=o._scopes.filter((t=>t!==n));e=[];for(const u of n){const n=Be(r,o,t,u);e.push(Ie(n,i,c&&c[t],a))}}return e}(e,a,t,c.isIndexable));Ae(e,a)&&(a=Ie(a,o,i&&i[e],c));return a}(t,e,n))),getOwnPropertyDescriptor:(e,n)=>e._descriptors.allKeys?Reflect.has(t,n)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(t,n),getPrototypeOf:()=>Reflect.getPrototypeOf(t),has:(e,n)=>Reflect.has(t,n),ownKeys:()=>Reflect.ownKeys(t),set:(e,n,r)=>(t[n]=r,delete e[n],!0)})}function je(t,e={scriptable:!0,indexable:!0}){const{_scriptable:n=e.scriptable,_indexable:r=e.indexable,_allKeys:o=e.allKeys}=t;return{allKeys:o,scriptable:n,indexable:r,isScriptable:j(n)?n:()=>n,isIndexable:j(r)?r:()=>r}}const Ee=(t,e)=>t?t+C(e):e,Ae=(t,e)=>d(e)&&"adapters"!==t&&(null===Object.getPrototypeOf(e)||e.constructor===Object);function Ye(t,e,n){if(Object.prototype.hasOwnProperty.call(t,e))return t[e];const r=n();return t[e]=r,r}function Fe(t,e,n){return j(t)?t(e,n):t}const We=(t,e)=>!0===t?e:"string"===typeof t?S(e,t):void 0;function Ne(t,e,n,r,o){for(const i of e){const e=We(n,i);if(e){t.add(e);const i=Fe(e._fallback,n,o);if(I(i)&&i!==n&&i!==r)return i}else if(!1===e&&I(r)&&n!==r)return null}return!1}function Be(t,e,n,r){const o=e._rootScopes,i=Fe(e._fallback,n,r),c=[...t,...o],a=new Set;a.add(r);let u=Le(a,c,n,i||n,r);return null!==u&&((!I(i)||i===n||(u=Le(a,c,i,u,r),null!==u))&&Ce(Array.from(a),[""],o,i,(()=>function(t,e,n){const r=t._getTarget();e in r||(r[e]={});const o=r[e];if(h(o)&&d(n))return n;return o}(e,n,r))))}function Le(t,e,n,r,o){for(;n;)n=Ne(t,e,n,r,o);return n}function He(t,e){for(const n of e){if(!n)continue;const e=n[t];if(I(e))return e}}function $e(t){let e=t._keys;return e||(e=t._keys=function(t){const e=new Set;for(const n of t)for(const t of Object.keys(n).filter((t=>!t.startsWith("_"))))e.add(t);return Array.from(e)}(t._scopes)),e}const Xe=Number.EPSILON||1e-14,De=(t,e)=>e<t.length&&!t[e].skip&&t[e],ze=t=>"x"===t?"y":"x";function qe(t,e,n,r){const o=t.skip?e:t,i=e,c=n.skip?e:n,a=et(i,o),u=et(c,i);let s=a/(a+u),f=u/(a+u);s=isNaN(s)?0:s,f=isNaN(f)?0:f;const l=r*s,h=r*f;return{previous:{x:i.x-l*(c.x-o.x),y:i.y-l*(c.y-o.y)},next:{x:i.x+h*(c.x-o.x),y:i.y+h*(c.y-o.y)}}}function Qe(t,e="x"){const n=ze(e),r=t.length,o=Array(r).fill(0),i=Array(r);let c,a,u,s=De(t,0);for(c=0;c<r;++c)if(a=u,u=s,s=De(t,c+1),u){if(s){const t=s[e]-u[e];o[c]=0!==t?(s[n]-u[n])/t:0}i[c]=a?s?D(o[c-1])!==D(o[c])?0:(o[c-1]+o[c])/2:o[c-1]:o[c]}!function(t,e,n){const r=t.length;let o,i,c,a,u,s=De(t,0);for(let f=0;f<r-1;++f)u=s,s=De(t,f+1),u&&s&&(Z(e[f],0,Xe)?n[f]=n[f+1]=0:(o=n[f]/e[f],i=n[f+1]/e[f],a=Math.pow(o,2)+Math.pow(i,2),a<=9||(c=3/Math.sqrt(a),n[f]=o*c*e[f],n[f+1]=i*c*e[f])))}(t,o,i),function(t,e,n="x"){const r=ze(n),o=t.length;let i,c,a,u=De(t,0);for(let s=0;s<o;++s){if(c=a,a=u,u=De(t,s+1),!a)continue;const o=a[n],f=a[r];c&&(i=(o-c[n])/3,a[`cp1${n}`]=o-i,a[`cp1${r}`]=f-i*e[s]),u&&(i=(u[n]-o)/3,a[`cp2${n}`]=o+i,a[`cp2${r}`]=f+i*e[s])}}(t,i,e)}function Ze(t,e,n){return Math.max(Math.min(t,n),e)}function Ke(t,e,n,r,o){let i,c,a,u;if(e.spanGaps&&(t=t.filter((t=>!t.skip))),"monotone"===e.cubicInterpolationMode)Qe(t,o);else{let n=r?t[t.length-1]:t[0];for(i=0,c=t.length;i<c;++i)a=t[i],u=qe(n,a,t[Math.min(i+1,c-(r?0:1))%c],e.tension),a.cp1x=u.previous.x,a.cp1y=u.previous.y,a.cp2x=u.next.x,a.cp2y=u.next.y,n=a}e.capBezierPoints&&function(t,e){let n,r,o,i,c,a=re(t[0],e);for(n=0,r=t.length;n<r;++n)c=i,i=a,a=n<r-1&&re(t[n+1],e),i&&(o=t[n],c&&(o.cp1x=Ze(o.cp1x,e.left,e.right),o.cp1y=Ze(o.cp1y,e.top,e.bottom)),a&&(o.cp2x=Ze(o.cp2x,e.left,e.right),o.cp2y=Ze(o.cp2y,e.top,e.bottom)))}(t,n)}function Ve(){return"undefined"!==typeof window&&"undefined"!==typeof document}function Ue(t){let e=t.parentNode;return e&&"[object ShadowRoot]"===e.toString()&&(e=e.host),e}function Je(t,e,n){let r;return"string"===typeof t?(r=parseInt(t,10),-1!==t.indexOf("%")&&(r=r/100*e.parentNode[n])):r=t,r}const Ge=t=>window.getComputedStyle(t,null);const tn=["top","right","bottom","left"];function en(t,e,n){const r={};n=n?"-"+n:"";for(let o=0;o<4;o++){const i=tn[o];r[i]=parseFloat(t[e+"-"+i+n])||0}return r.width=r.left+r.right,r.height=r.top+r.bottom,r}function nn(t,e){const{canvas:n,currentDevicePixelRatio:r}=e,o=Ge(n),i="border-box"===o.boxSizing,c=en(o,"padding"),a=en(o,"border","width"),{x:u,y:s,box:f}=function(t,e){const n=t.native||t,r=n.touches,o=r&&r.length?r[0]:n,{offsetX:i,offsetY:c}=o;let a,u,s=!1;if(((t,e,n)=>(t>0||e>0)&&(!n||!n.shadowRoot))(i,c,n.target))a=i,u=c;else{const t=e.getBoundingClientRect();a=o.clientX-t.left,u=o.clientY-t.top,s=!0}return{x:a,y:u,box:s}}(t,n),l=c.left+(f&&a.left),h=c.top+(f&&a.top);let{width:d,height:g}=e;return i&&(d-=c.width+a.width,g-=c.height+a.height),{x:Math.round((u-l)/d*n.width/r),y:Math.round((s-h)/g*n.height/r)}}const rn=t=>Math.round(10*t)/10;function on(t,e,n,r){const o=Ge(t),i=en(o,"margin"),c=Je(o.maxWidth,t,"clientWidth")||N,a=Je(o.maxHeight,t,"clientHeight")||N,u=function(t,e,n){let r,o;if(void 0===e||void 0===n){const i=Ue(t);if(i){const t=i.getBoundingClientRect(),c=Ge(i),a=en(c,"border","width"),u=en(c,"padding");e=t.width-u.width-a.width,n=t.height-u.height-a.height,r=Je(c.maxWidth,i,"clientWidth"),o=Je(c.maxHeight,i,"clientHeight")}else e=t.clientWidth,n=t.clientHeight}return{width:e,height:n,maxWidth:r||N,maxHeight:o||N}}(t,e,n);let{width:s,height:f}=u;if("content-box"===o.boxSizing){const t=en(o,"border","width"),e=en(o,"padding");s-=e.width+t.width,f-=e.height+t.height}return s=Math.max(0,s-i.width),f=Math.max(0,r?Math.floor(s/r):f-i.height),s=rn(Math.min(s,c,u.maxWidth)),f=rn(Math.min(f,a,u.maxHeight)),s&&!f&&(f=rn(s/2)),{width:s,height:f}}function cn(t,e,n){const r=e||1,o=Math.floor(t.height*r),i=Math.floor(t.width*r);t.height=o/r,t.width=i/r;const c=t.canvas;return c.style&&(n||!c.style.height&&!c.style.width)&&(c.style.height=`${t.height}px`,c.style.width=`${t.width}px`),(t.currentDevicePixelRatio!==r||c.height!==o||c.width!==i)&&(t.currentDevicePixelRatio=r,c.height=o,c.width=i,t.ctx.setTransform(r,0,0,r,0,0),!0)}const an=function(){let t=!1;try{const e={get passive(){return t=!0,!1}};window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}return t}();function un(t,e){const n=function(t,e){return Ge(t).getPropertyValue(e)}(t,e),r=n&&n.match(/^(\d+)(\.\d+)?px$/);return r?+r[1]:void 0}function sn(t,e,n,r){return{x:t.x+n*(e.x-t.x),y:t.y+n*(e.y-t.y)}}function fn(t,e,n,r){return{x:t.x+n*(e.x-t.x),y:"middle"===r?n<.5?t.y:e.y:"after"===r?n<1?t.y:e.y:n>0?e.y:t.y}}function ln(t,e,n,r){const o={x:t.cp2x,y:t.cp2y},i={x:e.cp1x,y:e.cp1y},c=sn(t,o,n),a=sn(o,i,n),u=sn(i,e,n),s=sn(c,a,n),f=sn(a,u,n);return sn(s,f,n)}const hn=new Map;function dn(t,e,n){return function(t,e){e=e||{};const n=t+JSON.stringify(e);let r=hn.get(n);return r||(r=new Intl.NumberFormat(t,e),hn.set(n,r)),r}(e,n).format(t)}function gn(t,e,n){return t?function(t,e){return{x:n=>t+t+e-n,setWidth(t){e=t},textAlign:t=>"center"===t?t:"right"===t?"left":"right",xPlus:(t,e)=>t-e,leftForLtr:(t,e)=>t-e}}(e,n):{x:t=>t,setWidth(t){},textAlign:t=>t,xPlus:(t,e)=>t+e,leftForLtr:(t,e)=>t}}function pn(t,e){let n,r;"ltr"!==e&&"rtl"!==e||(n=t.canvas.style,r=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",e,"important"),t.prevTextDirection=r)}function bn(t,e){void 0!==e&&(delete t.prevTextDirection,t.canvas.style.setProperty("direction",e[0],e[1]))}function yn(t){return"angle"===t?{between:ot,compare:nt,normalize:rt}:{between:at,compare:(t,e)=>t-e,normalize:t=>t}}function xn({start:t,end:e,count:n,loop:r,style:o}){return{start:t%n,end:e%n,loop:r&&(e-t+1)%n===0,style:o}}function mn(t,e,n){if(!n)return[t];const{property:r,start:o,end:i}=n,c=e.length,{compare:a,between:u,normalize:s}=yn(r),{start:f,end:l,loop:h,style:d}=function(t,e,n){const{property:r,start:o,end:i}=n,{between:c,normalize:a}=yn(r),u=e.length;let s,f,{start:l,end:h,loop:d}=t;if(d){for(l+=u,h+=u,s=0,f=u;s<f&&c(a(e[l%u][r]),o,i);++s)l--,h--;l%=u,h%=u}return h<l&&(h+=u),{start:l,end:h,loop:d,style:t.style}}(t,e,n),g=[];let p,b,y,x=!1,m=null;const w=()=>x||u(o,y,p)&&0!==a(o,y),v=()=>!x||0===a(i,p)||u(i,y,p);for(let M=f,_=f;M<=l;++M)b=e[M%c],b.skip||(p=s(b[r]),p!==y&&(x=u(p,o,i),null===m&&w()&&(m=0===a(p,o)?M:_),null!==m&&v()&&(g.push(xn({start:m,end:M,loop:h,count:c,style:d})),m=null),_=M,y=p));return null!==m&&g.push(xn({start:m,end:l,loop:h,count:c,style:d})),g}function wn(t,e){const n=[],r=t.segments;for(let o=0;o<r.length;o++){const i=mn(r[o],t.points,e);i.length&&n.push(...i)}return n}function vn(t,e){const n=t.points,r=t.options.spanGaps,o=n.length;if(!o)return[];const i=!!t._loop,{start:c,end:a}=function(t,e,n,r){let o=0,i=e-1;if(n&&!r)for(;o<e&&!t[o].skip;)o++;for(;o<e&&t[o].skip;)o++;for(o%=e,n&&(i+=o);i>o&&t[i%e].skip;)i--;return i%=e,{start:o,end:i}}(n,o,i,r);if(!0===r)return Mn(t,[{start:c,end:a,loop:i}],n,e);return Mn(t,function(t,e,n,r){const o=t.length,i=[];let c,a=e,u=t[e];for(c=e+1;c<=n;++c){const n=t[c%o];n.skip||n.stop?u.skip||(r=!1,i.push({start:e%o,end:(c-1)%o,loop:r}),e=a=n.stop?c:null):(a=c,u.skip&&(e=c)),u=n}return null!==a&&i.push({start:e%o,end:a%o,loop:r}),i}(n,c,a<c?a+o:a,!!t._fullLoop&&0===c&&a===o-1),n,e)}function Mn(t,e,n,r){return r&&r.setContext&&n?function(t,e,n,r){const o=t._chart.getContext(),i=_n(t.options),{_datasetIndex:c,options:{spanGaps:a}}=t,u=n.length,s=[];let f=i,l=e[0].start,h=l;function d(t,e,r,o){const i=a?-1:1;if(t!==e){for(t+=u;n[t%u].skip;)t-=i;for(;n[e%u].skip;)e+=i;t%u!==e%u&&(s.push({start:t%u,end:e%u,loop:r,style:o}),f=o,l=e%u)}}for(const g of e){l=a?l:g.start;let t,e=n[l%u];for(h=l+1;h<=g.end;h++){const i=n[h%u];t=_n(r.setContext(ve(o,{type:"segment",p0:e,p1:i,p0DataIndex:(h-1)%u,p1DataIndex:h%u,datasetIndex:c}))),kn(t,f)&&d(l,h-1,g.loop,f),e=i,f=t}l<h-1&&d(l,h-1,g.loop,f)}return s}(t,e,n,r):e}function _n(t){return{backgroundColor:t.backgroundColor,borderCapStyle:t.borderCapStyle,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderJoinStyle:t.borderJoinStyle,borderWidth:t.borderWidth,borderColor:t.borderColor}}function kn(t,e){return e&&JSON.stringify(t)!==JSON.stringify(e)}},9008:function(t,e,n){t.exports=n(3121)},5376:function(t,e,n){"use strict";n.d(e,{$Q:function(){return d}});var r=n(7294),o=n(3328);const i="label";function c(t,e){"function"===typeof t?t(e):t&&(t.current=e)}function a(t,e){t.labels=e}function u(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i;const r=[];t.datasets=e.map((e=>{const o=t.datasets.find((t=>t[n]===e[n]));return o&&e.data&&!r.includes(o)?(r.push(o),Object.assign(o,e),o):{...e}}))}function s(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;const n={labels:[],datasets:[]};return a(n,t.labels),u(n,t.datasets,e),n}function f(t,e){let{height:n=150,width:i=300,redraw:f=!1,datasetIdKey:l,type:h,data:d,options:g,plugins:p=[],fallbackContent:b,...y}=t;const x=(0,r.useRef)(null),m=(0,r.useRef)(),w=()=>{x.current&&(m.current=new o.kL(x.current,{type:h,data:s(d,l),options:g,plugins:p}),c(e,m.current))},v=()=>{c(e,null),m.current&&(m.current.destroy(),m.current=null)};return(0,r.useEffect)((()=>{var t,e;!f&&m.current&&g&&(t=m.current,e=g,t.options={...e})}),[f,g]),(0,r.useEffect)((()=>{!f&&m.current&&a(m.current.config.data,d.labels)}),[f,d.labels]),(0,r.useEffect)((()=>{!f&&m.current&&d.datasets&&u(m.current.config.data,d.datasets,l)}),[f,d.datasets]),(0,r.useEffect)((()=>{m.current&&(f?(v(),setTimeout(w)):m.current.update())}),[f,g,d.labels,d.datasets]),(0,r.useEffect)((()=>(w(),()=>v())),[]),r.createElement("canvas",Object.assign({ref:x,role:"img",height:n,width:i},y),b)}const l=(0,r.forwardRef)(f);function h(t,e){return o.kL.register(e),(0,r.forwardRef)(((e,n)=>r.createElement(l,Object.assign({},e,{ref:n,type:t}))))}const d=h("bar",o.vn)}}]);